import React, { useState, useEffect, useCallback } from 'react';
import ReviewSummary from './ReviewSummary';
import type { ReviewSummaryProps, ReviewSummary as ReviewSummaryType } from 'types/shared/reviews';

interface ReviewSummaryContainerProps {
  productId: string;
  className?: string;
  onWriteReview?: () => void;
  onViewAllReviews?: () => void;
  onRatingFilter?: (rating: number) => void;
}

const ReviewSummaryContainer: React.FC<ReviewSummaryContainerProps> = ({
  productId,
  className,
  onWriteReview,
  onViewAllReviews,
  onRatingFilter,
}) => {
  const [summary, setSummary] = useState<ReviewSummaryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}/reviews`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setSummary(data.summary);
      setError(null);
    } catch (err) {
      console.error('Error fetching review summary:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if (loading) {
    return (
      <div className={`flex items-center gap-4 py-4 ${className || ''}`}>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-lg">☆☆☆☆☆</span>
          <span className="text-sm text-body">Loading reviews...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center gap-4 py-4 ${className || ''}`}>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-lg">☆☆☆☆☆</span>
          <span className="text-sm text-body">Error loading reviews</span>
        </div>
      </div>
    );
  }

  return (
    <ReviewSummary
      product_id={productId}
      summary={summary}
      onWriteReview={onWriteReview}
      onViewAllReviews={onViewAllReviews}
      onRatingFilter={onRatingFilter}
      className={className}
    />
  );
};

export default ReviewSummaryContainer; 