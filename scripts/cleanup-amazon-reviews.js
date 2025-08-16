#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

/**
 * Clean up imported Amazon reviews
 * - Replace "Amazon Customer", "Amazon", etc. with real names
 * - Remove "[Translated]" text
 * - Clean up review content
 */

// List of realistic replacement names
const REPLACEMENT_NAMES = [
  'Jane Smith', 'Michael Johnson', 'Sarah Wilson', 'David Brown', 'Emma Davis',
  'James Miller', 'Lisa Garcia', 'Robert Anderson', 'Maria Martinez', 'John Taylor',
  'Jennifer Thompson', 'William Lee', 'Ashley White', 'Christopher Harris', 'Jessica Clark',
  'Matthew Lewis', 'Amanda Robinson', 'Daniel Walker', 'Rachel Young', 'Ryan Hall',
  'Laura Allen', 'Kevin King', 'Stephanie Wright', 'Brandon Scott', 'Nicole Green',
  'Justin Adams', 'Megan Baker', 'Tyler Nelson', 'Samantha Carter', 'Andrew Mitchell',
  'Rebecca Perez', 'Jacob Roberts', 'Hannah Turner', 'Nathan Phillips', 'Victoria Campbell',
  'Ethan Parker', 'Olivia Evans', 'Alexander Edwards', 'Grace Collins', 'Benjamin Stewart'
];

function getRandomName() {
  return REPLACEMENT_NAMES[Math.floor(Math.random() * REPLACEMENT_NAMES.length)];
}

function shouldReplaceName(name) {
  const lowerName = name.toLowerCase();
  return lowerName.includes('amazon') || 
         lowerName === 'amazon customer' ||
         lowerName === 'customer' ||
         lowerName.trim() === '' ||
         lowerName === 'n' ||
         lowerName.length <= 2;
}

function cleanText(text) {
  if (!text) return text;
  
  // Remove [Translated] tags
  let cleaned = text.replace(/\[Translated\]\s*/gi, '');
  
  // Remove extra spaces and clean up formatting
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

function cleanupReviews() {
  const reviewsFilePath = path.join(__dirname, '../data/reviews.json');
  
  if (!fs.existsSync(reviewsFilePath)) {
    console.error('❌ Reviews file not found');
    return;
  }
  
  const reviewsData = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf8'));
  const usedNames = new Set();
  let cleanedCount = 0;
  
  // Clean up reviews
  reviewsData.reviews.forEach(review => {
    let wasModified = false;
    
    // Clean up reviewer name
    if (shouldReplaceName(review.user_name)) {
      let newName;
      do {
        newName = getRandomName();
      } while (usedNames.has(newName));
      
      usedNames.add(newName);
      console.log(`📝 Replacing name: "${review.user_name}" → "${newName}"`);
      review.user_name = newName;
      wasModified = true;
    }
    
    // Clean up title
    const originalTitle = review.title;
    review.title = cleanText(review.title);
    if (review.title !== originalTitle) {
      console.log(`🏷️  Cleaned title: "${originalTitle}" → "${review.title}"`);
      wasModified = true;
    }
    
    // Clean up review body
    const originalBody = review.review_body;
    review.review_body = cleanText(review.review_body);
    if (review.review_body !== originalBody) {
      console.log(`📄 Cleaned review body for ${review.user_name}`);
      wasModified = true;
    }
    
    if (wasModified) {
      review.updated_at = new Date().toISOString();
      cleanedCount++;
    }
  });
  
  // Write back to file
  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviewsData, null, 2));
  
  console.log(`\n✅ Cleanup completed!`);
  console.log(`📊 Cleaned ${cleanedCount} reviews`);
  console.log(`📝 Total reviews: ${reviewsData.reviews.length}`);
}

// Run cleanup
if (require.main === module) {
  console.log('🧹 Starting Amazon reviews cleanup...\n');
  cleanupReviews();
}

module.exports = { cleanupReviews };
