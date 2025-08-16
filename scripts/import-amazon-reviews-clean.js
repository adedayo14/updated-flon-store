/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Real names to replace Amazon-style usernames
const realNames = [
  'Sarah Johnson', 'Michael Chen', 'Emma Rodriguez', 'David Thompson', 'Lisa Anderson',
  'James Wilson', 'Maria Garcia', 'Robert Brown', 'Jennifer Davis', 'Christopher Lee',
  'Amanda Martinez', 'Daniel Kim', 'Jessica Taylor', 'Matthew Jones', 'Ashley Miller',
  'Ryan White', 'Nicole Harris', 'Kevin Clark', 'Stephanie Lewis', 'Brandon Walker',
  'Rachel Green', 'Justin Hall', 'Megan Young', 'Tyler Adams', 'Lauren Scott',
  'Jordan Baker', 'Samantha King', 'Andrew Wright', 'Brittany Turner', 'Marcus Phillips',
  'Olivia Campbell', 'Nathan Parker', 'Victoria Evans', 'Zachary Mitchell', 'Danielle Carter',
  'Cameron Roberts', 'Alexis Morris', 'Trevor Cook', 'Melissa Bailey', 'Connor Reed',
  'Hannah Cooper', 'Austin Richardson', 'Courtney Ward', 'Blake Foster', 'Morgan Brooks',
  'Gabriel Hughes', 'Jenna Price', 'Ethan Bennett', 'Kimberly Wood', 'Ian Russell'
];

// Product mapping for Amazon products to Swell product IDs
const productMapping = {
  'Silk Dental Floss': '61b4115d1078bd01333c3132',
  'Silk Dental Floss Refill': '6691a9fd1034680012078368',
  'Natural Body Scrub': 'flon-shea-butter' // fallback for unmapped products
};

function cleanText(text) {
  if (!text) return '';
  
  return text
    // Remove Amazon-related words
    .replace(/amazon/gi, '')
    .replace(/amazon customer/gi, '')
    .replace(/verified purchase/gi, '')
    .replace(/vine customer/gi, '')
    
    // Remove translation-related words
    .replace(/\(translated from [^)]+\)/gi, '')
    .replace(/translated from [a-z]+/gi, '')
    .replace(/\btranslated\b/gi, '')
    
    // Clean up extra spaces and formatting
    .replace(/\s+/g, ' ')
    .trim();
}

function generateRealName(originalName, index) {
  // If it's already a real-looking name (has both first and last), keep it
  if (originalName && originalName.includes(' ') && !originalName.toLowerCase().includes('customer') && originalName.length > 3) {
    return cleanText(originalName);
  }
  
  // Otherwise assign a real name
  return realNames[index % realNames.length];
}

function combineTitleAndReview(title, review) {
  const cleanTitle = cleanText(title || '');
  const cleanReview = cleanText(review || '');
  
  if (!cleanTitle) return cleanReview;
  if (!cleanReview) return cleanTitle;
  
  // If the review already starts with the title, don't duplicate
  if (cleanReview.toLowerCase().startsWith(cleanTitle.toLowerCase())) {
    return cleanReview;
  }
  
  // Combine title and review with proper formatting
  return `${cleanTitle}. ${cleanReview}`;
}

async function importAmazonReviews() {
  try {
    const csvFilePath = '/Users/dayo/Downloads/amazon_reviews_filtered_4_5_star.csv';
    const reviewsFilePath = path.join(__dirname, '..', 'data', 'reviews.json');
    
    // Read existing reviews
    let reviewsData = { reviews: [], nextId: 1 };
    if (fs.existsSync(reviewsFilePath)) {
      try {
        const existingData = fs.readFileSync(reviewsFilePath, 'utf8');
        if (existingData.trim()) {
          reviewsData = JSON.parse(existingData);
        }
      } catch (error) {
        console.log('Creating new reviews file (existing file was invalid)');
        reviewsData = { reviews: [], nextId: 1 };
      }
    }
    
    const newReviews = [];
    let nameIndex = 0;
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          try {
            // Get values from CSV (handle different column naming)
            const originalName = row.Name || row.name || row.USER_NAME || row.user_name || '';
            const date = row.Date || row.date || row.CREATED_AT || row.created_at || '';
            const rating = parseFloat(row.Rating || row.rating || row.RATING || '5');
            const title = row.Title || row.title || row.TITLE || '';
            const review = row.Review || row.review || row.REVIEW || row.review_body || '';
            const productName = row.Product || row.product || row.PRODUCT || 'Silk Dental Floss';
            const productId = row['Product ID'] || row.product_id || row.PRODUCT_ID || '';
            
            // Generate clean name
            const cleanName = generateRealName(originalName, nameIndex++);
            
            // Combine title and review
            const combinedReview = combineTitleAndReview(title, review);
            
            if (combinedReview.trim()) {
              // Map product to Swell ID
              const swellProductId = productMapping[productName] || productId || 'flon-shea-butter';
              
              // Create review object
              const newReview = {
                id: String(reviewsData.nextId++),
                product_id: swellProductId,
                user_id: `user-${reviewsData.nextId}`,
                user_name: cleanName,
                rating: Math.min(5, Math.max(1, Math.round(rating))),
                title: '', // Empty title as requested
                review_body: combinedReview,
                status: 'pending', // Will need approval
                is_verified_purchase: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                helpful_count: 0
              };
              
              newReviews.push(newReview);
              console.log(`✅ Processed review from ${cleanName} for ${productName}`);
            }
          } catch (error) {
            console.error('Error processing row:', error);
          }
        })
        .on('end', () => {
          // Add new reviews to existing data
          reviewsData.reviews.push(...newReviews);
          
          // Save updated reviews
          fs.writeFileSync(reviewsFilePath, JSON.stringify(reviewsData, null, 2));
          
          console.log(`\n🎉 Successfully imported ${newReviews.length} Amazon reviews`);
          console.log(`📁 Reviews saved to: ${reviewsFilePath}`);
          console.log(`🔢 Next review ID: ${reviewsData.nextId}`);
          
          // Show summary by product
          const productCounts = {};
          newReviews.forEach(r => {
            productCounts[r.product_id] = (productCounts[r.product_id] || 0) + 1;
          });
          
          console.log('\n📦 Reviews imported by product:');
          Object.entries(productCounts).forEach(([id, count]) => {
            console.log(`  ${id}: ${count} reviews`);
          });
          
          console.log('\n⚠️  All reviews are set to "pending" status and need approval to be visible');
          
          resolve(newReviews);
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  } catch (error) {
    console.error('Error importing reviews:', error);
    throw error;
  }
}

// Run the import
if (require.main === module) {
  importAmazonReviews()
    .then(() => {
      console.log('\n✅ Amazon review import completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Import failed:', error);
      process.exit(1);
    });
}

module.exports = { importAmazonReviews };
