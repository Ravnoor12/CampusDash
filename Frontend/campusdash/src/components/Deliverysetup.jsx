import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { geocodeAddress } from '../utils/helper';

const Deliverysetup = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState({ street: '', city: 'Fairborn', zip: '' });
  const [delivery, setDelivery] = useState({ street: '', city: 'Fairborn', zip: '' });
  const { updateAddresses,updatePickupCoords,updateDeliveryCoords } = useOrder();

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(pickup.zip) || !zipRegex.test(delivery.zip)) {
      alert("Please enter a valid 5-digit zipcode.");
      return;
    }

    updateAddresses(pickup, delivery);
    const handleSearch = async () => {
        const pickcoords = await geocodeAddress(pickup);

        updatePickupCoords(pickcoords);



        updateDeliveryCoords(await geocodeAddress(delivery));
        console.log("Pickup:", pickup, "Delivery:", delivery);
    }
    handleSearch();
    navigate('/Marketplace', { 
      state: { pickup, delivery } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Setup Your Dash</h1>
          <p className="text-gray-600 mt-2">Enter the details for your peer-to-peer delivery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
         
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">1</div>
              <h2 className="text-xl font-bold">Pickup Location</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Store or Restaurant Address*</label>
                <input
                  required
                  type="text"
                  minLength="5"
                  placeholder="e.g. 3800 Colonel Glenn Hwy (Meijer)"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  onChange={(e) => setPickup({...pickup, street: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zipcode*</label>
                <input
                  required
                  type="text"
                  maxLength="5"
                  pattern="\d{5}" 
                  title="Please enter a 5-digit zipcode (e.g. 45324)"
                  placeholder="45324"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  onInput={(e) => {
                    // Force only numbers in the input field
                    e.target.value = e.target.value.replace(/\D/g, '');
                    setPickup({...pickup, zip: e.target.value});
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  readOnly
                  value="Fairborn, OH"
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/*  Delivery Location */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
              <h2 className="text-xl font-bold">Delivery Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Dorm or Apartment Address*</label>
                <input
                  required
                  type="text"
                  minLength="3"
                  placeholder="e.g. Hamilton Hall, Room 101"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setDelivery({...delivery, street: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zipcode*</label>
                <input
                  required
                  type="text"
                  maxLength="5"
                  pattern="\d{5}"
                  title="Please enter a 5-digit zipcode"
                  placeholder="45324"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                    setDelivery({...delivery, zip: e.target.value});
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  readOnly
                  value="Fairborn, OH"
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-5 rounded-3xl shadow-xl hover:bg-black transition-all transform active:scale-[0.98]"
          >
            Find a Peer Nearby
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deliverysetup;