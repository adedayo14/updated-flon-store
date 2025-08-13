import { NextApiRequest, NextApiResponse } from 'next';
import { validateAdminSession } from '../../../lib/auth/admin-auth';
import { 
  getAllReviews, 
  approveReview, 
  rejectReview, 
  deleteReview 
} from '../../../lib/services/reviews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate admin authentication
    const isValidAdmin = await validateAdminSession(req);
    if (!isValidAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { method } = req;

    switch (method) {
      case 'GET':
        try {
          const reviews = await getAllReviews();
          return res.status(200).json(reviews);
        } catch (error) {
          console.error('Error fetching reviews:', error);
          return res.status(500).json({ error: 'Failed to fetch reviews' });
        }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Reviews API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
