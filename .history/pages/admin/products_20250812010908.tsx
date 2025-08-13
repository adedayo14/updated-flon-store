import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { validateAdminSession } from 'lib/auth/adminAuth';
import { getAllProducts, Product } from 'lib/services/products';

interface AdminProductsProps {
  products: Product[];
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products: initialProducts }) => {
  const [products] = useState<Product[]>(initialProducts);
  const router = useRouter();

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
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Products ({products.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No products found
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="px-6 py-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        {product.images && product.images[0] && (
                          <div
                            className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                          >
                            <span className="text-gray-500 text-xs">Image</span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">ID: {product.id}</p>
                          {product.slug && (
                            <p className="text-sm text-gray-600">Slug: {product.slug}</p>
                          )}
                        </div>
                      </div>

                      {product.description && (
                        <p className="text-gray-700 mb-3">{product.description}</p>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-semibold text-green-600">
                          {formatPrice(product.price || 0, product.currency || 'USD')}
                        </span>
                        <span>Currency: {product.currency || 'USD'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded"
                        onClick={() => router.push(`/products/${product.slug}`)}
                      >
                        View Product
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-3 rounded"
                        onClick={() => router.push(`/admin/reviews?product=${product.id}`)}
                      >
                        View Reviews
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Check authentication
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

    // Get all products
    const products = await getAllProducts();
    
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)), // Serialize for Next.js
      },
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
