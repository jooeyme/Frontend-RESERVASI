import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { jwtDecode } from "jwt-decode";

const MainLayoutAdmin = ({ children  }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);

    console.log('nilai dari role:', role);
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
        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle error jika ada masalah dalam decoding token
        }
    } else {
        console.error("Error decoding token");
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
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} role={role}/>
      <main className="p-4 md:ml-64 mt-14">
        {children}
      </main>
    </div>
  );
};

export default MainLayoutAdmin;
