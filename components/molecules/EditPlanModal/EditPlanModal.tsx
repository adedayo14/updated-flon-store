import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import Close from 'assets/icons/close.svg';
import SearchIcon from 'assets/icons/search.svg';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type {
  SwellProduct,
  SwellSubscription,
} from 'lib/graphql/generated/sdk';
import Image from 'next/image';
import { formatPriceByCurrency } from 'lib/utils/price';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import useNotificationStore from 'stores/notification';
import { API_ROUTES } from 'types/shared/api';
import useFetchApi from 'hooks/useFetchApi';

interface ActionButton {
  label: string;
  onClick: () => void;
  style?: BUTTON_STYLE;
}

export interface ActionModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  firstProducts: SwellProduct[];
  actionButtons: ActionButton[];
  currency: string;
  subscription: SwellSubscription;
}

const EditPlanModal: React.FC<ActionModalProps> = ({
  firstProducts = [],
  title,
  open,
  onClose,
  actionButtons,
  currency,
  subscription,
}) => {
  // Initialize default product
  const defaultProduct = useMemo(() => {
    const imageUrl =
      subscription?.product?.images?.[0]?.file?.url || 'fallback-image-url.png';

    return {
      id: subscription.productId,
      name: subscription.product?.name || 'Select an item',
      price: subscription.price,
      currency,
      images: [{ file: { url: imageUrl } }],
      description: 'Default product description',
      slug: '',
      sale: false,
      origPrice: subscription?.product?.price,
      variant: subscription?.variant,
    };
  }, [subscription, currency]);

  const [selectedItem, setSelectedItem] = useState<SwellProduct | null>(
    defaultProduct,
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [quantity, setQuantity] = useState(subscription?.quantity);
  const [price, setPrice] = useState(subscription?.price);
  const [total, setTotal] = useState(subscription?.grandTotal);
  const [searchName, setSearchName] = useState('');
  const [products, setProducts] = useState(firstProducts);
  const [isRecurring, setIsRecurring] = useState(false);
  const [showRecurringCheckbox] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(subscription?.variant);
  const [variants, setVariants] = useState<any[]>([]); // State to hold variants for the selected product

  useEffect(() => {
    if (selectedItem?.variants?.results?.length) {
      setVariants(selectedItem?.variants?.results ?? []);
      setSelectedVariant(selectedItem?.variants?.results?.[0] ?? null); // Automatically select the first variant
    }
  }, [selectedItem]);

  // New state for plan selection
  const [selectedPlan, setSelectedPlan] = useState({
    label: subscription?.billingSchedule?.interval,
    value: subscription?.billingSchedule?.intervalCount,
    price: subscription?.grandTotal, // Assuming this is the monthly price
  });

  // Plan options
  const planOptions = [
    { label: 'Monthly', value: 1, price: selectedItem?.price },
    {
      label: 'Every 2 months',
      value: 2,
      price: selectedItem?.price,
    },
    {
      label: 'Every 3 months',
      value: 3,
      price: selectedItem?.price,
    },
    {
      label: 'Every 4 months',
      value: 4,
      price: selectedItem?.price,
    },
    {
      label: 'Every 5 months',
      value: 5,
      price: selectedItem?.price,
    },
    {
      label: 'Every 6 months',
      value: 6,
      price: selectedItem?.price,
    },
  ];

  const send = useNotificationStore((store) => store.send);
  const fetchApi = useFetchApi();

  // const responseCallback = useCallback(
  //   async (res: Response) => {
  //     const data = await res.json();
  //     if (res.status === 200) {
  //       if (data.added) {
  //         send({
  //           message: 'Item has been added',
  //           type: NOTIFICATION_TYPE.INFO,
  //         });
  //         window.location.reload();
  //       }
  //     } else {
  //       send({
  //         message: 'Error processing request',
  //         type: NOTIFICATION_TYPE.ERROR,
  //       });
  //     }
  //   },
  //   [send],
  // );

  const searchResponseCallback = useCallback(
    async (res: Response) => {
      const data = await res.json();
      if (res.status === 200) {
        if (data.products?.results) {
          const results: SwellProduct[] = data.products?.results.map(
            (item: any) => ({
              id: item.id,
              name: item.name,
              currency: item.currency,
              description: item.description || 'No description available.',
              slug: item.slug,
              price: item.price,
              sale: item.sale,
              origPrice: item.origPrice || item.price,
              images: item.images,
            }),
          );
          setProducts(results);
        }
      } else {
        send({
          message: 'Error processing request',
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send],
  );

  const editPlanResponseCallback = useCallback(
    async (res: Response) => {
      if (res.status === 200) {
        send({
          message: 'Plan has been edited',
          type: NOTIFICATION_TYPE.INFO,
        });
        setIsButtonDisabled(false);
        window.location.reload();
      } else {
        send({
          message: 'Error processing request',
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send],
  );

  const errorCallback = useCallback(() => {
    send({
      message: 'Error processing request',
      type: NOTIFICATION_TYPE.ERROR,
    });
  }, [send]);

  const searchProducts = useCallback(
    (searchName: string, currency: string) => {
      fetchApi(
        {
          url: API_ROUTES.SEARCH_PRODUCTS,
          options: {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: searchName, currency }),
          },
        },
        (res) => searchResponseCallback(res),
        () => errorCallback(),
      );
    },
    [fetchApi, searchResponseCallback, errorCallback],
  );

  const editPlan = useCallback(
    (
      planId: string,
      productId: string,
      planProductId: string,
      variantId: string,
      quantity: number,
      billingInterval: number,
    ) => {
      console.log(`planProductId:${planProductId}|productId:${productId}`);
      fetchApi(
        {
          url:
            productId === planProductId
              ? API_ROUTES.EDIT_SUBSCRIPTION_PRODUCT_DETAILS
              : API_ROUTES.EDIT_SUBSCRIPTION_PLAN,
          options: {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:
              productId === planProductId
                ? JSON.stringify({
                    id: planId,
                    variantId,
                    quantity,
                    interval: billingInterval,
                  })
                : JSON.stringify({
                    id: planId,
                    productId,
                    variantId,
                    quantity,
                    interval: billingInterval,
                  }),
          },
        },
        (res) => editPlanResponseCallback(res),
        () => errorCallback(),
      );
    },
    [fetchApi, editPlanResponseCallback, errorCallback],
  );

  const handleSearchClick = () => {
    searchProducts(searchName, currency);
  };

  // const addItem = useCallback(
  //   (subscription: string, productId: string, qty: number) => {
  //     fetchApi(
  //       {
  //         url: API_ROUTES.ADD_INVOICE_ITEM,
  //         options: {
  //           method: 'POST',
  //           body: JSON.stringify({
  //             id: subscription,
  //             itemId: productId,
  //             quantity: qty,
  //             recurring: isRecurring, // Include the recurring state
  //           }),
  //         },
  //       },
  //       (res) => responseCallback(res),
  //       () => errorCallback(),
  //     );
  //   },
  //   [responseCallback, errorCallback, fetchApi, isRecurring],
  // );

  // Reset state when modal is closed
  useEffect(() => {
    if (!open) {
      setIsButtonDisabled(false);
      setSelectedItem(defaultProduct);
      setQuantity(subscription?.quantity);
      setPrice(selectedItem?.price);
    }
  }, [open, defaultProduct, subscription, selectedItem]);

  // Reset price and total when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setPrice(selectedItem.price || 0);
    }
  }, [selectedItem]);

  // Update total when quantity changes
  useEffect(() => {
    setTotal(price * (quantity ?? 1));
  }, [price, quantity]);

  return (
    <Transition show={open}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Dialog.Backdrop}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-backdrop bg-[rgba(0,0,0,0.3)]"
        />
        <Transition.Child
          as={Dialog.Panel}
          enter="duration-700 md:duration-400"
          enterFrom="translate-y-full md:-translate-y-1/2 md:opacity-0 md:scale-95"
          enterTo="translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100"
          leave="duration-500 md:duration-300"
          leaveFrom="translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100"
          leaveTo="translate-y-full md:-translate-y-1/2 md:opacity-0 md:scale-95"
          className="shadow-xl fixed bottom-0 left-0 z-modal flex h-5/6 w-full flex-col gap-y-10 rounded-t-xl bg-background-primary p-6 text-left align-middle transition-[opacity,_transform] md:left-1/2 md:top-1/2 md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title
              as="h3"
              className="font-headings text-md font-semibold uppercase text-primary">
              {title}
            </Dialog.Title>
          </div>
          <div className="">
            <Listbox value={selectedItem} onChange={setSelectedItem}>
              <Listbox.Button className="flex w-full items-center gap-x-2 rounded-md border border-primary py-2 pl-3 pr-10 text-left text-primary placeholder-shown:border-input-standard focus:border-primary focus:text-primary focus:outline-none focus:outline-none focus:ring-1 sm:text-sm">
                <Image
                  src={selectedItem?.images?.[0]?.file?.url ?? ''}
                  alt={(selectedItem?.name || name) as string | undefined}
                  className="mr-2 inline-block h-6 w-6 rounded-md"
                  width={40}
                  height={40}
                />
                {selectedItem ? selectedItem.name : 'Select an item'}
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="shadow-lg ring-black absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-primary py-1 text-primary ring-1 ring-opacity-5 focus:outline-none sm:text-sm md:max-w-[420px]">
                  <div className="px-3 py-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search product"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      />
                      <button
                        onClick={handleSearchClick}
                        className="absolute inset-y-0 right-0 flex items-center px-2">
                        <SearchIcon className="text-gray-500 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {products.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      value={item}
                      className={() =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4`
                      }>
                      {({ selected }) => (
                        <>
                          <span
                            className={`flex items-center justify-between truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}>
                            <div className="flex items-center gap-x-1">
                              {item.images?.[0]?.file?.url && (
                                <Image
                                  src={item.images[0].file.url}
                                  alt={item.name?.toString()}
                                  className="mr-2 inline-block h-6 w-6 rounded-md"
                                  width={40}
                                  height={40}
                                />
                              )}
                              {item.name}
                            </div>
                            <div className="text-[#BDB9C6]">
                              {formatPriceByCurrency(currency)(item.price ?? 0)}
                            </div>
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          {selectedItem?.variants &&
            selectedItem?.variants?.results &&
            selectedItem?.variants?.results[0] && (
              <div className="">
                <label className="block text-sm font-medium text-primary">
                  {selectedItem?.options?.[0]?.name ?? 'Default Name'}
                </label>
                <Listbox value={selectedVariant} onChange={setSelectedVariant}>
                  <Listbox.Button className="flex w-full items-center gap-x-2 rounded-md border border-primary py-2 pl-3 pr-10 text-left text-primary placeholder-shown:border-input-standard focus:border-primary focus:text-primary focus:outline-none focus:outline-none focus:ring-1 sm:text-sm">
                    {selectedVariant?.name || 'Select a variant'}
                  </Listbox.Button>
                  <Transition
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className="shadow-lg ring-black absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background-primary py-1 text-primary ring-1 ring-opacity-5 focus:outline-none sm:text-sm md:max-w-[420px]">
                      {variants.map((variant, idx) => (
                        <Listbox.Option
                          key={idx}
                          value={variant}
                          className={() =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4`
                          }>
                          {variant.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
            )}

          <div className="">
            <label className="block text-sm font-medium text-primary">
              Plan
            </label>
            <Listbox value={selectedPlan} onChange={setSelectedPlan}>
              <Listbox.Button className="flex w-full items-center gap-x-2 rounded-md border border-primary py-2 pl-3 pr-10 text-left text-primary placeholder-shown:border-input-standard focus:border-primary focus:text-primary focus:outline-none focus:outline-none focus:ring-1 sm:text-sm">
                {planOptions[(selectedPlan?.value ?? 1) - 1].label},{' '}
                {formatPriceByCurrency(currency)(selectedItem?.price)}
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="shadow-lg ring-black absolute z-10 mt-1 max-h-60 w-full max-w-sm overflow-auto rounded-md bg-background-primary py-1 text-primary ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                  {planOptions.map((plan) => (
                    <Listbox.Option
                      key={plan.value}
                      value={plan}
                      className={() =>
                        `relative cursor-default select-none py-2 pl-3 pr-9`
                      }>
                      {({ selected }) => (
                        <>
                          <span
                            className={`${
                              selected ? 'font-semibold' : 'font-normal'
                            }
                        block truncate`}>
                            {plan.label},{' '}
                            {formatPriceByCurrency(currency)(plan.price)}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          <div className="">
            <div className="flex gap-4">
              <div className="flex items-center gap-4">
                <label className="w-20 text-sm text-primary">Quantity:</label>
                <input
                  min={1}
                  type="number"
                  value={quantity ?? 1}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border px-3 py-2 text-sm text-primary focus:outline-none focus:ring-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-20 text-sm text-primary">Price:</label>
                <input
                  disabled
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border px-3 py-2 text-sm text-primary focus:outline-none focus:ring-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="mr-2 text-sm text-primary">Total:</label>
                <span className="text-lg font-semibold text-primary">
                  {formatPriceByCurrency(currency)(total)}
                </span>
              </div>
              {showRecurringCheckbox && (
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={() => setIsRecurring(!isRecurring)}
                    className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 h-4 w-4"
                  />
                  <label
                    htmlFor="recurring"
                    className="text-gray-900 ml-2 block text-sm">
                    Recurring
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto flex space-x-2">
            {actionButtons.map(({ label, style, onClick }, i) => (
              <Button
                key={`${label}${i}`}
                elType={BUTTON_TYPE.BUTTON}
                buttonStyle={style}
                onClick={async () => {
                  if (subscription && i === 1) {
                    setIsButtonDisabled(true);
                    await editPlan(
                      subscription?.id ?? '',
                      selectedItem?.id ?? '',
                      subscription?.productId ?? '',
                      selectedVariant?.id ?? '',
                      quantity ?? 1,
                      selectedPlan?.value ?? 1,
                    );
                  } else {
                    onClick();
                  }
                }}
                disabled={i === 1 ? isButtonDisabled : false}
                className="text-center"
                fullWidth
                tabIndex={0}>
                {label}
              </Button>
            ))}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-[27.6px]">
              <Close className="w-[16.6px]" />
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default EditPlanModal;
