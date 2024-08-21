import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { id, variantId, quantity, interval } = req.body;

  // Adjust the check to exclude `variantId`
  if (!id || !quantity || !interval) {
    return res.status(400).end('Bad Request');
  }

  try {
    const client = getClientWithSessionToken(req.cookies);

    const {
      data: { updateSubscription },
    } = await client.replaceSubscriptionProductDetails({
      id,
      variantId: variantId !== undefined ? variantId : null, // Set variantId to null if undefined
      qty: quantity,
      interval: 'monthly',
      intervalCount: interval,
    });

    if (updateSubscription == null) {
      return res.status(500).end('Internal Server Error');
    }

    return res.status(200).send(JSON.stringify({ updated: true }));
  } catch (error) {
    return res.status(500).end('Internal Server Error');
  }
}
