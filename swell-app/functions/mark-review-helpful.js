module.exports = {
  name: 'mark-review-helpful',
  description: 'Mark a review as helpful',
  async run(context) {
    const { review_id, user_id } = context.params;
    
    if (!review_id) {
      throw new Error('Review ID is required');
    }
    
    if (!user_id) {
      throw new Error('User ID is required');
    }
    
    // Get the review
    const review = await context.app.models.reviews.get(review_id);
    if (!review) {
      throw new Error('Review not found');
    }
    
    // Check if user already marked this review as helpful
    const existingInteraction = review.interactions?.find(
      interaction => interaction.user_id === user_id && interaction.type === 'helpful'
    );
    
    if (existingInteraction) {
      // Remove helpful mark
      const updatedInteractions = review.interactions.filter(
        interaction => !(interaction.user_id === user_id && interaction.type === 'helpful')
      );
      
      const updatedReview = await context.app.models.reviews.update(review_id, {
        helpful_count: Math.max(0, review.helpful_count - 1),
        interactions: updatedInteractions
      });
      
      return {
        success: true,
        review: updatedReview,
        action: 'removed'
      };
    } else {
      // Add helpful mark
      const newInteraction = {
        user_id: user_id,
        type: 'helpful',
        created_at: new Date().toISOString()
      };
      
      const updatedInteractions = [...(review.interactions || []), newInteraction];
      
      const updatedReview = await context.app.models.reviews.update(review_id, {
        helpful_count: review.helpful_count + 1,
        interactions: updatedInteractions
      });
      
      return {
        success: true,
        review: updatedReview,
        action: 'added'
      };
    }
  }
}; 