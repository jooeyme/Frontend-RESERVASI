import React, { useState } from 'react';
import { FaFolderOpen, FaChevronDown, FaChevronRight } from "react-icons/fa";

const SidebarUser = ({ is_Open, toggleSidebar}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
      <>   
        <aside 
          id="sidebar" 
          className={`fixed top-10 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${is_Open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} 
          aria-label="Sidebar">
          <div className="h-full px-4 py-4 mt-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                <li>
                    <a href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                      </svg>
                      <span className="ms-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <button 
                      type="button"
                      onClick={toggleDropdown} 
                      className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" 
                      aria-controls="dropdown-example" 
                      data-collapse-toggle="dropdown-example"
                      aria-expanded={isOpen}>
                          <svg 
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                          </svg>
                          <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Reservasi</span>
                          {!isOpen ? (
                            <FaChevronRight
                            className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            size={16} />
                          ) : (
                            <FaChevronDown 
                            className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            fill="currentColor"
                            size={16}/>
                          )}
                    </button>
                    <ul id="dropdown-example" className={`${isOpen ? "block" : "hidden"} py-2 scape-y-2`}>
                          <li>
                            <a href="/allroom" 
                              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                Ruangan
                            </a>
                          </li>
                          <li>
                            <a href="/allTool" 
                              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                Alat
                            </a>
                          </li>
                    </ul>
                </li>
                {/* <li>
                    <a href="/doc" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaFolderOpen
                      className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      fill="currentColor"
                      size={20} // Maintain the size prop for proper scaling
                    />
                      <span className="ms-3">Dokumen</span>
                    </a>
                </li> */}
              </ul>
          </div>
        </aside>

      </>
  )
}

export default SidebarUser;