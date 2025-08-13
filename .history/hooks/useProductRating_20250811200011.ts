import { useState, useEffect } from 'react';

export interface ProductRating {
  averageRating: number;
  totalReviews: number;
  loading: boolean;
  error?: string;
}

const useProductRating = (productId: string): ProductRating => {
  const [state, setState] = useState<ProductRating>({
    averageRating: 0,
    totalReviews: 0,
    loading: true,
  });

  useEffect(() => {
    if (!productId) {
      setState({
        averageRating: 0,
        totalReviews: 0,
        loading: false,
      });
      return;
    }

    const fetchRating = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        // Debug log
        console.log('Fetching rating for productId:', productId);
        
        const response = await fetch(`/api/reviews/average?productId=${encodeURIComponent(productId)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch rating');
        }

        const data = await response.json();
        console.log('Rating data received:', data);
        
        setState({
          averageRating: data.averageRating || 0,
          totalReviews: data.totalReviews || 0,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching product rating:', error);
        setState({
          averageRating: 0,
          totalReviews: 0,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchRating();
  }, [productId]);
