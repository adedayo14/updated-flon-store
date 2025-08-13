import type { NextApiRequest, NextApiResponse } from 'next';
import { getApprovedReviews } from 'lib/services/reviews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId } = req.query;

  if (!productId || Array.isArray(productId)) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    const reviews = await getApprovedReviews(productId);
    
    if (reviews.length === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    res.status(200).json({
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ error: 'Failed to fetch average rating' });
  }
}
