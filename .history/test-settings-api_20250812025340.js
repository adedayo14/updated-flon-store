const https = require('https');

// Test the Swell store settings API call
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
      console.log('✅ Store Settings:');
      console.log('- Name:', settings.name || 'Not found');
      console.log('- Currency:', settings.currency || 'Not found');
      console.log('- Locale:', settings.locale || 'Not found');
      console.log('Full settings keys:', Object.keys(settings));
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
