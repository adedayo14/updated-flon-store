import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const productId = String(req.query.productId || '');
  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }

  try {
    const client = getClientWithSessionToken(req.cookies);

    // Validate session/account
    const { data: sessionData } = await client.checkTokenValidity();
    const accountId = sessionData?.session?.accountId || '';

    if (!accountId) {
      return res.status(200).json({ loggedIn: false, hasPurchased: false, canReview: false });
    }

    // Check orders for product purchase
    let hasPurchased = false;
    try {
      const { data: ordersData } = await client.getOrders();
      const orders = ordersData?.orders?.results || [];
      for (const order of orders) {
        const items = order?.items || [];
        if (items.some((it: any) => it?.product?.id === productId)) {
          hasPurchased = true;
          break;
        }
      }
    } catch (e) {
      // If orders fetch fails, assume not purchased
      hasPurchased = false;
    }

    return res.status(200).json({ loggedIn: true, hasPurchased, canReview: hasPurchased });
  } catch (error) {
    console.error('Eligibility check error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
