import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StarRatingDisplay from '../components/atoms/StarRatingDisplay/StarRatingDisplay';
import ReviewsSection from '../components/organisms/ReviewsSection/ReviewsSection';

interface ReviewData {
  averageRating: number;
  totalReviews: number;
}

const ReviewDemo: React.FC = () => {
  // This is the product ID that has sample reviews in our system
  const productId = '6691a9fd1034680012078368';
  const [reviewData, setReviewData] = useState<ReviewData>({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(`/api/reviews/average?productId=${productId}`);
        if (response.ok) {
          const data = await response.json();
          setReviewData({
            averageRating: data.averageRating || 0,
            totalReviews: data.totalReviews || 0
          });
        }
      } catch (error) {
        console.error('Error fetching review data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [productId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Review System Demo
          </h1>
          <p className="text-gray-600 mb-8">
            This demo shows the review system working with sample product ID: {productId}
          </p>

          {/* Product Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Sample Product: Premium Dental Floss
            </h2>
            <p className="text-blue-700 mb-4">
              This is a demo product with 3 sample reviews (ratings: 5, 4, 5) 
              which creates an average of 4.7/5 stars.
            </p>
          </div>

          {/* Star Rating Display */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Star Rating Display Component:
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              {loading ? (
                <div className="animate-pulse">Loading rating...</div>
              ) : (
                <StarRatingDisplay 
                  rating={reviewData.averageRating}
                  totalReviews={reviewData.totalReviews}
                  size="large"
                  showText={true}
                />
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reviews Section Component:
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ReviewsSection productId={productId} />
            </div>
          </div>

          {/* Admin Info */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Admin Dashboard Access:
            </h3>
            <p className="text-yellow-700 mb-2">
              <strong>URL:</strong> <Link href="/admin" className="text-blue-600 hover:underline">http://localhost:3001/admin</Link>
            </p>
            <p className="text-yellow-700">
              <strong>Password:</strong> <code className="bg-yellow-200 px-2 py-1 rounded">Adedayo01</code>
            </p>
          </div>

          {/* Environment Variable Info */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              About ADMIN_TOKEN_SECRET:
            </h3>
            <p className="text-green-700 mb-2">
              The <code className="bg-green-200 px-2 py-1 rounded">ADMIN_TOKEN_SECRET</code> is a security key used to:
            </p>
            <ul className="list-disc list-inside text-green-700 space-y-1">
              <li>Generate secure authentication tokens for admin login</li>
              <li>Ensure admin sessions are properly validated</li>
              <li>Prevent unauthorized access to admin features</li>
            </ul>
            <p className="text-green-700 mt-3">
              <strong>Current value:</strong> <code className="bg-green-200 px-2 py-1 rounded">&quot;your-secret-key-change-in-production&quot;</code>
            </p>
            <p className="text-green-700 mt-2 text-sm">
              <strong>Note:</strong> In production, this should be changed to a strong, unique secret key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDemo;
