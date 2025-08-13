import { NextApiRequest, NextApiResponse } from 'next';
import swell from 'swell-node';

// Initialize Swell SDK
const initSwell = () => {
  try {
    swell.init(
      process.env.SWELL_STORE_ID!,
      process.env.SWELL_SECRET_KEY!
    );
    return swell;
  } catch (error) {
    console.error('Failed to initialize Swell SDK:', error);
    return null;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const swellClient = initSwell();
    
    if (!swellClient) {
      return res.status(500).json({ error: 'Failed to initialize Swell client' });
    }

    const { type } = req.query;
    
    if (type === 'ids') {
      // Return just the product IDs
      const response = await swellClient.products.list({
        limit: 100,
        page: 1
      });
      
      const productIds = response?.results?.map((p: any) => p.id) || [];
      
      return res.status(200).json({
        productIds,
        count: productIds.length
      });
    } else {
      // Return full product information
      const response = await swellClient.products.list({
        limit: 100,
        page: 1
      });
      
      const products = response?.results || [];
      
      return res.status(200).json({
        products,
        count: products.length
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
