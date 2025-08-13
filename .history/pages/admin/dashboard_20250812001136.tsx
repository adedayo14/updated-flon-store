import React from 'react';
import { GetServerSideProps } from 'next';
import crypto from 'crypto';
import AdminReviewDashboard from 'components/organisms/AdminReviewDashboard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={async () => {
                  await fetch('/api/admin/logout', { method: 'POST' });
                  window.location.href = '/admin';
                }}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Management</h2>
          <AdminReviewDashboard />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const adminToken = req.cookies['admin-token'];
  const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || 'your-secret-key';

  console.log('Dashboard auth check:');
  console.log('- Admin token from cookies:', adminToken ? 'Present' : 'Missing');
  console.log('- ADMIN_TOKEN_SECRET:', ADMIN_TOKEN_SECRET);

  // Generate expected token using same logic as login API
  const expectedToken = crypto
    .createHmac('sha256', ADMIN_TOKEN_SECRET)
    .update('admin-authenticated')
    .digest('hex');

  console.log('- Expected token:', expectedToken);
  console.log('- Tokens match:', adminToken === expectedToken);

  // Check if authenticated
  if (!adminToken || adminToken !== expectedToken) {
    console.log('Authentication failed, redirecting to login');
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  console.log('Authentication successful, showing dashboard');
  return {
    props: {},
  };
};

export default AdminDashboard;
