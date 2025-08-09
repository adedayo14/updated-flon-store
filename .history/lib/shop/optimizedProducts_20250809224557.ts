import getGQLClient from 'lib/graphql/client';
import { fetchStoreData } from 'lib/rest/fetchStoreData';
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

    // Fallback to a limited GraphQL query if REST fails
    console.warn('REST API failed, falling back to limited GraphQL query');
    
    const graphqlQuery = `
      query getProductsLimited($limit: Int, $page: Int, $sort: String, $where: JSON) {
        products(limit: $limit, page: $page, sort: $sort, where: $where) {
          count
          page
          pages
          results {
            id
            name
            description
            slug
            price
            sale
            salePrice
            origPrice
            currency
            categories {
              name
              slug
            }
            images {
              caption
              file {
                width
                height
                url
              }
            }
            purchaseOptions {
              standard {
                price
                sale
                salePrice
                origPrice
              }
            }
          }
        }
      }
    `;

    let whereClause: any = {};
    if (category) {
      whereClause.categories = { slug: category };
    }
    if (search) {
      whereClause.name = { $regex: search, $options: 'i' };
    }
    if (Object.keys(filters).length > 0) {
      whereClause = { ...whereClause, ...filters };
    }

    const client = getGQLClient();
    const graphqlResponse = await client.getProductsPaginated({
      currency,
      limit,
      page,
      sort,
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined
    });

    if (graphqlResponse?.products) {
      return {
        products: graphqlResponse.products.results || [],
        count: graphqlResponse.products.count || 0,
        page: graphqlResponse.products.page || 1,
        pages: graphqlResponse.products.pages || 1,
      };
    }

    throw new Error('Both REST and GraphQL queries failed');

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
