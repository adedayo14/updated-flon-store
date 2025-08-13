import { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';
import fs from 'fs';
import path from 'path';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title: string;
  review_body: string;
  status: 'pending' | 'approved' | 'rejected';
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
  helpful_count: number;
  images?: string[];
}

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

const readReviews = (): Review[] => {
  ensureReviewsFile();
  const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
  return JSON.parse(data).reviews || [];
};

const writeReviews = (reviews: Review[]) => {
  ensureReviewsFile();
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify({ reviews }, null, 2));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;
  const { method } = req;

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    switch (method) {
      case 'GET': {
        // Get reviews for a product from local storage
        const { search, rating: ratingFilter, sort_by, page = '1', limit = '10' } = req.query;
        
        try {
          // Get reviews from local storage
          let reviews = readReviews().filter(review => review.product_id === productId && review.status === 'approved');

          // Apply search filter
          if (search && typeof search === 'string') {
            const searchLower = search.toLowerCase();
            reviews = reviews.filter(review => 
              review.title.toLowerCase().includes(searchLower) ||
              review.review_body.toLowerCase().includes(searchLower) ||
              review.user_name.toLowerCase().includes(searchLower)
            );
          }
          
          // Apply rating filter
          if (ratingFilter && typeof ratingFilter === 'string') {
            const ratingNum = parseInt(ratingFilter);
            if (!isNaN(ratingNum)) {
              reviews = reviews.filter(review => review.rating === ratingNum);
            }
          }
          
          // Apply sorting
          if (sort_by && typeof sort_by === 'string') {
            switch (sort_by) {
              case 'rating_high':
                reviews.sort((a, b) => b.rating - a.rating);
                break;
              case 'rating_low':
                reviews.sort((a, b) => a.rating - b.rating);
                break;
              case 'recent':
              default:
                reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            }
          } else {
            // Default to most recent
            reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          }

          // Calculate stats
          const stats = {
            average_rating: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
            total_reviews: reviews.length,
            rating_distribution: reviews.reduce((acc, r) => {
              acc[r.rating] = (acc[r.rating] || 0) + 1;
              return acc;
            }, {} as { [key: number]: number }),
            verified_purchase_percentage: reviews.length > 0 
              ? (reviews.filter(r => r.is_verified_purchase).length / reviews.length) * 100 
              : 0,
            recent_reviews_count: reviews.filter(r => {
              const reviewDate = new Date(r.created_at);
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              return reviewDate > thirtyDaysAgo;
            }).length
          };
          
          return res.status(200).json({
            reviews,
            summary: stats,
            pagination: {
              page: parseInt(page as string) || 1,
              limit: parseInt(limit as string) || 10,
              total_pages: Math.ceil(reviews.length / (parseInt(limit as string) || 10)),
              total_count: reviews.length
            }
          });

        } catch (error) {
          console.error('Error fetching reviews:', error);
          // Return empty results if there's an error
          return res.status(200).json({
            reviews: [],
            summary: {
              average_rating: 0,
              total_reviews: 0,
              rating_distribution: {},
              verified_purchase_percentage: 0,
              recent_reviews_count: 0
            },
            pagination: {
              page: parseInt(page as string) || 1,
              limit: parseInt(limit as string) || 10,
              total_pages: 0,
              total_count: 0
            }
          });
        }
      }

      case 'POST': {
        // Create a new review
        const { 
          rating, 
          title, 
          review_body
        } = req.body;

        // Validate required fields
        if (!rating || !title || !review_body) {
          return res.status(400).json({ 
            error: 'Missing required fields: rating, title, review_body' 
          });
        }

        if (rating < 1 || rating > 5) {
          return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        if (title.length < 3 || title.length > 255) {
          return res.status(400).json({ error: 'Title must be between 3 and 255 characters' });
        }

        if (review_body.length < 10 || review_body.length > 2000) {
          return res.status(400).json({ error: 'Review body must be between 10 and 2000 characters' });
        }

        // Get user information from session
        let userId: string;
        let userName: string;
        
        try {
          const client = getClientWithSessionToken(req.cookies);
          
          // First check if user is authenticated
          const sessionResponse = await client.checkTokenValidity();
          
          if (!sessionResponse.data.session?.accountId) {
            // User is not authenticated
            return res.status(401).json({ error: 'User not authenticated' });
          } else {
            userId = sessionResponse.data.session.accountId;
            
            // Get account details to extract user name
            const accountResponse = await client.getAccountDetails();
            const account = accountResponse.data.account;
            
            if (account) {
              // Use firstName and lastName if available
              if (account.firstName && account.lastName) {
                userName = `${account.firstName} ${account.lastName}`;
              } else if (account.firstName) {
                userName = account.firstName;
              } else if (account.email) {
                // Extract username from email (part before @)
                userName = account.email.split('@')[0];
              } else {
                userName = 'User';
              }
            } else {
              // If no account data is available, use a generic name
              userName = 'User';
            }
          }
        } catch (authError) {
          console.error('Authentication error:', authError);
          return res.status(401).json({ error: 'User not authenticated' });
        }

        // For testing purposes, allow reviews without purchase verification
        // In production, you would check if user has purchased the product
        const isVerifiedPurchase = true; // Temporarily set to true for testing

        // Create review in local storage
        try {
          const allReviews = readReviews();
          const newReview: Review = {
            id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            product_id: productId,
            user_id: userId,
            user_name: userName,
            rating,
            title,
            review_body,
            status: 'pending', // All new reviews start as pending for moderation
            is_verified_purchase: isVerifiedPurchase,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            helpful_count: 0,
            images: []
          };

          allReviews.push(newReview);
          writeReviews(allReviews);

          return res.status(201).json(newReview);

        } catch (error) {
          console.error('Error creating review:', error);
          return res.status(500).json({ error: 'Failed to create review' });
        }
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 