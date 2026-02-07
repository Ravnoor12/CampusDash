import React, { useState, useEffect } from 'react';

const EarnMoney = () => {
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'loading', 'active'
  const [coords, setCoords] = useState(null);

  
  const startEarning = () => {
    setLocationStatus('loading');

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocationStatus('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCoords(userCoords);
        setLocationStatus('active');
        
        // BACKEND Call from rohan TODO
        // updatePeerStatus({ status: 'active', location: userCoords });
        console.log("Peer is now active at:", userCoords);
      },
      (error) => {
        console.error("Location error:", error);
        setLocationStatus('denied');
      }
    );
  };

  // 1. ACCESS DENIED VIEW
  if (locationStatus === 'denied') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-6">
          📍
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Location Required</h1>
        <p className="text-gray-500 max-w-sm mb-8">
          To earn money as a Raider Peer, we need your live location to match you with nearby orders.
        </p>
        <button 
          onClick={startEarning}
          className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all"
        >
          Try Again
        </button>
        <p className="mt-4 text-xs text-gray-400">
          If you blocked permissions, you may need to reset them in your browser settings.
        </p>
      </div>
    );
  }

  // 2. ACTIVE VIEW (The Dashboard)
  if (locationStatus === 'active') {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Peer Dashboard</h1>
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              You are currently Active
            </p>
          </div>
          <button 
            onClick={() => setLocationStatus('idle')}
            className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold border border-red-100"
          >
            Go Offline
          </button>
        </header>

        {/* Task List Component goes here */}
        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-200 text-center text-gray-400">
          Searching for nearby orders in Fairborn...
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-orange-600 flex items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black italic tracking-tighter">EARN CASH.</h1>
          <p className="text-orange-100 font-medium text-lg">
            Pick up items for peers while you're already at the store.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-left space-y-4">
          <div className="flex gap-4">
            <span className="text-2xl">🛒</span>
            <p className="text-sm">Stay active while you shop at Meijer or Starbucks.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">💰</span>
            <p className="text-sm">Get paid instantly via the OTP handshake.</p>
          </div>
        </div>

        <button 
          onClick={startEarning}
          disabled={locationStatus === 'loading'}
          className="w-full bg-white text-orange-600 font-black py-5 rounded-2xl shadow-xl hover:bg-orange-50 transition-all transform active:scale-95"
        >
          {locationStatus === 'loading' ? 'Authenticating...' : 'GO ACTIVE NOW'}
        </button>
      </div>
    </div>
  );
};

export default EarnMoney;