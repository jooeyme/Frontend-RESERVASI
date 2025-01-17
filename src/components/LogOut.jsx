import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Jika token tidak ada di localStorage
      alert('Token tidak ditemukan, Anda akan diarahkan ke halaman login.');
      navigate('/login');
      return;
    }
    const decodedToken = jwtDecode(token);
    if (decodedToken.type === 'user') {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/admin');
      }
  };

  return (
    <button 
    onClick={handleLogout} 
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    >
      Logout</button>
  );
};

export default Logout;