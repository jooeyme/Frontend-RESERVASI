import React, {useState, useEffect, useRef} from 'react';
import { FaUserCircle } from "react-icons/fa";
import Logout from './LogOut';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import logo from '../assets/logo_ipb.png';

const NavbarUser = ({ toggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [decodeToken, setDecodeToken] = useState(null)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        }
    };

    useEffect(() => {
      const token = localStorage.getItem('token');
    
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const username = decoded.username; // Access the 'username' property
          const email = decoded.email; // Access the 'email' property
          setEmail(email);
          setUsername(username); 
          setDecodeToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
          // Handle invalid or expired token gracefully (e.g., redirect to login)
        }
      } else {
        // Handle the case where there is no token (e.g., redirect to login)
        console.error('No token found');
        // navigate to login or handle the error
      }

      if (dropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <a className="flex ml-2 md:mr-24">
              <img src={logo} className="h-8 mr-3" alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                IPB MNH
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={dropdownOpen}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <FaUserCircle size={30} style={{color: "white"}}/>
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 z-10 mt-32 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{username}</span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    {email}
                  </span>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    {!decodeToken ? (
                      <Link to={"/login"}>
                      <button >Login</button>
                    </Link>
                    ) : (
                      <Logout />
                  )}
                  </li>
                </ul>
              </div>
            )}


          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;