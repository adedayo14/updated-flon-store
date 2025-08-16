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
      <svg key={i} className={`${sizeClasses} text-primary`} viewBox="0 0 20 20" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${pct}%`} stopColor="currentColor" />
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
  const [eligibility, setEligibility] = useState<{ loggedIn: boolean; hasPurchased: boolean; canReview: boolean } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    // Load which reviews have been marked helpful by this visitor
    if (typeof window === 'undefined') return;
    const map: Record<string, boolean> = {};
    reviews.forEach((r) => {
      try {
        if (localStorage.getItem(`review-helpful:${r.id}`) === '1') {
          map[r.id] = true;
        }
      } catch {/* ignore */}
    });
    setHelpfulClicked(map);
  }, [reviews]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/by-product/${productId}`);
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

    const fetchEligibility = async () => {
      try {
        const res = await fetch(`/api/reviews/eligibility?productId=${productId}`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setEligibility(data);
        } else {
          setEligibility({ loggedIn: false, hasPurchased: false, canReview: false });
        }
      } catch {
        setEligibility({ loggedIn: false, hasPurchased: false, canReview: false });
      }
    };

    if (productId) {
      fetchReviews();
      fetchEligibility();
    }
  }, [productId]);

  // Prep for email invite deep links: auto-open form when ?openReviewForm=1 is present.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const openFlag = params.get('openReviewForm') || params.get('review');

    // If user is not logged in yet, remember intent and wait until after login
    if (openFlag === '1' && eligibility && !eligibility.loggedIn) {
      try {
        localStorage.setItem(`review-intent:${productId}`, '1');
      } catch (e) {
        console.debug('review intent set failed', e);
      }
      return;
    }

    // If eligible (logged in + purchased), open the form automatically
    if (openFlag === '1' && eligibility && eligibility.loggedIn && eligibility.hasPurchased) {
      setShowForm(true);
      // Clean the URL to avoid re-triggering
      try {
        params.delete('openReviewForm');
        params.delete('review');
        const q = params.toString();
        const newUrl = `${window.location.pathname}${q ? `?${q}` : ''}${window.location.hash || ''}`;
        window.history.replaceState({}, '', newUrl);
      } catch (e) {
        console.debug('failed to clean url', e);
      }
    }
  }, [eligibility, productId]);

  // After login, if we stored an intent for this product, open the form when eligible
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!eligibility || !eligibility.loggedIn || !eligibility.hasPurchased) return;
    try {
      const key = `review-intent:${productId}`;
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        setShowForm(true);
      }
    } catch (e) {
      console.debug('review intent read failed', e);
    }
  }, [eligibility, productId]);

  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    return <FractionalStars rating={rating} size={size} />;
  };

  const getFirstName = (fullName: string): string => {
    return fullName.split(' ')[0] || fullName;
  };

  // Removed formatDate function - dates are hidden
  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long', 
  //     day: 'numeric'
  //   });
  // };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      productId,
      rating: Number(fd.get('rating')),
      title: String(fd.get('title') || ''),
      body: String(fd.get('body') || ''),
    };
    try {
      const res = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data?.success !== true) {
        throw new Error(data?.error || 'Failed to submit review');
      }
      setShowForm(false);
      setJustSubmitted(true);
    } catch (err: any) {
      setFormError(err?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
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
    <div id="customer-reviews" className="py-8 pr-6 lg:pr-10">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary mb-2">Customer reviews</h3>
        {justSubmitted && (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
            Thanks! Your review is pending approval and will appear here once approved.
          </p>
        )}
        {/* Write review CTA - only for logged-in purchasers. Hide for logged-out users. */}
        {eligibility && eligibility.loggedIn && (
          eligibility.hasPurchased ? (
            <div className="mb-6">
              {!showForm ? (
                <div className="flex items-center gap-3">
                  {justSubmitted && (
                    <span className="text-sm text-gray-700">You’ve submitted a review for this product.</span>
                  )}
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={() => {
                      setFormError(null);
                      setShowForm(true);
                    }}
                  >
                    {justSubmitted ? 'Write another review' : 'Write a review'}
                  </button>
                </div>
              ) : (
                <form onSubmit={submitReview} className="mt-4 space-y-3 max-w-lg">
                  {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="rating">Rating</label>
                    <select id="rating" name="rating" className="border rounded px-3 py-2" defaultValue={5} required>
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Fair</option>
                      <option value={1}>1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="body">Review</label>
                    <textarea id="body" name="body" className="w-full border rounded px-3 py-2" rows={4} required />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={submitting} className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50">
                      {submitting ? 'Submitting…' : 'Submit review'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="border px-4 py-2 rounded">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-6">Verified buyers only.</p>
          )
        )}

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
          justSubmitted ? (
            <p className="text-gray-600 mb-6">Your review is pending moderation and will appear after approval.</p>
          ) : (
            <p className="text-gray-600 mb-6">No reviews yet. Share your thoughts and help others decide.</p>
          )
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
                    <span className="font-semibold">{getFirstName(review.user_name)}</span>
                    {review.is_verified_purchase && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-lg">{review.title}</h4>
                </div>
                {/* <span className="text-sm text-gray-500 pr-3">{formatDate(review.created_at)}</span> */}
              </div>
              
              {review.review_body && review.review_body.trim() && review.review_body.toLowerCase() !== 'no text review' && (
                <p className="text-gray-700 mb-2">{review.review_body}</p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                {review.helpful_count > 0 ? (
                  <div className="text-sm text-gray-500">
                    {review.helpful_count} {review.helpful_count === 1 ? 'person' : 'people'} found this helpful
                  </div>
                ) : <span />}
                <button
                  type="button"
                  className="text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!!helpfulClicked[review.id]}
                  onClick={async () => {
                    if (helpfulClicked[review.id]) return;
                    try {
                      const res = await fetch(`/api/reviews/${review.id}/helpful`, { method: 'PUT' });
                      if (res.ok) {
                        const json = await res.json();
                        setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, helpful_count: json.helpful_count ?? (r.helpful_count + 1) } : r));
                        setHelpfulClicked((prev) => ({ ...prev, [review.id]: true }));
                        try { localStorage.setItem(`review-helpful:${review.id}`, '1'); } catch {/* ignore */}
                      }
                    } catch (e) {
                      console.error('Failed to mark helpful', e);
                    }
                  }}
                >
                  Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
