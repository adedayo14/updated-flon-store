import type { MandatoryImageProps } from 'types/global';

// Review Rating Type
export type Rating = 1 | 2 | 3 | 4 | 5;

// Review Status
export enum REVIEW_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  HELD = 'held',
}

// Review Interaction Types
export enum INTERACTION_TYPE {
  HELPFUL = 'helpful',
  REPORT = 'report',
}

// Database Schema Types
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  order_id?: string;
  rating: Rating;
  title: string;
  review_body: string;
  is_approved?: boolean;
  is_verified_purchase: boolean;
  helpful_count: number;
  reported_count?: number;
  created_at: string;
  updated_at: string;
  approved_at?: string;
  approved_by?: string;
  status: REVIEW_STATUS;
  images?: ReviewImage[];
  interactions?: ReviewInteraction[];
}

export interface ReviewImage {
  id: string;
  review_id: string;
  image_url: string;
  alt_text?: string;
  created_at: string;
}

export interface ReviewInteraction {
  id: string;
  review_id: string;
  user_id: string;
  interaction_type: INTERACTION_TYPE;
  created_at: string;
}

// Review Summary Types
export interface ReviewSummary {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    [key in Rating]: number;
  };
  verified_purchase_percentage: number;
  recent_reviews_count: number;
}

// Review Eligibility Types
export interface ReviewEligibility {
  canReview: boolean;
  hasPurchased: boolean;
  hasReviewed: boolean;
  reason?: string;
  purchase_date?: string;
  order_id?: string;
  existing_review_id?: string;
  isLoggedIn?: boolean;
}

// API Request/Response Types
export interface CreateReviewRequest {
  product_id: string;
  rating: Rating;
  title: string;
  review_body: string;
  images?: File[];
}

export interface UpdateReviewRequest {
  rating?: Rating;
  title?: string;
  review_body?: string;
  images?: File[];
}

export interface ReviewFilters {
  rating?: Rating;
  verified_only?: boolean;
  sort_by?: 'recent' | 'rating_high' | 'rating_low' | 'helpful' | 'verified';
  search?: string;
  page?: number;
  limit?: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  summary: ReviewSummary;
}

export interface AdminReviewAction {
  action: 'approve' | 'reject' | 'hold' | 'request_edit';
  reason?: string;
  moderation_notes?: string;
}

// Component Props Types
export interface ReviewSummaryProps {
  product_id: string;
  summary: ReviewSummary;
  onWriteReview?: () => void;
  onViewAllReviews?: () => void;
  onRatingFilter?: (rating: Rating) => void;
  className?: string;
}

export interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  onEdit?: (reviewId: string) => void;
  onDelete?: (reviewId: string) => void;
  isOwner?: boolean;
  className?: string;
}

export interface ReviewFormProps {
  product_id: string;
  product_name: string;
  onSubmit: (data: CreateReviewRequest) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<CreateReviewRequest>;
  isEditing?: boolean;
  className?: string;
}

export interface ReviewFiltersProps {
  filters: ReviewFilters;
  onFiltersChange: (filters: ReviewFilters) => void;
  total_reviews: number;
  className?: string;
}

export interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onReviewAction?: (reviewId: string, action: string) => void;
  className?: string;
}

// Admin Types
export interface AdminReviewStats {
  pending_count: number;
  approved_count: number;
  rejected_count: number;
  total_reviews: number;
  average_approval_time: number;
}

export interface AdminReviewListItem {
  review: Review;
  product: {
    id: string;
    name: string;
    image?: MandatoryImageProps;
  };
  user: {
    id: string;
    name: string;
    email: string;
    review_count: number;
  };
  order: {
    id: string;
    date: string;
    total: number;
  };
}

// Utility Types
export interface ReviewStats {
  total_reviews: number;
  average_rating: number;
  rating_breakdown: Record<Rating, number>;
  verified_purchases: number;
  recent_reviews: number;
}

export interface ReviewAnalytics {
  sentiment_score: number;
  common_keywords: string[];
  conversion_impact: number;
  response_rate: number;
} 