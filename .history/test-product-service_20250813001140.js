const { getProductsByIds, getProductNameById } = require('./lib/services/products');

async function testProductService() {
  console.log('🧪 Testing product service...');
  
  try {
    // Test with known product IDs from reviews
    const testIds = ['6691a9fd1034680012078368', '6899ddfca959c6001142af63'];
    
    console.log('Testing getProductsByIds with:', testIds);
    const products = await getProductsByIds(testIds);
    console.log('✅ Products:', products);
    
    console.log('Testing getProductNameById with single ID:', testIds[0]);
    const productName = await getProductNameById(testIds[0]);
    console.log('✅ Product name:', productName);
    
  } catch (error) {
    console.error('❌ Error testing product service:', error);
  }
}

testProductService();
