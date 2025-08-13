import React, { useState, useEffect } from 'react';
import Button from 'components/atoms/Button';
import type { AdminReviewListItem, AdminReviewAction } from 'types/shared/reviews';
import { formatDateToLocale } from 'lib/utils/date';

export interface AdminReviewDashboardProps {
  className?: string;
}

const AdminReviewDashboard: React.FC<AdminReviewDashboardProps> = ({ className }) => {
  const [pendingReviews, setPendingReviews] = useState<AdminReviewListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<AdminReviewListItem | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionReason, setActionReason] = useState('');

  // Fetch pending reviews
  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reviews/pending');
      
      if (!response.ok) {
        throw new Error('Failed to fetch pending reviews');
      }

      const data = await response.json();
      setPendingReviews(data.reviews);
      setError(null);
    } catch (err) {
      console.error('Error fetching pending reviews:', err);
      setError('Failed to load pending reviews');
    } finally {
      setLoading(false);
    }
  };

  // Handle admin action
  const handleAdminAction = async (action: 'approve' | 'reject' | 'hold') => {
    if (!selectedReview) return;

    try {
      const endpoint = action === 'approve' ? 'approve' : 'reject';
      const response = await fetch(`/api/admin/reviews/${selectedReview.review.id}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: action === 'reject' ? JSON.stringify({ reason: actionReason }) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} review`);
      }

      // Remove the review from the list
      setPendingReviews(prev => prev.filter(review => review.review.id !== selectedReview.review.id));
      setSelectedReview(null);
      setShowActionModal(false);
      setActionReason('');

      // Show success message
      alert(`Review ${action}d successfully`);
    } catch (err) {
      console.error(`Error ${action}ing review:`, err);
      alert(`Failed to ${action} review`);
    }
  };

  // Get star display
  const getStarDisplay = (rating: number) => {
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

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  if (error) {
    return (
      <div className={`text-center py-8 ${className || ''}`}>
        <p className="text-red-500 mb-4">{error}</p>
        <Button variant="primary" onClick={fetchPendingReviews}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className || ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-primary">Review Moderation</h1>
        <Button variant="secondary" onClick={fetchPendingReviews} disabled={loading}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-body">Loading pending reviews...</p>
        </div>
      ) : pendingReviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-body">No pending reviews to moderate.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReviews.map((reviewItem) => (
            <div
              key={reviewItem.review.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Product Info */}
                  <div className="flex items-center gap-3 mb-3">
                    {reviewItem.product.image && (
                      <img
                        src={reviewItem.product.image.src}
                        alt={reviewItem.product.image.alt}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-primary">{reviewItem.product.name}</h3>
                      <p className="text-sm text-body">Product ID: {reviewItem.product.id}</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getStarDisplay(reviewItem.review.rating)}
                      <span className="font-medium">{reviewItem.review.title}</span>
                      {reviewItem.review.is_verified_purchase && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-body text-sm line-clamp-3">{reviewItem.review.review_body}</p>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 text-sm text-body">
                    <span>By: {reviewItem.user.name}</span>
                    <span>Email: {reviewItem.user.email}</span>
                    <span>{reviewItem.user.review_count} reviews</span>
                    <span>Order: {reviewItem.order.id}</span>
                    <span>Date: {formatDateToLocale(reviewItem.review.created_at)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="success"
                    size="small"
                    onClick={() => {
                      setSelectedReview(reviewItem);
                      handleAdminAction('approve');
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => {
                      setSelectedReview(reviewItem);
                      setShowActionModal(true);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => {
                      setSelectedReview(reviewItem);
                      handleAdminAction('hold');
                    }}
                  >
                    Hold
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rejection Modal */}
      {showActionModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="font-semibold text-lg mb-4">Reject Review</h3>
            <p className="text-body mb-4">
              Please provide a reason for rejecting this review:
            </p>
            <textarea
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowActionModal(false);
                  setActionReason('');
                  setSelectedReview(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleAdminAction('reject')}
                disabled={!actionReason.trim()}
              >
                Reject Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewDashboard; 