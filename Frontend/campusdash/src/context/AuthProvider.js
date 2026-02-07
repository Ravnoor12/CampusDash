import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../api/auth';
import { useNotification } from '../hooks';

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: ''
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const isAuth = () => {
    const savedUser = localStorage.getItem('user-profile');
    // console.log(savedUser)
    if (savedUser && savedUser !== 'undefined') {
      setAuthInfo({
        profile: JSON.parse(savedUser),
        isLoggedIn: true, // Set to true if profile exists
        isPending: false,
        error: ''
      });
    }
  };

  const handleLogin = async (email, password) => {
    setAuthInfo((prev) => ({ ...prev, isPending: true }));
    
    const res = await signInUser({ email, password });
    
    if (res.error) {
      updateNotification('error', res.error);
      return setAuthInfo((prev) => ({ ...prev, isPending: false, error: res.error }));
    }

    const { customer } = res;
    console.log("Login successful, customer data:", customer);
    setAuthInfo({
        profile: { ...customer },
         email: email || "singh.288@wright.edu",
        isLoggedIn: true, 
        isPending: false,
        error: ''
    });

    localStorage.setItem('user-profile', JSON.stringify(customer));
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    
    localStorage.removeItem('user-profile');
    
    // Reset isLoggedIn 
    setAuthInfo({ ...defaultAuthInfo });
    navigate('/login');
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
        authInfo, 
        handleLogin, 
        handleLogout, 
        isLoggedIn: authInfo.isLoggedIn // Exported for easier access
    }}>
      {children}
    </AuthContext.Provider>
  );
}