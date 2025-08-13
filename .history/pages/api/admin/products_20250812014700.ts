import { NextApiRequest, NextApiResponse } from 'next';

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
    const storeUrl = process.env.NEXT_PUBLIC_SWELL_STORE_URL;
    const publicKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;
    
    if (!storeUrl || !publicKey) {
      return res.status(500).json({ error: 'Missing Swell environment variables' });
    }
    
    // Simple REST API call to Swell
    const response = await fetch(`${storeUrl}/api/products?limit=100`, {
      headers: {
        'Authorization': publicKey,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Swell API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const products = data.results || [];

    const { type } = req.query;
    
    if (type === 'ids') {
      // Return just the product IDs
      const productIds = products.map((p: any) => p.id);
      
      return res.status(200).json({
        productIds,
        count: productIds.length
      });
    } else {
      // Return full product information
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
