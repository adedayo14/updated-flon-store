import getGQLClient from 'lib/graphql/client';
import { fetchStoreData } from 'lib/rest/fetchStoreData';
import { denullifyArray } from 'lib/utils/denullify';
import type { PurchasableProductData } from 'types/shared/products';

export interface ProductsQueryOptions {
  limit?: number;
  page?: number;
  sort?: string;
  category?: string;
  search?: string;
  filters?: Record<string, any>;
  currency?: string;
}

export interface ProductsQueryResult {
  products: PurchasableProductData[];
  count: number;
  page: number;
  pages: number;
}

// Optimized product fetching that avoids the massive getAllProducts query
export const fetchProductsPaginated = async (options: ProductsQueryOptions = {}): Promise<ProductsQueryResult> => {
  const {
    limit = 12, // Default to 12 products per page
    page = 1,
    sort = 'name_asc',
    category,
    search,
    filters = {},
    currency
  } = options;

  try {
    // Use REST API for faster loading instead of the complex GraphQL query
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      sort,
      ...(category && { category }),
      ...(search && { search }),
      ...Object.keys(filters).reduce((acc, key) => {
        if (filters[key]) {
          acc[key] = filters[key].toString();
        }
        return acc;
      }, {} as Record<string, string>)
    });

    const response = await fetchStoreData(`/products?${params.toString()}`);
    
    if (response?.results) {
      return {
        products: response.results || [],
        count: response.count || 0,
        page: response.page || 1,
        pages: response.pages || 1,
      };
    }

    throw new Error('REST API query failed');

  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Return empty result instead of throwing to prevent page crashes
    return {
      products: [],
      count: 0,
      page: 1,
      pages: 1,
    };
  }
};

// Get a small sample of products for the initial page load
export const fetchProductsSample = async (limit = 8): Promise<PurchasableProductData[]> => {
  try {
    const result = await fetchProductsPaginated({ limit, page: 1, sort: 'popularity' });
    return result.products;
  } catch (error) {
    console.error('Error fetching product sample:', error);
    return [];
  }
};
