import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/subscription.module.css';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import type {
  SwellSubscription,
} from 'lib/graphql/generated/sdk';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';
import GhostButton from 'components/atoms/GhostButton';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import ActionModal from 'components/molecules/ActionModal';
import PauseSubscriptionModal from 'components/molecules/PauseSubscriptionModal';
import AddInvoiceItemModal from 'components/molecules/AddInvoiceItemModal';
import EditPlanModal from 'components/molecules/EditPlanModal';
import BannerInfo from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import {
  formatLimitText,
  formatScheduleLabel,
  formatSubscriptionPrice,
  formatTrialText,
  isLastSubscriptionCycle,
} from 'lib/utils/subscription';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { getMultilineAddress } from 'lib/utils/account';
import { formatPriceByCurrency } from 'lib/utils/price';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { formatDateToLocale } from 'lib/utils/date';
import { useRouter } from 'next/router';
import { denullifyArray } from 'lib/utils/denullify';
import useFetchApi from 'hooks/useFetchApi';
import { API_ROUTES } from 'types/shared/api';
import useI18n, { I18n } from 'hooks/useI18n';

interface SubscriptionDetailPageProps extends PageProps {
  subscription: SwellSubscription;
  firstProducts: Array<any>;
}

const subscriptionDetailsText = (i18n: I18n) => ({
  backToSubscriptionsLabel: i18n('account.subscriptions.details.back_link'),
  createdLabel: i18n('account.subscriptions.details.created_label'),
  nextBillingLabel: i18n('account.subscriptions.details.next_billing_label'),
  itemsLabel: i18n('account.subscriptions.details.items_label'),
  totalLabel: i18n('account.subscriptions.details.total_label'),
  quantityLabel: i18n('account.subscriptions.details.quantity_label'),
  priceLabel: i18n('account.subscriptions.details.price_label'),
  subtotalLabel: i18n('account.subscriptions.details.subtotal_label'),
  discountsLabel: i18n('account.subscriptions.details.discounts_label'),
  shippingLabel: i18n('account.subscriptions.details.shipping_label'),
  taxLabel: i18n('account.subscriptions.details.tax_label'),
  refundLabel: i18n('account.subscriptions.details.refund_label'),
  deliveryInfoTitle: i18n('account.subscriptions.details.delivery_info_title'),
  detailsLabel: i18n('account.subscriptions.details.details_label'),
  phoneNumberLabel: i18n('account.subscriptions.details.phone_number_label'),
  methodLabel: i18n('account.subscriptions.details.method_label'),
  orderNotesLabel: i18n('account.subscriptions.details.order_notes_label'),
  paymentInfoTitle: i18n('account.subscriptions.details.payment_info_title'),
  paymentMethodLabel: i18n(
    'account.subscriptions.details.payment_method_label',
  ),
  cardLabel: i18n('account.subscriptions.details.card_label'),
  billingAddressLabel: i18n(
    'account.subscriptions.details.billing_address_label',
  ),
  cancel: {
    message: i18n('account.subscriptions.details.cancel.message'),
    label: i18n('account.subscriptions.details.cancel.label'),
    dialogTitle: i18n('account.subscriptions.details.cancel.dialog_title'),
    dialogBody: i18n('account.subscriptions.details.cancel.dialog_body'),
    buttonLabel: i18n(
      'account.subscriptions.details.cancel.cancel_button_label',
    ),
    subscriptionButtonLabel: i18n(
      'account.subscriptions.details.cancel.cancel_subscription_button_label',
    ),
    successMessage: i18n(
      'account.subscriptions.details.cancel.success_message',
    ),
    errorMessage: i18n('account.subscriptions.details.cancel.error_message'),
  },
  pause: {
    message: i18n('account.subscriptions.details.pause.message'),
    label: i18n('account.subscriptions.details.pause.label'),
    dialogTitle: i18n('account.subscriptions.details.pause.dialog_title'),
    dialogBody: i18n('account.subscriptions.details.pause.dialog_body'),
    buttonLabel: i18n(
      'account.subscriptions.details.pause.cancel_button_label',
    ),
    subscriptionButtonLabel: i18n(
      'account.subscriptions.details.pause.cancel_subscription_button_label',
    ),
    successMessage: i18n('account.subscriptions.details.pause.success_message'),
    errorMessage: i18n('account.subscriptions.details.pause.error_message'),
  },
  resume: {
    message: i18n('account.subscriptions.details.resume.message'),
    label: i18n('account.subscriptions.details.resume.label'),
    dialogTitle: i18n('account.subscriptions.details.resume.dialog_title'),
    dialogBody: i18n('account.subscriptions.details.resume.dialog_body'),
    buttonLabel: i18n(
      'account.subscriptions.details.resume.cancel_button_label',
    ),
    subscriptionButtonLabel: i18n(
      'account.subscriptions.details.resume.cancel_subscription_button_label',
    ),
    successMessage: i18n(
      'account.subscriptions.details.resume.success_message',
    ),
    errorMessage: i18n('account.subscriptions.details.resume.error_message'),
  },
  edit: {
    message: i18n('account.subscriptions.details.edit.message'),
    label: i18n('account.subscriptions.details.edit.label'),
    dialogTitle: i18n('account.subscriptions.details.edit.dialog_title'),
    dialogBody: i18n('account.subscriptions.details.edit.dialog_body'),
    buttonLabel: i18n('account.subscriptions.details.edit.cancel_button_label'),
    subscriptionButtonLabel: i18n(
      'account.subscriptions.details.edit.cancel_subscription_button_label',
    ),
    successMessage: i18n('account.subscriptions.details.edit.success_message'),
    errorMessage: i18n('account.subscriptions.details.resume.error_message'),
  },
  trialEndMessage: i18n('account.subscriptions.details.trial_end_message'),
  headerBillingMessage: i18n(
    'account.subscriptions.details.header_billing_message',
  ),
  renewalLimitLabel: i18n('account.subscriptions.details.renewal_limit_label'),
  shipmentLimitLabel: i18n(
    'account.subscriptions.details.shipment_limit_label',
  ),
  renewalSingularLabel: i18n(
    'account.subscriptions.details.renewal_singular_label',
  ),
  renewalPluralLabel: i18n(
    'account.subscriptions.details.renewal_plural_label',
  ),
  shipmentSingularLabel: i18n(
    'account.subscriptions.details.shipment_singular_label',
  ),
  shipmentPluralLabel: i18n(
    'account.subscriptions.details.shipment_plural_label',
  ),
});

