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
      // We need to get the account ID first, let's use the session or get it from the request body
      const { accountId } = req.body;
      
      if (!accountId) {
        return res.status(400).json({ error: 'Account ID is required' });
      }

      // Set the specified address as default by updating the account's shipping address
      const updatedAccount = await swell.put(`/accounts/${accountId}`, {
        $set: {
          'shipping.account_address_id': id,
        },
      });

      if (updatedAccount) {
        res.status(200).json({ 
          message: 'Default address updated successfully',
          account: updatedAccount 
        });
      } else {
        res.status(400).json({ error: 'Failed to update default address' });
      }
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error setting default address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
