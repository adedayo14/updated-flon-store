#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * CSV Review Import Tool for FLON
 * 
 * Transforms CSV reviews from Etsy, Amazon, eBay into FLON's JSON format
 * All imported reviews are marked as verified purchases
 * 
 * Expected CSV columns (flexible names - script will detect):
 * - product_name/product/item_name: Product name to match against your product catalog
 * - rating/stars/score: Rating (1-5)
 * - title/review_title/subject: Review title
 * - review/review_body/comment/text: Review content
 * - reviewer_name/customer_name/name: Customer name
 * - date/review_date/created_at: Review date
 * - platform/source: Platform (etsy/amazon/ebay) - optional
 * - order_id: Order ID - optional
 */

// Product name to ID mapping - Update this with your actual products
const PRODUCT_MAPPING = {
  'silk dental floss starter pack': '6899ddfca959c6001142af63',
  'safety razor blades': '6691b18f587ef300121585d8',
  'insulated stainless steel water bottle': '6691adcebde5570012895de5',
  'silk dental floss refill': '6691a9fd1034680012078368',
  'natural sisal soap washcloth': '66918e7e1034680012075673',
  'adult bamboo toothbrush': '669182c262973100121e2251',
  'shaving gift set': '65a395820bbb900012d51c10',
  'the single 2.0 razor': '65a3252536440c00128d6641',
  'reusable safety razor': '65a32493d5954b00127c9554',
  'drawstring razor pouch': '6599dcd2fc8ff600127106bc',
  'silk dental floss': '61b4115d1078bd01333c3132',
  'ose abuwe soap refill': '61b41003ad0d1c01324db345',
  'natural rubber hair ties': '61b40faff6c00701331ed6a5'
};

// Column name variations for flexible CSV parsing
const COLUMN_MAPPINGS = {
  product: ['product_name', 'product', 'item_name', 'product_title', 'item'],
  rating: ['rating', 'stars', 'score', 'star_rating'],
  title: ['title', 'review_title', 'subject', 'headline'],
  review_body: ['review', 'review_body', 'comment', 'text', 'description'],
  reviewer_name: ['reviewer_name', 'customer_name', 'name', 'user_name'],
  date: ['date', 'review_date', 'created_at', 'created', 'timestamp'],
  platform: ['platform', 'source', 'marketplace'],
  order_id: ['order_id', 'order', 'purchase_id'],
  product_id: ['product_id', 'product id', 'productid']
};

function findColumn(headers, columnType) {
  const variations = COLUMN_MAPPINGS[columnType];
  return variations.find(variation => 
    headers.some(header => header.toLowerCase().includes(variation.toLowerCase()))
  );
}

function getColumnValue(row, headers, columnType) {
  const columnName = findColumn(headers, columnType);
  if (!columnName) return null;
  
  const exactMatch = Object.keys(row).find(key => key.toLowerCase() === columnName.toLowerCase());
  if (exactMatch) return row[exactMatch];
  
  const partialMatch = Object.keys(row).find(key => 
    key.toLowerCase().includes(columnName.toLowerCase())
  );
  return partialMatch ? row[partialMatch] : null;
}

function findProductId(productName) {
  if (!productName) return null;
  
  const normalizedName = productName.toLowerCase().trim();
  
  // Direct match
  if (PRODUCT_MAPPING[normalizedName]) {
    return PRODUCT_MAPPING[normalizedName];
  }
  
  // Partial match
  for (const [key, id] of Object.entries(PRODUCT_MAPPING)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return id;
    }
  }
  
  return null;
}

