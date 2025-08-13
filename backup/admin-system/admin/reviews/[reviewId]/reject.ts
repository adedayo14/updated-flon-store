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
  const { reason } = req.body;
  
  if (!reviewId || typeof reviewId !== 'string') {
    return res.status(400).json('Invalid review ID');
  }

  if (!reason || typeof reason !== 'string') {
    return res.status(400).json('Rejection reason is required');
  }

  try {
    // Update review status using local storage
    const updatedReview = updateReviewStatus(reviewId, 'rejected');
    
    if (!updatedReview) {
      return res.status(404).json('Review not found');
    }

    console.log(`Review ${reviewId} rejected with reason: ${reason}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error rejecting review:', error);
    return res.status(500).json('Internal Server Error');
  }
} 