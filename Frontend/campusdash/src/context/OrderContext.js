import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState({
    pickup: { street: '', city: 'Fairborn', zip: '' ,  coords: null},
    delivery: { street: '', city: 'Fairborn', zip: '', coords: null },
    selectedPeer: null,
    items: ''
  });

  // Helper to update specific parts of the order
  const updateAddresses = (pickupDetails, deliveryDetails) => {
    setOrderData((prev) => ({
      ...prev,
      pickup: pickupDetails,
      delivery: deliveryDetails,
    }));
  };

  const selectPeer = (peer) => {
    setOrderData((prev) => ({ ...prev, selectedPeer: peer }));
  };

  const updatePickupCoords = (coords) => {
    setOrderData(prev => ({
      ...prev,
      pickup: { ...prev.pickup, coords }
    }));
  };

  const updateDeliveryCoords = (coords) => {
    setOrderData(prev => ({
      ...prev,
      delivery: { ...prev.delivery, coords }
    }));
  };

  const updateItems = (itemList) => {
    setOrderData(prev => ({ ...prev, items: itemList }));
  };

  return (
    <OrderContext.Provider value={{ orderData, updateAddresses, selectPeer, updatePickupCoords, updateDeliveryCoords, updateItems }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook for easy access
export const useOrder = () => useContext(OrderContext);