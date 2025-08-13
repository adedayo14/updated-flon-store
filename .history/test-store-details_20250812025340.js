const https = require('https');

// Test the Swell store settings API call and show store details
const publicKey = 'pk_tQFIITBSdc37jJt4mIDuQsxcMMZtLwnh';

console.log('🔍 Testing store settings API call...');

const options = {
  hostname: 'raw-foods.swell.store',
  port: 443,
  path: '/api/settings',
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
      const settings = JSON.parse(data);
      console.log('✅ Store Details:');
      if (settings.store) {
        console.log('Store object:', JSON.stringify(settings.store, null, 2));
      }
      if (settings.header) {
        console.log('Header settings exist');
      }
      if (settings.checkout) {
        console.log('Checkout settings exist');
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
