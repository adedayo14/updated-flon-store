/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Read the reviews file
const reviewsPath = path.join(__dirname, '..', 'data', 'reviews.json');
const reviewsData = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

console.log(`📋 Processing ${reviewsData.reviews.length} reviews...`);

// Process each review to combine title and review_body
reviewsData.reviews.forEach((review, index) => {
  if (review.title && review.review_body) {
    // Combine title and review_body
    const combinedReview = `${review.title} ${review.review_body}`;
    
    // Update the review_body with the combined text
    review.review_body = combinedReview;
    
    // Remove the title field or set it to empty
    review.title = '';
    
    console.log(`✅ Combined review ${index + 1}: "${review.title.substring(0, 50)}..." + "${review.review_body.substring(0, 50)}..."`);
  } else if (review.title && !review.review_body) {
    // If there's only a title, move it to review_body
    review.review_body = review.title;
    review.title = '';
    console.log(`📝 Moved title to review_body for review ${index + 1}`);
  } else if (!review.title && review.review_body) {
    // If there's only review_body, leave as is but ensure title is empty
    review.title = '';
    console.log(`✓ Review ${index + 1} already has no title`);
  }
});

// Write the updated reviews back to the file
fs.writeFileSync(reviewsPath, JSON.stringify(reviewsData, null, 2));

console.log(`\n🎉 Successfully combined titles and reviews for all ${reviewsData.reviews.length} reviews`);
console.log(`📁 Updated file: ${reviewsPath}`);
