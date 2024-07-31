import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { id, itemId, quantity } = req.body;

  if (!id || !itemId || !quantity) {
    return res.status(400).end('Bad Request');
  }

  try {
    const client = getClientWithSessionToken(req.cookies);

    const {
      data: { addSubscriptionItem },
    } = await client.addSubscriptionItem({
      id,
      itemId,
      quantity,
    });

    if (addSubscriptionItem == null) {
      return res.status(500).end('Internal Server Error');
    }

    return res.status(200).send(JSON.stringify({ added: true }));
  } catch (error) {
    return res.status(500).end('Internal Server Error');
  }
}
