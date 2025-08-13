// Product service for managing product data and mapping IDs to names
import getGQLClient from 'lib/graphql/client';

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: Array<{ url: string; alt?: string }>;
}

// Mock product data for development - replace with real Swell data later
const mockProducts: Product[] = [
  {
    id: '6691a9fd1034680012078368',
    name: 'Eco-Friendly Silk Dental Floss',
    slug: 'eco-friendly-silk-dental-floss',
    description: 'Premium natural silk dental floss that\'s biodegradable and gentle on gums',
    price: 12.99,
    currency: 'USD'
  },
  {
    id: '6691a9fd1034680012078369',
    name: 'Bamboo Toothbrush Set',
    slug: 'bamboo-toothbrush-set',
    description: 'Set of 4 biodegradable bamboo toothbrushes',
    price: 24.99,
    currency: 'USD'
  },
  {
    id: '6691a9fd1034680012078370',
    name: 'Natural Whitening Toothpaste',
    slug: 'natural-whitening-toothpaste',
    description: 'Fluoride-free whitening toothpaste with charcoal',
    price: 8.99,
    currency: 'USD'
  }
];

/**
 * Get all products from the store
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const client = getGQLClient();
    
    // Try to get products from Swell
    const response = await client.getAllProducts();
    const swellProducts = response?.data?.products?.results || [];
    
    if (swellProducts.length > 0) {
      return swellProducts.map((product: any) => ({
        id: product?.id || '',
        name: product?.name || 'Unknown Product',
        slug: product?.slug || '',
        description: product?.description || '',
        price: product?.price || 0,
        currency: product?.currency || 'USD',
        images: product?.images?.map((img: any) => ({
          url: img?.file?.url || '',
          alt: img?.caption || product?.name || 'Product Image'
        })) || []
      }));
    }
  } catch (error) {
    console.log('Swell products not available, using mock data');
  }
  
  // Fallback to mock data
  return mockProducts;
}

/**
 * Get product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const client = getGQLClient();
    
    // Try to get from Swell first
    try {
      const response = await client.getProduct({ id: productId });
      const product = response?.data?.product;
      
      if (product) {
        const productData = product as any;
        return {
          id: productData?.id || '',
          name: productData?.name || 'Unknown Product',
          slug: productData?.slug || '',
          description: productData?.description || '',
          price: productData?.price || 0,
          currency: productData?.currency || 'USD',
          images: productData?.images?.map((img: any) => ({
            url: img?.file?.url || '',
            alt: img?.caption || productData?.name || 'Product Image'
          })) || []
        };
      }
    } catch (swellError) {
      // Continue to mock data fallback
    }
    
    // Fallback to mock data
    const mockProduct = mockProducts.find(p => p.id === productId);
    return mockProduct || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Get product name by ID (utility function)
 */
export async function getProductNameById(productId: string): Promise<string> {
  const product = await getProductById(productId);
  return product?.name || `Product ${productId}`;
}

/**
 * Get all product IDs in the system
 */
export async function getAllProductIds(): Promise<string[]> {
  const products = await getAllProducts();
  return products.map(p => p.id);
}

/**
 * Create a product ID to name mapping for efficient lookups
 */
export async function getProductNameMapping(): Promise<Map<string, string>> {
  const products = await getAllProducts();
  const mapping = new Map<string, string>();
  
  products.forEach(product => {
    mapping.set(product.id, product.name);
  });
  
  return mapping;
}

/**
 * Get multiple products by their IDs
 */
export async function getProductsByIds(productIds: string[]): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter(product => productIds.includes(product.id));
}
