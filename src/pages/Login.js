import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { role } = response.data; // Assuming backend sends { role: 'admin' } or { role: 'user' }
        
        // Store user email in localStorage for reservation tracking
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);

        if (role === 'admin') {
          navigate('/admin'); // Redirect to Admin Dashboard
        } else if (role === 'user') {
          navigate('/userhome'); // Redirect to User Dashboard
        } else {
          setLoginError('Unauthorized role. Contact support.');
        }
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.error || 'Invalid credentials. Please try again.');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    }  
  };

  return (
    <div className="signup-container min-h-screen">
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-4 sm:py-8">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 mx-auto min-h-screen sm:min-h-0 md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center sm:text-left">
                Login to Your Account
              </h1>

              {loginError && (
                <p className="text-red-500 text-sm sm:text-base text-center sm:text-left">{loginError}</p>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base sm:text-sm rounded-lg
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                      dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300
                      text-gray-900 text-base sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-3 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4
                    focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base sm:text-sm px-5 py-3 sm:py-2.5 text-center 
                    dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-colors"
                >
                  Login
                </button>
              </form>

              <p className="text-xs sm:text-sm font-light text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Don't have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
