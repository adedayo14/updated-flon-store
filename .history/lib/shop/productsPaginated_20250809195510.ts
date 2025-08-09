import { graphql } from 'lib/graphql/client';

// Optimized query - loads only essential product data with pagination
const GET_PRODUCTS_PAGINATED = `
  query getProductsPaginated($limit: Int = 12, $page: Int = 1, $sort: String, $where: JSON) {
    products(limit: $limit, page: $page, sort: $sort, where: $where) {
      count
      page
      pages
      results {
        id
        name
        slug
        price
        sale
        salePrice
        origPrice
        currency
        images(limit: 1) {
          caption
          file {
            width
            height
            url
          }
        }
        categories {
          name
          slug
        }
        # Only essential fields - no variants, options, etc.
      }
    }
  }
`;

// Cached product listing function
export const getProductsWithPagination = async (options = {}) => {
  const {
    limit = 12,        // Only load 12 products initially (like Amazon/Shopify)
    page = 1,
    sort = 'popularity',
    categorySlug,
    search
  } = options;

  const where = {};
  if (categorySlug) {
    where.categories = { slug: categorySlug };
  }
  if (search) {
    where.name = { $regex: search, $options: 'i' };
  }

  try {
    const client = getGQLClient();
    const response = await client.request(GET_PRODUCTS_PAGINATED, {
      limit,
      page,
      sort,
      where: Object.keys(where).length > 0 ? where : undefined
    });

    return {
      products: response.products.results || [],
      totalCount: response.products.count || 0,
      currentPage: response.products.page || 1,
      totalPages: response.products.pages || 1,
      hasMore: (response.products.page || 1) < (response.products.pages || 1)
    };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    return {
      products: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 1,
      hasMore: false
    };
  }
};
