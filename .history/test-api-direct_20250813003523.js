const { getProductsByIds, getProductNameById } = require('./lib/services/products');

async function testDirectAPI() {
  console.log('🧪 Testing Swell Product API directly...\n');
  
  // Product IDs from your reviews data
  const productIds = [
    '6691a9fd1034680012078368',  // Should be "Dental Floss Refill"
    '6899ddfca959c6001142af63',  // Should be "Silk Dental Floss"
    '6691b18f587ef300121585d8',  // Should be "Safety Razor Blades"
    '6691adcebde5570012895de5'   // Should be "Flon Insulated Water Bottle"
  ];

  console.log('📋 Testing Product IDs:', productIds);
  console.log('');

  // Test 1: Individual product calls
  console.log('🔍 Test 1: Individual getProductNameById calls');
  console.log('='.repeat(50));
  
  for (const productId of productIds) {
    try {
      console.log(`Testing product ID: ${productId}`);
      const productName = await getProductNameById(productId);
      console.log(`✅ Result: "${productName}"`);
    } catch (error) {
      console.log(`❌ Error for ${productId}:`, error.message);
    }
    console.log('');
  }

  // Test 2: Batch product calls
  console.log('🔍 Test 2: Batch getProductsByIds call');
  console.log('='.repeat(50));
  
  try {
    console.log('Calling getProductsByIds with all IDs...');
    const products = await getProductsByIds(productIds);
    console.log(`✅ Found ${products.length} products:`);
    
    products.forEach(product => {
      console.log(`  - ID: ${product.id}`);
      console.log(`    Name: "${product.name}"`);
      console.log(`    Slug: ${product.slug || 'N/A'}`);
      console.log('');
    });

    // Check which IDs were not found
    const foundIds = products.map(p => p.id);
    const notFoundIds = productIds.filter(id => !foundIds.includes(id));
    
    if (notFoundIds.length > 0) {
      console.log('⚠️ Product IDs not found:');
      notFoundIds.forEach(id => console.log(`  - ${id}`));
    }

  } catch (error) {
    console.log('❌ Batch call error:', error.message);
    console.log('Full error:', error);
  }

  console.log('\n🏁 Test completed');
}

testDirectAPI().catch(console.error);
