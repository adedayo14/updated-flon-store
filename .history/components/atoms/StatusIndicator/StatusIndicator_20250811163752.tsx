import useI18n from 'hooks/useI18n';
import React, { useMemo } from 'react';
import type { Status } from 'types/global';
import type { ORDER_STATUS } from 'types/orders';
import type { STOCK_STATUS } from 'types/shared/products';
import type { SUBSCRIPTION_STATUS } from 'types/subscription';
import {
  orderStatusKey,
  STATUS_MAP,
  subscriptionStatusKey,
} from 'utils/status';

export interface StatusIndicatorProps {
  status: Status;
  type: 'order' | 'subscription' | 'stock';
  payload?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  type,
  payload,
}) => {
  const i18n = useI18n();
  const statusKey =
    type === 'order'
      ? orderStatusKey(status as ORDER_STATUS)
      : type === 'subscription'
      ? subscriptionStatusKey(status as SUBSCRIPTION_STATUS)
      : (status as STOCK_STATUS);
  const template = useMemo(
    () => STATUS_MAP(i18n).get(statusKey),
    [statusKey, i18n],
  );

  // Get pill styling based on status type
  const getPillStyling = () => {
    if (type === 'subscription') {
      const subscriptionStatus = status as SUBSCRIPTION_STATUS;
      switch (subscriptionStatus) {
        case 'active':
        case 'paid':
        case 'complete':
        case 'trial':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'paused':
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'canceled':
        case 'unpaid':
        case 'pastdue':
          return 'bg-pink-100 text-red-600 border-pink-200';
        default:
          return 'bg-gray-100 text-gray-600 border-gray-200';
      }
    } else if (type === 'order') {
      const orderStatus = status as ORDER_STATUS;
      switch (orderStatus) {
        case 'complete':
        case 'pending':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'delivery_pending':
        case 'hold':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'canceled':
        case 'payment_pending':
          return 'bg-pink-100 text-red-600 border-pink-200';
        default:
          return 'bg-gray-100 text-gray-600 border-gray-200';
      }
    }
    // Default styling for stock and unknown types
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm border ${getPillStyling()}`}>
      {template?.label}
      {!!template?.details && (
        <>
          <span className="mx-1">•</span>
          <span className="text-xs font-normal">
            {template.details(payload)}
          </span>
        </>
      )}
    </span>
  );
};

export default StatusIndicator;
