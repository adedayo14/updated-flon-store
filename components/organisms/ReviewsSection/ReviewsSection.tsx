//components/organisms/ReviewsSection/ReviewsSection.tsx 
//for the reviews section on the product page.

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import ReviewCardEnhanced from 'components/molecules/ReviewCardEnhanced';
import ReviewFilters from 'components/molecules/ReviewFilters/ReviewFilters';
import ReviewForm from 'components/molecules/ReviewForm';
import Button from 'components/atoms/Button/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type { 
  Review, 
  ReviewSummary, 
  ReviewFilters as ReviewFiltersType, 
  ReviewEligibility,
  CreateReviewRequest
} from 'types/shared/reviews';

export interface ReviewsSectionProps {
  product_id: string;
  product_name: string;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  product_id,
  product_name,
  className,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [filters, setFilters] = useState<ReviewFiltersType>({
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [reviewEligibility, setReviewEligibility] = useState<ReviewEligibility | null>(null);
  const [eligibilityLoading, setEligibilityLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filtersRef = useRef(filters);
  const reviewFormRef = useRef<HTMLDivElement>(null);

  // Update ref when filters change
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Fetch reviews
  const fetchReviews = useCallback(async (currentFilters?: ReviewFiltersType) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      const filtersToUse = currentFilters || filtersRef.current;
      
      Object.entries(filtersToUse).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/products/${product_id}/reviews?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();

      setReviews(data.reviews || []);
      setSummary(data.summary || null);
      setHasMore(data.pagination ? data.pagination.page < data.pagination.total_pages : false);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [product_id]); // Removed filters from dependency array to prevent infinite loop

  // Check review eligibility
  const checkEligibility = useCallback(async () => {
    try {
      setEligibilityLoading(true);
      const response = await fetch(`/api/products/${product_id}/can-review`);
      if (response.ok) {
        const eligibility = await response.json();
        console.log('Review eligibility response:', eligibility);
        setReviewEligibility(eligibility);
      }
    } catch (err) {
      console.error('Error checking review eligibility:', err);
    } finally {
      setEligibilityLoading(false);
    }
  }, [product_id]);

  // Load more reviews
  const loadMore = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      page: (prev.page || 1) + 1,
    }));
  }, []);

  // Handle review submission
  const handleSubmitReview = useCallback(async (reviewData: CreateReviewRequest) => {
    try {
      const response = await fetch(`/api/products/${product_id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      setShowReviewForm(false);
      // Refresh reviews and eligibility
      await Promise.all([fetchReviews(), checkEligibility()]);
      
      // Show success message
      alert('Thank you for your review! It has been submitted and is pending approval.');
    } catch (err) {
      console.error('Error submitting review:', err);
      throw err;
    }
  }, [product_id, fetchReviews, checkEligibility]);

  // Handle write review button click
  const handleWriteReviewClick = useCallback(() => {
    console.log('Write review clicked. Eligibility:', reviewEligibility);
    if (reviewEligibility?.canReview) {
      console.log('User can review, showing form');
      setShowReviewForm(true);
      setShowLoginPrompt(false);
      // Scroll to review form after a short delay to ensure it's rendered
      setTimeout(() => {
        reviewFormRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    } else if (reviewEligibility?.isLoggedIn) {
      console.log('User is logged in but cannot review:', reviewEligibility.reason);
      // User is logged in but cannot review (e.g., already reviewed)
      alert(reviewEligibility.reason || 'You cannot review this product at this time.');
      setShowLoginPrompt(false);
      setShowReviewForm(false);
    } else {
      console.log('User is not logged in, showing login prompt');
      // Show login prompt for non-logged-in users
      setShowLoginPrompt(true);
      setShowReviewForm(false);
    }
  }, [reviewEligibility]);

  // Initial load
  useEffect(() => {
    checkEligibility();
  }, [checkEligibility]);

  // Fetch reviews when filters change
  useEffect(() => {
    fetchReviews(filters);
  }, [fetchReviews, filters]);

  // Only hide section if no reviews at all and user cannot review (not when filtering)
  if (reviews.length === 0 && !reviewEligibility?.canReview && !error && !loading && !filters.rating) {
    return null;
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className || ''}`}>
        <p className="text-red-500 mb-4">{error}</p>
        <Button 
          elType={BUTTON_TYPE.BUTTON}
          buttonStyle={BUTTON_STYLE.PRIMARY} 
          onClick={() => fetchReviews()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={className || ''}>

      {/* Detailed Reviews Section */}
      <div id="reviews-section" className="mt-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-3">
            Reviews for {product_name}
          </h2>
          {summary && (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{summary.average_rating.toFixed(1)} STARS</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(summary.average_rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      {i < Math.floor(summary.average_rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-gray-600">{summary.total_reviews} Reviews</span>
            </div>
          )}
        </div>

        {/* Review Filters */}
        <ReviewFilters
          filters={filters}
          onFiltersChange={setFilters}
          total_reviews={summary?.total_reviews || 0}
          className="mb-8"
        />

        {/* Write Review Button */}
        {!eligibilityLoading && reviewEligibility?.canReview && (
          <div className="text-right mb-6">
            <button
              onClick={handleWriteReviewClick}
              className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors uppercase"
            >
              Write a Review
            </button>
          </div>
        )}
        {/* Show reason why user cannot review if logged in */}
        {!eligibilityLoading && !reviewEligibility?.canReview && reviewEligibility?.isLoggedIn && (
          <div className="text-right mb-6">
            <p className="text-sm text-gray-500">{reviewEligibility.reason}</p>
          </div>
        )}

        {/* Login Prompt - Only shown when non-logged-in users try to leave a review */}
        {showLoginPrompt && (
          <div className="text-center py-4 bg-gray-50 rounded-lg mb-6">
            <p className="text-gray-600 mb-2">Want to share your experience?</p>
            <p className="text-sm text-gray-500">
              Please <Link href="/account/login" className="text-black underline hover:no-underline">log in</Link> to leave a review
            </p>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              ✕ Close
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {loading && reviews.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              {filters.rating ? (
                <>
                  <p className="text-gray-600 mb-4">No reviews found with {filters.rating} star{filters.rating !== 1 ? 's' : ''} rating.</p>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, rating: undefined }))}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Clear Filter
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">No reviews yet.</p>
                  {!eligibilityLoading && reviewEligibility?.canReview && (
                    <button
                      onClick={handleWriteReviewClick}
                      className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Be the first to review
                    </button>
                  )}
                  {!eligibilityLoading && !reviewEligibility?.canReview && reviewEligibility?.isLoggedIn && (
                    <p className="text-sm text-gray-500">{reviewEligibility.reason}</p>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {reviews.map((review) => (
                <ReviewCardEnhanced
                  key={review.id}
                  review={review}
                  onHelpful={() => {
                    // TODO: Implement helpful functionality
                  }}
                  onReport={() => {
                    // TODO: Implement report functionality
                  }}
                  onEdit={() => {
                    // TODO: Implement edit functionality
                  }}
                  onDelete={() => {
                    // TODO: Implement delete functionality
                  }}
                  isOwner={false}
                />
              ))}
              
              {hasMore && (
                <div className="text-center pt-6">
                  <Button 
                    elType={BUTTON_TYPE.BUTTON}
                    buttonStyle={BUTTON_STYLE.SECONDARY} 
                    onClick={loadMore}
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div ref={reviewFormRef}>
            <ReviewForm
              product_id={product_id}
              product_name={product_name}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowReviewForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;