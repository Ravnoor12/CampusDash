import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../hooks';
import { isValidEmail } from '../../utils/helper';


const validateUserInfo = ({ Email, Password }) => {
  if (!Email.trim()) return { ok: false, error: 'Email is missing!' };
  if (!isValidEmail(Email)) return { ok: false, error: 'Email is invalid!' };
  if (!Email.toLowerCase().endsWith('@wright.edu')) {
    return { ok: false, error: 'Please use your @wright.edu student email.' };
  }
  if (!Password.trim()) return { ok: false, error: 'Password is missing!' };
  if (Password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({ Email: "", Password: "" });
  
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate('/delivery-setup');
  }, [isLoggedIn, navigate]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error', error);
    
    handleLogin(userInfo.Email, userInfo.Password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your <span className="font-bold text-orange-600">CampusDash</span> account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-10 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">University Email</label>
              <input
                name="Email"
                type="Email"
                value={userInfo.Email}
                onChange={handleChange}
                placeholder="raider.1@wright.edu"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="Password"
                type="Password"
                value={userInfo.Password}
                onChange={handleChange}
                placeholder="********"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <Link to="/auth/forget-password" size="sm" className="font-medium text-orange-600 hover:text-orange-500">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isPending ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Signing in...
                </div>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to CampusDash?{' '}
              <Link to="/auth/signup" className="font-bold text-orange-600 hover:text-orange-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}