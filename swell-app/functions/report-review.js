module.exports = {
  name: 'report-review',
  description: 'Report a review',
  async run(context) {
    const { review_id, user_id, reason } = context.params;
    
    if (!review_id) {
      throw new Error('Review ID is required');
    }
    
    if (!user_id) {
      throw new Error('User ID is required');
    }
    
    if (!reason) {
      throw new Error('Report reason is required');
    }
    
    // Get the review
    const review = await context.app.models.reviews.get(review_id);
    if (!review) {
      throw new Error('Review not found');
    }
    
    // Check if user already reported this review
    const existingReport = review.interactions?.find(
      interaction => interaction.user_id === user_id && interaction.type === 'report'
    );
    
    if (existingReport) {
      throw new Error('You have already reported this review');
    }
    
    // Add report
    const newInteraction = {
      user_id: user_id,
      type: 'report',
      created_at: new Date().toISOString(),
      reason: reason
    };
    
    const updatedInteractions = [...(review.interactions || []), newInteraction];
    
    const updatedReview = await context.app.models.reviews.update(review_id, {
      reported_count: review.reported_count + 1,
      interactions: updatedInteractions
    });
    
    // Send notification to admins if report count reaches threshold
    if (updatedReview.reported_count >= 3) {
      const admins = await context.app.models.accounts.find({
        role: 'admin'
      });
      
      for (const admin of admins) {
        await context.app.models.notifications.create({
          user_id: admin.id,
          type: 'review_reported',
          title: 'Review reported multiple times',
          message: `Review "${review.title}" has been reported ${updatedReview.reported_count} times and may need attention.`,
          data: {
            review_id: review_id,
            product_id: review.product_id,
            report_count: updatedReview.reported_count
          }
        });
      }
    }
    
    return {
      success: true,
      review: updatedReview
    };
  }
}; 