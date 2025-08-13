import React, { useState, useEffect, useMemo } from 'react';

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

interface SmartReviewSectionProps {
  productId: string;
  productName?: string;
}

// Helper function to get first name only
const getFirstName = (fullName: string): string => {
  return fullName.split(' ')[0];
};

const FractionalStars: React.FC<{ rating: number; size?: 'small' | 'large' }> = ({ rating }) => {
  const stars: JSX.Element[] = [];
  
  for (let i = 1; i <= 5; i++) {
    const fill = Math.max(0, Math.min(1, rating - (i - 1)));
    const filled = fill > 0.5;
    
    stars.push(
      <span key={i} className={`${filled ? 'text-primary' : 'text-gray-300'} text-lg`}>
        ★
      </span>
    );
  }
  return <div className="flex gap-0.5">{stars}</div>;
};

const SmartReviewSection: React.FC<SmartReviewSectionProps> = ({ productId, productName = 'This Product' }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'rating_high' | 'rating_low'>('helpful');
  const [showForm, setShowForm] = useState(false);
  const [eligibility, setEligibility] = useState<{ loggedIn: boolean; hasPurchased: boolean; canReview: boolean } | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  // Calculate review statistics
  const reviewStats = useMemo(() => {
    const approvedReviews = reviews.filter(r => r.status === 'approved');
    const totalReviews = approvedReviews.length;
    const averageRating = totalReviews > 0 
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;
    
    return { totalReviews, averageRating: Math.round(averageRating * 10) / 10 };
  }, [reviews]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      if (review.status !== 'approved') return false;
      
      // Search filter
      const searchMatch = !searchTerm || 
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review_body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Rating filter
      const ratingMatch = !ratingFilter || review.rating.toString() === ratingFilter;
      
      return searchMatch && ratingMatch;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'helpful':
          return b.helpful_count - a.helpful_count;
        case 'recent':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'rating_high':
          return b.rating - a.rating;
        case 'rating_low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [reviews, searchTerm, ratingFilter, sortBy]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews/by-product-id/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEligibility = async () => {
    try {
      const response = await fetch(`/api/reviews/eligibility/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setEligibility(data);
      } else {
        setEligibility({ loggedIn: false, hasPurchased: false, canReview: false });
      }
    } catch {
      setEligibility({ loggedIn: false, hasPurchased: false, canReview: false });
    }
  };

  const handleHelpfulVote = (reviewId: string) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
    
    // Update the review's helpful count
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful_count: helpfulVotes[reviewId] 
              ? Math.max(0, review.helpful_count - 1)
              : review.helpful_count + 1
          }
        : review
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
      fetchEligibility();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <header className="text-center py-10 px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Reviews for {productName}
        </h1>
        
        {eligibility?.canReview && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 mb-6"
          >
            Write a review
          </button>
        )}
        
        <div className="flex items-center justify-center gap-4 text-lg">
          <span className="font-bold text-gray-900">
            {reviewStats.averageRating.toFixed(1)} STARS
          </span>
          <FractionalStars rating={reviewStats.averageRating} size="large" />
          <span className="text-gray-600 font-medium">
            {reviewStats.totalReviews} Review{reviewStats.totalReviews !== 1 ? 's' : ''}
          </span>
        </div>
      </header>

      {/* Controls */}
      <div className="px-8 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-72 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </div>
            <input
              type="search"
              placeholder="Search reviews"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Rating Filter */}
          <select
            className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white min-w-32"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>

          {/* Sort */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-gray-600 text-sm whitespace-nowrap">Sort by:</span>
            <select
              className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white min-w-32"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="helpful">Most helpful</option>
              <option value="recent">Most recent</option>
              <option value="rating_high">Highest rating</option>
              <option value="rating_low">Lowest rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-8">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              {reviews.length === 0 
                ? 'No reviews yet. Be the first to write one!' 
                : 'No reviews match your current filters. Try adjusting your search or filter criteria.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedReviews.map((review) => (
              <article
                key={review.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <FractionalStars rating={review.rating} />
                    <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-sm">
                      {review.title}
                    </h3>
                  </div>
                  
                  <div className="text-right md:min-w-48">
                    <div className="flex flex-col items-end gap-1 mb-2">
                      <span className="font-semibold text-gray-900 text-sm">
                        {getFirstName(review.user_name)}
                      </span>
                      {review.is_verified_purchase && (
                        <span className="text-xs text-gray-500">Verified Buyer</span>
                      )}
                    </div>
                    <time className="text-sm text-gray-600">
                      {formatDate(review.created_at)}
                    </time>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.review_body}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600">
                    <span className="font-medium">{review.helpful_count}</span> 
                    {review.helpful_count === 1 ? ' person' : ' people'} found this helpful
                  </span>
                  
                  <button
                    onClick={() => handleHelpfulVote(review.id)}
                    className={`text-sm transition-colors ${
                      helpfulVotes[review.id]
                        ? 'text-teal-700 font-semibold'
                        : 'text-teal-600 hover:text-teal-700 hover:underline'
                    }`}
                  >
                    {helpfulVotes[review.id] ? '✓ Helpful' : 'Helpful'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartReviewSection;
