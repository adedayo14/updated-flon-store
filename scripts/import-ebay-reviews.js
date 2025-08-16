/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Real names to replace eBay usernames
const realNames = [
  'Thomas Wilson', 'Sophie Martin', 'Jake Rodriguez', 'Emily Thompson', 'Oliver Davis',
  'Charlotte Brown', 'William Johnson', 'Amelia Garcia', 'Henry Miller', 'Isla Anderson',
  'George Taylor', 'Ava Wilson', 'Charlie Moore', 'Grace Jackson', 'Oscar White',
  'Ruby Harris', 'Leo Clark', 'Freya Lewis', 'Arthur Walker', 'Ivy Young',
  'Archie Hall', 'Poppy Allen', 'Harrison King', 'Willow Wright', 'Freddie Lopez',
  'Daisy Hill', 'Alfie Scott', 'Violet Green', 'Theodore Adams', 'Luna Baker',
  'Felix Nelson', 'Aurora Carter', 'Sebastian Mitchell', 'Nova Perez', 'Jasper Roberts',
  'Stella Turner', 'Finn Phillips', 'Maya Campbell', 'Atticus Parker', 'Hazel Evans',
  'Silas Edwards', 'Zoe Collins', 'Miles Stewart', 'Cora Sanchez', 'Julian Morris',
  'Nora Rogers', 'Adrian Reed', 'Ellie Cook', 'Ezra Bailey', 'Lucy Cooper'
];

// Product mapping for eBay products to Swell product IDs
const productMapping = {
  'Silk Dental Floss': '61b4115d1078bd01333c3132',
  'Silk Dental Floss Refill': '6691a9fd1034680012078368',
  'Natural Body Scrub': 'flon-shea-butter' // fallback for unmapped products
};

function cleanText(text) {
  if (!text) return '';
  
  return text
    // Remove eBay-related words
    .replace(/ebay/gi, '')
    .replace(/verified purchase/gi, '')
    .replace(/buyer/gi, '')
    .replace(/seller/gi, 'store')
    
    // Clean up extra spaces and formatting
    .replace(/\s+/g, ' ')
    .replace(/["']/g, '') // Remove quotes
    .trim();
}

function generateRealName(originalName, index) {
  // If it's already a real-looking name (has both first and last), keep it
  if (originalName && originalName.includes(' ') && originalName.length > 5 && !originalName.includes('-') && !originalName.includes('_')) {
    return cleanText(originalName);
  }
  
  // Otherwise assign a real name
  return realNames[index % realNames.length];
}

function convertFeedbackToRating(feedback) {
  const feedbackLower = feedback.toLowerCase();
  
  // Convert eBay feedback to 1-5 star rating based on sentiment
  if (feedbackLower.includes('excellent') || feedbackLower.includes('amazing') || feedbackLower.includes('perfect') || feedbackLower.includes('outstanding')) {
    return 5;
  } else if (feedbackLower.includes('great') || feedbackLower.includes('good') || feedbackLower.includes('fantastic') || feedbackLower.includes('wonderful')) {
    return 5;
  } else if (feedbackLower.includes('fast') || feedbackLower.includes('quick') || feedbackLower.includes('prompt') || feedbackLower.includes('thanks') || feedbackLower.includes('thank you')) {
    return 5;
  } else if (feedbackLower.includes('ok') || feedbackLower.includes('okay') || feedbackLower.includes('fine') || feedbackLower.includes('decent')) {
    return 4;
  } else if (feedbackLower.includes('poor') || feedbackLower.includes('bad') || feedbackLower.includes('terrible') || feedbackLower.includes('awful')) {
    return 2;
  } else {
    // Default to 5 stars for positive-sounding feedback
    return 5;
  }
}

async function importEbayReviews() {
  try {
    const csvFilePath = '/Users/dayo/Downloads/ebay_feedback_mapped.csv';
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
            // Get values from CSV
            const feedback = row.Feedback || row.feedback || '';
            const originalName = row.From || row.from || row.buyer || '';
            const itemTitle = row['Item Title'] || row.item_title || '';
            const productName = row['Store Product Name'] || row.product_name || 'Silk Dental Floss';
            const productId = row['Store Product ID'] || row.product_id || '';
            const verifiedPurchase = (row['Verified Purchase'] || row.verified_purchase || '').toLowerCase().includes('verified');
            
            // Generate clean name
            const cleanName = generateRealName(originalName, nameIndex++);
            
            // Clean the feedback text
            const cleanedFeedback = cleanText(feedback);
            
            // Convert feedback sentiment to rating
            const rating = convertFeedbackToRating(feedback);
            
            if (cleanedFeedback.trim()) {
              // Map product to Swell ID
              const swellProductId = productMapping[productName] || productId || 'flon-shea-butter';
              
              // Create review object
              const newReview = {
                id: String(reviewsData.nextId++),
                product_id: swellProductId,
                user_id: `user-${reviewsData.nextId}`,
                user_name: cleanName,
                rating: Math.min(5, Math.max(1, rating)),
                title: '', // Empty title as requested
                review_body: cleanedFeedback,
                status: 'pending', // Will need approval
                is_verified_purchase: verifiedPurchase,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                helpful_count: 0
              };
              
              newReviews.push(newReview);
              console.log(`✅ Processed eBay feedback from ${cleanName} for ${productName} (${rating}⭐)`);
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
          
          console.log(`\n🎉 Successfully imported ${newReviews.length} eBay reviews`);
          console.log(`📁 Reviews saved to: ${reviewsFilePath}`);
          console.log(`🔢 Next review ID: ${reviewsData.nextId}`);
          
          // Show summary by product
          const productCounts = {};
          const ratingCounts = {};
          newReviews.forEach(r => {
            productCounts[r.product_id] = (productCounts[r.product_id] || 0) + 1;
            ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
          });
          
          console.log('\n📦 eBay reviews imported by product:');
          Object.entries(productCounts).forEach(([id, count]) => {
            const productName = id === '61b4115d1078bd01333c3132' ? 'Silk Dental Floss' : 
                               id === '6691a9fd1034680012078368' ? 'Silk Dental Floss Refill' : id;
            console.log(`  ${productName}: ${count} reviews`);
          });
          
          console.log('\n⭐ Rating distribution:');
          Object.entries(ratingCounts).sort((a, b) => b[0] - a[0]).forEach(([rating, count]) => {
            console.log(`  ${rating} stars: ${count} reviews`);
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
    console.error('Error importing eBay reviews:', error);
    throw error;
  }
}

// Run the import
if (require.main === module) {
  importEbayReviews()
    .then(() => {
      console.log('\n✅ eBay review import completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Import failed:', error);
      process.exit(1);
    });
}

module.exports = { importEbayReviews };
