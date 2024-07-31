import React, { useCallback, useState } from 'react';
import type { MandatoryImageProps } from 'types/global';
import InvoiceItemCard from '../InvoiceItemCard';
import type { SwellSubscriptionItem } from 'lib/graphql/generated/sdk';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import useFetchApi from 'hooks/useFetchApi';
import useNotificationStore from 'stores/notification';
import ActionModal from '../ActionModal';
import { API_ROUTES } from 'types/shared/api';

export interface InvoiceItem {
  title: string;
  href: string;
  image: MandatoryImageProps;
  options?: string[];
  quantity: number;
  price: string;
}

export interface InvoiceItemsTableProps {
  invoiceItems?: SwellSubscriptionItem[];
  quantityText: string;
  priceText: string;
  itemsText: string;
  className: string;
  subscription?: string;
}

const OrderItemsTable: React.FC<InvoiceItemsTableProps> = ({
  invoiceItems,
  quantityText,
  priceText,
  itemsText,
  className,
  subscription,
}) => {
  const tableHead = [itemsText, quantityText, priceText];

  const [deleteItemOpen, setDeleteItemOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const send = useNotificationStore((store) => store.send);
  const fetchApi = useFetchApi();

  const responseCallback = useCallback(
    async (res: Response) => {
      const data = await res.json();

      setDeleteItemOpen(false);
      setSelectedItemId(null);

      const isSuccess = data?.deleted;

      if (res.status === 200 && isSuccess) {
        send({
          message: 'Item has been deleted!',
          type: NOTIFICATION_TYPE.INFO,
        });
        window.location.reload();
      } else {
        send({
          message: 'Error found while deleting!',
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send],
  );

  const errorCallback = useCallback(() => {
    send({
      message: 'Error found while deleting!',
      type: NOTIFICATION_TYPE.ERROR,
    });
  }, [send]);

  const deleteItem = useCallback(
    (id: string, itemId: string) =>
      fetchApi(
        {
          url: API_ROUTES.DELETE_INVOICE_ITEM,
          options: {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, itemId }),
          },
        },
        (res) => responseCallback(res),
        () => errorCallback(),
      ),
    [responseCallback, errorCallback, fetchApi],
  );

  const handleDeleteClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setDeleteItemOpen(true);
  };

  return (
    <table className={['w-full', className ?? ''].join(' ')}>
      <thead className="border-outline hidden border-b text-sm font-semibold uppercase text-primary md:table-header-group">
        <tr>
          {tableHead.map((item, i) => (
            <th
              key={item}
              className={[
                'w-fit pb-3',
                i === 0 ? 'text-left' : 'text-right',
              ].join(' ')}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {invoiceItems &&
          invoiceItems.map((item, i) => (
            <tr
              key={`${item.product?.name}${i}`}
              className="h-full border-outline border-b align-top last:border-none">
              <td className="py-4">
                <InvoiceItemCard
                  title={
                    item.product?.name
                      ? item.product?.name?.toString()
                      : 'Untitled product'
                  }
                  href={''}
                  image={
                    item?.product?.images?.[0]?.file?.url
                      ? item?.product?.images?.[0]?.file?.url
                      : ''
                  }
                  quantityText={quantityText}
                  priceText={priceText}
                  price={item.price}
                />
              </td>
              {[item.quantity, item.priceTotal].map((option, index) => (
                <td
                  key={`${option}${i}`}
                  className="h-16 hidden py-4 text-right text-md font-semibold text-primary md:table-cell">
                  <div className="flex flex-col h-full">
                    <span className="flex-1">{option}</span>
                    {index === 1 && (
                      <div className="mt-10 flex flex-col space-y-6">
                        <Button
                          elType={BUTTON_TYPE.BUTTON}
                          onClick={() =>
                            item.id ? handleDeleteClick(item.id) : null
                          }
                          buttonStyle={BUTTON_STYLE.SECONDARY}
                          small
                          className={`mt-4 w-full whitespace-nowrap text-center md:mt-auto md:w-auto`}>
                          Delete Item
                        </Button>
                        <ActionModal
                          title="Delete item"
                          body={`Are you sure you want to delete ${item?.product?.name} from invoice?`}
                          open={deleteItemOpen && selectedItemId === item.id}
                          onClose={() => setDeleteItemOpen(false)}
                          actionButtons={[
                            {
                              label: 'Delete',
                              onClick: () =>
                                subscription && selectedItemId
                                  ? deleteItem(subscription, selectedItemId)
                                  : null,
                              style: BUTTON_STYLE.DANGER,
                            },
                            {
                              label: 'Cancel',
                              onClick: () => setDeleteItemOpen(false),
                              style: BUTTON_STYLE.SECONDARY,
                            },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        {/* {} */}
      </tbody>
    </table>
  );
};

export default OrderItemsTable;
