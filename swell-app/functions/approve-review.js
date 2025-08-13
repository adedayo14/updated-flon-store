module.exports = {
  name: 'approve-review',
  description: 'Approve a review',
  async run(context) {
    const { review_id, admin_user_id } = context.params;
    
    if (!review_id) {
      throw new Error('Review ID is required');
    }
    
    if (!admin_user_id) {
      throw new Error('Admin user ID is required');
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
      status: 'approved',
      is_approved: true,
      approved_at: new Date().toISOString(),
      approved_by: admin_user_id
    });
    
    // Send notification to review author
    await context.app.models.notifications.create({
      user_id: review.user_id,
      type: 'review_approved',
      title: 'Your review has been approved',
      message: `Your review for "${review.title}" has been approved and is now visible on the product page.`,
      data: {
        review_id: review_id,
        product_id: review.product_id
      }
    });
    
    return {
      success: true,
      review: updatedReview
    };
  }
}; 