import React, { useEffect } from 'react';
import useCurrency from 'stores/currency';
import useLocationStore from 'stores/location';

export interface ShippingProgressBarProps {
  currentTotal: number;
  className?: string;
}

const ShippingProgressBar: React.FC<ShippingProgressBarProps> = ({
  currentTotal,
  className,
}) => {
  const formatPrice = useCurrency((store: any) => store.formatPrice);
  const currency = useCurrency((store: any) => store.currency);
  const { location, detectLocation, getDeliveryThreshold } = useLocationStore();

  // Detect location on component mount if not already detected
  useEffect(() => {
    if (!location.detected) {
      detectLocation();
    }
  }, [location.detected, detectLocation]);

  const baseThreshold = getDeliveryThreshold(); // £30 for UK, £100 for international
  
  // Convert threshold to current currency if not GBP
  const freeShippingThreshold = currency.code === 'GBP' 
    ? baseThreshold 
    : Math.round(baseThreshold * 1.25); // Rough conversion rate for non-GBP currencies
  
  const remaining = Math.max(0, freeShippingThreshold - currentTotal);
  const progress = Math.min(100, (currentTotal / freeShippingThreshold) * 100);
  const hasQualified = remaining === 0;

  return (
    <div className={`bg-background-secondary rounded-lg p-4 ${className ?? ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">
          {location.isUK ? 'Free UK delivery' : 'Free delivery'}
        </span>
        {!hasQualified && (
          <span className="text-sm font-semibold text-primary">
            {formatPrice(remaining)} to go
          </span>
        )}
      </div>
      
      <div className="w-full bg-dividers rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ease-out ${
            hasQualified ? 'bg-green-500 w-full' : 'bg-accent'
          }`}
          style={!hasQualified ? { width: `${progress}%` } : undefined}
        />
      </div>
      
      <p className="text-xs text-body">
        {hasQualified 
          ? "Great choice, delivery's on us"
          : `${formatPrice(remaining)} more and your delivery is on us`
        }
      </p>
    </div>
  );
};

export default ShippingProgressBar;
