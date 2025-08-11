import React from 'react';
import useI18n from 'hooks/useI18n';
import useCurrencyStore from 'stores/currency';

export interface ShippingProgressBarProps {
  currentTotal: number;
  freeShippingThreshold: number;
  isUKOrder?: boolean;
  className?: string;
}

const ShippingProgressBar: React.FC<ShippingProgressBarProps> = ({
  currentTotal,
  freeShippingThreshold,
  isUKOrder = true,
  className,
}) => {
  const i18n = useI18n();
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  
  const remaining = Math.max(0, freeShippingThreshold - currentTotal);
  const progress = Math.min(100, (currentTotal / freeShippingThreshold) * 100);
  const hasQualified = remaining === 0;

  if (!isUKOrder) {
    return null; // Only show for UK orders
  }

  return (
    <div className={`bg-background-secondary rounded-lg p-4 ${className ?? ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">
          {hasQualified 
            ? i18n('cart.free_shipping_qualified', 'Congratulations! You qualify for free shipping')
            : i18n('cart.free_shipping_progress', 'Free UK shipping')
          }
        </span>
        {!hasQualified && (
          <span className="text-sm font-semibold text-primary">
            {formatPrice(remaining)} {i18n('cart.free_shipping_to_go', 'to go')}
          </span>
        )}
      </div>
      
      <div className="w-full bg-dividers rounded-full h-2 mb-2">
        <div 
          className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-xs text-body">
        {hasQualified 
          ? i18n('cart.free_shipping_qualified_text', 'Your order qualifies for free UK shipping')
          : i18n(
              'cart.free_shipping_add_more',
              `Add ${formatPrice(remaining)} more to your order for free UK shipping`
            )
        }
      </p>
    </div>
  );
};

export default ShippingProgressBar;
