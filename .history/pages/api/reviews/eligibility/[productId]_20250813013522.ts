import { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { getAllReviews } from '../../../../lib/services/reviews';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check user authentication
    const client = getClientWithSessionToken(req.cookies);
    
    let accountId = '';
    let loggedIn = false;
    
    try {
      const { data: sessionData } = await client.checkTokenValidity();
      accountId = sessionData?.session?.accountId || '';
      loggedIn = !!accountId;
    } catch (e) {
      loggedIn = false;
    }

    // If not logged in, return false for everything
    if (!loggedIn) {
      return res.status(200).json({
        loggedIn: false,
        hasPurchased: false,
        canReview: false
      });
    }

    // Check if user has purchased this product
    let hasPurchased = false;
    try {
      const { data: ordersData } = await client.getOrders();
      const orders = ordersData?.orders?.results || [];
      for (const order of orders) {
        const items = order?.items || [];
        const has = items.some((it: any) => it?.product?.id === productId);
        if (has) {
          hasPurchased = true;
          break;
        }
      }
    } catch (e) {
      console.warn('eligibility: getOrders failed');
      hasPurchased = false;
    }

    // Check if user has already reviewed this product
    let hasAlreadyReviewed = false;
    try {
      const allReviews = getAllReviews();
      hasAlreadyReviewed = allReviews.some(
        review => review.product_id === productId && review.user_id === accountId
      );
    } catch (e) {
      console.warn('eligibility: check existing reviews failed');
    }

    const canReview = loggedIn && hasPurchased && !hasAlreadyReviewed;

    return res.status(200).json({
      loggedIn,
      hasPurchased,
      canReview
    });
  } catch (error) {
    console.error('Error checking review eligibility:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