const formatSubscription = (
  subscription: SwellSubscription,
  text: ReturnType<typeof subscriptionDetailsText>,
) => ({
  id: subscription?.id,
  // Header
  name: subscription?.product?.name ?? '',
  status: subscription?.status as SUBSCRIPTION_STATUS,
  dateCreated: subscription?.dateCreated ?? null,
  quantity: subscription?.quantity ?? 0,
  grandTotal: formatPriceByCurrency(subscription?.currency)(
    subscription?.grandTotal ?? 0,
  ),
  billingScheduleText: formatScheduleLabel(
    text.headerBillingMessage,
    subscription.billingSchedule,
  ),
  // Info banner
  notificationText: formatTrialText(text.trialEndMessage, subscription),
  // Order items table
  orderItems: [
    {
      title: subscription?.product?.name ?? '',
      href: `/products/${subscription?.product?.slug}`,
      image: {
        alt: subscription?.product?.images?.[0]?.caption ?? '',
        src: subscription?.product?.images?.[0]?.file?.url ?? '',
        width: subscription?.product?.images?.[0]?.file?.width ?? 0,
        height: subscription?.product?.images?.[0]?.file?.height ?? 0,
      },
      options:
        subscription?.options?.map((option) => option?.value ?? '') ?? [],
      quantity: subscription?.quantity ?? 0,
      price: formatSubscriptionPrice(
        formatPriceByCurrency(subscription?.currency)(
          subscription.grandTotal ?? 0,
        ),
        {
          interval: subscription.billingSchedule?.interval,
          intervalCount: subscription.billingSchedule?.intervalCount,
        },
      ),
    },
  ],
  // Order summary table
  summaryRows: [
    {
      label: text.subtotalLabel,
      value: formatPriceByCurrency(subscription?.currency)(
        subscription?.subTotal ?? 0,
      ),
    },
    {
      label: text.discountsLabel,
      value: formatPriceByCurrency(subscription?.currency)(
        subscription?.discountTotal ?? 0,
      ),
    },
    {
      label: text.shippingLabel,
      value: formatPriceByCurrency(subscription?.currency)(
        subscription?.shipping?.price ?? 0,
      ),
    },
    {
      label: text.taxLabel,
      value: formatPriceByCurrency(subscription?.currency)(
        subscription?.taxTotal ?? 0,
      ),
    },
  ],
  totalRow: {
    label: text.totalLabel,
    value: formatPriceByCurrency(subscription?.currency)(
      subscription?.grandTotal ?? 0,
    ),
  },
  subscriptionSchedule: {
    billingSchedule: subscription?.billingSchedule ?? null,
    orderSchedule: subscription?.orderSchedule ?? null,
  },
  datePeriodEnd: !isLastSubscriptionCycle(subscription.billingSchedule)
    ? subscription.datePeriodEnd
    : null,
  dateOrderPeriodEnd: !isLastSubscriptionCycle(subscription.orderSchedule)
    ? subscription.dateOrderPeriodEnd
    : null,
  billingLimitText: formatLimitText(
    subscription?.billingSchedule,
    text.renewalLimitLabel,
    text.renewalSingularLabel,
    text.renewalPluralLabel,
    'renewal',
  ),
  orderLimitText: formatLimitText(
    subscription?.orderSchedule,
    text.shipmentLimitLabel,
    text.shipmentSingularLabel,
    text.shipmentPluralLabel,
    'shipment',
  ),
  // Order info = shipping
  shippingInfo: [
    ...(subscription?.shipping && getMultilineAddress(subscription.shipping)
      ? [
          {
            title: text.detailsLabel,
            body: getMultilineAddress(subscription.shipping) ?? '',
          },
        ]
      : []),
    ...(subscription?.shipping?.phone
      ? [
          {
            title: text.phoneNumberLabel,
            body: subscription.shipping.phone,
          },
        ]
      : []),
    ...(subscription?.shipping?.serviceName
      ? [
          {
            title: text.methodLabel,
            body: subscription.shipping.serviceName,
          },
        ]
      : []),
  ],
  // Order info = billing
  billingInfo: [
    ...(subscription?.billing?.method
      ? [
          {
            title: text.paymentMethodLabel,
            payment: {
              method: subscription.billing.method as PAYMENT_METHOD,
              ...(subscription?.billing?.method === PAYMENT_METHOD.CARD && {
                card: {
                  name: subscription?.billing?.name ?? '',
                  brand: subscription.billing.card?.brand as CARD_BRAND,
                  label: text.cardLabel ?? '',
                  last4: subscription.billing.card?.last4 ?? '',
                  expiredDate:
                    subscription.billing.card?.expMonth &&
                    subscription.billing.card?.expYear
                      ? `${
                          subscription.billing.card.expMonth < 10
                            ? `0${subscription.billing.card.expMonth}`
                            : subscription.billing.card.expMonth
                        }/${subscription.billing.card.expYear}`
                      : '',
                },
              }),
            },
          },
        ]
      : []),
    ...(subscription?.billing && getMultilineAddress(subscription?.billing)
      ? [
          {
            title: text.billingAddressLabel,
            body: getMultilineAddress(subscription?.billing) ?? '',
          },
        ]
      : []),
  ],
  invoiceItems: subscription.items,
  currency: subscription?.currency,
  billingSchedule: subscription?.billingSchedule,
});

