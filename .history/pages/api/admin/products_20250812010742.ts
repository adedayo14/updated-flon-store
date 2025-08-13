import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProducts, getAllProductIds } from 'lib/services/products';

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
    const { type } = req.query;
    
    if (type === 'ids') {
      // Return just the product IDs
      const productIds = await getAllProductIds();
      return res.status(200).json({
        productIds,
        count: productIds.length
      });
    } else {
      // Return full product information
      const products = await getAllProducts();
      return res.status(200).json({
        products,
        count: products.length
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
