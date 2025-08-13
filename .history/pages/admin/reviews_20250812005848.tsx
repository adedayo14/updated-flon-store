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
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Use a consistent format that works on both server and client
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
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Moderation</h1>
            <p className="text-gray-600">Manage and moderate customer reviews</p>
          </div>
          <Button
            buttonStyle={BUTTON_STYLE.SECONDARY}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              All Reviews ({reviews.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {reviews.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No reviews found
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className={`inline-block rounded-md px-2 py-1 text-xs font-semibold uppercase ${
                          getStatusColor(review.status) === 'success' ? 'bg-green-100 text-green-800' :
                          getStatusColor(review.status) === 'error' ? 'bg-red-100 text-red-800' :
                          getStatusColor(review.status) === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </span>
                        {review.is_verified_purchase && (
                          <span className="inline-block rounded-md px-2 py-1 text-xs font-semibold uppercase bg-green-100 text-green-800">
                            Verified Purchase
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {review.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-2">{review.review_body}</p>
                      
                      <div className="text-sm text-gray-500">
                        <span>By {review.user_name}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(review.created_at)}</span>
                        <span className="mx-2">•</span>
                        <span>Product ID: {review.product_id}</span>
                        {review.helpful_count > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{review.helpful_count} found helpful</span>
                          </>
                        )}
                      </div>
                    </div>

                    {review.status === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          small
                          buttonStyle={BUTTON_STYLE.PRIMARY}
                          onClick={() => handleModerate(review.id, 'approve')}
                          disabled={loading[review.id]}
                        >
                          {loading[review.id] ? 'Approving...' : 'Approve'}
                        </Button>
                        <Button
                          small
                          buttonStyle={BUTTON_STYLE.DANGER}
                          onClick={() => handleModerate(review.id, 'reject')}
                          disabled={loading[review.id]}
                        >
                          {loading[review.id] ? 'Rejecting...' : 'Reject'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
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