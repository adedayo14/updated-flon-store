import React, { useState, useRef } from 'react';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Textarea from 'components/atoms/Textarea';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type { ReviewFormProps, CreateReviewRequest, Rating } from 'types/shared/reviews';

const ReviewForm: React.FC<ReviewFormProps> = ({
  product_id,
  product_name,
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  className,
}) => {
  const [rating, setRating] = useState<Rating | 0>(initialData?.rating || 0);
  const [title, setTitle] = useState(initialData?.title || '');
  const [reviewBody, setReviewBody] = useState(initialData?.review_body || '');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!rating) {
      newErrors.rating = 'Please select a rating';
    }

    if (!title.trim()) {
      newErrors.title = 'Review title is required';
    } else if (title.length > 255) {
      newErrors.title = 'Title must be 255 characters or less';
    }

    if (!reviewBody.trim()) {
      newErrors.reviewBody = 'Review content is required';
    } else if (reviewBody.length > 2000) {
      newErrors.reviewBody = 'Review must be 2000 characters or less';
    }

    if (images.length > 5) {
      newErrors.images = 'Maximum 5 images allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData: CreateReviewRequest = {
        product_id,
        rating: rating as Rating,
        title: title.trim(),
        review_body: reviewBody.trim(),
        images: images.length > 0 ? images : undefined,
      };

      await onSubmit(reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
      
      // Show more specific error messages
      let errorMessage = 'Failed to submit review. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('User not authenticated') || error.message.includes('401')) {
          errorMessage = 'Please log in to submit a review.';
        } else if (error.message.includes('400')) {
          errorMessage = 'Please check your review details and try again.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Server error. Please try again later.';
        }
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrors({ images: 'Only image files are allowed' });
        return false;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ images: 'Images must be 5MB or smaller' });
        return false;
      }
      
      return true;
    });

    if (validFiles.length + images.length > 5) {
      setErrors({ images: 'Maximum 5 images allowed' });
      return;
    }

    setImages(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const getStarDisplay = (rating: Rating) => {
    return (
      <div className="flex items-center gap-1">
        {([1, 2, 3, 4, 5] as Rating[]).map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            {star <= rating ? '★' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto ${className || ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          {isEditing ? 'Edit Review' : 'Write a Review'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-body">
          Reviewing: <span className="font-medium">{product_name}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Rating *
          </label>
          <div className="flex items-center gap-3">
            {getStarDisplay(rating as Rating)}
            <span className="text-sm text-body">
              {rating ? `${rating} out of 5 stars` : 'Select a rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
            Review Title *
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            maxLength={255}
            className={errors.title ? 'border-red-500' : ''}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
            <span className="text-xs text-body ml-auto">
              {title.length}/255
            </span>
          </div>
        </div>

        {/* Review Body */}
        <div>
          <label htmlFor="reviewBody" className="block text-sm font-medium text-primary mb-2">
            Review Content *
          </label>
          <Textarea
            id="reviewBody"
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
            placeholder="Share your detailed experience with this product..."
            rows={6}
            maxLength={2000}
            className={errors.reviewBody ? 'border-red-500' : ''}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.reviewBody && (
              <p className="text-red-500 text-sm">{errors.reviewBody}</p>
            )}
            <span className="text-xs text-body ml-auto">
              {reviewBody.length}/2000
            </span>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Photos (Optional)
          </label>
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Upload review images"
            />
            <Button
              type="button"
              elType={BUTTON_TYPE.BUTTON}
              buttonStyle={BUTTON_STYLE.SECONDARY}
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= 5}
            >
              📷 Add Photos ({images.length}/5)
            </Button>
            
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button
            type="button"
            elType={BUTTON_TYPE.BUTTON}
            buttonStyle={BUTTON_STYLE.SECONDARY}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            elType={BUTTON_TYPE.BUTTON}
            buttonStyle={BUTTON_STYLE.PRIMARY}
            disabled={isSubmitting || !rating}
          >
            {isSubmitting ? 'Submitting...' : isEditing ? 'Update Review' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm; 