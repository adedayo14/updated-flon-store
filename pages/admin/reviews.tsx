import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getProductsByIds } from 'lib/services/products';
import { useRouter } from 'next/router';
import type { Review } from 'lib/services/reviews';
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
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const router = useRouter();

  // Filter and sort reviews
  const filteredAndSortedReviews = reviews
    .filter(review => {
      // Apply tab filter
      if (activeTab !== 'all' && review.status !== activeTab) return false;
      // Apply status filter (legacy, but keeping for compatibility)
      if (statusFilter !== 'all' && review.status !== statusFilter) return true;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
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

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to permanently delete this review? This action cannot be undone.')) {
      return;
    }

    setLoading(prev => ({ ...prev, [reviewId]: true }));
    
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the review from the list
        setReviews(prev => prev.filter(review => review.id !== reviewId));
        alert('Review deleted successfully');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
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

  // Removed formatDate function - dates are hidden in admin
  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };

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
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6 py-3">
              {[
                { key: 'all', label: 'All Reviews', count: reviews.length },
                { key: 'pending', label: 'Pending', count: reviews.filter(r => r.status === 'pending').length },
                { key: 'approved', label: 'Approved', count: reviews.filter(r => r.status === 'approved').length },
                { key: 'rejected', label: 'Rejected', count: reviews.filter(r => r.status === 'rejected').length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Controls */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {activeTab === 'all' ? 'All Reviews' : 
                 activeTab === 'pending' ? 'Pending Reviews' :
                 activeTab === 'approved' ? 'Approved Reviews' : 'Rejected Reviews'} 
                ({filteredAndSortedReviews.length})
              </h2>
              <div className="flex space-x-4 items-center">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Sort reviews by date"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as 'cards' | 'table')}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Change view mode"
                >
                  <option value="cards">Card View</option>
                  <option value="table">Table View</option>
                </select>
                {/* Legacy filter for backward compatibility */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="hidden border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Filter reviews by status (legacy)"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {filteredAndSortedReviews.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              No reviews found for the selected filter
            </div>
          ) : viewMode === 'cards' ? (
            // Card View
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {filteredAndSortedReviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header with Status and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </span>
                        {review.is_verified_purchase && (
                          <span className="text-green-600 text-sm font-medium">✓ Verified Purchase</span>
                        )}
                      </div>
                      <div className="flex items-center">
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
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>

                    {/* Review Content - This section will grow to fill available space */}
                    <div className="flex-1 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        by {review.user_name} {/* • {formatDate(review.created_at)} */}
                      </p>
                      <p className="text-gray-700 leading-relaxed line-clamp-3">{review.review_body}</p>
                    </div>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">Images ({review.images.length}):</p>
                        <div className="flex flex-wrap gap-3">
                          {review.images.slice(0, 4).map((image, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={image}
                                alt={`Review image ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                                onClick={() => window.open(image, '_blank')}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-opacity">
                                <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM12 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" clipRule="evenodd" />
                                </svg>
                              </div>
                              {index === 3 && review.images && review.images.length > 4 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                  <span className="text-white font-medium text-sm">+{review.images.length - 4}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-sm text-gray-600">
                        <div className="mb-1">
                          <span className="font-medium text-gray-800">Product:</span> {productNames[String(review.product_id)] || 'Unknown Product'}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">Product ID:</span> {review.product_id}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Always at the bottom */}
                    <div className="flex items-center justify-end gap-2 mt-auto">
                      {review.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleModerate(review.id, 'approve')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
                            disabled={loading[review.id]}
                            title="Approve review"
                          >
                            {loading[review.id] ? (
                              <span className="text-sm">Approving...</span>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text-sm">Approve</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleModerate(review.id, 'reject')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
                            disabled={loading[review.id]}
                            title="Reject review"
                          >
                            {loading[review.id] ? (
                              <span className="text-sm">Rejecting...</span>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                <span className="text-sm">Reject</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                      {review.status === 'approved' && (
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
                          disabled={loading[review.id]}
                          title="Delete review"
                        >
                          {loading[review.id] ? (
                            <span className="text-sm">Deleting...</span>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                              <span className="text-sm">Delete</span>
                            </>
                          )}
                        </button>
                      )}
                      {review.status === 'rejected' && (
                        <span className="text-sm text-gray-400 px-4 py-2">No actions available</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Table View
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Product</th>
                    <th className="px-3 py-2">User</th>
                    <th className="px-3 py-2">Rating</th>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Review</th>
                    <th className="px-3 py-2">Images</th>
                    <th className="px-3 py-2">Created</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedReviews.map((review) => (
                    <tr key={review.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div>
                          <div className="font-medium text-sm">{productNames[String(review.product_id)] || 'Unknown Product'}</div>
                          <div className="text-xs text-gray-500">{review.product_id}</div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="font-medium text-sm">{review.user_name}</div>
                        {review.is_verified_purchase && (
                          <div className="text-xs text-green-600">✓ Verified</div>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>{review.rating}/5</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 max-w-xs">
                        <div className="font-medium text-sm truncate">{review.title}</div>
                      </td>
                      <td className="px-3 py-2 max-w-xs">
                        <div className="text-sm text-gray-700 truncate">{review.review_body}</div>
                      </td>
                      <td className="px-3 py-2">
                        {review.images && review.images.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <div className="flex -space-x-1">
                              {review.images.slice(0, 2).map((image, index) => (
                                <Image
                                  key={index}
                                  src={image}
                                  alt={`Review image ${index + 1}`}
                                  width={24}
                                  height={24}
                                  className="object-cover rounded border border-white cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                                  onClick={() => window.open(image, '_blank')}
                                />
                              ))}
                            </div>
                            {review.images.length > 2 && (
                              <span className="text-xs text-gray-500">+{review.images.length - 2}</span>
                            )}
                            {review.images.length === 1 && (
                              <span className="text-xs text-green-600">📷</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-500">
                        {/* {formatDate(review.created_at)} */}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-end gap-2">
                          {review.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleModerate(review.id, 'approve')}
                                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 flex items-center justify-center text-black hover:text-gray-700"
                                disabled={loading[review.id]}
                                title="Approve review"
                              >
                                {loading[review.id] ? (
                                  <span className="text-xs">...</span>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                )}
                              </button>
                              <button
                                onClick={() => handleModerate(review.id, 'reject')}
                                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 flex items-center justify-center text-black hover:text-gray-700"
                                disabled={loading[review.id]}
                                title="Reject review"
                              >
                                {loading[review.id] ? (
                                  <span className="text-xs">...</span>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                  </svg>
                                )}
                              </button>
                            </>
                          )}
                          {review.status === 'approved' && (
                            <button
                              onClick={() => handleDelete(review.id)}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 flex items-center justify-center text-black hover:text-gray-700"
                              disabled={loading[review.id]}
                              title="Delete review"
                            >
                              {loading[review.id] ? (
                                <span className="text-xs">...</span>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              )}
                            </button>
                          )}
                          {review.status === 'rejected' && (
                            <span className="text-xs text-gray-400">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
    
    // Get product names using proper Swell service
    const productNames: Record<string, string> = {};
    
    // Map of known product IDs to names (fallback only)
    const knownProducts: Record<string, string> = {
      '6691a9fd1034680012078368': 'Dental Floss Refill',
      '6899ddfca959c6001142af63': 'Silk Dental Floss',
      '6691b18f587ef300121585d8': 'Safety Razor Blades for Flon Razors',
      '6691adcebde5570012895de5': 'Flon Insulated Water Bottle',
    };
    
    try {
      const uniqueProductIds = [...new Set(reviews.map((review: any) => review.product_id))].map(id => String(id));
      
      console.log('🔍 Unique product IDs to fetch:', uniqueProductIds);
      
      // Use the product service to get products by IDs
      const products = await getProductsByIds(uniqueProductIds);
      
      console.log('✅ Products returned from getProductsByIds:', products.length);
      console.log('📦 Detailed products:', products.map(p => ({ id: p.id, name: p.name })));
      
      // Map products to names
      products.forEach(product => {
        productNames[product.id] = product.name;
        console.log(`✅ Mapped product: ${product.id} -> "${product.name}"`);
      });
      
      // For any product IDs that weren't found, check fallback
      uniqueProductIds.forEach(productId => {
        if (!productNames[productId]) {
          console.log(`⚠️ Product ${productId} not found in API results, using fallback`);
          if (knownProducts[productId]) {
            productNames[productId] = knownProducts[productId];
            console.log(`📝 Used fallback: ${productId} -> "${knownProducts[productId]}"`);
          } else {
            productNames[productId] = `Product ${productId.slice(-8)}`;
            console.log(`📝 Used generic name: ${productId} -> "Product ${productId.slice(-8)}"`);
          }
        }
      });
      
      console.log('🏁 Final product names mapping:', productNames);
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
