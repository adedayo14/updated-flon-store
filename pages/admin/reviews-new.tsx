import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getAllReviews, Review } from 'lib/services/reviews';
import { validateAdminSession } from 'lib/auth/adminAuth';

interface AdminReviewsProps {
  reviews: Review[];
}

const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  const handleModerate = async (reviewId: string, action: 'approve' | 'reject') => {
    setLoading(prev => ({ ...prev, [reviewId]: true }));
    
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Update the review in the list
        setReviews(prev => prev.map(review => 
          review.id === reviewId 
            ? { ...review, status: action === 'approve' ? 'approved' : 'rejected' }
            : review
        ));
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error moderating review:', error);
      alert('Error moderating review');
    } finally {
      setLoading(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Moderation</h1>
            <p className="text-gray-600">Manage and moderate customer reviews</p>
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Reviews ({reviews.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {reviews.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No reviews found
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="px-6 py-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          by {review.user_name} {/* • {formatDate(review.created_at)} */}
                        </p>
                      </div>

                      <p className="text-gray-700 mb-3">{review.review_body}</p>

                      <div className="text-sm text-gray-500">
                        Product ID: {review.product_id}
                        {review.is_verified_purchase && (
                          <span className="ml-3 text-green-600 font-medium">✓ Verified Purchase</span>
                        )}
                      </div>
                    </div>

                    {review.status === 'pending' && (
                      <div className="flex space-x-2 ml-6">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                          onClick={() => handleModerate(review.id, 'approve')}
                          disabled={loading[review.id]}
                        >
                          {loading[review.id] ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                          onClick={() => handleModerate(review.id, 'reject')}
                          disabled={loading[review.id]}
                        >
                          {loading[review.id] ? 'Rejecting...' : 'Reject'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Check authentication
    const sessionId = context.req.cookies['admin-session'];
    
    if (!sessionId) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }
    
    const isValid = validateAdminSession(sessionId);
    
    if (!isValid) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    // Get all reviews for admin
    const reviews = getAllReviews();
    
    return {
      props: {
        reviews: JSON.parse(JSON.stringify(reviews)), // Serialize for Next.js
      },
    };
  } catch (error) {
    console.error('Error in admin reviews getServerSideProps:', error);
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
};

export default AdminReviews;
