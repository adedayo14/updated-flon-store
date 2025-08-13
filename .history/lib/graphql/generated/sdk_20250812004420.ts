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
        settings: { 
          currency: 'USD', 
          locale: 'en-US',
          lang: 'en',
          name: 'Demo Store'
        } 
      } 
    }),
    getStoreUrl: () => Promise.resolve({ data: { settings: { url: 'https://demo-store.com' } } }),
    getMenus: () => Promise.resolve({ data: { menus: [] } }),
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
