import React from 'react';
import Image from 'components/atoms/SafeImage';
import StatusIndicator from 'components/atoms/StatusIndicator';
import Button from 'components/atoms/Button';
import { BUTTON_TYPE } from 'types/shared/button';
import type {
  BillingSchedule,
  OrderSchedule,
  SUBSCRIPTION_STATUS,
} from 'types/subscription';
import type { ORDER_STATUS } from 'types/orders';
import type { MandatoryImageProps } from 'types/global';
import { PURCHASE_TYPE } from 'types/purchase';
import { formatDateToLocale } from 'lib/utils/date';
import type { Maybe } from 'lib/graphql/generated/sdk';
import ScheduleLabel from 'components/atoms/ScheduleLabel';
import useCurrency from 'stores/currency';
import Price from 'components/atoms/Price';
import useI18n, { I18n } from 'hooks/useI18n';

interface BaseProps {
  title: string;
  productsImages: MandatoryImageProps[];
  link: string;
  date: Date;
}

export type SubscriptionCardProps = BaseProps & {
  status: SUBSCRIPTION_STATUS;
  billingSchedule: Maybe<BillingSchedule>;
  orderSchedule: Maybe<OrderSchedule>;
  dateOrderPeriodEnd: Maybe<Date>;
  recurringTotal?: number;
  type: PURCHASE_TYPE.SUBSCRIPTION;
};

export type OrderCardProps = BaseProps & {
  status: ORDER_STATUS;
  itemsCount: number;
  total: number;
  type: PURCHASE_TYPE.ORDER;
};

export type PurchaseCardProps = SubscriptionCardProps | OrderCardProps;

const purchaseCardText = (i18n: I18n) => ({
  billingMessage: i18n('account.subscriptions.billing_message'),
  orderMessage: i18n('account.subscriptions.order_message'),
  nextBillingLabel: i18n('account.subscriptions.next_billing'),
  orderDateLabel: i18n('account.orders.order_date'),
  itemsLabel: i18n('account.orders.items'),
  viewOrderLabel: i18n('account.orders.view_order'),
  manageLabel: i18n('account.subscriptions.manage'),
  totalLabel: i18n('account.orders.total'),
});

const PurchaseCard: React.FC<PurchaseCardProps> = ({
  status,
  title,
  productsImages,
  date,
  link,
  ...props
}) => {
  const formatPrice = useCurrency((store: any) => store.formatPrice);
  const i18n = useI18n();
  const text = purchaseCardText(i18n);

  return (
    <div className="border-outline rounded-xl border bg-background-primary p-6">
      {/* Top row */}
      <div className="flex justify-between gap-4">
        {/* Left: title and dates */}
        <div className="min-w-0 flex-1 pr-2">
          <h3 className="mb-4 font-headings text-xl font-semibold text-primary">
            {title}
          </h3>

          {/* Dates and counts */}
          <div className="mt-2 space-y-1">
            {/* Hide next billing if cancelled subscription */}
            {!(props.type === PURCHASE_TYPE.SUBSCRIPTION && status === 'canceled') && (
              <div className="flex flex-wrap items-baseline gap-2 text-sm">
                <span className="text-body">
                  {props.type === PURCHASE_TYPE.SUBSCRIPTION
                    ? text.nextBillingLabel
                    : text.orderDateLabel}
                </span>
                <span className="font-semibold text-primary">
                  {formatDateToLocale(date)}
                </span>
              </div>
            )}

            {props.type === PURCHASE_TYPE.ORDER && (
              <div className="flex items-baseline gap-2 text-sm">
                <span className="text-body">{text.itemsLabel}</span>
                <span className="font-semibold text-primary">
                  {props.itemsCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: status pill and images below in a single row */}
        <div className="flex shrink-0 flex-col items-end gap-3">
          <StatusIndicator status={status} type={props.type} />

          {productsImages?.length > 0 && (
            <div
              className="
                flex max-w-[220px] items-center gap-2 overflow-x-auto md:max-w-[320px]
              "
              aria-label="Product images"
            >
              {productsImages.map((image, i) => (
                <div
                  key={`${image.alt}-${i}`}
                  className="relative h-12 w-12 md:h-14 md:w-14 flex-none"
                >
                  <Image
                    src={image.src}
                    layout="fill"
                    alt={image.alt}
                    className="rounded-lg"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr className="border-outline mt-6 border" />

      {/* Bottom row */}
      <div className="mt-6 md:flex md:items-center md:justify-between">
        {props.type === PURCHASE_TYPE.SUBSCRIPTION ? (
          <div className="flex flex-col space-y-2">
            {props?.billingSchedule && (
              <div className="inline-flex items-center justify-start space-x-2 text-sm text-primary">
                <ScheduleLabel
                  type="billing"
                  base={text.billingMessage}
                  schedule={props.billingSchedule}
                  textClasses="text-sm"
                  iconClasses="h-6"
                  icon
                />
                {props?.recurringTotal && (
                  <span className="font-semibold">
                    {formatPrice(props.recurringTotal)}
                  </span>
                )}
              </div>
