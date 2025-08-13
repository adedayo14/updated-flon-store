import React from 'react';
import type { ReviewSummaryProps } from '../../../types/shared/reviews';
import ReviewSummary from './ReviewSummary';

const ReviewSummaryContainer: React.FC<ReviewSummaryProps> = ({
  summary,
  onWriteReview,
  onViewAllReviews,
  className = '',
}) => {
  if (!summary) {
    return null;
  }

  return (
    <ReviewSummary
      summary={summary}
      onWriteReview={onWriteReview}
      onViewAllReviews={onViewAllReviews}
      className={className}
    />
  );
};

export default ReviewSummaryContainer;
