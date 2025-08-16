import type { NextApiRequest, NextApiResponse } from 'next';
import swell from 'swell-node';

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
    const storeId = process.env.SWELL_STORE_ID;
    const secretKey = process.env.SWELL_SECRET_KEY;
    
    if (!storeId || !secretKey) {
      return res.status(500).json({ error: 'Missing Swell environment variables' });
    }
    
    // Initialize Swell directly
    swell.init(storeId, secretKey);

    const { type } = req.query;
    
    if (type === 'ids') {
      // Return just the product IDs
      const response = await swell.products.list({
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
      const response = await swell.products.list({
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
