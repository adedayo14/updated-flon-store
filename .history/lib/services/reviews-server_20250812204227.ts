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

interface ReviewsData {
  reviews: Review[];
  nextId: number;
}

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

function readReviewsFromFile(): ReviewsData {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const fileContent = fs.readFileSync(REVIEWS_FILE, 'utf8');
      const parsed = JSON.parse(fileContent) || {};
      const reviews = Array.isArray(parsed.reviews) ? parsed.reviews : [];
      let nextId: number;
      if (typeof parsed.nextId === 'number' && Number.isFinite(parsed.nextId)) {
        nextId = parsed.nextId;
      } else {
        const maxNumeric = reviews.reduce((max: number, r: any) => {
          const n = parseInt(r?.id ? String(r.id) : '', 10);
          return Number.isFinite(n) ? Math.max(max, n) : max;
        }, 0);
        nextId = maxNumeric + 1;
      }
      return { reviews, nextId };
    }
  } catch (error) {
    console.error('Error reading reviews file:', error);
  }
  return { reviews: [], nextId: 1 };
}

function writeReviewsToFile(data: ReviewsData): void {
  try {
    const dataDir = path.dirname(REVIEWS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing reviews file:', error);
  }
}

export function getProductReviews(productId: string): Review[] {
  const reviewsData = readReviewsFromFile();
  return reviewsData.reviews.filter(review => review.product_id === productId);
}

export function getAllReviews(): Review[] {
  const reviewsData = readReviewsFromFile();
  return reviewsData.reviews;
}

export function getPendingReviews(): Review[] {
  const reviewsData = readReviewsFromFile();
  return reviewsData.reviews.filter(review => review.status === 'pending');
}

export function createReview(reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count'>): Review {
  const reviewsFileData = readReviewsFromFile();
  const newReview: Review = {
    ...reviewData,
    id: reviewsFileData.nextId.toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    helpful_count: 0
  };

  reviewsFileData.reviews.push(newReview);
  reviewsFileData.nextId++;
  
  writeReviewsToFile(reviewsFileData);
  return newReview;
}

export function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Review | null {
  const reviewsData = readReviewsFromFile();
  const reviewIndex = reviewsData.reviews.findIndex((review: Review) => review.id === reviewId);
  
  if (reviewIndex === -1) {
    return null;
  }

  reviewsData.reviews[reviewIndex] = {
    ...reviewsData.reviews[reviewIndex],
    status,
    updated_at: new Date().toISOString()
  };
  
  writeReviewsToFile(reviewsData);
  return reviewsData.reviews[reviewIndex];
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

export const markReviewHelpful = (reviewId: string): { success: boolean; error?: string; helpful_count?: number } => {
  try {
    const reviewsData = readReviewsFromFile();
    const reviewIndex = reviewsData.reviews.findIndex((review: Review) => review.id === reviewId);
    
    if (reviewIndex === -1) {
      return { success: false, error: 'Review not found' };
    }

    const current = reviewsData.reviews[reviewIndex].helpful_count || 0;
    reviewsData.reviews[reviewIndex].helpful_count = current + 1;
    const count = reviewsData.reviews[reviewIndex].helpful_count;
    
    writeReviewsToFile(reviewsData);
    return { success: true, helpful_count: count };
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    return { success: false, error: 'Failed to mark review as helpful' };
  }
};
