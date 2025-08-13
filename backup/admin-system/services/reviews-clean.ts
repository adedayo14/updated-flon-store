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

interface ReviewsData {
  reviews: Review[];
  nextId: number;
}

// TODO: Replace with proper database/API integration from review repository
// This is temporary mock data - will be replaced with proper review system integration
const initialReviewsData: ReviewsData = {
  reviews: [
    // Only keep minimal sample reviews for the dental floss product to test the system
    {
      id: '1',
      product_id: '6691a9fd1034680012078368',
      user_id: 'user-1',
      user_name: 'Alice Johnson',
      rating: 5,
      title: 'Amazing Eco-Friendly Option',
      review_body: 'This silk floss is fantastic! It\'s so much better for the environment and works just as well as traditional floss.',
      status: 'approved' as const,
      is_verified_purchase: true,
      created_at: '2024-01-15T09:30:00Z',
      updated_at: '2024-01-15T09:30:00Z',
      helpful_count: 8
    },
    {
      id: '2',
      product_id: '6691a9fd1034680012078368',
      user_id: 'user-2', 
      user_name: 'Mike Chen',
      rating: 4,
      title: 'Great Quality',
      review_body: 'Really good quality floss, much better than regular plastic ones.',
      status: 'pending' as const,
      is_verified_purchase: true,
      created_at: '2024-01-20T14:45:00Z',
      updated_at: '2024-01-20T14:45:00Z',
      helpful_count: 5
    },
    {
      id: '3',
      product_id: '6691a9fd1034680012078368',
      user_id: 'user-3',
      user_name: 'Sarah Wilson',
      rating: 3,
      title: 'Average product',
      review_body: 'It works okay but nothing special. Could be improved.',
      status: 'pending' as const,
      is_verified_purchase: false,
      created_at: '2024-01-25T16:20:00Z',
      updated_at: '2024-01-25T16:20:00Z',
      helpful_count: 2
    }
  ],
  nextId: 4
};

// Simple in-memory storage (will be replaced with proper database)
let reviewsData: ReviewsData = { ...initialReviewsData };

export function getProductReviews(productId: string): Review[] {
  return reviewsData.reviews.filter(review => review.product_id === productId);
}

export function getAllReviews(): Review[] {
  return reviewsData.reviews;
}

export function getPendingReviews(): Review[] {
  return reviewsData.reviews.filter(review => review.status === 'pending');
}

export function createReview(reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count'>): Review {
  const newReview: Review = {
    ...reviewData,
    id: reviewsData.nextId.toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    helpful_count: 0,
  };
  
  reviewsData.reviews.push(newReview);
  reviewsData.nextId++;
  
  return newReview;
}

export function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Review | null {
  const reviewIndex = reviewsData.reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return null;
  }
  
  reviewsData.reviews[reviewIndex] = {
    ...reviewsData.reviews[reviewIndex],
    status,
    updated_at: new Date().toISOString(),
  };
  
  return reviewsData.reviews[reviewIndex];
}

export async function canUserReview(productId: string, userId: string): Promise<{
  canReview: boolean;
  reason?: string;
  hasPurchased: boolean;
  hasReviewed: boolean;
}> {
  // TODO: Implement proper purchase and review checking
  const hasReviewed = reviewsData.reviews.some(
    review => review.product_id === productId && review.user_id === userId
  );
  
  if (hasReviewed) {
    return {
      canReview: false,
      reason: 'You have already reviewed this product',
      hasPurchased: true,
      hasReviewed: true,
    };
  }
  
  return {
    canReview: true,
    hasPurchased: true,
    hasReviewed: false,
  };
}

export function getProductReviewStats(productId: string): {
  average_rating: number;
  total_reviews: number;
  rating_distribution: { [key: number]: number };
  verified_purchase_percentage: number;
  recent_reviews_count: number;
} {
  const productReviews = getProductReviews(productId).filter(review => review.status === 'approved');
  
  if (productReviews.length === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      verified_purchase_percentage: 0,
      recent_reviews_count: 0,
    };
  }
  
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / productReviews.length;
  
  const ratingDistribution = productReviews.reduce(
    (dist, review) => {
      dist[review.rating] = (dist[review.rating] || 0) + 1;
      return dist;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );
  
  const verifiedCount = productReviews.filter(review => review.is_verified_purchase).length;
  const verifiedPercentage = (verifiedCount / productReviews.length) * 100;
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentCount = productReviews.filter(
    review => new Date(review.created_at) > thirtyDaysAgo
  ).length;
  
  return {
    average_rating: parseFloat(averageRating.toFixed(1)),
    total_reviews: productReviews.length,
    rating_distribution: ratingDistribution,
    verified_purchase_percentage: parseFloat(verifiedPercentage.toFixed(1)),
    recent_reviews_count: recentCount,
  };
}

export function markReviewHelpful(reviewId: string): boolean {
  const reviewIndex = reviewsData.reviews.findIndex(review => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return false;
  }
  
  reviewsData.reviews[reviewIndex].helpful_count++;
  return true;
}
