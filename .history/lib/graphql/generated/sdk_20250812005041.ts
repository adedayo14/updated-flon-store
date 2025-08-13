// Minimal GraphQL SDK stub to prevent import errors
// This allows the admin interface to work without full Swell integration

export interface GraphQLClient {
  request: (query: string, variables?: any) => Promise<any>;
}

export const getSdk = (client?: GraphQLClient) => {
  // Return a stub SDK that prevents errors
  return {
    // Add any specific methods that the app might be looking for
    // These will return empty results but won't crash
    getProducts: () => Promise.resolve({ products: [] }),
    getAllProducts: () => Promise.resolve({ data: { products: { results: [] } } }),
    getProduct: (params?: any) => Promise.resolve({ data: { product: null } }),
    getCategories: () => Promise.resolve({ categories: [] }),
    getCategory: (params?: any) => Promise.resolve({ data: { category: null } }),
    getCategoryWithProductSlugs: (params?: any) => Promise.resolve({ data: { category: null } }),
    getSettings: () => Promise.resolve({ settings: {} }),
    getStoreSettings: (params?: any) => Promise.resolve({ 
      data: { 
        storeSettings: { 
          currency: 'USD', 
          locale: 'en-US',
          lang: 'en',
          name: 'Demo Store',
          store: {
            currency: 'USD',
            locale: 'en-US',
            name: 'Demo Store',
            locales: [
              { code: 'en-US', name: 'English (US)', fallback: false }
            ],
            currencies: [
              { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, priced: false, type: 'standard' }
            ]
          },
          values: {
            header: {
              menu: null
            },
            footer: {
              menu: null,
              secondaryMenu: null
            }
          }
        } 
      } 
    }),
    getStoreUrl: () => Promise.resolve({ data: { settings: { url: 'https://demo-store.com' } } }),
    getMenus: () => Promise.resolve({ data: { menus: [] } }),
    getContentPages: () => Promise.resolve({ data: { contentPages: { results: [] } } }),
    getCart: () => Promise.resolve({ data: { cart: null } }),
    getAccountDetails: () => Promise.resolve({ data: { account: null } }),
    getFilteredSortedProducts: (params?: any) => Promise.resolve({ data: { products: { results: [] } } }),
  };
};

// Export types that might be expected
export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  images?: any[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Settings {
  currency?: string;
  locale?: string;
}

// Cart-related types
export interface SwellCartItemInput {
  productId?: string;
  variantId?: string;
  quantity?: number;
  options?: any[];
}

export interface Cart {
  id?: string;
  items?: CartItem[];
  total?: number;
}

export interface CartItem {
  id?: string;
  productId?: string;
  quantity?: number;
  price?: number;
}

// Additional types for settings
export type Maybe<T> = T | null;

export interface SwellSettingsMenus {
  sections?: any[];
}