function parseDate(dateString) {
  if (!dateString) return new Date().toISOString();
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function generateUserId(reviewerName, platform = 'imported') {
  const cleanName = reviewerName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${platform}-${cleanName}-${Date.now()}`;
}

async function importCSVReviews(csvFilePath) {
  const reviewsFilePath = path.join(__dirname, '../data/reviews.json');
  
  // Read existing reviews
  let existingData = { reviews: [], nextId: 1 };
  if (fs.existsSync(reviewsFilePath)) {
    existingData = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf8'));
  }
  
  const newReviews = [];
  const skippedReviews = [];
  let currentId = existingData.nextId || 1;
  
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const headers = Object.keys(row);
        
        // Extract data from CSV row
        const productName = getColumnValue(row, headers, 'product');
        const rating = parseFloat(getColumnValue(row, headers, 'rating'));
        const title = getColumnValue(row, headers, 'title');
        const reviewBody = getColumnValue(row, headers, 'review_body');
        const reviewerName = getColumnValue(row, headers, 'reviewer_name');
        const date = getColumnValue(row, headers, 'date');
        const platform = getColumnValue(row, headers, 'platform') || 'amazon';
        const orderId = getColumnValue(row, headers, 'order_id');
        const existingProductId = getColumnValue(row, headers, 'product_id');
        
        // Validate required fields
        if (!productName || !rating || !title || !reviewBody || !reviewerName) {
          skippedReviews.push({
            row,
            reason: 'Missing required fields (product, rating, title, review, name)'
          });
          return;
        }
        
        // Find product ID - use existing ID if available, otherwise map from product name
        const productId = existingProductId || findProductId(productName);
        if (!productId) {
          skippedReviews.push({
            row,
            reason: `Product not found: ${productName}`
          });
          return;
        }
        
        // Validate rating - handle decimal ratings
        if (isNaN(rating) || rating < 1 || rating > 5) {
          skippedReviews.push({
            row,
            reason: `Invalid rating: ${rating}`
          });
          return;
        }
        
        // Create review object in FLON format
        const review = {
          id: currentId.toString(),
          product_id: productId,
          user_id: generateUserId(reviewerName, platform),
          user_name: reviewerName.trim(),
          rating: Math.round(rating), // Round decimal ratings to nearest integer
          title: '',
          review_body: title.trim() ? `${title.trim()} ${reviewBody.trim()}` : reviewBody.trim(),
          status: 'pending', // All imported reviews start as pending for moderation
          is_verified_purchase: true, // All imported reviews are verified purchases
          created_at: parseDate(date),
          updated_at: new Date().toISOString(),
          helpful_count: 0,
          ...(orderId && { order_id: orderId.trim() }),
          images: [] // CSV imports don't include images initially
        };
        
        newReviews.push(review);
        currentId++;
      })
      .on('end', () => {
        // Combine existing and new reviews
        const combinedReviews = [...existingData.reviews, ...newReviews];
        const updatedData = {
          reviews: combinedReviews,
          nextId: currentId
        };
        
        // Write back to file
        fs.writeFileSync(reviewsFilePath, JSON.stringify(updatedData, null, 2));
        
        resolve({
          imported: newReviews.length,
          skipped: skippedReviews.length,
          skippedReasons: skippedReviews,
          newReviews: newReviews
        });
      })
      .on('error', reject);
  });
}

// CLI Usage
if (require.main === module) {
  const csvFile = process.argv[2];
  
  if (!csvFile) {
    console.log(`
CSV Review Import Tool for FLON

Usage: node import-reviews-csv.js <csv-file-path>

Expected CSV columns (flexible names):
- Product name (product_name, product, item_name)
- Rating (rating, stars, score) [1-5]
- Title (title, review_title, subject)
- Review text (review, review_body, comment, text)
- Customer name (reviewer_name, customer_name, name)
- Date (date, review_date, created_at) [optional]
- Platform (platform, source) [optional - etsy/amazon/ebay]
- Order ID (order_id) [optional]

All imported reviews will be:
- Marked as verified purchases
- Set to pending status for moderation
- Assigned unique user IDs
    `);
    process.exit(1);
  }
  
  if (!fs.existsSync(csvFile)) {
    console.error(`Error: CSV file not found: ${csvFile}`);
    process.exit(1);
  }
  
  console.log(`Importing reviews from: ${csvFile}`);
  
  importCSVReviews(csvFile)
    .then(result => {
      console.log(`\n✅ Import completed successfully!`);
      console.log(`📥 Imported: ${result.imported} reviews`);
      console.log(`⚠️  Skipped: ${result.skipped} reviews`);
      
      if (result.skipped > 0) {
        console.log(`\nSkipped reviews:`);
        result.skippedReasons.forEach((skip, index) => {
          console.log(`${index + 1}. ${skip.reason}`);
          console.log(`   Row: ${JSON.stringify(skip.row)}\n`);
        });
      }
      
      console.log(`\n🎉 ${result.imported} new reviews are now pending moderation!`);
      console.log(`Visit http://localhost:3000/admin/reviews to moderate them.`);
    })
    .catch(error => {
      console.error(`❌ Import failed:`, error.message);
      process.exit(1);
    });
}

module.exports = { importCSVReviews, PRODUCT_MAPPING };
