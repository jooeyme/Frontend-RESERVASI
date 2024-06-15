import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/navbarUser';
import SidebarUser from '../components/sidebarUser';


const MainLayoutUser = ({ children  }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
   
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
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
      <NavbarUser toggleSidebar={toggleSidebar} />
      <SidebarUser is_Open={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <main className="p-4 md:ml-64 mt-14">
        {children}
      </main>
    </div>
  );
};

export default MainLayoutUser;
