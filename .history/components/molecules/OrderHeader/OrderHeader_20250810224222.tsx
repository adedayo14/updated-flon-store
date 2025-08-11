import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import Modal from 'components/molecules/Modal';
import StatusIndicator from 'components/atoms/StatusIndicator';
import type { ORDER_STATUS } from 'types/orders';
import type { SUBSCRIPTION_STATUS } from 'types/subscription';
import Sync from 'assets/icons/sync.svg';

export interface OrderHeaderProps {
  title: string;
  status: ORDER_STATUS | SUBSCRIPTION_STATUS;
  totalText: string;
  total: string;
  returnLabel?: string;
  returnDialogTitle?: string;
  returnDialogBody?: string;
  isSubscription?: boolean;
  leftColumn: (string | number)[][];
  className: string;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  title,
  status,
  totalText,
  total,
  returnLabel,
  returnDialogTitle,
  returnDialogBody,
  isSubscription = false,
  leftColumn,
  className,
}) => {
  const [returnOpen, setReturnOpen] = useState(false);

  const hasReturn = returnLabel && returnDialogTitle && returnDialogBody;

  return (
    <header className={['bg-white border border-gray-200 rounded-xl p-8 mb-8', className ?? ''].join(' ')}>
      {/* Header with title and status */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {title}
          </h1>
        </div>
        <StatusIndicator
          status={status}
          type={isSubscription ? 'subscription' : 'order'}
          className="px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide"
        />
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {leftColumn.map(([text, value]) => (
          <div key={`${text}${value}`}>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{text}</div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
          </div>
        ))}
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{totalText}</div>
          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
            {isSubscription && <Sync className="w-4 h-4 opacity-70" />}
            {total}
          </div>
        </div>
      </div>

      {/* Return button if available */}
      {hasReturn && (
        <div className="flex justify-end border-t border-gray-200 pt-4">
          <Button
            elType={BUTTON_TYPE.BUTTON}
            onClick={() => setReturnOpen(true)}
            buttonStyle={BUTTON_STYLE.SECONDARY}
            small
            className="whitespace-nowrap">
            {returnLabel}
          </Button>
          <Modal
            title={returnDialogTitle}
            body={returnDialogBody}
            open={returnOpen}
            onClose={() => setReturnOpen(false)}
          />
        </div>
      )}
    </header>
  );
};

export default OrderHeader;
