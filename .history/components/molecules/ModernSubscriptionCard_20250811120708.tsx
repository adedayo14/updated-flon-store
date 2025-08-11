import React from 'react';
import { formatPriceByCurrency } from 'lib/utils/price';
import { formatDateToLocale } from 'lib/utils/date';
import useI18n from 'hooks/useI18n';
import type { SwellSubscription } from 'lib/graphql/generated/sdk';
import { SUBSCRIPTION_STATUS } from 'types/subscription';

interface ModernSubscriptionCardProps {
  subscription: SwellSubscription;
  locale?: string;
}

const ModernSubscriptionCard: React.FC<ModernSubscriptionCardProps> = ({
  subscription,
  locale = 'en-GB',
}) => {
  const i18n = useI18n();
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case SUBSCRIPTION_STATUS.ACTIVE:
        return 'bg-green-100 text-green-800 border-green-200';
      case SUBSCRIPTION_STATUS.PAID:
        return 'bg-green-100 text-green-800 border-green-200';
      case SUBSCRIPTION_STATUS.COMPLETE:
        return 'bg-green-100 text-green-800 border-green-200';
      case SUBSCRIPTION_STATUS.TRIAL:
        return 'bg-green-100 text-green-800 border-green-200';
      case SUBSCRIPTION_STATUS.PAUSED:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case SUBSCRIPTION_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case SUBSCRIPTION_STATUS.CANCELED:
        return 'bg-pink-100 text-red-600 border-pink-200';
      case SUBSCRIPTION_STATUS.UNPAID:
        return 'bg-pink-100 text-red-600 border-pink-200';
      case SUBSCRIPTION_STATUS.PASTDUE:
        return 'bg-pink-100 text-red-600 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatScheduleText = () => {
    if (subscription.billingSchedule?.interval && subscription.billingSchedule?.intervalCount) {
      const interval = subscription.billingSchedule.interval;
      const count = subscription.billingSchedule.intervalCount;
      return `Pay every ${count} ${interval}${count > 1 ? 's' : ''}`;
    }
    return '';
  };

  const formatDeliveryText = () => {
    if (subscription.orderSchedule?.interval && subscription.orderSchedule?.intervalCount) {
      const interval = subscription.orderSchedule.interval;
      const count = subscription.orderSchedule.intervalCount;
      return `Shipped every ${count} ${interval}${count > 1 ? 's' : ''}`;
    }
    return '';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {subscription.product?.name || 'Subscription'}
          </h1>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm border ${getStatusStyle(
            subscription.status || ''
          )}`}
        >
          {i18n(`account.subscriptions.status.${subscription.status}`)}
        </span>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Created</div>
          <div className="text-sm font-medium text-gray-900">
            {subscription.dateCreated
              ? formatDateToLocale(subscription.dateCreated, locale)
              : '-'}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Next billing</div>
          <div className="text-sm font-medium text-gray-900">
            {subscription.datePeriodEnd
              ? formatDateToLocale(subscription.datePeriodEnd, locale)
              : '-'}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Items</div>
          <div className="text-sm font-medium text-gray-900">{subscription.quantity || 1}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</div>
          <div className="text-sm font-medium text-gray-900">
            {formatPriceByCurrency()(
              subscription.grandTotal || subscription.recurringTotal || 0
            )}
          </div>
        </div>
      </div>

      {/* Billing Cycle */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          {formatScheduleText()}
        </div>
        {formatDeliveryText() && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
            </svg>
            {formatDeliveryText()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSubscriptionCard;
