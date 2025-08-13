import type { NextApiRequest, NextApiResponse } from 'next';
import { createReview } from 'lib/services/reviews';
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
    const { productId, rating, title, body, images } = req.body || {};

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

    // Identify user via session
    const client = getClientWithSessionToken(req.cookies);
    const { data: accountData } = await client.getAccountDetails();
    const account = accountData?.account;

    if (!account?.id) {
      return res.status(401).json({ error: 'You must be signed in to submit a review' });
    }

    // Verify purchase for this product
    let isVerified = false;
    try {
      const { data: ordersData } = await client.getOrders();
      const orders = ordersData?.orders?.results || [];
      for (const order of orders) {
        const items = order?.items || [];
        const has = items.some((it: any) => it?.product?.id === productId);
        if (has) {
          isVerified = true;
          break;
        }
      }
    } catch (e) {
      // If orders fetch fails, default to not verified
      isVerified = false;
    }

    const userName = [account.firstName, account.lastName].filter(Boolean).join(' ') || account.email || 'Customer';

    const newReview = createReview({
      product_id: productId,
      user_id: account.id as string,
      user_name: userName,
      rating: numericRating,
      title,
      review_body: body,
      status: 'pending',
      is_verified_purchase: !!isVerified,
      images: Array.isArray(images) ? images.filter((u: any) => typeof u === 'string') : undefined,
    });

    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
