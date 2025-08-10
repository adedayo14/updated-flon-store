// Fallback data for when APIs are unavailable
import type { PurchasableProductData } from 'types/shared/products';
import type { ProductsLayoutProps } from 'components/layouts/ProductsLayout';
import type { CategoryPreviewCardProps } from 'components/atoms/CategoryPreviewCard';

export const fallbackCategories: CategoryPreviewCardProps[] = [
  {
    id: 'fallback-1',
    href: '/categories/bath-body',
    title: 'Bath & Body',
    image: {
      alt: 'Bath & Body products',
      src: '/images/fallback-category-1.jpg',
      width: 400,
      height: 300,
    },
  },
  {
    id: 'fallback-2', 
    href: '/categories/gifts',
    title: 'Gifts',
    image: {
      alt: 'Gift products',
      src: '/images/fallback-category-2.jpg',
      width: 400,
      height: 300,
    },
  },
];

export const fallbackProducts: PurchasableProductData[] = [
  {
    id: 'fallback-product-1',
    title: 'Product Temporarily Unavailable',
    description: 'Product information is currently being updated. Please check back soon.',
    price: 0,
    origPrice: null,
    href: '/products/product-unavailable',
    image: {
      alt: 'Product unavailable',
      src: '/image-placeholder.png',
      width: 400,
      height: 400,
    },
    productOptions: [],
    purchaseOptions: {},
    productVariants: [],
  },
];

export const fallbackLayoutSettings: ProductsLayoutProps = {
  categories: fallbackCategories,
  settings: {
    showProductsPrice: true,
    showProductsDescription: true,
    showFeaturedCategories: false,
    productsPerRow: 4 as any,
    enableQuickAdd: true,
  },
  attributeFilters: [],
};

export const fallbackStoreSettings = {
  store: {
    name: 'Flon',
    currency: 'USD',
    currencies: [
      {
        code: 'USD',
        name: 'US Dollar',
        rate: 1,
        symbol: '$',
        decimals: 2,
        priced: true,
        type: 'standard'
      }
    ],
    locale: 'en-US',
    locales: [
      {
        name: 'English',
        code: 'en-US',
        fallback: true
      }
    ]
  },
  values: {}
};

// Check if we're in fallback mode (API unavailable)
export function shouldUseFallback(): boolean {
  // Check for various indicators that the API is down
  if (typeof window === 'undefined') return false; // Server-side
  
  // Check if we've had recent API failures
  const recentFailures = Number(sessionStorage.getItem('api-failures') || '0');
  const lastFailure = Number(sessionStorage.getItem('last-api-failure') || '0');
  const now = Date.now();
  
  // If more than 3 failures in the last 5 minutes, use fallback
  if (recentFailures >= 3 && (now - lastFailure) < 300000) {
    return true;
  }
  
  return false;
}

// Track API failures for fallback decision making
export function trackAPIFailure(): void {
  if (typeof window === 'undefined') return;
  
  const failures = Number(sessionStorage.getItem('api-failures') || '0') + 1;
  sessionStorage.setItem('api-failures', failures.toString());
  sessionStorage.setItem('last-api-failure', Date.now().toString());
  
  console.warn(`API failure tracked. Total failures: ${failures}`);
  
  if (failures >= 3) {
    console.warn('Switching to fallback mode due to repeated API failures');
  }
}

// Reset failure tracking when API is working
export function resetAPIFailures(): void {
  if (typeof window === 'undefined') return;
  
  sessionStorage.removeItem('api-failures');
  sessionStorage.removeItem('last-api-failure');
}
