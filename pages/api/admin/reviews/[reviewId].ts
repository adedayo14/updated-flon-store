import type { NextApiRequest, NextApiResponse } from 'next';
import { validateAdminSession } from '../../../../lib/auth/adminAuth';
import { updateReviewStatus } from '../../../../lib/services/reviews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate admin authentication - extract session from cookies
    const sessionId = req.cookies['admin-session'];
    const isValidAdmin = sessionId && validateAdminSession(sessionId);
    if (!isValidAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { reviewId } = req.query;
    const { method } = req;

    if (typeof reviewId !== 'string') {
      return res.status(400).json({ error: 'Invalid review ID' });
    }

    switch (method) {
      case 'PATCH':
        try {
          const { action } = req.body;
          
          if (action === 'moderate') {
            const { status } = req.body;
            
            if (!status || (status !== 'approved' && status !== 'rejected')) {
              return res.status(400).json({ error: 'Valid status (approved/rejected) is required' });
            }

            const updatedReview = updateReviewStatus(reviewId, status);
            
            if (!updatedReview) {
              return res.status(404).json({ error: 'Review not found' });
            }

            return res.status(200).json({ 
              message: `Review ${status} successfully`,
              review: updatedReview 
            });
          }

          return res.status(400).json({ error: 'Invalid action' });
        } catch (error) {
          console.error('Error updating review:', error);
          return res.status(500).json({ error: 'Failed to update review' });
        }

      default:
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Review moderation API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
