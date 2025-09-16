import React, { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Search Bar (center) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-1/2 px-3 py-1 rounded-md border border-gray-300 
                         focus:outline-none focus:ring focus:ring-indigo-400"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">

              <div className="relative group">
                <button className="hover:text-indigo-500 flex items-center">
                  Services
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute hidden group-hover:block bg-white rounded shadow-md mt-2 w-40">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Web Dev
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Mobile App
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    AI/ML
                  </a>
                </div>
              </div>
              
              <a href="#" className="hover:text-indigo-500">
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md bg-gray-200"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          {/* Search Bar in mobile */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 rounded-md border border-gray-300 
                       focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <a href="#" className="block hover:text-indigo-500">
            Services
          </a>
          <a href="#" className="block hover:text-indigo-500">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
