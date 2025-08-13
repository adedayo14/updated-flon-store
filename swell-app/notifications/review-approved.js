module.exports = {
  name: 'review-approved',
  subject: 'Your review has been approved!',
  template: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Your review has been approved!</h2>
      <p>Hi there,</p>
      <p>Great news! Your review for <strong>{{product_name}}</strong> has been approved and is now visible on our product page.</p>
      <p>Your review title: <strong>"{{review_title}}"</strong></p>
      <p>Thank you for taking the time to share your experience with our community!</p>
      <p>Best regards,<br>The FLON Team</p>
    </div>
  `,
  variables: ['product_name', 'review_title']
}; 