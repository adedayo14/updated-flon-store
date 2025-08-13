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

    // Check if user has purchased this product and get eligible orders
    let hasPurchased = false;
    const eligibleOrders: Array<{id: string, date: string}> = [];
    
    try {
      const { data: ordersData } = await client.getOrders();
      const orders = ordersData?.orders?.results || [];
      
      for (const order of orders) {
        if (!order) continue;
        
        const items = order?.items || [];
        const hasProduct = items.some((it: any) => it?.product?.id === productId);
        if (hasProduct) {
          hasPurchased = true;
          eligibleOrders.push({
            id: order.id || order.number || '',
            date: order.dateCreated || ''
          });
        }
      }
    } catch (e) {
      console.warn('eligibility: getOrders failed');
      hasPurchased = false;
    }

    // Check which orders already have reviews
    const reviewedOrderIds: string[] = [];
    try {
      const allReviews = getAllReviews();
      const reviewsWithOrders = allReviews.filter(review => 
        review.product_id === productId && 
        review.user_id === accountId &&
        (review as any).order_id // Cast to access the new field
      );
      
      for (const review of reviewsWithOrders) {
        const orderId = (review as any).order_id;
        if (orderId) {
          reviewedOrderIds.push(orderId);
        }
      }
    } catch (e) {
      console.warn('eligibility: check existing reviews failed');
    }

    // Filter out orders that already have reviews
    const unreviewed_orders = eligibleOrders.filter(
      order => !reviewedOrderIds.includes(order.id)
    );

    const canReview = loggedIn && hasPurchased && unreviewed_orders.length > 0;

    return res.status(200).json({
      loggedIn,
      hasPurchased,
      canReview,
      eligible_orders: unreviewed_orders, // Orders that can be reviewed
      total_orders: eligibleOrders.length,
      reviewed_orders: reviewedOrderIds.length
    });
  } catch (error) {
    console.error('Error checking review eligibility:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
