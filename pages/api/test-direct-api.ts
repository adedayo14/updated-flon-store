import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing direct Swell API HTTP calls...');
    
    // Test environment variables
    const storeId = process.env.SWELL_STORE_ID;
    const secretKey = process.env.SWELL_SECRET_KEY;
    
    console.log('Environment check:');
    console.log('SWELL_STORE_ID:', storeId);
    console.log('SWELL_SECRET_KEY:', secretKey ? `${secretKey.substring(0, 10)}...` : 'NOT SET');
    
    if (!storeId || !secretKey) {
      return res.status(500).json({ 
        error: 'Missing Swell environment variables',
        storeId: !!storeId,
        secretKey: !!secretKey 
      });
    }
    
    // Test 1: Get all products (like your JSON example)
    console.log('🔍 Testing direct API call to get all products...');
    
    const allProductsUrl = `https://${storeId}.swell.store/api/products`;
    console.log('API URL:', allProductsUrl);
    
    const allProductsResponse = await fetch(allProductsUrl, {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', allProductsResponse.status);
    console.log('Response headers:', Object.fromEntries(allProductsResponse.headers.entries()));
    
    if (!allProductsResponse.ok) {
      const errorText = await allProductsResponse.text();
      console.log('Error response:', errorText);
      return res.status(500).json({
        error: 'Failed to fetch all products',
        status: allProductsResponse.status,
        statusText: allProductsResponse.statusText,
        errorText
      });
    }
    
    const allProductsData = await allProductsResponse.json();
    console.log('All products response structure:', {
      hasPage: 'page' in allProductsData,
      hasCount: 'count' in allProductsData,  
      hasResults: 'results' in allProductsData,
      resultsLength: allProductsData.results ? allProductsData.results.length : 0
    });
    
    // Test 2: Get specific product by ID
    const testProductId = '6899ddfca959c6001142af63'; // From your example
    console.log(`🎯 Testing single product API call for ID: ${testProductId}`);
    
    const singleProductUrl = `https://${storeId}.swell.store/api/products/${testProductId}`;
    console.log('Single product URL:', singleProductUrl);
    
    const singleProductResponse = await fetch(singleProductUrl, {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Single product response status:', singleProductResponse.status);
    
    let singleProductData = null;
    if (singleProductResponse.ok) {
      singleProductData = await singleProductResponse.json();
      console.log('Single product found:', {
        id: singleProductData.id,
        name: singleProductData.name
      });
    } else {
      const errorText = await singleProductResponse.text();
      console.log('Single product error:', errorText);
    }
    
    // Extract product names from all products
    const productNames: Record<string, string> = {};
    if (allProductsData.results) {
      allProductsData.results.forEach((product: any) => {
        productNames[product.id] = product.name;
      });
    }
    
    const result = {
      success: true,
      environment: {
        storeId,
        hasSecretKey: !!secretKey
      },
      allProducts: {
        status: allProductsResponse.status,
        totalCount: allProductsData.count || 0,
        resultsLength: allProductsData.results ? allProductsData.results.length : 0,
        page: allProductsData.page || null,
        sampleProducts: allProductsData.results ? 
          allProductsData.results.slice(0, 5).map((p: any) => ({ id: p.id, name: p.name })) : 
          []
      },
      singleProduct: {
        status: singleProductResponse.status,
        found: !!singleProductData,
        data: singleProductData ? { id: singleProductData.id, name: singleProductData.name } : null
      },
      productNames
    };
    
    console.log('🏁 Direct API test result:', result);
    
    res.status(200).json(result);
    
  } catch (error) {
    console.error('❌ Direct API test error:', error);
    res.status(500).json({ 
      error: 'Failed to test direct API', 
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
