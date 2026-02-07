import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate('/'); // Sending to landing page after logout
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo , add from the miscllaneous branch */}
      <Link to="/" className="flex items-center cursor-pointer">
        <span className="text-2xl font-bold text-orange-600 tracking-tighter italic">RAIDER<span className="text-gray-900">RUN</span></span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-8 text-gray-700">
        <Link to="/" className="hover:text-orange-600 font-medium transition">Home</Link>
        <Link to="/earn-money" className="hover:text-orange-600 font-medium transition">Earn Money</Link>
        
        <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
          {isLoggedIn ? (
            /* Logged In View */
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Welcome</p>
                <p className="text-sm font-bold text-gray-900">{profile?.FirstName}</p>
              </div>
              <button 
                onClick={onLogoutClick}
                className="px-5 py-2 text-red-600 border border-red-100 bg-red-50 rounded-full hover:bg-red-100 transition font-bold text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            /* Logged Out View */
            <>
              <Link to='/auth/signin'> 
                <button className="px-5 py-2 text-orange-600 border border-orange-600 rounded-full hover:bg-orange-50 transition font-medium">
                  Sign In
                </button> 
              </Link>
              <Link to='/auth/signup'> 
                <button className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-md transition font-medium">
                  Sign Up
                </button> 
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;