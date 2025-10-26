// components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Container */}
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Side */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
              AgriLink
            </span>
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/landowners"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 relative group"
            >
              Landowners
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/farmers"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 relative group"
            >
              Farmers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            

            <Link
              to="/products"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* <Link 
              to="/login" 
              className="bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Login/Register
            </Link> */}

            <button
              onClick={onLoginClick}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Login / Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 border border-gray-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between relative">
              <span
                className={`h-0.5 w-full bg-gray-700 transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-700 transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-700 transition-all duration-300 rounded-full ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl mt-4 py-4 shadow-xl border border-gray-200">
            <div className="flex flex-col space-y-1 px-3">
              <Link
                to="/"
                className="flex items-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                onClick={closeMobileMenu}
              >
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                Home
              </Link>

              <Link
                to="/landowners"
                className="flex items-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                onClick={closeMobileMenu}
              >
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                Landowners
              </Link>

              <Link
                to="/farmers"
                className="flex items-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                onClick={closeMobileMenu}
              >
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                Farmers
              </Link>

              <Link
                to="/beekeepers"
                className="flex items-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                onClick={closeMobileMenu}
              >
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                Beekeepers
              </Link>

              <Link
                to="/products"
                className="flex items-center py-4 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                onClick={closeMobileMenu}
              >
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                Products
              </Link>

              <Link
                to="/login"
                className="flex items-center py-4 px-4 mt-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-md"
                onClick={closeMobileMenu}
              >
                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                Login/Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
