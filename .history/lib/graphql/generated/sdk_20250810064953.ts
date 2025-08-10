// Temporary minimal SDK to fix build errors
// This will be generated properly once GraphQL schema generation is fixed

export interface SwellProductOption {
  id?: string;
  name?: string;
  value?: string;
}

export interface Product {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  currency?: string;
}

export interface Category {
  id?: string;
  name?: string;
  slug?: string;
}

// Minimal client methods used by the app
export const getSdk = (client: any) => ({
  getCategories: () => Promise.resolve({ data: { categories: { results: [] } } }),
  getProduct: ({ slug }: { slug: string }) => Promise.resolve({ data: { productBySlug: null } }),
  getProducts: (params: any) => Promise.resolve({ data: { products: { results: [] } } }),
  getProductSlugs: () => Promise.resolve({ data: { products: { results: [] } } }),
  getStoreSettings: () => Promise.resolve({ data: { storeSettings: { store: { homePage: 'home' } } } }),
  getContentPages: () => Promise.resolve({ data: { contentPages: { results: [] } } }),
});
