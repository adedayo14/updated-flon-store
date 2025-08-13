import type { NextApiRequest, NextApiResponse } from 'next';
import { markReviewHelpful } from 'lib/services/reviews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; error?: string; helpful_count?: number } | string>,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json('Method Not Allowed');
  }

  const { reviewId } = req.query;
  
  if (!reviewId || typeof reviewId !== 'string') {
    return res.status(400).json('Invalid review ID');
  }

  try {
    const result = markReviewHelpful(reviewId);
    if (!result.success) {
      return res.status(404).json({ success: false, error: result.error || 'Not found' });
    }
    return res.status(200).json({ success: true, helpful_count: result.helpful_count });
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    return res.status(500).json('Internal Server Error');
  }
}