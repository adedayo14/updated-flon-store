import React from 'react';
import Image from 'next/image';
import { formatPriceByCurrency } from 'lib/utils/price';
import type { SwellOrderItem } from 'lib/graphql/generated/sdk';

interface ModernSubscriptionProductProps {
  orderItems?: Array<SwellOrderItem | null>;
  currency?: string | null;
}

const ModernSubscriptionProduct: React.FC<ModernSubscriptionProductProps> = ({
  orderItems = [],
  currency,
}) => {
  const validOrderItems = orderItems.filter((item): item is SwellOrderItem => item !== null);

  if (!validOrderItems.length) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your subscription</h2>
      
      {validOrderItems.map((item, index) => {
        const productImage = item.product?.images?.[0];
        const hasValidImage = productImage?.file?.url;

        return (
          <div key={item.id || index} className="flex gap-4 items-center py-5 border-b border-gray-100 last:border-b-0">
            {/* Product Image */}
            <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              {hasValidImage ? (
                <Image
                  src={productImage!.file!.url!}
                  alt={item.product?.name || 'Product'}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-2xl">🪒</div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {item.product?.name || 'Subscription Item'}
              </div>
              <div className="text-sm text-gray-600">
                {item.product?.description || 'Premium product delivered regularly'}
              </div>
              {item.quantity && item.quantity > 1 && (
                <div className="text-sm text-gray-500 mt-1">
                  Quantity: {item.quantity}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {formatPriceByCurrency(item.price || 0)}
              </div>
              <div className="text-xs text-gray-500">
                per delivery
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModernSubscriptionProduct;
