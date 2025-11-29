import React, { useEffect, useState } from "react";
import ComboBox from "../../components/Combobox";
import { Link, useLocation } from "react-router-dom";
import apiService from "../../utils/services/apiService";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthorPage = location.pathname.startsWith("/author");

  const [comboBoxItem,setComboBoxItem] = useState([])

  const comboboxHandler = async () => {
    const result = await apiService.get("/dosen")
    console.log(result.data);
    setComboBoxItem(result.data)
  }
  useEffect(()=>{
    if(!isAuthorPage){
      comboboxHandler()
    }
  },[])

  return (
    <nav className="bg-base-100 shadow-md fixed w-full z-20 top-0 left-0 text-base-content ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-fit py-2">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={"/dashboard"}>
              <img src="/lppm.png" alt="Logo" className="h-[7vh] w-auto" />
            </Link>
          </div>

          {/* Search Bar (center) */}
          
          <div className="hidden md:flex flex-1 justify-center px-4 max-w-[35vw]">
            {!isAuthorPage && <ComboBox options={comboBoxItem} />}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">

                            {/* Dropdown */}
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost text-lg ">
                  View
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
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={"/authors"}>
                      <span className="text-md">Authors</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/statistic"}>
                      <span className="text-md">Statistics</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="btn btn-primary ms-5"
              onClick={() => window.location.href = "/login"}
              >Login</div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden btn btn-ghost btn-square"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-base-100">
          {/* Search Bar in mobile */}
          <div className="w-full">
            <ComboBox options={comboBoxItem}/>
          </div>
            <Link to={"/authors"}>
              <span className="text-md">Authors</span>
            </Link>
            <Link to={"/statistic"}>
              <span className="text-md">Statistics</span>
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
