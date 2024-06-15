import React, {useState, useEffect} from "react";
import { findAllBookingByUserId, deleteBooking  } from "../modules/fetch/reservasi";
import { findAllRoom } from "../modules/fetch/rooms";
import { findAllTool } from "../modules/fetch/alat";
import MainLayoutUser from "./MainLayoutUser";
import MyBooking from "../components/card/detailBooking";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { FaWrench, FaStoreAlt  } from "react-icons/fa";
import Accordion from "../components/Accordion";

const HomeUser = () => {
    const [booking, setBookings] = useState([]);
    const [ isLoggedIn, setIsLoggedIn] = useState(false);
    const [totalRoom, setTotalRoom] = useState();
    const [totalAlat, setTotalAlat] = useState();
    
      useEffect(() => {
          const token = localStorage.getItem('token');
     
          if (token) {
              setIsLoggedIn(true);
              fetchData();
          } else {
              setIsLoggedIn(false);
          }
      }, []);
      
      

      const fetchData = async () => {
          try {
              const response = await findAllBookingByUserId();
              const room = await findAllRoom();
              const tool = await findAllTool();
              const Rooms = room.data.length
              const Tools = tool.data.length
              
              setBookings(response);
              setTotalRoom(Rooms);
              setTotalAlat(Tools);
          } catch (error) {
              console.error('Error fetching bookings:', error);
          }
      };
    
      const handleDeleteBooking = async (id) => {
        Swal.fire({
          title: 'Konfirmasi Penghapusan',
          text: 'Apakah Anda yakin ingin membatalkan reservasi ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, Batalkan',
          cancelButtonText: 'Tidak'
      }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                await deleteBooking(id);
                setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
                toast.success('Reservasi berhasil dibatalkan', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000 
                });
            } catch (error) {
                console.error("Error deleting Tool:", error.message);
                toast.error('Gagal membatalkan reservasi. Silahkan coba lagi.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000
                });
            } 
          }
        })
      };
    
      if (!isLoggedIn) {
        return (
          <MainLayoutUser>
            
          <Accordion />

            <div className="home-not-logged-in mt-10">
                <h2>Anda Belum Login!</h2>
                <p>Silahkan login untuk mengakses riwayat reservasi dan melakukan reservasi baru.</p>
                <Link to="/login">
                <button 
                  className="w text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Login
                </button>
                </Link>
            </div>
          </MainLayoutUser>
        );
    } else if (booking.length === 0) {
        return (
          <MainLayoutUser>
            <div className="home-logged-in-no-reservations mt-10">
                <h2>Selamat Datang,!</h2>
                <p>Anda belum memiliki riwayat reservasi.</p>
                <div className="flex items-center justify-center gap-4">
                  <Link to='/allroom'>
                  <button 
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buat Reservasi Ruangan
                  </button>
                  </Link>
                  <Link to='/allTool'>
                  <button 
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buat Reservasi Alat
                  </button>
                  </Link>
                </div>
                
            </div>
          </MainLayoutUser>
        );
    } else {

      return (
        <>
            <MainLayoutUser>
            <div className="mt-12">
              <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 max-w-4xl">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mx-8">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <FaStoreAlt size={24} />
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Money</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Ruangan</h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-green-500">{totalRoom}</strong>&nbsp;Ruangan
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mx-8">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <FaWrench size={24}/>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Money</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Alat</h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                      <strong className="text-green-500">{totalAlat}</strong>&nbsp;Alat
                    </p>
                  </div>
                </div>
            </div>
            </div>
            <div className="">

            </div>
            <div className="py-4 mt-10">
                <h1 className="text-2xl text-center font-bold">History pesanan</h1>
            </div>
            <ul className="grid md:grid-cols-2 gap-y-10 gap-x-6 items-start">
            {booking.map((booking) => (
                (booking.id && booking.id !== null) ? (
                    <MyBooking key={booking.id}{...booking} onDelete={handleDeleteBooking}/>
                ) : (
                  <p>anda belum melakukan booking.</p>
                )
                ))}
            </ul>
            </MainLayoutUser>
            <ToastContainer />
        </>
    )
  }
};

export default HomeUser;