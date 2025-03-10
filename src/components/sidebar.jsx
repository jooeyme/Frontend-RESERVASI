import React from 'react';
import { HiHome } from "react-icons/hi2";
import { FaClipboardList, FaIdBadge, FaBox, FaUsers, FaHandPointRight, FaShareSquare } from "react-icons/fa";

const Sidebar = ({ isOpen, role }) => {
  return (
    <aside
      id="sidebar"
      className={`fixed top-10 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-4 mt-4 overflow-y-auto">
        
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="/home-admin"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiHome className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3">Beranda</span>
            </a>
          </li>
          {(role === 'admin' || role === 'admin_staff' || role === 'admin_leader' || role === 'admin_mm' || role === 'admin_tu') && (
          <li>
            <a
              href="/filtered-booking"
              className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaHandPointRight className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3">Permintaan baru</span>
            </a>
          </li>
          )}
          {role === 'super_admin' && (
          <li>
            <a
              href="/list-user"
              className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3">User Admin</span>
            </a>
          </li>
          )}
          {role === 'super_admin' && (
          <li>
            <a
              href="/moved-booking"
              className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaShareSquare className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3">Pemindahan Reservasi</span>
            </a>
          </li>
          )}
          {role === 'super_admin' && (
             <>
          <li>
            <a
              href="/daftar-peminjam-tool"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaClipboardList className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3 whitespace-nowrap">Daftar Peminjam Tool</span>
            </a>
          </li>
          </>
          )}
          {(role === 'admin' || role === 'admin_staff' || role === 'admin_leader' || role === 'admin_tu' ) && (
            <>
          <li>
            <a
              href="/tracked-booking"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaClipboardList className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3 whitespace-nowrap">Daftar Peminjam Room</span>
            </a>
          </li>
          </>
          )}
          {(role === 'admin_tu' || role === 'admin_staff' || role === 'admin_leader' || role === 'admin_mm') && (
            <>
          <li>
            <a
              href="/tracked-booking-tool"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaClipboardList className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3 whitespace-nowrap">Daftar Peminjam Tool</span>
            </a>
          </li>
          </>
          )}
          {(role === 'super_admin') && (
            <>
          <li>
            <a
              href="/daftar-peminjam"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaClipboardList className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3 whitespace-nowrap">Daftar Peminjam Room</span>
            </a>
          </li>
          </>
          )}
          {(role === 'admin' || role === 'super_admin') && (
          <li>
            <a
              href="/inventaris-room"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaBox className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3 whitespace-nowrap">Inventaris Room</span>
            </a>
          </li>
          )}
          {(role === 'admin_staff' || role === 'super_admin') && (
          <li>
            <a
              href="/inventaris-alat"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaBox className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="ms-3 whitespace-nowrap">Inventaris Alat</span>
            </a>
          </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;