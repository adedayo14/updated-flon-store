import { useState, useEffect } from 'react';

interface ProductRating {
  averageRating: number;
  totalReviews: number;
  loading: boolean;
  error: string | null;
}

const useProductRating = (productId: string): ProductRating => {
  const [rating, setRating] = useState<ProductRating>({
    averageRating: 0,
    totalReviews: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!productId) {
      setRating(prev => ({ ...prev, loading: false }));
      return;
    }

    const fetchRating = async () => {
      try {
        setRating(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await fetch(`/api/reviews/average?productId=${productId}`);
        
        if (response.ok) {
          const data = await response.json();
          setRating({
            averageRating: data.averageRating || 0,
            totalReviews: data.totalReviews || 0,
            loading: false,
            error: null,
          });
        } else {
          setRating(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to fetch rating',
          }));
        }
      } catch (error) {
        setRating(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch rating',
        }));
      }
    };

    fetchRating();
  }, [productId]);

  return rating;
};

export default useProductRating;
