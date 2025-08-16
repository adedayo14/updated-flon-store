//components/molecules/ReviewCardEnhanced/ReviewCardEnhanced.tsx 
//for the review card on the product page.

import React from 'react';
import type { ReviewCardProps, Rating } from 'types/shared/reviews';

const ReviewCardEnhanced: React.FC<ReviewCardProps> = ({
  review,
  className,
}) => {
  const {
    rating,
    title,
    review_body,
    is_verified_purchase,
    user_name,
  } = review;

  const getStarDisplay = (rating: Rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  // Extract first name from user_name
  const getFirstName = (fullName?: string) => {
    if (!fullName) return 'Anonymous';
    const firstName = fullName.split(' ')[0];
    return firstName;
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 mb-4 ${className || ''}`}>
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <div className="mb-2">
            {getStarDisplay(rating)}
          </div>
          <h3 className="font-semibold text-lg mb-3">{title}</h3>
          {review_body && review_body.trim() && review_body.toLowerCase() !== 'no text review' && (
            <p className="text-gray-700 text-base leading-relaxed">
              {review_body}
            </p>
          )}
        </div>
        
        <div className="flex flex-col items-start flex-shrink-0 w-40">
          <div className="font-semibold text-base">{getFirstName(user_name)}</div>
          {is_verified_purchase && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500 text-white mt-1.5 shadow-sm">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Verified Purchase
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCardEnhanced;