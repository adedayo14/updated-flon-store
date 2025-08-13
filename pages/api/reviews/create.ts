import type { NextApiRequest, NextApiResponse } from 'next';
// Ensure we import the TS module explicitly (avoid lib/services/reviews.js shadowing)
import { createReview } from 'lib/services/reviews-server';
import { getClientWithSessionToken } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId, rating, title, body, images, orderId } = req.body || {};

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'productId is required' });
    }
    const numericRating = Number(rating);
    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ error: 'rating must be a number between 1 and 5' });
    }
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' });
    }
    if (!body || typeof body !== 'string') {
      return res.status(400).json({ error: 'body is required' });
    }
    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({ error: 'orderId is required for subscription products' });
    }

    // Identify user via session
    const client = getClientWithSessionToken(req.cookies);

    // First, check session for accountId
    let accountId = '';
    try {
      const { data: sessionData } = await client.checkTokenValidity();
      accountId = sessionData?.session?.accountId || '';
    } catch (e) {
      console.error('createReview: session validation failed', e);
      return res.status(401).json({ error: 'You must be signed in to submit a review' });
    }

    if (!accountId) {
      return res.status(401).json({ error: 'You must be signed in to submit a review' });
    }

    // Then, get account details (name/email)
    let account: { name?: string; email?: string } = { name: '', email: '' };
    try {
      const { data: accountData } = await client.getAccountDetails();
      const acc = accountData?.account;
      account = { name: acc?.name ?? '', email: acc?.email ?? '' };
    } catch (e) {
      console.warn('createReview: getAccountDetails failed, proceeding with defaults');
    }

    // Verify purchase for this specific order and product
    let isVerified = false;
    let orderFound = false;
    
    try {
      const { data: ordersData } = await client.getOrders();
      const orders = ordersData?.orders?.results || [];
      
      for (const order of orders) {
        if (!order) continue;
        
        // Check if this is the specific order we're reviewing
        const orderMatches = order.id === orderId || order.number === orderId;
        if (!orderMatches) continue;
        
        orderFound = true;
        
        // Check if this order contains the product
        const items = order?.items || [];
        const hasProduct = items.some((it: any) => it?.product?.id === productId);
        if (hasProduct) {
          isVerified = true;
          break;
        }
      }
    } catch (e) {
      console.warn('createReview: getOrders failed, marking as not verified');
      isVerified = false;
    }

    // Ensure the order exists and contains the product
    if (!orderFound) {
      return res.status(400).json({ error: 'Order not found or does not belong to this account' });
    }
    
    if (!isVerified) {
      return res.status(400).json({ error: 'This order does not contain the specified product' });
    }

    const userName = (account.name && account.name.trim()) || account.email || 'Customer';

    const newReview = createReview({
      product_id: productId,
      user_id: String(accountId),
      user_name: userName,
      rating: numericRating,
      title,
      review_body: body,
      status: 'pending',
      is_verified_purchase: !!isVerified,
      images: Array.isArray(images) ? images.filter((u: any) => typeof u === 'string') : undefined,
      order_id: orderId, // Associate review with specific order
    });

    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
