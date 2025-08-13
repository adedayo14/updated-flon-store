import React from 'react';
import ReviewsSection from 'components/organisms/ReviewsSection';
import type { ProductData } from 'types/shared/products';

interface ProductPageWithReviewsProps {
  product: ProductData;
}

const ProductPageWithReviews: React.FC<ProductPageWithReviewsProps> = ({ product }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image.src}
            alt={product.image.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-primary">{product.title}</h1>
          <p className="text-lg text-body">{product.description}</p>
          
          {/* Price */}
          <div className="text-2xl font-semibold text-primary">
            ${product.price}
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
            Add to Cart
          </button>

          {/* Review Summary - This will show under the product price */}
          <ReviewsSection 
            product_id={product.id}
            product_name={product.title}
          />
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex space-x-8 mb-6">
          <button className="text-primary border-b-2 border-primary pb-2">
            Description
          </button>
          <button className="text-body hover:text-primary pb-2">
            Specifications
          </button>
          <button className="text-body hover:text-primary pb-2">
            Shipping
          </button>
        </div>

        {/* Description Tab Content */}
        <div className="prose max-w-none">
          <p>{product.description}</p>
          {/* Additional product details would go here */}
        </div>
      </div>

      {/* Reviews Section - This will show the detailed reviews */}
      <div className="mt-16">
        <ReviewsSection 
          product_id={product.id}
          product_name={product.title}
        />
      </div>
    </div>
  );
};

export default ProductPageWithReviews; 