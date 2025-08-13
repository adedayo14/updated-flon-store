//components/molecules/ReviewSummary/ReviewSummary.tsx 
//for the summary under the product title.

import React from 'react';
import type { ReviewSummaryProps } from 'types/shared/reviews';

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  summary,
  onWriteReview,
  onViewAllReviews,
  className,
}) => {
  // Don't render anything if no summary or no reviews
  if (!summary || summary.total_reviews === 0) {
    return null;
  }

  const { average_rating, total_reviews } = summary;

  const getStarDisplay = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && (
          <span className="text-yellow-400">☆</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-400">☆</span>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex items-center justify-between py-4 ${className || ''}`}>
      <div className="flex items-center gap-3">
        {getStarDisplay(average_rating)}
        <span className="text-base font-medium">{average_rating.toFixed(1)}</span>
        <span className="text-sm text-gray-600">({total_reviews} reviews)</span>
      </div>
      
      <div className="flex gap-3">
        {onViewAllReviews && (
          <button
            onClick={onViewAllReviews}
            className="px-4 py-1.5 border border-black rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            SEE ALL REVIEWS
          </button>
        )}
        {onWriteReview && (
          <button
            onClick={onWriteReview}
            className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            WRITE A REVIEW
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewSummary;