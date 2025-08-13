import { NextApiRequest, NextApiResponse } from 'next';
import { getProductReviews } from 'lib/services/reviews';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { productId } = req.query;

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    console.log('API: Fetching reviews for productId:', productId);
    
    // First try exact match
    let reviews = await getProductReviews(productId);
    console.log('API: Reviews found for exact match:', reviews.length);
    
    // If no reviews found, try some common patterns
    if (reviews.length === 0) {
      // Try with slug patterns that might match
      const alternativeIds = [
        'silk-dental-floss-refill',
        productId.toLowerCase(),
        productId.replace(/\s+/g, '-').toLowerCase(),
      ];
      
      for (const altId of alternativeIds) {
        if (altId !== productId) {
          console.log('API: Trying alternative ID:', altId);
          reviews = await getProductReviews(altId);
          if (reviews.length > 0) {
            console.log('API: Found reviews with alternative ID:', altId, reviews.length);
            break;
          }
        }
      }
    }

    if (reviews.length === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalReviews: 0,
        productId,
      });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    console.log('API: Returning rating data:', {
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      productId,
    });

    res.status(200).json({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      productId,
    });
  } catch (error) {
    console.error('API: Error fetching product reviews:', error);
    res.status(500).json({ 
      message: 'Error fetching product reviews',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
