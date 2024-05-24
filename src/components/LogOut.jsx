import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('token');
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
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;