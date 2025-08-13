import type { NextApiRequest, NextApiResponse } from 'next';
import { getPendingReviews } from 'lib/services/reviews';

// Helper function to fetch product details from Swell
async function fetchProductDetails(productId: string) {
  try {
    const response = await fetch(`https://raw-foods.swell.store/api/products/${productId}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.SWELL_STORE_ID}:${process.env.SWELL_SECRET_KEY}`).toString('base64')}`
      }
    });
    
    if (response.ok) {
      const product = await response.json();
      return {
        id: product.id,
        name: product.name || 'Unknown Product',
        image: product.images?.[0]?.file?.url
      };
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
  
  return {
    id: productId,
    name: 'Unknown Product',
    image: undefined
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json('Method Not Allowed');
  }

  try {
    // Get pending reviews using our service
    const pendingReviews = getPendingReviews();

    // Fetch product details for each review
    const adminReviews = await Promise.all(
      pendingReviews.map(async (review) => {
        const productDetails = await fetchProductDetails(review.product_id);
        
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
            is_verified_purchase: review.is_verified_purchase,
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
            name: review.user_name,
            email: `${review.user_name.toLowerCase().replace(' ', '.')}@example.com`,
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