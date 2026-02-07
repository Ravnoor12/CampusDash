import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import MOCK_PEERS from '../api/fake_peers';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks';
import { getActivePeers } from '../api/active_users';

// 1. Define the Peer Icon (Orange)
const peerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Custom Blue Icon for Delivery
const deliveryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const pickupRedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const WSU_UNION = [39.78026307631379, -84.06469847568725]; 
const WSU_UNION1 = [39.70026307631379, -84.06469847568725]; 

function MapResizeFixer({ coords }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (coords) map.flyTo(coords, 14);
    }, 200); 
    return () => clearTimeout(timer);
  }, [map, coords]);
  return null;
}

const Marketplace = () => {
  const { orderData, selectPeer } = useOrder();
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeerId, setSelectedPeerId] = useState(null);
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const fetchPeers = async () => {
    setLoading(true);
    const { peers, error } = await getActivePeers();
    
    if (error) {
      updateNotification('error', error);
      setLoading(false);
      return;
    }
    const formattedPeers = peers.map((p) => ({
      id: p.email, // Using email as unique ID
      name: `${p.firstName} ${p.lastName}`,
      email: p.email,
      location: [p.latitude, p.longitude],
      store: "Nearby Store", // Backend doesn't provide this yet, so we use placeholder
      status: "Active",
      timeLeft: "15 mins"
    }));
    setPeers(formattedPeers);
    setLoading(false);
  };

  useEffect(() => {
    fetchPeers();
  }, []);


  const mapRef = useRef(null);
  const markerRefs = useRef({});
  console.log("Order Data in Marketplace:", orderData.delivery); 
  // Use Delivery Coords as the center, fallback to WSU Union
  const deliveryCoords = orderData.delivery.coords || WSU_UNION;
  const mapCenter = deliveryCoords;
  const pickupCoords = orderData.pickup.coords || WSU_UNION;


  const handleSelectPeer = (peer) => {
    setSelectedPeerId(peer.id);
    selectPeer(peer);
    if (mapRef.current) {
      mapRef.current.flyTo(peer.location, 16, { animate: true });
    }
    const marker = markerRefs.current[peer.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-120px)] overflow-hidden"> 
      
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Available Peers</h2>
          <p className="text-sm text-gray-500">Select a peer to deliver your order</p>
          <div className="mt-2 text-xs text-orange-600 font-medium bg-orange-50 p-2 rounded-lg">
            Delivering to: {orderData.delivery.street || "Unknown Address"}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {peers.map((peer) => (
            <div 
              key={peer.id}
              onClick={() => handleSelectPeer(peer)}
              className={`p-4 border rounded-2xl transition-all cursor-pointer shadow-sm ${
                selectedPeerId === peer.id 
                ? 'border-orange-500 bg-orange-100 ring-2 ring-orange-500' 
                : 'border-orange-100 bg-orange-50/50 hover:bg-orange-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="block font-bold text-gray-800 text-lg">{peer.name}</span>
                  <span className="text-sm text-orange-600 font-medium italic">at {peer.store}</span>
                </div>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-lg font-bold text-white ${peer.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}>
                  {peer.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-600 italic">🕒 Leaving in {peer.timeLeft}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Map */}
      <main className="w-2/3 relative h-full bg-gray-200">
        <MapContainer 
          key={mapCenter ? mapCenter.join(',') : 'default-map'} 
          center={mapCenter} 
          zoom={14} 
          className="h-full w-full z-0" 
          ref={mapRef}
        >
          <MapResizeFixer coords={mapCenter} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* 1. STORE PICKUP MARKER (Where the Peer goes) */}
          <Marker position={pickupCoords} icon={pickupRedIcon}>
            <Popup className="text-center font-sans">
              <p className="font-bold">Pickup Location</p>
              <p className="text-xs">{orderData.pickup.street || "Default (Wright State Union)"}</p>
            </Popup>
          </Marker>

          {/* 2. USER DELIVERY MARKER (Where you are) */}
          <Marker position={deliveryCoords} icon={deliveryIcon}>
            <Popup className="text-center font-sans">
              <p className="font-bold">Your Delivery Spot</p>
              <p className="text-xs">{orderData.delivery.street || "Default (Wright State Union)"}</p>
            </Popup>
          </Marker>

          {/* 3. ACTIVE PEERS (Nearby Peers) */}
          {peers.map((peer) => (
            <Marker 
              key={peer.id} 
              position={peer.location} 
              icon={peerIcon}
              ref={(el) => (markerRefs.current[peer.id] = el)}
              eventHandlers={{
                click: () => setSelectedPeerId(peer.id),
              }}
            >
              <Popup>
                <div className="text-center font-sans">
                  <p className="font-bold">{peer.name}</p>
                  <p className="text-xs">Available for {peer.store} orders</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Range Circle around Delivery Point */}
          {orderData.delivery.coords && (
            <Circle 
              center={orderData.delivery.coords} 
              pathOptions={{ color: '#3b82f6', fillOpacity: 0.1 }} 
              radius={3218} // 2 mile radius around you
            />
          )}
        </MapContainer>

        <button 
          disabled={!selectedPeerId} 
          onClick={() => navigate('/order-summary')}  //assuming the peer acepted the order 
          className={`absolute bottom-10 right-10 z-[1000] px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all transform ${
            selectedPeerId
            ? 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedPeerId ? "Confirm Peer & Order" : "Select a Peer"}
        </button>
      </main>
    </div>
  );
};

export default Marketplace;