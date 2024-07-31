import type { NextApiRequest, NextApiResponse } from 'next';
import { initSwell } from 'lib/swell/swell-node';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const swell = initSwell();

    if (req.method === 'GET') {
      const address = await swell.get(`/accounts:subscription/${id}`);
      res.status(200).json(address);
    } else if (req.method === 'PUT') {
      const { product_id, recurring, options, quantity, price } = req.body;
      const payload = {
        '0': {
          id,
          recurring,
          product_id,
          options,
          quantity,
          price,
        },
      };
      const updatedSubscription = await swell.put(
        `/data/subscriptions/${id}/items`,
        payload,
      );
      res.status(200).json(updatedSubscription);
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
