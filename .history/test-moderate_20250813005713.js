// Test script to validate moderation API
const fetch = require('node-fetch');

async function testModeration() {
  try {
    // Test approve action
    const response = await fetch('http://localhost:3000/api/admin/reviews/1/moderate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'admin-session=test-session-id'
      },
      body: JSON.stringify({ action: 'approve' })
    });
    
    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response body:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testModeration();
