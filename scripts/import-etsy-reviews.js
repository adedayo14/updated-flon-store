/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Real names to replace Etsy usernames
const realNames = [
  'Isabella Martinez', 'Jackson Wright', 'Sophia Anderson', 'Lucas Thompson', 'Mia Johnson',
  'Benjamin Wilson', 'Emma Davis', 'Alexander Brown', 'Olivia Miller', 'William Garcia',
  'Ava Rodriguez', 'James Martinez', 'Charlotte Lopez', 'Ethan Gonzalez', 'Amelia Perez',
  'Michael Sanchez', 'Harper Ramirez', 'Daniel Rivera', 'Evelyn Torres', 'Matthew Flores',
  'Abigail Gomez', 'Joseph Diaz', 'Emily Reyes', 'David Morales', 'Elizabeth Ortiz',
  'Christopher Gutierrez', 'Sofia Chavez', 'Anthony Ramos', 'Avery Castillo', 'Joshua Herrera',
  'Ella Jimenez', 'Andrew Ruiz', 'Scarlett Hernandez', 'Ryan Alvarez', 'Grace Medina',
  'Nicholas Vargas', 'Chloe Aguilar', 'Jonathan Castro', 'Victoria Delgado', 'Brandon Vega',
  'Zoey Romero', 'Tyler Espinoza', 'Lillian Mendoza', 'Kevin Contreras', 'Addison Salazar',
  'Zachary Figueroa', 'Lily Acosta', 'Aaron Leon', 'Layla Valdez', 'Noah Cordova'
];

// Product mapping for Etsy products to Swell product IDs
const productMapping = {
  'Silk Dental Floss': '61b4115d1078bd01333c3132',
  'Silk Dental Floss Refill': '6691a9fd1034680012078368',
  'Natural Sisal Soap Washcloth': '66918e7e1034680012075673',
  'Adult Bamboo Toothbrush': '669182c262973100121e2251',
  'The Single 2.0 Razor': '65a3252536440c00128d6641',
  'Bamboo Makeup Remover Pads': '66919190a087ef00122d14bb',
  'Natural Body Scrub': 'flon-shea-butter' // fallback for unmapped products
};

function cleanText(text) {
  if (!text) return '';
  
  return text
    // Remove Etsy-related words
    .replace(/etsy/gi, '')
    .replace(/shop/gi, 'store')
    .replace(/seller/gi, 'store')
    
    // Clean up extra spaces and formatting
    .replace(/\s+/g, ' ')
    .replace(/["']/g, '') // Remove quotes
    .trim();
}

function generateRealName(originalName, index) {
  // If it's already a real-looking name (has both first and last), keep it but clean it
  if (originalName && originalName.includes(' ') && originalName.length > 5 && !originalName.includes('_') && !originalName.includes('61')) {
    return cleanText(originalName);
  }
  
  // For single names that look real, keep them
  if (originalName && originalName.length > 3 && originalName.length < 15 && 
      !originalName.includes('_') && !originalName.includes('61') && 
      /^[A-Za-z]+$/.test(originalName)) {
    return cleanText(originalName);
  }
  
  // Otherwise assign a real name
  return realNames[index % realNames.length];
}

function parseDate(dateStr) {
  // Handle Etsy date format like "08-Aug-25"
  if (dateStr && dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parts[0];
      const monthAbbr = parts[1];
      const year = `20${parts[2]}`;
      
      const months = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
      };
      
      const month = months[monthAbbr] || '08';
      return new Date(`${year}-${month}-${day.padStart(2, '0')}`).toISOString();
    }
  }
  
  return new Date().toISOString();
}

async function importEtsyReviews() {
  try {
    const csvFilePath = '/Users/dayo/Downloads/updated_etsy_reviews.csv';
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
            const originalName = row.Name || row.name || '';
            const date = row.Date || row.date || '';
            const rating = parseInt(row.Rating || row.rating || '5');
            const review = row.Review || row.review || '';
            const productName = row['New Product Name'] || row['Product Name'] || row.Product || 'Silk Dental Floss';
            const productId = row['Product ID'] || row.product_id || '';
            
            // Generate clean name
            const cleanName = generateRealName(originalName, nameIndex++);
            
            // Clean the review text
            const cleanedReview = cleanText(review);
            
            if (cleanedReview.trim()) {
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
                review_body: cleanedReview,
                status: 'pending', // Will need approval
                is_verified_purchase: true, // Etsy purchases are verified
                created_at: parseDate(date),
                updated_at: new Date().toISOString(),
                helpful_count: 0
              };
              
              newReviews.push(newReview);
              console.log(`✅ Processed Etsy review from ${cleanName} for ${productName} (${rating}⭐)`);
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
          
          console.log(`\n🎉 Successfully imported ${newReviews.length} Etsy reviews`);
          console.log(`📁 Reviews saved to: ${reviewsFilePath}`);
          console.log(`🔢 Next review ID: ${reviewsData.nextId}`);
          
          // Show summary by product
          const productCounts = {};
          const ratingCounts = {};
          newReviews.forEach(r => {
            productCounts[r.product_id] = (productCounts[r.product_id] || 0) + 1;
            ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1;
          });
          
          console.log('\n📦 Etsy reviews imported by product:');
          Object.entries(productCounts).forEach(([id, count]) => {
            const productName = id === '61b4115d1078bd01333c3132' ? 'Silk Dental Floss' : 
                               id === '6691a9fd1034680012078368' ? 'Silk Dental Floss Refill' : 
                               id === '66918e7e1034680012075673' ? 'Natural Sisal Soap Washcloth' :
                               id === '669182c262973100121e2251' ? 'Adult Bamboo Toothbrush' :
                               id === '65a3252536440c00128d6641' ? 'The Single 2.0 Razor' :
                               id === '66919190a087ef00122d14bb' ? 'Bamboo Makeup Remover Pads' : id;
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
    console.error('Error importing Etsy reviews:', error);
    throw error;
  }
}

// Run the import
if (require.main === module) {
  importEtsyReviews()
    .then(() => {
      console.log('\n✅ Etsy review import completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Import failed:', error);
      process.exit(1);
    });
}

module.exports = { importEtsyReviews };
