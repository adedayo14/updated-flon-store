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
          const storeData = settings.store || {};
          console.log('✅ Fetched real store settings:', storeData.name || 'FLON.');
          
          return { 
            data: { 
              storeSettings: { 
                currency: storeData.currency || 'GBP', 
                locale: storeData.locale || 'en-GB',
                lang: storeData.locale?.split('-')[0] || 'en',
                name: storeData.name || 'FLON.',
                store: {
                  id: storeData.id || 'raw-foods',
                  currency: storeData.currency || 'GBP',
                  locale: storeData.locale || 'en-GB',
                  name: storeData.name || 'FLON.',
                  homePage: storeData.home_page || 'home',
                  url: storeData.url || 'https://www.flon.co.uk',
                  supportEmail: storeData.support_email || 'sales@flon.co.uk',
                  locales: storeData.locales || [
                    { code: 'en-GB', name: 'English (UK)', fallback: false }
                  ],
                  currencies: storeData.currencies || [
                    { code: 'GBP', symbol: '£', name: 'British Pound Sterling', rate: 1, priced: true, type: 'base' }
                  ]
                },
                values: {
                  header: settings.header || { menu: null },
                  footer: settings.footer || { menu: null, secondaryMenu: null }
                }
              } 
            } 
          };
        } else {
          console.log('❌ Failed to fetch store settings, using fallback');
          throw new Error('Failed to fetch settings');
        }
      } catch (error) {
        console.warn('❌ Error fetching store settings, using FLON fallback:', error);
        return { 
          data: { 
            storeSettings: { 
              currency: 'GBP', 
              locale: 'en-GB',
              lang: 'en',
              name: 'FLON.',
              store: {
                id: 'raw-foods',
                currency: 'GBP',
                locale: 'en-GB',
                name: 'FLON.',
                homePage: 'home',
                url: 'https://www.flon.co.uk',
                supportEmail: 'sales@flon.co.uk',
                locales: [
                  { code: 'en-GB', name: 'English (UK)', fallback: false }
                ],
                currencies: [
                  { code: 'GBP', symbol: '£', name: 'British Pound Sterling', rate: 1, priced: true, type: 'base' }
                ]
              },
              values: {
                header: { menu: null },
                footer: { menu: null, secondaryMenu: null }
              }
            } 
          } 
        };
      }
    },
    getStoreUrl: () => Promise.resolve({ data: { settings: { url: 'https://www.flon.co.uk' } } }),
    getMenus: () => Promise.resolve({ data: { menus: [] } }),
    getContentPages: async () => {
      try {
        // Return basic content pages for your store
        const pages = [
          {
            id: 'home',
            slug: '',
            name: 'Home',
            published: true,
            meta: {
              title: 'Raw Foods - Eco-Friendly Products',
              description: 'Discover our range of sustainable, eco-friendly products for your daily needs.'
            }
          },
          {
            id: 'products',
            slug: 'products',
            name: 'Products',
            published: true,
            meta: {
              title: 'Products - Raw Foods',
              description: 'Browse our collection of eco-friendly products.'
            }
          }
        ];
        
        return { 
          data: { 
            contentPages: { 
              results: pages
            } 
          } 
        };
      } catch (error) {
        console.warn('Error generating content pages:', error);
        return { data: { contentPages: { results: [] } } };
      }
    },
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
