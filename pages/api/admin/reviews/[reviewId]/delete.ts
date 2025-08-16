import type { NextApiRequest, NextApiResponse } from 'next';
import { validateAdminSession } from '../../../../../lib/auth/adminAuth';
import { deleteReview } from '../../../../../lib/services/reviews-server';

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

    if (method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
    }

    try {
      const deleted = deleteReview(reviewId);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Review not found' });
      }

      // Trigger revalidation of pages that might display reviews
      try {
        await res.revalidate('/'); // Homepage
        await res.revalidate('/products'); // Products page
        // You might also want to revalidate specific product pages that had this review
      } catch (err) {
        console.warn('Failed to revalidate pages after review deletion:', err);
        // Don't fail the request if revalidation fails
      }

      return res.status(200).json({ 
        message: 'Review deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ error: 'Failed to delete review' });
    }
  } catch (error) {
    console.error('Review deletion API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
