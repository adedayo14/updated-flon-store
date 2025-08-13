import { useState, useEffect, useCallback } from 'react';
import type {
  Review,
  ReviewSummary,
  ReviewFilters,
  CreateReviewRequest,
  ReviewEligibility,
  Rating,
} from 'types/shared/reviews';

interface UseReviewsOptions {
  product_id: string;
  autoLoad?: boolean;
}

interface UseReviewsReturn {
  // State
  reviews: Review[];
  summary: ReviewSummary | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  reviewEligibility: ReviewEligibility | null;
  
  // Actions
  fetchReviews: (filters?: ReviewFilters) => Promise<void>;
  submitReview: (reviewData: CreateReviewRequest) => Promise<void>;
  checkEligibility: () => Promise<void>;
  markHelpful: (reviewId: string) => Promise<void>;
  reportReview: (reviewId: string, reason: string) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  loadMore: () => void;
  
  // Filters
  filters: ReviewFilters;
  setFilters: (filters: ReviewFilters) => void;
  clearFilters: () => void;
}

export const useReviews = ({ product_id, autoLoad = true }: UseReviewsOptions): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [filters, setFilters] = useState<ReviewFilters>({
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [reviewEligibility, setReviewEligibility] = useState<ReviewEligibility | null>(null);

  // Fetch reviews
  const fetchReviews = useCallback(async (customFilters?: ReviewFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentFilters = customFilters || filters;
      const queryParams = new URLSearchParams();
      
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/products/${product_id}/reviews?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      
      // If it's a new page, append to existing reviews
      if (currentFilters.page && currentFilters.page > 1) {
        setReviews(prev => [...prev, ...data.reviews]);
      } else {
        setReviews(data.reviews);
      }
      
      setSummary(data.summary);
      setHasMore(data.pagination.page < data.pagination.total_pages);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [product_id, filters]);

  // Check review eligibility
  const checkEligibility = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${product_id}/can-review`);
      if (response.ok) {
        const eligibility = await response.json();
        setReviewEligibility(eligibility);
      }
    } catch (err) {
      console.error('Error checking review eligibility:', err);
    }
  }, [product_id]);

  // Submit review
  const submitReview = useCallback(async (reviewData: CreateReviewRequest) => {
    try {
      const response = await fetch(`/api/products/${product_id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // Refresh reviews and eligibility
      await Promise.all([fetchReviews(), checkEligibility()]);
    } catch (err) {
      console.error('Error submitting review:', err);
      throw err;
    }
  }, [product_id, fetchReviews, checkEligibility]);

  // Mark review as helpful
  const markHelpful = useCallback(async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to mark review as helpful');
      }

      // Update the review in local state
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful_count: review.helpful_count + 1 }
          : review
      ));
    } catch (err) {
      console.error('Error marking review as helpful:', err);
      throw err;
    }
  }, []);

  // Report review
  const reportReview = useCallback(async (reviewId: string, reason: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/report`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to report review');
      }
    } catch (err) {
      console.error('Error reporting review:', err);
      throw err;
    }
  }, []);

  // Delete review
  const deleteReview = useCallback(async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      // Remove the review from local state
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      
      // Refresh summary
      await fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  }, [fetchReviews]);

  // Load more reviews
  const loadMore = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      page: (prev.page || 1) + 1,
    }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    const clearedFilters: ReviewFilters = {
      page: 1,
      limit: 10,
    };
    setFilters(clearedFilters);
  }, []);

  // Auto-load reviews when filters change
  useEffect(() => {
    if (autoLoad) {
      fetchReviews();
    }
  }, [fetchReviews, autoLoad]);

  // Auto-check eligibility
  useEffect(() => {
    if (autoLoad) {
      checkEligibility();
    }
  }, [checkEligibility, autoLoad]);

  return {
    // State
    reviews,
    summary,
    loading,
    error,
    hasMore,
    reviewEligibility,
    
    // Actions
    fetchReviews,
    submitReview,
    checkEligibility,
    markHelpful,
    reportReview,
    deleteReview,
    loadMore,
    
    // Filters
    filters,
    setFilters,
    clearFilters,
  };
}; 