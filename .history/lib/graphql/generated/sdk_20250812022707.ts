// Minimal GraphQL SDK stub to prevent import errors
// This allows the admin interface to work without full Swell integration

export interface GraphQLClient {
  request: (query: string, variables?: any) => Promise<any>;
}

export const getSdk = (client?: GraphQLClient) => {
  // Return a stub SDK that prevents errors
  return {
    // Product queries - these will fetch from real Swell API
    getProducts: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWELL_STORE_URL}/api/products`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return { products: data.results || [] };
      } catch (error) {
        console.warn('Error fetching products:', error);
        return { products: [] };
      }
    },
    getAllProducts: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWELL_STORE_URL}/api/products`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return { data: { products: { results: data.results || [] } } };
      } catch (error) {
        console.warn('Error fetching all products:', error);
        return { data: { products: { results: [] } } };
      }
    },
    getProduct: async (params?: any) => {
      try {
        const productId = params?.id;
        if (!productId) return { data: { product: null } };
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWELL_STORE_URL}/api/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        return { data: { product: data } };
      } catch (error) {
        console.warn('Error fetching product:', error);
        return { data: { product: null } };
      }
    },
    getCategories: () => Promise.resolve({ categories: [] }),
    getCategory: (params?: any) => Promise.resolve({ data: { category: null } }),
    getCategoryWithProductSlugs: (params?: any) => Promise.resolve({ data: { category: null } }),
    getSettings: () => Promise.resolve({ settings: {} }),
    getStoreSettings: async (params?: any) => {
      try {
        // Fetch real store settings from Swell API
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWELL_STORE_URL}/api/settings`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const settings = await response.json();
          console.log('✅ Fetched real store settings:', settings.name || 'Raw Foods');
          
          return { 
            data: { 
              storeSettings: { 
                currency: settings.currency || 'GBP', 
                locale: settings.locale || 'en-GB',
                lang: settings.lang || 'en',
                name: settings.name || 'Raw Foods',
                store: {
                  currency: settings.currency || 'GBP',
                  locale: settings.locale || 'en-GB',
                  name: settings.name || 'Raw Foods',
                  homePage: settings.home_page || 'home',
                  locales: settings.locales || [
                    { code: 'en-GB', name: 'English (UK)', fallback: false }
                  ],
                  currencies: settings.currencies || [
                    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1, priced: false, type: 'standard' }
                  ]
                },
                values: settings.values || {
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
          };
        } else {
          console.log('❌ Failed to fetch store settings, using fallback');
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        console.warn('❌ Error fetching store settings, using Raw Foods fallback:', error);
        return { 
          data: { 
            storeSettings: { 
              currency: 'GBP', 
              locale: 'en-GB',
              lang: 'en',
              name: 'Raw Foods',
              store: {
                currency: 'GBP',
                locale: 'en-GB',
                name: 'Raw Foods',
                homePage: 'home',
                locales: [
                  { code: 'en-GB', name: 'English (UK)', fallback: false }
                ],
                currencies: [
                  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1, priced: false, type: 'standard' }
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
        };
      }
    },
    getStoreUrl: () => Promise.resolve({ data: { settings: { url: process.env.NEXT_PUBLIC_SWELL_STORE_URL || 'https://raw-foods.swell.store' } } }),
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
