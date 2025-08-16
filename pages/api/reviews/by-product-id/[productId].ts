import type { NextApiRequest, NextApiResponse } from 'next';
import { getProductReviews } from '../../../../lib/services/reviews';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const reviews = getProductReviews(productId);
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
