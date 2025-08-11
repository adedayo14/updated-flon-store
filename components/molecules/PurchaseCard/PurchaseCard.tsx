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

  const isSubscription = props.type === PURCHASE_TYPE.SUBSCRIPTION;
  const showDateRow = !(isSubscription && status === 'canceled');

  return (
    <div className="border-outline rounded-xl border bg-background-primary p-6">
      {/* Top row */}
      <div className="flex justify-between gap-6">
        {/* Left column */}
        <div className="flex-1 pr-0 md:pr-4">
          <h3 className="mb-4 font-headings text-xl font-semibold text-primary">
            {title}
          </h3>

          {showDateRow && (
            <div className="mt-2 flex justify-start gap-2 text-sm">
              <span className="text-body">
                {isSubscription ? text.nextBillingLabel : text.orderDateLabel}
              </span>
              <span className="font-semibold text-primary">
                {formatDateToLocale(date)}
              </span>
            </div>
          )}

          {!isSubscription && 'itemsCount' in props && (
            <div className="mt-1 flex justify-start gap-2 text-sm">
              <span className="text-body">{text.itemsLabel}</span>
              <span className="font-semibold text-primary">
                {props.itemsCount}
              </span>
            </div>
          )}
        </div>

        {/* Right column: status pill with image strip beneath */}
        <div className="flex shrink-0 flex-col items-end">
          <StatusIndicator status={status} type={props.type} />

          {productsImages?.length > 0 && (
            <div className="mt-3 flex flex-row flex-wrap md:flex-nowrap justify-end gap-2">
              {productsImages.slice(0, 8).map((image, i) => (
                <div
                  key={`${image.alt}-${i}`}
                  className="relative aspect-square h-14 w-14 md:h-20 md:w-20">
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
        {isSubscription ? (
          <div className="flex flex-col space-y-2">
            {props.billingSchedule && (
              <div className="inline-flex items-center justify-start space-x-2 text-sm text-primary">
                <ScheduleLabel
                  type="billing"
                  base={text.billingMessage}
                  schedule={props.billingSchedule}
                  textClasses="text-sm"
                  iconClasses="h-6"
                  icon
                />
                {props.recurringTotal != null && (
                  <span className="font-semibold">
                    {formatPrice(props.recurringTotal)}
                  </span>
                )}
              </div>
            )}
            {props.orderSchedule && (
              <div className="inline-flex items-center justify-start gap-2 text-sm text-primary">
                <ScheduleLabel
                  type="order"
                  base={text.orderMessage}
                  schedule={props.orderSchedule}
                  textClasses="text-sm"
                  iconClasses="h-6"
                  icon
                />
                {props.dateOrderPeriodEnd && (
                  <span className="font-semibold">
                    {formatDateToLocale(props.dateOrderPeriodEnd)}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center justify-start gap-2 text-sm text-primary">
            <span className="text-body">{text.totalLabel}</span>
            {'total' in props && <Price price={props.total} className="font-semibold" />}
          </div>
        )}

        {/* Mobile and desktop buttons */}
        <Button
          elType={BUTTON_TYPE.LINK}
          href={link}
          fullWidth
          className="mt-6 md:hidden"
        >
          {isSubscription ? text.manageLabel : text.viewOrderLabel}
        </Button>
        <Button
          elType={BUTTON_TYPE.LINK}
          href={link}
          small
          className="hidden md:block"
        >
          {isSubscription ? text.manageLabel : text.viewOrderLabel}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseCard;
