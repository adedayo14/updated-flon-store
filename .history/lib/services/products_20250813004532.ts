// Product service for managing product data and mapping IDs to names
import swell from 'swell-node';

// Initialize Swell SDK
const initializeSwell = () => {
  try {
    if (!process.env.SWELL_STORE_ID || !process.env.SWELL_SECRET_KEY) {
      console.error('Missing Swell environment variables:', {
        SWELL_STORE_ID: !!process.env.SWELL_STORE_ID,
        SWELL_SECRET_KEY: !!process.env.SWELL_SECRET_KEY
      });
      return null;
    }

    swell.init(
      process.env.SWELL_STORE_ID,
      process.env.SWELL_SECRET_KEY
    );
    
    console.log('Swell SDK initialized successfully');
    return swell;
  } catch (error) {
    console.error('Failed to initialize Swell SDK:', error);
    return null;
  }
};

const swellClient = initializeSwell();

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: Array<{ 
    id: string;
    file: {
      id: string;
      url: string;
      filename: string;
      content_type: string;
      width: number;
      height: number;
    };
  }>;
  active?: boolean;
  stock_status?: string | null;
  stock_level?: number;
  type?: string;
  sku?: string | null;
  sale?: boolean;
  sale_price?: number | null;
  stock_tracking?: boolean;
  date_created?: string;
  date_updated?: string;
  category_index?: {
    id: string[];
    sort: Record<string, number>;
  };
  meta_title?: string | null;
  meta_description?: string | null;
  tags?: string[];
  up_sells?: Array<{ id: string; product_id: string }>;
  cross_sells?: Array<{ 
    id: string; 
    product_id: string;
    discount_type?: string;
    discount_amount?: number;
  }>;
  purchase_options?: {
    standard?: {
      active: boolean;
      price: number;
      sale: boolean;
      sale_price: number | null;
    };
    subscription?: {
      active: boolean;
      plans: Array<{
        id: string;
        name: string;
        price: number;
        billing_schedule: {
          interval: string;
          interval_count: number;
          limit: number | null;
          trial_days: number;
        };
      }>;
    };
  };
}

/**
 * Get all products from the store using Swell API
 */

export async function getAllProducts(): Promise<Product[]> {
  try {
    console.log('Fetching all products from Swell API...');
    
    if (!swellClient) {
      console.error('Swell client not initialized');
      return [];
    }

    const response = await swellClient.get('/products', {
      where: { active: true },
      limit: 100,
      page: 1
    });
    
    console.log('Swell API response:', response);
    
    if (response && response.results && Array.isArray(response.results)) {
      console.log(`Found ${response.results.length} products from Swell API`);
      return response.results.map((product: any): Product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        currency: product.currency,
        images: product.images || [],
        active: product.active,
        stock_status: product.stock_status,
        stock_level: product.stock_level,
        type: product.type,
        sku: product.sku,
        sale: product.sale,
        sale_price: product.sale_price,
        stock_tracking: product.stock_tracking,
        date_created: product.date_created,
        date_updated: product.date_updated,
        category_index: product.category_index,
        meta_title: product.meta_title,
        meta_description: product.meta_description,
        tags: product.tags || [],
        up_sells: product.up_sells || [],
        cross_sells: product.cross_sells || [],
        purchase_options: product.purchase_options
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
    
    if (!swellClient) {
      console.error('Swell client not initialized');
      return null;
    }

    const product = await swellClient.products.get(id);
    
    if (product) {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        currency: product.currency,
        images: product.images || [],
        active: product.active,
        stock_status: product.stock_status,
        stock_level: product.stock_level,
        type: product.type,
        sku: product.sku,
        sale: product.sale,
        sale_price: product.sale_price,
        stock_tracking: product.stock_tracking,
        date_created: product.date_created,
        date_updated: product.date_updated,
        category_index: product.category_index,
        meta_title: product.meta_title,
        meta_description: product.meta_description,
        tags: product.tags || [],
        up_sells: product.up_sells || [],
        cross_sells: product.cross_sells || [],
        purchase_options: product.purchase_options
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
