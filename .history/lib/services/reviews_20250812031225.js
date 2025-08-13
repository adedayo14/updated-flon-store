const fs = require('fs');
const path = require('path');

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

// Helper function to read reviews from file
function readReviewsFromFile() {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return {
      reviews: [],
      nextId: 1
    };
  } catch (error) {
    console.error('Error reading reviews file:', error);
    return {
      reviews: [],
      nextId: 1
    };
  }
}

// Helper function to write reviews to file
function writeReviewsToFile(data) {
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

// Get reviews for a specific product
const getProductReviews = (productId) => {
  const reviewsData = readReviewsFromFile();
  return reviewsData.reviews.filter(review => review.product_id === productId);
};

// Get all reviews
const getAllReviews = () => {
  const reviewsData = readReviewsFromFile();
  return reviewsData.reviews;
};

// Get pending reviews
const getPendingReviews = () => {
  const reviewsData = readReviewsFromFile();
  return reviewsData.reviews.filter(review => review.status === 'pending');
};

// Create a new review
const createReview = (reviewData) => {
  try {
    const data = readReviewsFromFile();
    const newReview = {
      ...reviewData,
      id: data.nextId.toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    data.reviews.push(newReview);
    data.nextId += 1;
    
    writeReviewsToFile(data);
    return { success: true, review: newReview };
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, error: 'Failed to create review' };
  }
};

// Update review status
const updateReviewStatus = (reviewId, status) => {
  try {
    const reviewsData = readReviewsFromFile();
    const reviewIndex = reviewsData.reviews.findIndex(review => review.id === reviewId);
    
    if (reviewIndex === -1) {
      return { success: false, error: 'Review not found' };
    }

    reviewsData.reviews[reviewIndex].status = status;
    reviewsData.reviews[reviewIndex].updated_at = new Date().toISOString();
    
    writeReviewsToFile(reviewsData);
    return { success: true };
  } catch (error) {
    console.error('Error updating review status:', error);
    return { success: false, error: 'Failed to update review status' };
  }
};

// Get product review statistics
const getProductReviewStats = (productId) => {
  const reviews = getProductReviews(productId).filter(review => review.status === 'approved');
  
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    ratingDistribution[review.rating] += 1;
  });

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
    ratingDistribution
  };
};

// Check if user can review a product
const canUserReview = (productId, userId) => {
  const reviewsData = readReviewsFromFile();
  const hasReviewed = reviewsData.reviews.some(
    review => review.product_id === productId && review.user_id === userId
  );
  return !hasReviewed;
};

// Mark a review as helpful
const markReviewHelpful = (reviewId) => {
  try {
    const reviewsData = readReviewsFromFile();
    const reviewIndex = reviewsData.reviews.findIndex(review => review.id === reviewId);
    
    if (reviewIndex === -1) {
      return { success: false, error: 'Review not found' };
    }

    reviewsData.reviews[reviewIndex].helpful_count++;
    
    writeReviewsToFile(reviewsData);
    return { success: true };
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    return { success: false, error: 'Failed to mark review as helpful' };
  }
};

module.exports = {
  getProductReviews,
  getAllReviews,
  getPendingReviews,
  createReview,
  updateReviewStatus,
  getProductReviewStats,
  canUserReview,
  markReviewHelpful
};
