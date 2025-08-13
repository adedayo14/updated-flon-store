import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { initSwell } from 'lib/swell/swell-node';
import { useRouter } from 'next/router';
import { Review } from 'lib/services/reviews';
import { validateAdminSession } from 'lib/auth/adminAuth';
import fs from 'fs';
import path from 'path';

interface AdminReviewsProps {
  reviews: Review[];
  productNames: Record<string, string>;
}

const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews: initialReviews, productNames }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const router = useRouter();

  // Filter reviews based on status
  const filteredReviews = reviews.filter(review => {
    if (statusFilter === 'all') return true;
    return review.status === statusFilter;
  });

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
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/admin/products')}
            >
              Products
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                All Reviews ({filteredReviews.length})
              </h2>
              <div className="flex space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Filter reviews by status"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredReviews.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No reviews found for the selected filter
              </div>
            ) : (
              filteredReviews.map((review) => (
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
                          by {review.user_name} • {formatDate(review.created_at)}
                        </p>
                      </div>

                      <p className="text-gray-700 mb-3">{review.review_body}</p>

                      <div className="text-sm text-gray-500">
                        <div className="mb-1">
                          <strong>Product:</strong> {productNames[String(review.product_id)] || 'Unknown Product'}
                        </div>
                        <div>
                          <strong>Product ID:</strong> {review.product_id}
                        </div>
                        {review.is_verified_purchase && (
                          <span className="ml-0 mt-1 inline-block text-green-600 font-medium">✓ Verified Purchase</span>
                        )}
                      </div>
                    </div>

                    {review.status === 'pending' && (
                      <div className="flex space-x-2 ml-6">
                        <button
                          className={`font-bold py-2 px-4 rounded shadow-md disabled:opacity-50 disabled:cursor-not-allowed border-0 text-white ${
                            loading[review.id] 
                              ? '!bg-gray-400 cursor-not-allowed' 
                              : '!bg-green-600 hover:!bg-green-700 active:!bg-green-800'
                          }`}
                          onClick={() => handleModerate(review.id, 'approve')}
                          disabled={loading[review.id]}
                        >
                          {loading[review.id] ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          className={`font-bold py-2 px-4 rounded shadow-md disabled:opacity-50 disabled:cursor-not-allowed border-0 text-white ${
                            loading[review.id] 
                              ? '!bg-gray-400 cursor-not-allowed' 
                              : '!bg-red-600 hover:!bg-red-700 active:!bg-red-800'
                          }`}
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

    // Get all reviews directly from JSON file
    const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');
    
    let reviews = [];
    try {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
      const parsedData = JSON.parse(data);
      reviews = parsedData.reviews || [];
    } catch (error) {
      console.error('Error reading reviews file:', error);
      reviews = [];
    }
    
    // Get product names using Swell API as primary source
    const productNames: Record<string, string> = {};
    
    // Map of known product IDs to names (fallback only)
    const knownProducts: Record<string, string> = {
      '6691a9fd1034680012078368': 'Dental Floss Refill',
      '6899ddfca959c6001142af63': 'Silk Dental Floss',
      '6691b18f587ef300121585d8': 'Safety Razor Blades for Flon Razors',
      '6691adcebde5570012895de5': 'Flon Insulated Water Bottle',
    };
    
    try {
      const uniqueProductIds = [...new Set(reviews.map((review: any) => review.product_id))];
      
      // Initialize Swell for server-side use
      const swell = initSwell();
      
      for (const productId of uniqueProductIds) {
        const productIdStr = String(productId);
        
        // Try to fetch from Swell SDK first (primary source)
        try {
          const product = await swell.get('/products/{id}', {
            id: productIdStr,
          });
          
          if (product && product.name) {
            productNames[productIdStr] = product.name;
            continue; // Skip to next product since we got the name
          }
        } catch (sdkError) {
          console.log(`⚠️ SDK error for product ${productIdStr}:`, sdkError);
          
          // Fallback to direct API call
          try {
            const response = await fetch(`https://${process.env.NEXT_PUBLIC_SWELL_STORE_ID}.swell.store/api/products/${productIdStr}`, {
              headers: {
                'Authorization': `Bearer ${process.env.SWELL_SECRET_KEY}`,
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              const product = await response.json();
              if (product.name) {
                productNames[productIdStr] = product.name;
                continue; // Skip to next product since we got the name
              }
            } else {
              console.log(`⚠️ API returned status ${response.status} for product ${productIdStr}, trying fallback`);
            }
          } catch (apiError) {
            console.log(`⚠️ API error for product ${productIdStr}:`, apiError);
          }
        }
        
        // Fallback to known products if both SDK and API failed
        if (knownProducts[productIdStr]) {
          productNames[productIdStr] = knownProducts[productIdStr];
        } else {
          // Final fallback to generic name
          productNames[productIdStr] = `Product ${productIdStr.slice(-8)}`;
        }
      }
      
      console.log('Product names resolved:', productNames);
    } catch (error) {
      console.error('❌ Error setting product names:', error);
    }
    
    return {
      props: {
        reviews: JSON.parse(JSON.stringify(reviews)), // Serialize for Next.js
        productNames,
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
