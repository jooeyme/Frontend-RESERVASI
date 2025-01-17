import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const MainLayoutAdmin = ({ children  }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [admin, setAdmin] = useState(null)
  const navigate = useNavigate()
   
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    
    if (token) {
        try {
            // Decode token untuk mendapatkan informasi, misalnya peran pengguna
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
            setAdmin(decodedToken)
            
        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle error jika ada masalah dalam decoding token
        }
    } else {
        console.error("Error decoding token");
        navigate("/admin")
    }

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} admin={admin} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} role={role}/>
      <main className="p-4 md:ml-64 mt-14">
        {children}
      </main>
    </div>
  );
};

export default MainLayoutAdmin;
