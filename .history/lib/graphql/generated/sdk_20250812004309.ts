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
    getProduct: () => Promise.resolve({ product: null }),
    getCategories: () => Promise.resolve({ categories: [] }),
    getSettings: () => Promise.resolve({ settings: {} }),
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
