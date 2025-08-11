import React from 'react';
import useCurrency from 'stores/currency';

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
  const formatPrice = useCurrency((store: any) => store.formatPrice);
  
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
            ? 'Congratulations! You qualify for free shipping'
            : 'Free UK shipping'
          }
        </span>
        {!hasQualified && (
          <span className="text-sm font-semibold text-primary">
            {formatPrice(remaining)} to go
          </span>
        )}
      </div>
      
      <div className="w-full bg-dividers rounded-full h-2 mb-2">
        <div 
          className={`bg-accent h-2 rounded-full transition-all duration-500 ease-out ${
            hasQualified ? 'w-full' : ''
          }`}
          {...(!hasQualified && { style: { width: `${progress}%` } })}
        />
      </div>
      
      <p className="text-xs text-body">
        {hasQualified 
          ? 'Your order qualifies for free UK shipping'
          : `Add ${formatPrice(remaining)} more to your order for free UK shipping`
        }
      </p>
    </div>
  );
};

export default ShippingProgressBar;
