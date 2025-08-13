import React, { useState, useEffect } from 'react';

interface Review {
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
  helpful_count: number;
  images?: string[];
}

interface ReviewSectionProps {
  productId: string;
}

const FractionalStars: React.FC<{ rating: number; size?: 'small' | 'large' }> = ({ rating, size = 'small' }) => {
  const stars: JSX.Element[] = [];
  const sizeClasses = size === 'large' ? 'w-6 h-6' : 'w-4 h-4';
  for (let i = 1; i <= 5; i++) {
    const fill = Math.max(0, Math.min(1, rating - (i - 1)));
    const pct = fill * 100;
    const gradId = `review-star-${size}-${i}-${Math.round(rating * 10)}`;
    stars.push(
      <svg key={i} className={`${sizeClasses}`} viewBox="0 0 20 20" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${pct}%`} stopColor="#FACC15" />
            <stop offset={`${pct}%`} stopColor="#D1D5DB" />
          </linearGradient>
        </defs>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill={`url(#${gradId})`} />
      </svg>
    );
  }
  return <div className="flex">{stars}</div>;
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/product/${productId}`);
        if (response.ok) {
          const productReviews = await response.json();
          const approvedReviews = productReviews.filter((review: Review) => review.status === 'approved');
          setReviews(approvedReviews);
          setTotalReviews(approvedReviews.length);
          
          if (approvedReviews.length > 0) {
            const avg = approvedReviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / approvedReviews.length;
            setAverageRating(Math.round(avg * 10) / 10);
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    return <FractionalStars rating={rating} size={size} />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div id="customer-reviews" className="py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="customer-reviews" className="py-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary mb-4">Customer Reviews</h3>
        
        {totalReviews > 0 ? (
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <div className="flex mr-2">
                {renderStars(Math.round(averageRating), 'large')}
              </div>
              <span className="text-xl font-semibold">{averageRating}</span>
            </div>
            <span className="text-gray-600">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </span>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="font-semibold">{review.user_name}</span>
                    {review.is_verified_purchase && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-lg">{review.title}</h4>
                </div>
                <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
              </div>
              
              <p className="text-gray-700 mb-2">{review.review_body}</p>
              
              {review.helpful_count > 0 && (
                <div className="text-sm text-gray-500">
                  {review.helpful_count} people found this helpful
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
