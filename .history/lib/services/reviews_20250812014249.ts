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

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

const ensureReviewsFile = () => {
  const dir = path.dirname(REVIEWS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify({ reviews: [] }, null, 2));
  }
};

const readReviews = (): Review[] => {
  try {
    ensureReviewsFile();
    const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData.reviews || [];
  } catch (error) {
    console.error('Error reading reviews file:', error);
    return [];
  }
};

const writeReviews = (reviews: Review[]) => {
  try {
    ensureReviewsFile();
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify({ reviews }, null, 2));
  } catch (error) {
    console.error('Error writing reviews file:', error);
  }
};

export function getProductReviews(productId: string): Review[] {
  const reviews = readReviews();
  return reviews.filter(review => review.product_id === productId);
}

export function getAllReviews(): Review[] {
  return readReviews();
}

export function getPendingReviews(): Review[] {
  const reviews = readReviews();
  return reviews.filter((review: Review) => review.status === 'pending');
}

export function addReview(reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Review {
  const reviews = readReviews();
  const newId = Date.now().toString(); // Simple ID generation
  
  const newReview: Review = {
    id: newId,
    ...reviewData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  reviews.push(newReview);
  writeReviews(reviews);
  return newReview;
}

export function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Review | null {
  const reviews = readReviews();
  const reviewIndex = reviews.findIndex((review: Review) => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return null;
  }

  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    status,
    updated_at: new Date().toISOString(),
  };

  writeReviews(reviews);
  return reviews[reviewIndex];
}export async function canUserReview(productId: string, userId: string): Promise<{
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
      const rating = review.rating as keyof typeof dist;
      dist[rating] = (dist[rating] || 0) + 1;
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
