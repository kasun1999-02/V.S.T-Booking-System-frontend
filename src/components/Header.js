import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const syncUser = () => setUserEmail(localStorage.getItem('userEmail'));

    // initial read
    syncUser();

    // storage events (other tabs) and custom event (same tab)
    window.addEventListener('storage', syncUser);
    window.addEventListener('userChanged', syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('userChanged', syncUser);
    };
  }, []);

  const bookNow = () => {
    navigate('/reservation');
    setIsMenuOpen(false); // Close menu when navigating
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUserEmail(null);
    navigate('/');
  };

  return (
    <div>
      {/* Header Section */}
      <header className="sticky top-0 bg-gray-800 w-full h-16 sm:h-20 flex justify-between items-center shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-10 w-full">
          {/* Logo/Brand - Optional, can be added later */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-white text-base sm:text-lg md:text-xl">
              AutoCare Oasis
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-6">
            <Link to="/" className="font-bold text-white text-sm xl:text-lg hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/about" className="font-bold text-white text-sm xl:text-lg hover:text-gray-300 transition-colors">
              About Us
            </Link>
            <Link to="/services" className="font-bold text-white text-sm xl:text-lg hover:text-gray-300 transition-colors">
              Services
            </Link>
            <Link to="/packages" className="font-bold text-white text-sm xl:text-lg hover:text-gray-300 transition-colors">
              Packages
            </Link>
            <Link to="/contact" className="font-bold text-white text-sm xl:text-lg hover:text-gray-300 transition-colors">
              Contact Us
            </Link>
            {userEmail && (
              <Link to="/me" className="font-bold text-white text-sm xl:text-lg hover:text-gray-300 transition-colors">
                My Reservations
              </Link>
            )}
          </nav>

          {/* Desktop Book Now Button */}
          <div className="hidden lg:flex items-center gap-3">
            {userEmail ? (
              <Button onClick={handleLogout} className="bg-gray-700 text-white font-bold py-1.5 px-3 rounded-lg hover:bg-gray-600 transition-colors">
                Logout
              </Button>
            ) : (
              <Button
                type="primary"
                className="bg-red-500 text-white font-bold py-1.5 px-4 xl:py-2 xl:px-6 rounded-lg hover:bg-red-600 transition-colors text-xs xl:text-base"
                onClick={bookNow}
              >
                BOOK NOW
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <CloseOutlined className="text-xl sm:text-2xl" />
            ) : (
              <MenuOutlined className="text-xl sm:text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-16 sm:top-20"
            onClick={closeMenu}
          >
            {/* Mobile Menu */}
            <div 
              className="bg-gray-800 w-full shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col py-4">
                <Link 
                  to="/" 
                  className="px-6 py-3 text-white font-bold text-base hover:bg-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="px-6 py-3 text-white font-bold text-base hover:bg-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  About Us
                </Link>
                <Link 
                  to="/services" 
                  className="px-6 py-3 text-white font-bold text-base hover:bg-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  Services
                </Link>
                <Link 
                  to="/packages" 
                  className="px-6 py-3 text-white font-bold text-base hover:bg-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  Packages
                </Link>
                <Link 
                  to="/contact" 
                  className="px-6 py-3 text-white font-bold text-base hover:bg-gray-700 transition-colors"
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
                {userEmail && (
                  <Link 
                    to="/me" 
                    className="px-6 py-3 text-white font-bold text-base hover:bg-gray-700 transition-colors"
                    onClick={closeMenu}
                  >
                    My Reservations
                  </Link>
                )}
                <div className="px-6 py-3">
                  {userEmail ? (
                    <Button onClick={() => { handleLogout(); closeMenu(); }} className="w-full bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors">
                      Logout
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 w-full transition-colors"
                      onClick={bookNow}
                    >
                      BOOK NOW
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header