export const propsCallback: GetServerSideProps<
  SubscriptionDetailPageProps
> = async (context) => {
  const { locale } = context;
  const subscriptionId = context.params?.id;
  const sessionTokenCookie = context.req.cookies.sessionToken;
  if (
    !subscriptionId ||
    typeof subscriptionId !== 'string' ||
    !sessionTokenCookie
  ) {
    return {
      notFound: true,
    };
  }

  const client = getClientWithSessionToken(context.req.cookies);

  const subscription = (
    await client.getSubscriptionById({ id: subscriptionId })
  )?.data?.subscriptionById;

  if (!subscription) {
    return {
      notFound: true,
    };
  }

  const firstProducts = (await client.addInvoiceItemFirstProducts())?.data
    ?.products?.results;

  if (!firstProducts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageType: 'subscriptions',
      subscription,
      firstProducts,
      ...(locale ? { locale } : {}),
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const SubscriptionDetailPage: NextPageWithLayout<
  SubscriptionDetailPageProps
> = (props) => {
  const i18n = useI18n();
  const text = subscriptionDetailsText(i18n);
  const subscription = formatSubscription(props.subscription, text);
  const firstProducts = props.firstProducts;
  const initialSubscription = props.subscription;

  const { locale } = useRouter();
  const [showInvoiceBtn] = useState(false);
  const [status, setStatus] = useState(subscription.status);
  const [cancelSubscriptionOpen, setCancelSubscriptionOpen] = useState(false);
  const [pauseSubscriptionOpen, setPauseSubscriptionOpen] = useState(false);
  const [editSubscriptionOpen, setEditSubscriptionOpen] = useState(false);
  const [addInvoiceOpen, setAddInvoiceOpen] = useState(false);
  const send = useNotificationStore((store) => store.send);
  const fetchApi = useFetchApi();

  const getStatusLabel = (statusValue: string) => {
    switch (statusValue) {
      case SUBSCRIPTION_STATUS.ACTIVE:
        return i18n('account.subscriptions.status.active');
      case SUBSCRIPTION_STATUS.PAID:
        return i18n('account.subscriptions.status.paid');
      case SUBSCRIPTION_STATUS.COMPLETE:
        return i18n('account.subscriptions.status.complete');
      case SUBSCRIPTION_STATUS.TRIAL:
        return i18n('account.subscriptions.status.trial');
      case SUBSCRIPTION_STATUS.PAUSED:
        return i18n('account.subscriptions.status.paused');
      case SUBSCRIPTION_STATUS.PENDING:
        return i18n('account.subscriptions.status.pending');
      case SUBSCRIPTION_STATUS.CANCELED:
        return i18n('account.subscriptions.status.canceled');
      case SUBSCRIPTION_STATUS.UNPAID:
        return i18n('account.subscriptions.status.unpaid');
      case SUBSCRIPTION_STATUS.PASTDUE:
        return i18n('account.subscriptions.status.pastdue');
      case SUBSCRIPTION_STATUS.DRAFT:
        return i18n('account.subscriptions.status.draft');
      default:
        return statusValue;
    }
  };

  const dateCreatedRow = subscription?.dateCreated
    ? [text.createdLabel, formatDateToLocale(subscription.dateCreated, locale)]
    : null;
  const nextBillingRow = subscription.datePeriodEnd
    ? [
        text.nextBillingLabel,
        formatDateToLocale(subscription.datePeriodEnd, locale),
      ]
    : null;
  const itemsRow = [text.itemsLabel, subscription.quantity];
  const headerLeftColumn = denullifyArray([
    dateCreatedRow,
    nextBillingRow,
    itemsRow,
  ]);

  const responseCallback = useCallback(
    async (res: Response, action: 'cancel' | 'pause' | 'resume') => {
      const data = await res.json();

      setCancelSubscriptionOpen(false);
      setPauseSubscriptionOpen(false);

      const isSuccess =
        (action === 'cancel' && data?.canceled) ||
        (action === 'pause' && data?.paused) ||
        (action === 'resume' && !data?.paused);

      if (res.status === 200 && isSuccess) {
        send({
          message: text[action].successMessage,
          type: NOTIFICATION_TYPE.INFO,
        });

        setStatus(
          action === 'cancel'
            ? SUBSCRIPTION_STATUS.CANCELED
            : action === 'pause'
            ? SUBSCRIPTION_STATUS.PAUSED
            : SUBSCRIPTION_STATUS.ACTIVE,
        );
      } else {
        send({
          message: text[action].errorMessage,
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send, text],
  );

  const errorCallback = useCallback(
    (action: 'cancel' | 'pause' | 'resume') => {
      send({
        message: text[action].errorMessage,
        type: NOTIFICATION_TYPE.ERROR,
      });
    },
    [send, text],
  );

  const cancelSubscription = useCallback(
    () =>
      fetchApi(
        {
          url: API_ROUTES.CANCEL_SUBSCRIPTION,
          options: {
            method: 'POST',
            body: JSON.stringify({ id: subscription.id }),
          },
        },
        (res) => responseCallback(res, 'cancel'),
        () => errorCallback('cancel'),
      ),
    [responseCallback, errorCallback, fetchApi, subscription.id],
  );

  const pauseSubscription = useCallback(
    (status: boolean) =>
      fetchApi(
        {
          url: API_ROUTES.PAUSE_SUBSCRIPTION,
          options: {
            method: 'POST',
            body: JSON.stringify({ id: subscription.id, status }),
          },
        },
        (res) => responseCallback(res, !status ? 'resume' : 'pause'),
        () => errorCallback(!status ? 'resume' : 'pause'),
      ),
    [responseCallback, errorCallback, fetchApi, subscription.id],
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="mb-12">
        <GhostButton
          elType={BUTTON_TYPE.LINK}
          href="/account/subscriptions"
          className={`inline-flex items-center gap-2 text-sm mb-6 transition-colors ${styles.tealText}`}>
          <ArrowLeft className="w-4 h-4" />
          <span>{text.backToSubscriptionsLabel}</span>
        </GhostButton>
      </div>

      {/* Main Subscription Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
        {/* Header with title and status */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <h1 className={`text-2xl font-semibold mb-1 tracking-tight ${styles.tealText}`}>
              {subscription.name}
            </h1>
          </div>
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm border ${
            status === SUBSCRIPTION_STATUS.ACTIVE ? 'bg-green-100 text-green-800 border-green-200' :
            status === SUBSCRIPTION_STATUS.PAID ? 'bg-green-100 text-green-800 border-green-200' :
            status === SUBSCRIPTION_STATUS.COMPLETE ? 'bg-green-100 text-green-800 border-green-200' :
            status === SUBSCRIPTION_STATUS.TRIAL ? 'bg-green-100 text-green-800 border-green-200' :
            status === SUBSCRIPTION_STATUS.PAUSED ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
            status === SUBSCRIPTION_STATUS.PENDING ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
            status === SUBSCRIPTION_STATUS.CANCELED ? 'bg-pink-100 text-red-600 border-pink-200' :
            status === SUBSCRIPTION_STATUS.UNPAID ? 'bg-pink-100 text-red-600 border-pink-200' :
            status === SUBSCRIPTION_STATUS.PASTDUE ? 'bg-pink-100 text-red-600 border-pink-200' :
            'bg-gray-100 text-gray-600 border-gray-200'
          }`}>
            {i18n(`account.subscriptions.status.${status}`)}
          </span>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {headerLeftColumn.map(([label, value]) => (
            <div key={label} className="flex flex-col">
              <div className={`text-xs uppercase tracking-wider mb-1 ${styles.tealText}`}>{label}</div>
              <div className={`text-sm font-medium ${styles.tealText}`}>{value}</div>
            </div>
          ))}
          <div className="flex flex-col">
            <div className={`text-xs uppercase tracking-wider mb-1 ${styles.tealText}`}>Total</div>
            <div className={`text-sm font-medium ${styles.tealText}`}>{subscription.grandTotal}</div>
          </div>
        </div>

        {/* Billing Cycle */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          {subscription?.billingScheduleText && (
            <div className={`flex items-center gap-2 text-sm ${styles.tealText}`}>
              <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              {subscription.billingScheduleText}
            </div>
          )}
        </div>
      </div>

      {/* Notification Banner */}
      {subscription?.notificationText && (
        <div className="mb-8">
          <BannerInfo textAlignment={TEXT_ALIGNMENT.CENTER}>
            {subscription.notificationText}
          </BannerInfo>
        </div>
      )}

      {/* Actions Card */}
      {status === SUBSCRIPTION_STATUS.CANCELED ? (
        /* Cancelled Subscription Message */
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-10 text-center mb-8">
          <h2 className={`text-xl font-semibold mb-4 tracking-tight ${styles.tealText}`}>Subscription cancelled</h2>
          <p className={`text-sm mb-6 ${styles.tealText}`}>
            This subscription was cancelled on {(subscription as any).dateCanceled ? formatDateToLocale((subscription as any).dateCanceled, locale) : formatDateToLocale(new Date(), locale)} and can&apos;t be restarted.
          </p>
          
          <Link 
            href="/categories/subscribe-save"
            className={`inline-flex items-center gap-2 px-6 py-3 border bg-white rounded-lg text-sm font-semibold tracking-tight
              transition-all duration-200 transform hover:-translate-y-0.5 ${styles.tealButton}`}
          >
            Start a new subscription
          </Link>
        </div>
      ) : (
        /* Active/Paused Subscription Management */
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-10 mb-8">
          <h2 className={`text-xl font-semibold mb-2 tracking-tight text-left ${styles.tealText}`}>Manage subscription</h2>
          <p className={`text-sm mb-8 text-left ${styles.tealText}`}>You&apos;re in control.</p>

          <div className={`grid gap-6 ${
            status === SUBSCRIPTION_STATUS.PAUSED 
              ? 'grid-cols-1 sm:grid-cols-3' 
              : 'grid-cols-1 sm:grid-cols-3'
          }`}>
            {/* Edit Button - Always show for active and paused */}
            <button
              onClick={() => setEditSubscriptionOpen(true)}
              className={`flex flex-col items-center gap-2 p-6 border bg-white rounded-lg
                transition-all duration-200 transform hover:-translate-y-0.5 ${styles.tealButton}`}
            >
              <div className="text-sm font-semibold tracking-tight">Edit plan</div>
              <div className="text-xs opacity-75 text-center leading-tight">
                Change quantity, frequency, or billing
              </div>
            </button>

            {/* Pause/Resume Button - Show Resume for paused, Pause for active */}
            {status === SUBSCRIPTION_STATUS.PAUSED ? (
              <button
                onClick={() => setPauseSubscriptionOpen(true)}
                className={`flex flex-col items-center gap-2 p-6 border bg-white rounded-lg
                  transition-all duration-200 transform hover:-translate-y-0.5 ${styles.tealButton}`}
              >
                <div className="text-sm font-semibold tracking-tight">Resume subscription</div>
                <div className="text-xs opacity-75 text-center leading-tight">
                  Restart deliveries and billing
                </div>
              </button>
            ) : (
              <button
                onClick={() => setPauseSubscriptionOpen(true)}
                className={`flex flex-col items-center gap-2 p-6 border bg-white rounded-lg
                  transition-all duration-200 transform hover:-translate-y-0.5 ${styles.tealButton}`}
              >
                <div className="text-sm font-semibold tracking-tight">Pause subscription</div>
                <div className="text-xs opacity-75 text-center leading-tight">
                  Temporarily stop deliveries
                </div>
              </button>
            )}

            {/* Cancel Button - Only show for active and paused subscriptions */}
            <button
              onClick={() => setCancelSubscriptionOpen(true)}
              className={`flex flex-col items-center gap-2 p-6 border bg-white rounded-lg
                transition-all duration-200 transform hover:-translate-y-0.5 ${styles.tealButton}`}
            >
              <div className="text-sm font-semibold tracking-tight">Cancel subscription</div>
              <div className="text-xs opacity-75 text-center leading-tight">
                End this subscription permanently
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Product Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
        <h2 className={`text-lg font-semibold mb-4 tracking-tight ${styles.tealText}`}>Your subscription</h2>
        <div className="space-y-4">
          {subscription.orderItems.map((item, index) => (
            <div key={index} className="flex gap-4 items-center py-5 border-b border-gray-100 last:border-b-0">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {item.image?.src ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-base font-medium ${styles.tealText}`}>{item.title}</div>
                <div className={`text-sm ${styles.tealText}`}>
                  {item.options?.join(', ') || `Quantity: ${item.quantity}`}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-base font-semibold ${styles.tealText}`}>{item.price}</div>
                <div className={`text-xs ${styles.tealText}`}>{subscription?.billingScheduleText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Breakdown Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className={`text-lg font-semibold mb-4 tracking-tight ${styles.tealText}`}>Invoice breakdown</h2>
        <div className="space-y-3">
          {subscription.summaryRows.map((row, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className={`text-sm ${styles.tealText}`}>{row.label}</div>
              <div className={`text-sm font-medium ${styles.tealText}`}>{row.value}</div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className={`text-sm font-semibold ${styles.tealText}`}>{subscription.totalRow.label}</div>
            <div className={`text-sm font-semibold ${styles.tealText}`}>{subscription.totalRow.value}</div>
          </div>
        </div>
      </div>

      {/* Modals for actions - Only show for non-cancelled subscriptions */}
      {status !== SUBSCRIPTION_STATUS.CANCELED && (
        <>
          <EditPlanModal
            subscription={initialSubscription}
            currency={subscription.currency ?? ''}
            firstProducts={firstProducts}
            title="Edit plan"
            open={editSubscriptionOpen}
            onClose={() => setEditSubscriptionOpen(false)}
            actionButtons={[
              {
                label: 'Cancel',
                onClick: () => setEditSubscriptionOpen(false),
                style: BUTTON_STYLE.SECONDARY,
              },
              {
                label: 'Save',
                onClick: () => setEditSubscriptionOpen(false),
                style: BUTTON_STYLE.PRIMARY,
              },
            ]}
          />

          {status === SUBSCRIPTION_STATUS.PAUSED ? (
            <ActionModal
              title={text.resume.dialogTitle}
              body={text.resume.dialogBody}
              open={pauseSubscriptionOpen}
              onClose={() => setPauseSubscriptionOpen(false)}
              actionButtons={[
                {
                  label: text.resume.subscriptionButtonLabel,
                  onClick: () => pauseSubscription(false),
                  style: BUTTON_STYLE.DANGER,
                },
                {
                  label: text.resume.buttonLabel,
                  onClick: () => setPauseSubscriptionOpen(false),
                  style: BUTTON_STYLE.SECONDARY,
                },
              ]}
            />
          ) : (
            <PauseSubscriptionModal
              interval={subscription?.billingSchedule?.intervalCount ?? 0}
              nextBillingDate={subscription?.datePeriodEnd}
              subscriptionId={subscription?.id ?? ''}
              title={text.pause.dialogTitle}
              open={pauseSubscriptionOpen}
              onClose={() => setPauseSubscriptionOpen(false)}
              actionButtons={[
                {
                  label: text.pause.buttonLabel,
                  onClick: () => setPauseSubscriptionOpen(false),
                  style: BUTTON_STYLE.SECONDARY,
                },
              ]}
            />
          )}

          <ActionModal
            title={text.cancel.dialogTitle}
            body={text.cancel.dialogBody}
            open={cancelSubscriptionOpen}
            onClose={() => setCancelSubscriptionOpen(false)}
            actionButtons={[
              {
                label: text.cancel.subscriptionButtonLabel,
                onClick: cancelSubscription,
                style: BUTTON_STYLE.DANGER,
              },
              {
                label: text.cancel.buttonLabel,
                onClick: () => setCancelSubscriptionOpen(false),
                style: BUTTON_STYLE.SECONDARY,
              },
            ]}
          />
        </>
      )}

      {showInvoiceBtn && subscription.id && subscription.currency && (
        <AddInvoiceItemModal
          subscription={subscription.id}
          currency={subscription.currency}
          firstProducts={firstProducts}
          title="Add item"
          open={addInvoiceOpen}
          onClose={() => setAddInvoiceOpen(false)}
          actionButtons={[
            {
              label: 'Cancel',
              onClick: () => setAddInvoiceOpen(false),
              style: BUTTON_STYLE.SECONDARY,
            },
            {
              label: 'Save',
              onClick: cancelSubscription,
              style: BUTTON_STYLE.PRIMARY,
            },
          ]}
        />
      )}
    </div>
  );
};

SubscriptionDetailPage.getLayout = getAccountLayout;

export default SubscriptionDetailPage;
