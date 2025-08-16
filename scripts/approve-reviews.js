/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Read the reviews file
const reviewsPath = path.join(__dirname, '..', 'data', 'reviews.json');
const reviewsData = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

console.log(`📋 Found ${reviewsData.reviews.length} total reviews`);

// Count current status
const statusCounts = {};
reviewsData.reviews.forEach(r => {
  statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
});

console.log('Current status:');
Object.entries(statusCounts).forEach(([status, count]) => {
  console.log(`  ${status}: ${count} reviews`);
});

// Approve all pending reviews for the Silk Dental Floss products
let approvedCount = 0;
const targetProductIds = [
  '6691a9fd1034680012078368', // Silk Dental Floss Refill
  '61b4115d1078bd01333c3132', // Silk Dental Floss
  '6691adcebde5570012895de5'  // Water Bottle
];

reviewsData.reviews.forEach(review => {
  if (review.status === 'pending' && targetProductIds.includes(review.product_id)) {
    review.status = 'approved';
    review.updated_at = new Date().toISOString();
    approvedCount++;
  }
});

// Write the updated reviews back to the file
fs.writeFileSync(reviewsPath, JSON.stringify(reviewsData, null, 2));

console.log(`\n✅ Approved ${approvedCount} reviews for Silk Dental Floss products`);
console.log(`🎉 Reviews are now visible on product pages!`);

// Show final counts
const finalStatusCounts = {};
reviewsData.reviews.forEach(r => {
  finalStatusCounts[r.status] = (finalStatusCounts[r.status] || 0) + 1;
});

console.log('\nFinal status:');
Object.entries(finalStatusCounts).forEach(([status, count]) => {
  console.log(`  ${status}: ${count} reviews`);
});