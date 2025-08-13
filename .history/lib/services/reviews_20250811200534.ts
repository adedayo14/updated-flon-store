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
  helpful_count?: number;
}

// Sample review data for testing
export const getSampleReviews = (): Review[] => {
  const sampleReviews: Review[] = [
    // Reviews for the actual dental floss refill product (MongoDB ObjectId from Swell)
    {
      id: '1',
      product_id: '6691a9fd1034680012078368',
      user_id: 'user-1',
      user_name: 'Alice Johnson',
      rating: 5,
      title: 'Amazing Eco-Friendly Option',
      review_body: 'This silk floss is fantastic! It\'s so much better for the environment and works just as well as traditional floss. The refill system is genius.',
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
      product_id: '6691a9fd1034680012078368',
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
    // Also keep slug-based data for fallback
    {
      id: '4',
      product_id: 'dental-floss-refill',
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
    }
  ];

  return sampleReviews;
};

// Get reviews for a specific product
export const getProductReviews = async (productId: string): Promise<Review[]> => {
  // In a real app, this would query a database
  const allReviews = getSampleReviews();
  
  // Filter reviews by product ID (case-insensitive)
  return allReviews.filter(review => 
    review.product_id.toLowerCase() === productId.toLowerCase()
  );
};

// Get all reviews (for admin purposes)
export const getAllReviews = async (): Promise<Review[]> => {
  return getSampleReviews();
};

// Create a new review
export const createReview = async (review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> => {
  // In a real app, this would save to a database
  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  return newReview;
};

// Update review status (approve/reject)
export const updateReviewStatus = async (reviewId: string, status: 'approved' | 'rejected'): Promise<Review | null> => {
  // In a real app, this would update the database
  const reviews = getSampleReviews();
  const review = reviews.find(r => r.id === reviewId);
  
  if (!review) {
    return null;
  }
  
  return {
    ...review,
    status,
    updated_at: new Date().toISOString(),
  };
};

// Delete a review
export const deleteReview = async (reviewId: string): Promise<boolean> => {
  // In a real app, this would delete from the database
  const reviews = getSampleReviews();
  const reviewExists = reviews.some(r => r.id === reviewId);
  
  return reviewExists;
};
