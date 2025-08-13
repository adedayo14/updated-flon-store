import type { NextApiRequest, NextApiResponse } from 'next';
import { updateReviewStatus } from 'lib/services/reviews';
import { requireAdminAuth } from 'lib/auth/adminAuth';ort { NextApiRequest, NextApiResponse } from 'next';
import { updateReviewStatus } from 'lib/services/reviews';
import { validateAdminSession } from 'lib/auth/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reviewId } = req.query;
  const { method } = req;

  if (!reviewId || typeof reviewId !== 'string') {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Check authentication
  const sessionId = req.cookies['admin-session'];
  if (!sessionId || !validateAdminSession(sessionId)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { action } = req.body;

    if (!action || !['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Action must be either "approve" or "reject"' });
    }

    const status = action === 'approve' ? 'approved' : 'rejected';
    const updatedReview = updateReviewStatus(reviewId, status);

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    return res.status(200).json({
      success: true,
      review: updatedReview,
      message: `Review ${action}d successfully`
    });
  } catch (error) {
    console.error('Error moderating review:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 