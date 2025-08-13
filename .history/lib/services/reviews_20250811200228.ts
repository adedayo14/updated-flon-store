export interface Review {
  id: string;
  product_id:    const sampleReviews: Review[] = [
    {
      id: '1',
      product_id: 'dental-floss-refill',
      user_id: 'user-1',
      user_name: 'Alice Johnson',
      rating: 5,
      title: 'Amazing Eco-Friendly Option',
      review_body: 'This silk floss is fantastic! It's so much better for the environment and works just as well as traditional floss. The refill system is genius.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-15T09:30:00Z',
      updated_at: '2024-01-15T09:30:00Z',
      helpful_count: 8
    },
    {
      id: '2',
      product_id: 'dental-floss-refill',
      user_id: 'user-2',
      user_name: 'Mike Chen',
      rating: 4,
      title: 'Great Quality Floss',
      review_body: 'Really good quality floss, much better than regular plastic ones. Refill system works well. Only downside is the price but worth it for the quality.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-20T14:45:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      helpful_count: 5
    },
    {
      id: '3',
      product_id: 'dental-floss-refill',
      user_id: 'user-3',
      user_name: 'Emily Davis',
      rating: 5,
      title: 'Perfect for Sensitive Gums',
      review_body: 'I have very sensitive gums and this silk floss is perfect! No irritation and it glides so smoothly. The sustainability aspect is a huge plus.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-25T16:20:00Z',
      updated_at: '2024-01-25T16:20:00Z',
      helpful_count: 12
    },
    // Also keep the old sample data in case Swell uses different IDs
    {
      id: '4',
      product_id: 'silk-dental-floss-refill',
      user_id: 'user-4',
      user_name: 'Sarah Wilson',
      rating: 4,
      title: 'Great Product',
      review_body: 'Really happy with this purchase. Quality is excellent and arrived quickly.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-28T10:15:00Z',
      updated_at: '2024-01-28T10:15:00Z',
      helpful_count: 8
    },
    // Add more test data with various product IDs that might match Swell's format
    {
      id: '4',
      product_id: '65b4bd5323dd3e63b726511e', // MongoDB-style ObjectId format
      user_id: 'user-4',
      user_name: 'Sarah Wilson',
      rating: 4,
      title: 'Great Product',
      review_body: 'Really happy with this purchase. Quality is excellent and arrived quickly.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-28T10:15:00Z',
      updated_at: '2024-01-28T10:15:00Z',
      helpful_count: 8
    },
    {
      id: '5',
      product_id: 'test-product-id', // Generic test ID
      user_id: 'user-5',
      user_name: 'John Smith',
      rating: 5,
      title: 'Excellent Quality',
      review_body: 'Outstanding product, highly recommend to anyone looking for quality.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-02-01T14:30:00Z',
      updated_at: '2024-02-01T14:30:00Z',
      helpful_count: 15
    }r_id: string;
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

interface ReviewsData {
  reviews: Review[];
  nextId: number;
}

// Initial sample data
const initialReviewsData: ReviewsData = {
  reviews: [
    // Sample data for testing
    {
      id: '1',
      product_id: 'silk-dental-floss-refill',
      user_id: 'user-1',
      user_name: 'Sarah Johnson',
      rating: 5,
      title: 'Best Dental Floss Ever!',
      review_body: 'This silk dental floss is absolutely amazing! So smooth and gentle on my gums. The refill system is convenient and eco-friendly. Highly recommend!',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      helpful_count: 8
    },
    {
      id: '2',
      product_id: 'silk-dental-floss-refill',
      user_id: 'user-2',
      user_name: 'Mike Chen',
      rating: 4,
      title: 'Great Quality Floss',
      review_body: 'Really good quality floss, much better than regular plastic ones. Refill system works well. Only downside is the price but worth it for the quality.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-20T14:45:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      helpful_count: 5
    },
    {
      id: '3',
      product_id: 'silk-dental-floss-refill',
      user_id: 'user-3',
      user_name: 'Emily Davis',
      rating: 5,
      title: 'Perfect for Sensitive Gums',
      review_body: 'I have very sensitive gums and this silk floss is perfect! No irritation and it glides so smoothly. The sustainability aspect is a huge plus.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-25T09:15:00Z',
      updated_at: '2024-01-25T09:15:00Z',
      helpful_count: 12
    },
    {
      id: '4',
      product_id: 'flon-shea-butter',
      user_id: 'user-4',
      user_name: 'John Doe',
      rating: 5,
      title: 'Excellent Shea Butter!',
      review_body: 'This shea butter is absolutely amazing! The quality is outstanding and it works perfectly for my skin. Highly recommend!',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      helpful_count: 3
    },
    {
      id: '5',
      product_id: 'flon-shea-butter',
      user_id: 'user-5',
      user_name: 'Jane Smith',
      rating: 4,
      title: 'Great Natural Product',
      review_body: 'Good quality natural shea butter at a reasonable price. Delivery was fast and the product arrived in perfect condition.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-20T14:45:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      helpful_count: 1
    },
    {
      id: '3',
      product_id: 'flon-shea-butter',
      user_id: 'user-3',
      user_name: 'Mike Johnson',
      rating: 3,
      title: 'Decent Shea Butter',
      review_body: 'The shea butter is okay, but there are some minor issues. It works as expected but could be better.',
      status: 'pending' as const,
      is_verified_purchase: false,
      created_at: '2024-01-25T09:15:00Z',
      updated_at: '2024-01-25T09:15:00Z',
      helpful_count: 0
    },
    {
      id: '4',
      product_id: 'eco-body-gift-set',
      user_id: 'user-4',
      user_name: 'Sarah Wilson',
      rating: 5,
      title: 'Amazing Gift Set!',
      review_body: 'I love this eco-friendly body care set! The quality is exceptional and it has exceeded all my expectations.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-10T16:20:00Z',
      updated_at: '2024-01-10T16:20:00Z',
      helpful_count: 5
    },
    {
      id: '5',
      product_id: 'flon-insulated-water-bottle',
      user_id: 'user-5',
      user_name: 'David Brown',
      rating: 4,
      title: 'Good Water Bottle',
      review_body: 'Solid insulated water bottle with good quality. Keeps drinks cold for hours. Would recommend to others.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-12T11:30:00Z',
      updated_at: '2024-01-12T11:30:00Z',
      helpful_count: 2
    },
    // Test review with verified purchase for demonstration
    {
      id: '6',
      product_id: 'flon-shea-butter',
      user_id: '65aa41655051040011a152ef',
      user_name: 'ADEDAYO ALAO',
      rating: 5,
      title: 'Verified Purchase Test Review',
      review_body: 'This is a test review to demonstrate the verified purchase feature. This review shows the green "Verified Purchase" badge because the user has purchased this product.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-30T12:00:00Z',
      updated_at: '2024-01-30T12:00:00Z',
      helpful_count: 0
    },
    // Updated test review to show verified purchase
    {
      id: '16',
      product_id: 'flon-shea-butter',
      user_id: '65aa41655051040011a152ef',
      user_name: 'ADEDAYO ALAO',
      rating: 5,
      title: 'Test Verified Purchase for Shea Butter',
      review_body: 'This is a test review to check if the verified purchase feature works for the shea butter product.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2025-07-06T15:51:45.778Z',
      updated_at: '2025-07-06T15:51:45.778Z',
      helpful_count: 0
    }
  ],
  nextId: 17
};

// In-memory storage for reviews
let reviewsData: ReviewsData = initialReviewsData;

// Helper function to read reviews data
function readReviewsData(): ReviewsData {
  // On server side, try to read from file
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const dataPath = path.join(process.cwd(), 'data', 'reviews.json');
      
      if (fs.existsSync(dataPath)) {
        const fileData = fs.readFileSync(dataPath, 'utf8');
        const parsedData = JSON.parse(fileData);
        reviewsData = parsedData;
        return parsedData;
      }
    } catch (error) {
      console.error('Error reading reviews data from file:', error);
    }
  } else {
    // On client side, try to read from localStorage
    try {
      const saved = localStorage.getItem('reviews-data');
      if (saved) {
        const parsedData = JSON.parse(saved);
        reviewsData = parsedData;
        return parsedData;
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
  
  return reviewsData;
}

// Helper function to write reviews data
function writeReviewsData(data: ReviewsData): void {
  reviewsData = data;
  
  if (typeof window === 'undefined') {
    // On server side, write to file
    try {
      const fs = require('fs');
      const path = require('path');
      const dataDir = path.join(process.cwd(), 'data');
      const dataPath = path.join(dataDir, 'reviews.json');
      
      // Ensure data directory exists
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing reviews data to file:', error);
    }
  } else {
    // On client side, write to localStorage
    try {
      localStorage.setItem('reviews-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}

// Initialize data
readReviewsData();

// Get all reviews for a product
export function getProductReviews(productId: string): Review[] {
  const data = readReviewsData();
  return data.reviews.filter(review => 
    review.product_id === productId && review.status === 'approved'
  );
}

// Get all reviews (for admin)
export function getAllReviews(): Review[] {
  const data = readReviewsData();
  return data.reviews;
}

// Get pending reviews (for admin)
export function getPendingReviews(): Review[] {
  const data = readReviewsData();
  return data.reviews.filter(review => review.status === 'pending');
}

// Create a new review
export function createReview(reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count'>): Review {
  const data = readReviewsData();
  
  const newReview: Review = {
    ...reviewData,
    id: data.nextId.toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    helpful_count: 0
  };
  
  data.reviews.push(newReview);
  data.nextId += 1;
  
  writeReviewsData(data);
  return newReview;
}

// Update review status (for admin)
export function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Review | null {
  const data = readReviewsData();
  const reviewIndex = data.reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return null;
  }
  
  data.reviews[reviewIndex].status = status;
  data.reviews[reviewIndex].updated_at = new Date().toISOString();
  
  writeReviewsData(data);
  return data.reviews[reviewIndex];
}

// Check if user can review a product
export async function canUserReview(productId: string, userId: string): Promise<{
  canReview: boolean;
  reason?: string;
  hasPurchased: boolean;
  hasReviewed: boolean;
}> {
  const data = readReviewsData();
  
  // Check if user has already reviewed this product
  const existingReview = data.reviews.find(review => 
    review.product_id === productId && review.user_id === userId
  );
  
  if (existingReview) {
    return {
      canReview: false,
      reason: 'You have already reviewed this product',
      hasPurchased: true,
      hasReviewed: true
    };
  }
  
  // Check if user has actually purchased the product through Swell
  let hasPurchased = false;
  try {
    if (typeof window === 'undefined') {
      // Only check Swell on server side
      const { initSwell } = require('lib/swell/swell-node');
      const swell = initSwell();
      
      // Get user's completed orders
      const orders = await swell.get('/orders', {
        account_id: userId,
        status: 'completed'
      });
      
      // Check if any order contains the product
      if (orders.results && orders.results.length > 0) {
        for (const order of orders.results) {
          if (order.items && order.items.length > 0) {
            const hasProduct = order.items.some((item: any) => 
              item.product_id === productId || item.product?.id === productId
            );
            if (hasProduct) {
              hasPurchased = true;
              break;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking purchase verification:', error);
    // Continue with hasPurchased = false if there's an error
  }
  
  return {
    canReview: hasPurchased,
    reason: hasPurchased ? undefined : 'You must purchase this product to leave a review',
    hasPurchased,
    hasReviewed: false
  };
}

// Get review statistics for a product
export function getProductReviewStats(productId: string): {
  average_rating: number;
  total_reviews: number;
  rating_distribution: { [key: number]: number };
  verified_purchase_percentage: number;
  recent_reviews_count: number;
} {
  const reviews = getProductReviews(productId);
  
  if (reviews.length === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      verified_purchase_percentage: 0,
      recent_reviews_count: 0
    };
  }
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average_rating = totalRating / reviews.length;
  
  const rating_distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    rating_distribution[review.rating as keyof typeof rating_distribution]++;
  });
  
  const verified_purchases = reviews.filter(review => review.is_verified_purchase).length;
  const verified_purchase_percentage = (verified_purchases / reviews.length) * 100;
  
  // Count recent reviews (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recent_reviews_count = reviews.filter(review => 
    new Date(review.created_at) > thirtyDaysAgo
  ).length;
  
  return {
    average_rating: Math.round(average_rating * 10) / 10,
    total_reviews: reviews.length,
    rating_distribution,
    verified_purchase_percentage: Math.round(verified_purchase_percentage),
    recent_reviews_count
  };
}

// Mark review as helpful
export function markReviewHelpful(reviewId: string): boolean {
  const data = readReviewsData();
  const reviewIndex = data.reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return false;
  }
  
  data.reviews[reviewIndex].helpful_count += 1;
  data.reviews[reviewIndex].updated_at = new Date().toISOString();
  
  writeReviewsData(data);
  return true;
} 