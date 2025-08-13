import { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { initSwell } from 'lib/swell/swell-node';
import fs from 'fs';
import path from 'path';

// Local storage for reviews
const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

const ensureReviewsFile = () => {
  const dir = path.dirname(REVIEWS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify({ reviews: [] }));
  }
};

const readReviews = (): any[] => {
  ensureReviewsFile();
  const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
  return JSON.parse(data).reviews || [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId } = req.query;

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Get user information from session
    let userId: string;
    
    try {
      const client = getClientWithSessionToken(req.cookies);
      
      // Check if user is authenticated
      const sessionResponse = await client.checkTokenValidity();
      
      if (!sessionResponse.data.session?.accountId) {
        // User is not authenticated
        return res.status(200).json({
          canReview: false,
          reason: 'User not authenticated',
          hasPurchased: false,
          hasReviewed: false
        });
      } else {
        userId = sessionResponse.data.session.accountId;
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
      return res.status(200).json({
        canReview: false,
        reason: 'User not authenticated',
        hasPurchased: false,
        hasReviewed: false
      });
    }

    // Check if user has purchased this product
    let hasPurchased = false;
    
    try {
      // Use Swell API to check order history
      const swell = require('swell-node');
      swell.init(
        process.env.SWELL_STORE_ID ?? '',
        process.env.SWELL_SECRET_KEY ?? ''
      );
      
      // Get user's orders
      const orders = await swell.orders.list({
        account_id: userId,
        status: 'complete'
      });
      
      if (orders && orders.results) {
        // Check if any order contains this product
        hasPurchased = orders.results.some(order => 
          order.items && order.items.some(item => 
            item.product_id === productId
          )
        );
      }
      
      console.log(`Purchase verification for user ${userId}, product ${productId}: ${hasPurchased}`);
    } catch (error) {
      console.error('Error checking purchase history:', error);
      // If there's an error checking purchases, don't allow reviews to be safe
      hasPurchased = false;
    }
    
    // Check if user has already reviewed this product using local storage
    let hasReviewed = false;
    try {
      const reviews = readReviews();
      const existingReview = reviews.find(review => 
        review.product_id === productId && review.user_id === userId
      );
      
      if (existingReview) {
        hasReviewed = true;
      }
    } catch (error) {
      console.error('Error checking existing reviews:', error);
      // Continue with hasReviewed = false if there's an error
    }

    // Determine if user can review
    let canReview = hasPurchased && !hasReviewed;
    let reason = undefined;

    if (!hasPurchased) {
      reason = 'You must purchase this product to leave a review';
    } else if (hasReviewed) {
      reason = 'You have already reviewed this product';
    }

    return res.status(200).json({
      canReview,
      reason,
      hasPurchased,
      hasReviewed
    });

  } catch (error) {
    console.error('Can-review API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 