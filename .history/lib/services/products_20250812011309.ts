// Product service for managing product data and mapping IDs to names
import { initSwell } from '../swell/swell-node';

const swell = initSwell();

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: Array<{ url: string; alt?: string }>;
}

/**
 * Get all products from the store using Swell API
 */
import { initSwell } from '../swell/swell-node';

const swell = initSwell();

export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: { url: string; alt?: string }[];
  active?: boolean;
  stock_status?: string;
  category_id?: string;
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    console.log('Fetching all products from Swell API...');
    const response = await swell.products.list({
      limit: 100,
      page: 1
    });
    
    console.log('Swell API response:', response);
    
    if (response && response.results) {
      return response.results.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        images: product.images ? product.images.map((img: any) => ({
          url: img.file?.url || img.url || '',
          alt: img.alt || product.name
        })) : [],
        active: product.active,
        stock_status: product.stock_status
      }));
    }
    
    console.warn('No products found from Swell API');
    return [];
  } catch (error) {
    console.error('Error fetching products from Swell API:', error);
    return [];
  }
}

/**
 * Get product by ID using Swell API
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    console.log(`Fetching product ${id} from Swell API...`);
    const product = await swell.products.get(id);
    
    if (product) {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        images: product.images ? product.images.map((img: any) => ({
          url: img.file?.url || img.url || '',
          alt: img.alt || product.name
        })) : [],
        active: product.active,
        stock_status: product.stock_status
      };
    }
    
    console.warn(`Product ${id} not found in Swell`);
    return null;
  } catch (error) {
    console.error(`Error fetching product ${id} from Swell API:`, error);
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
