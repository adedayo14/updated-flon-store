import type { NextApiRequest, NextApiResponse } from 'next';
import { initSwell } from 'lib/swell/swell-node';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const swell = initSwell();

    if (req.method === 'PUT') {
      // Set the specified card as default
      const updatedCard = await swell.put(`/accounts:cards/${id}`, {
        active: true,
      });
      
      res.status(200).json({ card: updatedCard, message: 'Card set as default successfully' });
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error setting default card:', error);
    res.status(500).json({ error: 'Failed to set default card' });
  }
}
