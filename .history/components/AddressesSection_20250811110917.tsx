import React from 'react';
import { BUTTON_TYPE, BUTTON_STYLE } from 'types/shared/button';
import Button from './atoms/Button';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { useAddressContext } from 'utils/contexts/addressContext';
import { useRouter } from 'next/router';
import type { SpecialAddress } from 'pages/account/addresses';
import { API_BASE_URL } from 'config';

interface AddressProps {
  address: SpecialAddress;
}

const AddressCard: React.FC<AddressProps> = ({ address }) => {
  const send = useNotificationStore((store) => store.send);
  const { addresses, setAddresses } = useAddressContext();

  const handleDelete = async (id: string | undefined) => {
    try {
      if (!id) {
        send({
          message: 'Address ID is missing',
          type: NOTIFICATION_TYPE.ERROR,
        });
        return;
      }

      // Check if this is the default address
      const addressToDelete = addresses.find((addr) => addr.id === id);
      if (addressToDelete?.default) {
        send({
          message: 'Cannot delete your default address. Please set another address as default first.',
          type: NOTIFICATION_TYPE.ERROR,
        });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/swell/addresses/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        send({
          message: 'Address deleted successfully',
          type: NOTIFICATION_TYPE.SUCCESS,
        });
        // Remove the deleted address from the addresses array
        const updatedAddresses = addresses.filter((addr) => addr.id !== id);
        setAddresses(updatedAddresses); // Update the context with the updated addresses array
      } else {
        send({
          message: 'Failed to delete address',
          type: NOTIFICATION_TYPE.ERROR,
        });
        console.error('Failed to delete address');
      }
    } catch (error) {
      send({
        message: 'Error deleting address',
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  const handleSetAsDefault = async (id: string | undefined) => {
    try {
      if (!id) {
        send({
          message: 'Address ID is missing',
          type: NOTIFICATION_TYPE.ERROR,
        });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/swell/addresses/${id}/default`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        send({
          message: 'Saved. This is now your default address.',
          type: NOTIFICATION_TYPE.SUCCESS,
        });
        // Update addresses to reflect new default
        const updatedAddresses = addresses.map((addr) => ({
          ...addr,
          default: addr.id === id,
        }));
        setAddresses(updatedAddresses);
      } else {
        send({
          message: 'Failed to set as default address',
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    } catch (error) {
      send({
        message: 'Error setting default address',
        type: NOTIFICATION_TYPE.ERROR,
      });
    }
  };

  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="space-y-6 md:mt-12">
      <div 
        className={`relative rounded-xl border p-6 transition-all duration-200 ${
          address.default 
            ? 'border-green-200 bg-green-50/40 ring-1 ring-green-100' 
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
        role="article"
        aria-label={address.default ? "Default address" : "Address"}
      >
        {/* Header with name and default badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Mobile: checkmark at far left for instant scanning */}
            {address.default && (
              <div className="flex md:hidden">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                  <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            <div className={`text-lg font-semibold ${
              address.default ? 'text-gray-900' : 'text-gray-800'
            }`}>
              {address.name}
            </div>
          </div>
          
          {/* Default badge - top right with light green background */}
          {address.default && (
            <span 
              className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm"
              aria-label="Default address"
              role="status"
            >
              <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Default
            </span>
          )}
        </div>

        {/* Address details */}
        <div className="space-y-1 mb-6">
          <div className="text-base text-gray-700">{address.address1}</div>
          {address.address2 && (
            <div className="text-base text-gray-700">{address.address2}</div>
          )}
          <div className="text-base text-gray-700">
            {address.city}, {address.state} {address.zip}
          </div>
          <div className="text-base text-gray-700">{address.country}</div>
          {address.phone && (
            <div className="text-base text-gray-600">Phone: {address.phone}</div>
          )}
          {address.company && (
            <div className="text-base text-gray-600">Company: {address.company}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Set as default link for non-default addresses */}
          {!address.default && (
            <button
              onClick={() => handleSetAsDefault(address.id)}
              className="text-green-600 hover:text-green-700 text-sm font-medium underline decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded transition-colors duration-200"
              aria-pressed="false"
              aria-label="Set this address as your default"
            >
              Set as default
            </button>
          )}
          
          {/* Edit and Delete buttons - secondary for non-default, more subtle for default */}
          <div className="flex gap-2 sm:ml-auto">
            <Button
              elType={BUTTON_TYPE.LINK}
              href={`${currentRoute}/edit?id=${address.id}&isDefault=${address.default}`}
              onClick={() => null}
              buttonStyle={BUTTON_STYLE.SECONDARY}
              small
              className="whitespace-nowrap focus:ring-2 focus:ring-green-500 focus:ring-offset-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Edit
            </Button>
            <Button
              elType={BUTTON_TYPE.BUTTON}
              onClick={() => handleDelete(address.id)}
              buttonStyle={BUTTON_STYLE.SECONDARY}
              small
              className="whitespace-nowrap focus:ring-2 focus:ring-red-500 focus:ring-offset-2 border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressesSection: React.FC = () => {
  const { addresses } = useAddressContext();
  
  // Sort addresses to pin default to the top
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.default && !b.default) return -1;
    if (!a.default && b.default) return 1;
    return 0;
  });
  
  return (
    <div className="mt-8 space-y-4">
      {sortedAddresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
      {addresses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No addresses saved yet.</p>
          <p className="text-sm mt-2">Add your first address to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AddressesSection;
