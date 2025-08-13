import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { validateAdminSession } from 'lib/auth/adminAuth';

// Helper function to fetch product details (safe placeholder, no network)
async function fetchProductDetails(productId: string) {
  return {
    id: productId,
    name: 'Unknown Product',
    image: undefined,
  };
}

// Direct function to read reviews from JSON file
function getPendingReviews() {
  try {
    const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');
    const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
    const parsedData = JSON.parse(data);
    const allReviews = parsedData.reviews || [];
    return allReviews.filter((review: any) => review.status === 'pending');
  } catch (error) {
    console.error('Error reading reviews:', error);
    return [];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json('Method Not Allowed');
  }

  // Require valid admin session
  const sessionId = req.cookies['admin-session'];
  const isValidAdmin = sessionId && validateAdminSession(sessionId);
  if (!isValidAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get pending reviews using direct file reading
    const pendingReviews = getPendingReviews();

    // Fetch product details for each review (safe)
    const adminReviews = await Promise.all(
      pendingReviews.map(async (review: any) => {
        const productDetails = await fetchProductDetails(review.product_id);
        const userName = typeof review.user_name === 'string' && review.user_name ? review.user_name : 'User';
        const email = userName ? `${userName.toLowerCase().replace(/\s+/g, '.')}` + '@example.com' : '';
        
        return {
          review: {
            id: review.id,
            product_id: review.product_id,
            user_id: review.user_id,
            order_id: null,
            rating: review.rating,
            title: review.title,
            review_body: review.review_body,
            is_approved: review.status === 'approved',
            is_verified_purchase: !!review.is_verified_purchase,
            helpful_count: review.helpful_count || 0,
            reported_count: 0,
            created_at: review.created_at,
            updated_at: review.updated_at,
            approved_at: review.status === 'approved' ? review.updated_at : null,
            approved_by: null,
            status: review.status,
            images: review.images || [],
            interactions: [],
          },
          product: productDetails,
          user: {
            id: review.user_id,
            name: userName,
            email,
            review_count: 1,
          },
          order: {
            id: 'mock-order-id',
            date: review.created_at,
            total: 0,
          },
        };
      })
    );

    return res.status(200).json({
      reviews: adminReviews,
      total: adminReviews.length,
    });
  } catch (error) {
    console.error('Error fetching pending reviews:', error);
    return res.status(500).json('Internal Server Error');
  }
}