import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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
    const approved = (data.reviews || []).filter((r: any) => r.product_id === productId && r.status === 'approved');

    if (!approved.length) {
      return res.status(200).json({ averageRating: 0, totalReviews: 0, ratingDistribution: { 1:0,2:0,3:0,4:0,5:0 } });
    }

    const total = approved.length;
    const sum = approved.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
    const average = Math.round((sum / total) * 10) / 10;

    const dist: Record<number, number> = { 1:0,2:0,3:0,4:0,5:0 };
    approved.forEach((r: any) => { dist[r.rating] = (dist[r.rating] || 0) + 1; });

    return res.status(200).json({ averageRating: average, totalReviews: total, ratingDistribution: dist });
  } catch (error) {
    console.error('Error fetching product review stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
