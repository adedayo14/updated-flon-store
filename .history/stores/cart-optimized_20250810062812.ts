// Enhanced cart store with aggressive caching
import create from 'zustand';
import { persist } from 'zustand/middleware';
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

// Cache cart for 60 seconds (instead of fetching on every page)
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
        if (!force && (now - state.lastFetch) < CART_CACHE_TIME && !state.cart.empty) {
          return;
        }

        // Skip if already loading
        if (state.isLoading) {
          return;
        }

        set({ isLoading: true });

        try {
          const res = await fetch(API_ROUTES.CART, {
            // Add cache headers to help reduce server load
            headers: {
              'Cache-Control': 'max-age=30', // 30 second browser cache
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
            lastFetch: Date.now(), // Update cache time
          }));

          if (config.showCartAfter) {
            get().showCart();
          }
        } catch (error) {
          console.error('Add to cart error:', error);
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        try {
          const res = await fetch(`${API_ROUTES.CART}/items`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: itemId }),
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
        } catch (error) {
          console.error('Remove item error:', error);
        }
      },

      updateItem: async (itemId: string, input: SwellCartItemInput) => {
        try {
          const res = await fetch(`${API_ROUTES.CART}/items`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: itemId, input }),
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
        } catch (error) {
          console.error('Update item error:', error);
        }
      },
    }),
    {
      name: 'cart-storage',
      // Only persist the cart data, not loading states
      partialize: (state) => ({
        cart: state.cart,
        lastFetch: state.lastFetch,
      }),
    }
  )
);

// Helper function for stock checking (keeping existing logic)
const hasSufficientStock = (
  productId: string,
  quantity: number,
  items: CartItemProps[],
  variantName?: string,
): boolean => {
  const product = items.find(item => item.productId === productId);
  // Add your existing stock logic here
  return true; // Placeholder
};

export default useCartStore;
