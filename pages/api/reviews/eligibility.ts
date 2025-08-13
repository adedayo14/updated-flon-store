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
      
      // Debug: Log the data structure
      console.log('Debug - Orders data:', JSON.stringify(ordersData, null, 2));
      console.log('Debug - Looking for productId:', productId);
      
      for (const order of orders) {
        const items = order?.items || [];
        console.log('Debug - Order items:', JSON.stringify(items, null, 2));
        
        for (const item of items) {
          console.log('Debug - Item product ID:', item?.product?.id, 'vs target:', productId);
          if (item?.product?.id === productId) {
            hasPurchased = true;
            console.log('Debug - Match found!');
            break;
          }
        }
        if (hasPurchased) break;
      }
      
      console.log('Debug - Final hasPurchased:', hasPurchased);
    } catch (e) {
      console.error('Debug - Orders fetch error:', e);
      // If orders fetch fails, assume not purchased
      hasPurchased = false;
    }

    return res.status(200).json({ loggedIn: true, hasPurchased, canReview: hasPurchased });
  } catch (error) {
    console.error('Eligibility check error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
