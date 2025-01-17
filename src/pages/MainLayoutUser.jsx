import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/navbarUser';
import SidebarUser from '../components/sidebarUser';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const MainLayoutUser = ({ children  }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

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
              setUser(decodedToken)
              
          } catch (error) {
              console.error("token:", error);
              // Handle error jika ada masalah dalam decoding token
          }
      } else {
          console.error("No token")
          
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
      <NavbarUser toggleSidebar={toggleSidebar} User={user} />
      <SidebarUser is_Open={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <main className="p-4 md:ml-64 mt-14">
        {children}
      </main>
    </div>
  );
};

export default MainLayoutUser;
