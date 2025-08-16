import type { NextApiRequest, NextApiResponse } from 'next';
import * as reviewsService from '../../lib/services/reviews';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Available functions:', Object.keys(reviewsService));
    const reviews = (reviewsService as any).getProductReviews?.('6899ddfca959c6001142af63') || [];
    return res.status(200).json({ 
      success: true, 
      reviewCount: reviews.length,
      reviews
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return res.status(500).json({ error: error.message });
  }
}
