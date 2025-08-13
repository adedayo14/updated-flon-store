import { NextApiRequest, NextApiResponse } from 'next';
import { getProductReviews } from '../../lib/services/reviews';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reviews = getProductReviews('6899ddfca959c6001142af63');
    return res.status(200).json({ 
      success: true, 
      reviewCount: reviews.length,
      reviews: reviews
    });
  } catch (error) {
    console.error('Test error:', error);
    return res.status(500).json({ error: error.message });
  }
}
