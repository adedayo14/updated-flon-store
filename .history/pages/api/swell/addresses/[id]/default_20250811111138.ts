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
      // Set the specified address as default
      // First, we need to get the current account to access addresses
      const account = await swell.get('/account');
      
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }

      // Update the target address to be default (active: true)
      await swell.put(`/accounts:addresses/${id}`, {
        active: true,
      });

      // Set all other addresses to not be default (active: false)
      if (account.shipping && account.shipping.length > 0) {
        const updatePromises = account.shipping
          .filter((addr: any) => addr.id !== id)
          .map((addr: any) => 
            swell.put(`/accounts:addresses/${addr.id}`, {
              active: false,
            })
          );
        await Promise.all(updatePromises);
      }

      res.status(200).json({ message: 'Default address updated successfully' });
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error setting default address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
