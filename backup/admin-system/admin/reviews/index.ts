import { NextApiRequest, NextApiResponse } from 'next';
import { getAllReviews, getPendingReviews } from 'lib/services/reviews';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { status } = req.query;
    
    let reviews;
    if (status === 'pending') {
      reviews = getPendingReviews();
    } else {
      reviews = getAllReviews();
    }

    return res.status(200).json({
      reviews,
      count: reviews.length
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 