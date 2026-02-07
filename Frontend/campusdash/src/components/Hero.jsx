import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useNotification } from '../hooks';

const Hero = () => {
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  const handleOrderClick = () => {
    if (isLoggedIn) {
      navigate('/delivery-setup');
    } else {
      updateNotification('warning', 'Please sign in with your Wright State email to place an order.');
      navigate('/auth/signin');
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
      {/* Left Side: Text Content */}
      <div className="md:w-1/2 text-left space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Feeling hungry? <br />
          <span className="text-orange-600">We got you.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-lg">
          Connect with peers already at the store. Get your essentials delivered 
          by students, for students, with minimal delivery costs.
        </p>

        <div className="flex space-x-4 pt-4">
          <button onClick={handleOrderClick} className="px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition shadow-lg">
            Order Now
          </button>
          <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
            See How it Works
          </button>
        </div>
      </div>

      {/* Right Side: Image Content */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className="relative w-full max-w-md">
          {/* Decorative background blob */}
          <div className="absolute -top-10 -around-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
          
          <img 
            src="/assets/hero-food.png" 
            alt="Campus Delivery" 
            className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;