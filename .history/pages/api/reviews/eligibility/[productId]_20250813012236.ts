import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // For now, return mock eligibility data
    // In a real app, this would check if user is logged in, has purchased the product, etc.
    const eligibility = {
      loggedIn: false, // Set to true if you want to test the "Write Review" button
      hasPurchased: false, // Set to true if user has purchased this product
      canReview: false // This would be true if loggedIn && hasPurchased && hasn't already reviewed
    };

    return res.status(200).json(eligibility);
  } catch (error) {
    console.error('Error checking review eligibility:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
