module.exports = {
  name: 'review-rejected',
  subject: 'Your review needs some adjustments',
  template: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Your review needs some adjustments</h2>
      <p>Hi there,</p>
      <p>We've reviewed your submission for <strong>{{product_name}}</strong> and found that it doesn't meet our community guidelines.</p>
      <p>Your review title: <strong>"{{review_title}}"</strong></p>
      <p><strong>Reason for rejection:</strong> {{rejection_reason}}</p>
      <p>Please review our guidelines and feel free to submit a new review that meets our standards.</p>
      <p>Thank you for understanding,<br>The FLON Team</p>
    </div>
  `,
  variables: ['product_name', 'review_title', 'rejection_reason']
}; 