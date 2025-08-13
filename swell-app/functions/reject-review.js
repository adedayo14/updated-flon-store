module.exports = {
  name: 'reject-review',
  description: 'Reject a review',
  async run(context) {
    const { review_id, admin_user_id, rejection_reason } = context.params;
    
    if (!review_id) {
      throw new Error('Review ID is required');
    }
    
    if (!admin_user_id) {
      throw new Error('Admin user ID is required');
    }
    
    if (!rejection_reason) {
      throw new Error('Rejection reason is required');
    }
    
    // Check if user has admin permissions
    const adminUser = await context.app.models.accounts.get(admin_user_id);
    if (!adminUser || !adminUser.role || adminUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }
    
    // Get the review
    const review = await context.app.models.reviews.get(review_id);
    if (!review) {
      throw new Error('Review not found');
    }
    
    // Update review status
    const updatedReview = await context.app.models.reviews.update(review_id, {
      status: 'rejected',
      is_approved: false,
      rejection_reason: rejection_reason,
      approved_by: admin_user_id
    });
    
    // Send notification to review author
    await context.app.models.notifications.create({
      user_id: review.user_id,
      type: 'review_rejected',
      title: 'Your review has been rejected',
      message: `Your review for "${review.title}" has been rejected. Reason: ${rejection_reason}`,
      data: {
        review_id: review_id,
        product_id: review.product_id,
        rejection_reason: rejection_reason
      }
    });
    
    return {
      success: true,
      review: updatedReview
    };
  }
}; 