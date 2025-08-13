import type { NextApiRequest, NextApiResponse } from 'next';
import { updateReviewStatus } from 'lib/services/reviews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | string>,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json('Method Not Allowed');
  }

  const { reviewId } = req.query;
  
  if (!reviewId || typeof reviewId !== 'string') {
    return res.status(400).json('Invalid review ID');
  }

  try {
    // Update review status using our local service
    const updatedReview = updateReviewStatus(reviewId, 'approved');
    
    if (!updatedReview) {
      return res.status(404).json('Review not found');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error approving review:', error);
    return res.status(500).json('Internal Server Error');
  }
} 