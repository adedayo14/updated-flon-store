import React, { useEffect, useState } from 'react';

interface Stats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

interface ReviewSummaryProps {
  productId: string;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ productId }) => {
  const [stats, setStats] = useState<Stats>({ averageRating: 0, totalReviews: 0, ratingDistribution: { 1:0, 2:0, 3:0, 4:0, 5:0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/reviews/product/${productId}/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error('Error fetching review stats:', e);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchStats();
  }, [productId]);

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);
    return (
      <div className="flex items-center" aria-label={`Average rating ${rating} out of 5`}>
        {[1,2,3,4,5].map((i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i <= rounded ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (loading) return null;

  if (!stats.totalReviews) return null;

  return (
    <div className="mt-3 flex items-center gap-3">
      {renderStars(stats.averageRating)}
      <span className="text-sm text-primary font-medium">{stats.averageRating.toFixed(1)}</span>
      <a href="#customer-reviews" className="text-sm text-gray-600 underline hover:text-primary">
        {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
      </a>
    </div>
  );
};

export default ReviewSummary;
