import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { validateAdminSession } from 'lib/auth/adminAuth';

interface Product {
  id: string;
  name: string;
  price?: number;
  currency?: string;
  active?: boolean;
  stock_status?: string;
  images?: any[];
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Mock products data for now since Swell API has issues
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "6899ddfca959c6001142af63",
        name: "Silk Dental Floss Starter Pack",
        price: 12.99,
        currency: "GBP",
        active: true,
        stock_status: "in_stock"
      },
      {
        id: "66c9c33d19d760001247dffb",
        name: "Eco Body Gift Set",
        price: 19.99,
        currency: "GBP",
        active: true,
        stock_status: "in_stock"
      },
      {
        id: "product-3",
        name: "Natural Shea Butter",
        price: 8.99,
        currency: "GBP",
        active: true,
        stock_status: "in_stock"
      },
      {
        id: "product-4",
        name: "Bamboo Toothbrush Set",
        price: 15.99,
        currency: "GBP",
        active: true,
        stock_status: "in_stock"
      },
      {
        id: "product-5",
        name: "Organic Cotton Pads",
        price: 6.99,
        currency: "GBP",
        active: true,
        stock_status: "in_stock"
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
            <p className="text-gray-600">View all products in your store</p>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push('/admin/reviews')}
            >
              Reviews
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                All Products ({products.length})
              </h3>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {formatPrice(product.price || 0, product.currency || 'GBP')}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.active ? 'Active' : 'Inactive'}
                            </span>
                            {product.stock_status && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.stock_status === 'in_stock' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {product.stock_status.replace('_', ' ')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const sessionId = context.req.cookies['admin-session'];
    
    if (!sessionId) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }
    
    const isValid = validateAdminSession(sessionId);
    
    if (!isValid) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error in admin products getServerSideProps:', error);
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
};

export default AdminProducts;
