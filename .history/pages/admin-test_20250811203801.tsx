import React, { useState } from 'react';

const AdminLoginTest: React.FC = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testLogin = async () => {
    setIsLoading(true);
    setResult('Testing...');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ Success: ${data.message}`);
        // Try to access dashboard
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1000);
      } else {
        setResult(`❌ Error (${response.status}): ${data.message}`);
      }
    } catch (error) {
      setResult(`🚨 Network Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Login Test</h2>
          <p className="mt-2 text-sm text-gray-600">Debug version to test login functionality</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  testLogin();
                }
              }}
            />
          </div>
          
          <button
            onClick={testLogin}
            disabled={isLoading || !password}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Testing...' : 'Test Login'}
          </button>
          
          {result && (
            <div className={`p-4 rounded-md text-sm ${
              result.startsWith('✅') ? 'bg-green-50 text-green-800' :
              result.startsWith('❌') ? 'bg-red-50 text-red-800' :
              'bg-yellow-50 text-yellow-800'
            }`}>
              {result}
            </div>
          )}
          
          <div className="text-center">
            <a 
              href="/admin" 
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              ← Back to regular admin login
            </a>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Instructions:</h3>
          <ol className="text-xs text-blue-800 space-y-1">
            <li>1. Enter the password: <code className="bg-blue-100 px-1 rounded">Adedayo01</code></li>
            <li>2. Click "Test Login" or press Enter</li>
            <li>3. If successful, you'll be redirected to the dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginTest;
