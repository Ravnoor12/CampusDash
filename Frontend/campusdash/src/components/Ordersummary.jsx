import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../hooks';

const OrderSummary = () => {
  const { orderData, updateItems } = useOrder();
  const [orderStatus, setOrderStatus] = useState('summary');
  const [loading, setLoading] = useState(false);
  const {authInfo} = useAuth();

  const handleConfirm = async () => {
    setLoading(true);
    console.log(authInfo)
    const payload = {
      OrderName: orderData.items.substring(0, 40), 
      CustomerEmail: authInfo.email,
      CustomerLat: orderData.delivery.coords[0],
      CustomerLong: orderData.delivery.coords[1],
      ShopLat: orderData.pickup.coords[0],
      ShopLong: orderData.pickup.coords[1],
      DEmail: orderData.selectedPeer?.email || "null",
      DLat: orderData.selectedPeer ? orderData.selectedPeer.location[0] : null,
      DLong: orderData.selectedPeer ? orderData.selectedPeer.location[1] : null,
      AssignedEmails: [],
      Status: "New"
    };
    console.log("Payload to send to backend:", payload);
    try {
      const response = await fetch('http://10.16.246.191:5091/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Move to the next UI state only if the DB update succeeded
        setOrderStatus('waiting_for_payment');
      } else {
        alert("Backend error: Failed to create order.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const costData = {
    itemsSubtotal: 12.00,
    deliveryFee: 3.50,
    total: 15.50
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gray-900 p-8 text-white text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-500 text-[10px] font-bold uppercase tracking-widest mb-2">
            Final Step
          </div>
          <h1 className="text-3xl font-bold">Review Your Dash</h1>
        </div>

        <div className="p-8 space-y-6">
          {/* Peer Info Card */}
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-xl">👤</div>
              <div>
                <p className="text-xs text-orange-600 font-bold uppercase">Assigned Peer</p>
                <p className="font-bold text-gray-900">{orderData.selectedPeer?.name || 'Raider Peer'}</p>
              </div>
            </div>
          </div>

          {/* Item List Input - Only show in 'summary' mode */}
          {orderStatus === 'summary' ? (
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                What do you need?
              </label>
              <textarea 
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm min-h-[100px] transition-all"
                placeholder="List your items here (e.g. 1x Milk, 2x Protein Bars...)"
                value={orderData.items}
                onChange={(e) => updateItems(e.target.value)}
              />
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <p className="text-xs font-black text-gray-400 uppercase mb-2">Requested Items</p>
               <p className="text-sm text-gray-700 whitespace-pre-wrap">{orderData.items}</p>
            </div>
          )}

          {/* Address Summary */}
          <div className="relative pl-8 border-l-2 border-dashed border-gray-200 space-y-6">
            <div className="relative">
              <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow"></div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Pickup</p>
              <p className="text-sm font-medium text-gray-700">{orderData.pickup.street}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow"></div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Delivery</p>
              <p className="text-sm font-medium text-gray-700">{orderData.delivery.street}</p>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-gray-100 p-6 rounded-2xl space-y-2">
             <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>Items Subtotal</span>
                <span>${costData.itemsSubtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>Peer Delivery Tip</span>
                <span>${costData.deliveryFee.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${costData.total.toFixed(2)}</span>
             </div>
          </div>

          {/* Status-Based Actions */}
          <div className="pt-4">
            {orderStatus === 'summary' && (
              <button 
                disabled={!orderData.items.trim() || loading} 
                onClick={handleConfirm}
                className={`w-full font-bold py-5 rounded-2xl transition-all ${
                    orderData.items.trim() 
                    ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Order
              </button>
            )}

            {orderStatus === 'waiting_for_payment' && (
              <div className="text-center p-8 bg-blue-50 rounded-3xl border border-blue-100 animate-pulse">
                <p className="text-blue-800 font-bold">Waiting for peer to confirm payment...</p>
                <p className="text-xs text-blue-600 mt-2">
                  Once {orderData.selectedPeer?.name} confirms the cash, your OTP will appear.
                </p>
              </div>
            )}

            {orderStatus === 'show_otp' && (
              <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-3xl">
                <p className="text-xs text-green-600 font-black uppercase mb-2 tracking-widest">Your Security OTP</p>
                <div className="text-4xl font-black tracking-widest text-gray-900">8842</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;