import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [adminCode, setAdminCode] = useState(''); 
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate password and confirmPassword
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

  
    if (isAdmin && adminCode !== "admin") {
      setErrorMessage("Invalid admin code.");
      return;
    }

    const user = {
      email: email,
      password: password,
      role: isAdmin ? 'admin' : 'user' 
    };

    try {
      const response = await axios.post('http://localhost:5000/user/register', user);
      if (response.data.success) {
        setSuccessMessage("User registered successfully!");
        console.log(user); 
        navigate('/'); 
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
    }
  };

  return (
    <div className="signup-container min-h-screen">
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-4 sm:py-8">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 mx-auto min-h-screen sm:min-h-0 md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center sm:text-left">
                Create an account
              </h1>
              {errorMessage && <p className="text-red-500 text-sm sm:text-base text-center sm:text-left">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 text-sm sm:text-base text-center sm:text-left">{successMessage}</p>}
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
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    text-gray-900 text-base sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                    dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border
                    border-gray-300 text-gray-900 text-base sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                    dark:focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>

                {isAdmin && (
                  <div>
                    <label
                      htmlFor="adminCode"
                      className="block mb-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                    >
                      Admin Code
                    </label>
                    <input
                      type="text"
                      name="adminCode"
                      id="adminCode"
                      placeholder="Enter admin code"
                      className="bg-gray-50 border
                      border-gray-300 text-gray-900 text-base sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 sm:p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto sm:min-w-[200px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base sm:text-sm px-5 py-3 sm:py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-colors"
                  >
                    Create an account
                  </button>
                </div>
              </form>

              <p className="text-xs sm:text-sm font-light text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Already have an account?{" "}
                <a
                  href={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>

              <div className="flex items-center justify-center mt-4 flex-wrap gap-2">
                <label className="text-xs sm:text-sm text-gray-700 dark:text-white">Sign up as Admin</label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
