import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | string>,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json('Method Not Allowed');
  }

  const { reviewId } = req.query;
  const { reason } = req.body;
  
  if (!reviewId || typeof reviewId !== 'string') {
    return res.status(400).json('Invalid review ID');
  }

  if (!reason || typeof reason !== 'string') {
    return res.status(400).json('Report reason is required');
  }

  try {
    // For now, just return success since we're using local storage
    // In a real implementation, you would update the local storage
    console.log(`Review ${reviewId} reported with reason: ${reason}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error reporting review:', error);
    return res.status(500).json('Internal Server Error');
  }
} 