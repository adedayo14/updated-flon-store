import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Read all reviews from JSON file
function readReviews() {
  try {
    const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');
    if (!fs.existsSync(REVIEWS_FILE)) return { reviews: [], nextId: 1 };
    const raw = fs.readFileSync(REVIEWS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read reviews:', e);
    return { reviews: [], nextId: 1 };
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { productId } = req.query;

    if (!productId || typeof productId !== 'string') {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const data = readReviews();
    const reviews = (data.reviews || []).filter((r: any) => r.product_id === productId && r.status === 'approved');

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
