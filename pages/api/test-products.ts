import type { NextApiRequest, NextApiResponse } from 'next';
import { getProductsByIds, getAllProducts } from 'lib/services/products';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing product API...');
    
    // Test product IDs from your reviews
    const productIds = [
      '6691a9fd1034680012078368',  // Should be "Dental Floss Refill"
      '6899ddfca959c6001142af63',  // Should be "Silk Dental Floss"
      '6691b18f587ef300121585d8',  // Should be "Safety Razor Blades"
      '6691adcebde5570012895de5'   // Should be "Flon Insulated Water Bottle"
    ];

    console.log('📋 Testing Product IDs:', productIds);
    
    // Test 1: Get all products first
    console.log('🔍 Testing getAllProducts...');
    const allProducts = await getAllProducts();
    console.log(`✅ getAllProducts returned ${allProducts.length} products`);
    
    // Log first few product names and IDs
    const productSample = allProducts.slice(0, 5).map(p => ({ id: p.id, name: p.name }));
    console.log('📦 Sample products:', productSample);
    
    // Test 2: Get products by specific IDs
    console.log('🔍 Testing getProductsByIds...');
    const targetProducts = await getProductsByIds(productIds);
    console.log(`✅ getProductsByIds returned ${targetProducts.length} products`);
    
    const targetProductDetails = targetProducts.map(p => ({ id: p.id, name: p.name }));
    console.log('🎯 Target products:', targetProductDetails);
    
    // Check which IDs were found vs not found
    const foundIds = targetProducts.map(p => p.id);
    const notFoundIds = productIds.filter(id => !foundIds.includes(id));
    
    const result = {
      success: true,
      totalProducts: allProducts.length,
      requestedIds: productIds,
      foundProducts: targetProductDetails,
      foundIds,
      notFoundIds,
      sampleProducts: productSample
    };
    
    console.log('🏁 Test result:', result);
    
    res.status(200).json(result);
    
  } catch (error) {
    console.error('❌ Test API error:', error);
    res.status(500).json({ 
      error: 'Failed to test product API', 
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
