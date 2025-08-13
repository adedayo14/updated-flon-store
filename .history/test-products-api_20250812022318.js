const https = require('https');

// Test the Swell API call for products list
const publicKey = 'pk_tQFIITBSdc37jJt4mIDuQsxcMMZtLwnh';

console.log('🔍 Testing products list API call...');
console.log('Using public key:', publicKey);

const options = {
  hostname: 'raw-foods.swell.store',
  port: 443,
  path: '/api/products',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${publicKey}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (result.results) {
        console.log('✅ SUCCESS! Found', result.results.length, 'products');
        console.log('Products:');
        result.results.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name} (ID: ${product.id}) - £${product.price}`);
        });
      } else {
        console.log('Response structure:', Object.keys(result));
      }
    } catch (error) {
      console.error('JSON Parse Error:', error);
      console.log('Raw Response:', data.substring(0, 500) + '...');
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.end();
