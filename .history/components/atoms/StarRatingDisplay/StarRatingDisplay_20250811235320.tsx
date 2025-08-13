import React from 'react';
import StarIcon from 'assets/icons/star.svg';

interface StarRatingDisplayProps {
  rating: number; // Average rating (0-5)
  totalReviews: number;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  onClick?: () => void;
  className?: string;
}

const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({
  rating,
  totalReviews,
  size = 'medium',
  showText = true,
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const remainder = rating % 1;
    const emptyStars = 5 - fullStars - (remainder > 0 ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={`full-${i}`}
          className={`${sizeClasses[size]} text-primary`}
        />
      );
    }

    // Partial star (if there's any remainder)
    if (remainder > 0) {
      const widthClass = remainder >= 0.8 ? 'w-4/5' :
                        remainder >= 0.6 ? 'w-3/5' :
                        remainder >= 0.4 ? 'w-2/5' :
                        remainder >= 0.2 ? 'w-1/5' :
                        'w-1/5'; // minimum visible portion
      
      stars.push(
        <div key="partial" className={`${sizeClasses[size]} relative`}>
          <StarIcon className="text-gray-300 absolute" />
          <div className={`overflow-hidden ${widthClass}`}>
            <StarIcon className="text-primary" />
          </div>
        </div>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon
          key={`empty-${i}`}
          className={`${sizeClasses[size]} text-gray-300`}
        />
      );
    }

    return stars;
  };

  const containerClasses = `
    flex items-center gap-1
    ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
    ${className}
  `.trim();

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      {showText && (
        <div className={`flex items-center gap-1 ${textSizeClasses[size]} text-gray-600`}>
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span>({totalReviews} review{totalReviews !== 1 ? 's' : ''})</span>
        </div>
      )}
    </div>
  );
};

export default StarRatingDisplay;
