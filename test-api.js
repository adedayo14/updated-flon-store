const https = require('https');

// Test the Swell API call with public key (Bearer token)
const productId = '6899ddfca959c6001142af63';
const publicKey = 'pk_tQFIITBSdc37jJt4mIDuQsxcMMZtLwnh';

console.log('Testing API call for product:', productId);
console.log('Using public key:', publicKey);

const options = {
  hostname: 'raw-foods.swell.store',
  port: 443,
  path: `/api/products/${productId}`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${publicKey}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const product = JSON.parse(data);
      console.log('✅ SUCCESS! Product Name:', product.name);
      console.log('Full Product:', JSON.stringify(product, null, 2));
    } catch (error) {
      console.error('JSON Parse Error:', error);
      console.log('Raw Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.end();
