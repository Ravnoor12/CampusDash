import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../api/auth';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    FirstName: '', 
    LastName: '', 
    Email: '', 
    Password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Strict Format Validation: Wright State Email Check
    if (!formData.Email.toLowerCase().endsWith('@wright.edu')) {
      setError('Access restricted. Please use your @wright.edu student email.');
      return;
    }

    if (formData.Password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    
    try {
      console.log("Connecting to backend with:", formData);
        setLoading(true);
        const resp = await createUser(formData);
        setLoading(false);
        console.log("Response from backend for signing up:", resp);
        if(resp.error) {
            setError(resp.error);
        }

        else {
            navigate('/auth/signin');
        }
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join the CampusDash community at <span className="font-semibold text-green-700">Wright State</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-10 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-5" onSubmit={handleSignup}>
            
            {/* Name Container - Flexbox for side-by-side inputs */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                  onChange={(e) => setFormData({...formData, FirstName: e.target.value})}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                  onChange={(e) => setFormData({...formData, LastName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">University Email</label>
              <input
                type="email"
                placeholder="raider.1@wright.edu"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                onChange={(e) => setFormData({...formData, Email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition"
                onChange={(e) => setFormData({...formData, Password: e.target.value})}
              />
            </div>

            {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">{error}</div>}

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200">
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already a Raider? <Link to="/auth/signin" className="font-bold text-orange-600 hover:text-orange-500">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;