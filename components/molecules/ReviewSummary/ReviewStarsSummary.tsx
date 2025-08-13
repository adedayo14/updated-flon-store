import React, { useState, useEffect, useCallback } from 'react';

interface ReviewStarsSummaryProps {
  productId?: string;
  productSlug?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const ReviewStarsSummary: React.FC<ReviewStarsSummaryProps> = ({ 
  productId, 
  productSlug, 
  href, 
  className, 
  onClick 
}) => {
  const [average, setAverage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Extract slug from href if productSlug is not provided
  const getProductSlug = () => {
    if (productSlug) return productSlug;
    if (href) {
      const match = href.match(/\/products\/([^\/]+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const fetchReviews = useCallback(async () => {
    const slug = getProductSlug();
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/products/${slug}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setAverage(data.summary?.average_rating || data.average || 0);
        setCount(data.summary?.total_reviews || data.count || 0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [href, productSlug]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchReviews();
    }
  }, [mounted, fetchReviews]);

  // Don't render anything if not mounted (SSR) or if there are no reviews
  if (!mounted || count === 0) {
    return null;
  }

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★
        </span>
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div 
      className={`flex items-center gap-1 ${className || ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {renderStars()}
    </div>
  );
};

export default ReviewStarsSummary; 