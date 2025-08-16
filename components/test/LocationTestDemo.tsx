import React, { useState } from 'react';
import ShippingProgressBar from 'components/atoms/ShippingProgressBar';
import useLocationStore from 'stores/location';

const LocationTestDemo: React.FC = () => {
  const [testTotal, setTestTotal] = useState(15);
  const { location, setLocation } = useLocationStore();

  const toggleLocation = () => {
    setLocation({
      isUK: !location.isUK,
      country: location.isUK ? 'United States' : 'United Kingdom',
      countryCode: location.isUK ? 'US' : 'GB',
      detected: true,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg my-8">
      <h3 className="text-lg font-bold mb-4">Location-Based Delivery Test</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Current Location: <strong>{location.country}</strong> ({location.isUK ? 'UK' : 'International'})
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Threshold: <strong>£{location.isUK ? '30' : '100'}</strong>
        </p>
        
        <button
          onClick={toggleLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Switch to {location.isUK ? 'International' : 'UK'}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Test Cart Total: £{testTotal}
        </label>
        <input
          type="range"
          min="0"
          max="150"
          value={testTotal}
          onChange={(e) => setTestTotal(Number(e.target.value))}
          className="w-full"
          aria-label="Adjust cart total for testing"
        />
      </div>

      <ShippingProgressBar currentTotal={testTotal} />
    </div>
  );
};

export default LocationTestDemo;
