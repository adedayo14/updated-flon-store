import React from 'react';
import { formatPriceByCurrency } from 'lib/utils/price';

interface InvoiceRow {
  label: string;
  value: number;
  isTotal?: boolean;
}

interface ModernInvoiceBreakdownProps {
  subtotal: number;
  discounts?: number;
  shipping?: number;
  tax?: number;
  total: number;
  currency?: string;
}

const ModernInvoiceBreakdown: React.FC<ModernInvoiceBreakdownProps> = ({
  subtotal,
  discounts = 0,
  shipping = 0,
  tax = 0,
  total,
}) => {
  const rows: InvoiceRow[] = [
    { label: 'Subtotal', value: subtotal },
    { label: 'Discounts & Credits', value: discounts },
    { label: 'Shipping', value: shipping },
    { label: 'VAT', value: tax },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice breakdown</h2>
      
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="text-sm text-gray-600">{row.label}</div>
            <div className="text-sm font-medium text-gray-900">
              {formatPriceByCurrency()(row.value)}
            </div>
          </div>
        ))}
        
        {/* Total row */}
        <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
          <div className="text-sm font-semibold text-gray-900">Total</div>
          <div className="text-sm font-semibold text-gray-900">
            {formatPriceByCurrency(total)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernInvoiceBreakdown;
