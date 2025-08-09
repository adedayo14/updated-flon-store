import create from 'zustand';
import useNotificationStore from 'stores/notification';
import { isStockLimited } from 'lib/utils/products';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { API_ROUTES } from 'types/shared/api';
import type { CartProps } from 'components/organisms/Cart';
import type { CartItemProps } from 'components/molecules/CartItem';
import type { SwellCartItemInput } from 'lib/graphql/generated/sdk';
import type { CartData, CartItemInput } from 'types/shared/cart';
import useSettingsStore from './settings';
import { getI18n } from 'hooks/useI18n';

export interface AddToCartConfig {
  showCartAfter?: boolean;
  data?: {
    variant?: {
      name: string;
    };
  };
}

interface CartState {
  cart: CartProps;
  lastFetch: number;
  isLoading: boolean;
  showCart: () => void;
  hideCart: () => void;
  getCart: (force?: boolean) => Promise<void>;
  addToCart: (input: CartItemInput, config?: AddToCartConfig) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, input: SwellCartItemInput) => Promise<void>;
}

// Cache cart for 60 seconds to avoid fetching on every page load
const CART_CACHE_TIME = 60 * 1000;

const useCartStore = create<CartState>((set, get) => ({
  cart: {
    total: 0,
    items: [],
    visible: false,
    empty: true,
    setVisible: (visible: boolean) =>
      set((state) => ({ cart: { ...state.cart, visible } })),
    checkoutUrl: '#',
  },
  lastFetch: 0,
  isLoading: false,
  showCart: () => set((state) => ({ cart: { ...state.cart, visible: true } })),
  hideCart: () => set((state) => ({ cart: { ...state.cart, visible: false } })),
  getCart: async (force = false) => {
    const state = get();
    const now = Date.now();
    
    // Skip if recently fetched and not forced
    if (!force && (now - state.lastFetch) < CART_CACHE_TIME && state.lastFetch > 0) {
      return;
    }

    // Skip if already loading to prevent duplicate requests
    if (state.isLoading) {
      return;
    }

    set({ isLoading: true });

    try {
      const res = await fetch(API_ROUTES.CART, {
        headers: {
          'Cache-Control': 'max-age=30',
        }
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
        lastFetch: now,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Cart fetch error:', error);
      set({ isLoading: false });
    }
  },
  addToCart: async (input: CartItemInput, config = { showCartAfter: true }) => {
    try {
      const { productId } = input;
      if (!productId) return;
      const quantity = input.quantity ?? 1;
      const { items } = get().cart;
      if (
        !hasSufficientStock(
          productId,
          quantity,
          items,
          config.data?.variant?.name,
        )
      ) {
        const send = useNotificationStore.getState().send;
        const i18n = getI18n(useSettingsStore.getState().settings?.lang);

        const stockMessage = i18n('products.stock.not_enough', {
          quantity: quantity.toString(),
        });
        send({
          message: stockMessage,
          type: NOTIFICATION_TYPE.ERROR,
        });
        throw new Error('Not enough stock');
      }

      const res = await fetch(API_ROUTES.CART, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
        lastFetch: Date.now(),
      }));

      if (config.showCartAfter) {
        get().showCart();
      }
    } catch (error) {
      console.error(error);
    }
  },
  removeItem: async (itemId) => {
    try {
      const res = await fetch(API_ROUTES.CART_ITEMS, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateItem: async (itemId, input) => {
    try {
      const res = await fetch(API_ROUTES.CART_ITEMS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, input }),
      });

      const cart = (await res.json()) as CartData;

      set((state) => ({
        cart: {
          ...state.cart,
          total: cart.data.total,
          items: cart.data.items,
          checkoutUrl: cart.data.checkoutUrl,
          empty: !cart.data.items.length,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export function hasSufficientStock(
  productId: string,
  quantity: number,
  cartItems: CartItemProps[],
  variantName?: string,
): boolean {
  const itemInCart = cartItems.find(
    (item) =>
      item.productId === productId &&
      (variantName ? item.variantName === variantName : true),
  );
  if (!itemInCart) return true;
  const { stockTracking, stockPurchasable } = itemInCart;
  if (!isStockLimited(stockTracking, stockPurchasable)) {
    return true;
  }
  const { quantity: quantityInCart, stockLevel } = itemInCart;
  return quantity + quantityInCart <= (stockLevel ?? 0);
}

export default useCartStore;
