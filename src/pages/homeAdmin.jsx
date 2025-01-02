import React, {useState, useEffect} from "react";
import MainLayoutAdmin from "./MainLayoutAdmin";
import { FaWrench, FaStoreAlt, FaRegCalendarCheck  } from "react-icons/fa";
import { findAllRoom } from "../modules/fetch/rooms";
import { findAllTool } from "../modules/fetch/alat";
import { findAllBooking } from "../modules/fetch/reservasi";
import { jwtDecode } from "jwt-decode";


const HomeAdmin = () => {
    const [ isLoggedIn, setIsLoggedIn] = useState(false);
    const [totalRoom, setTotalRoom] = useState();
    const [totalAlat, setTotalAlat] = useState();
    const [totalBooking, setTotalBooking] = useState();
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
              const decodedToken = jwtDecode(token);
              const role = decodedToken.type;
              setIsLoggedIn(true);
              if (role === 'admin') {
                
                fetchData();
              }
            } catch (error) {
              console.error('Invalid token', error);
              setIsLoggedIn(false);
            }
          } else {
              setIsLoggedIn(false);
          }
    }, []);

    const fetchData = async () => {
        try {
            const room = await findAllRoom();
            const tool = await findAllTool();
            const booking = await findAllBooking();
            
            const Rooms = room.data.length
            const Tools = tool.data.length
            const Bookings = booking.data.filter(booking => booking.booking_status === 'pending').length
            
            setTotalRoom(Rooms);
            setTotalAlat(Tools);
            setTotalBooking(Bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <>
            <MainLayoutAdmin> 
                <div className="mt-12">
                <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-3 max-w-full">
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mx-8">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <FaStoreAlt size={24} />
                    </div>
                    <div className="p-4 text-right">
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
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Alat</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">{totalAlat}</strong>&nbsp;Alat
                        </p>
                    </div>
                    </div>
                    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mx-8">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <FaRegCalendarCheck size={24} />
                    </div>
                    <div className="p-4 text-right">
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Bookings</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">{totalBooking}</strong>&nbsp;Peminjam
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                
            </MainLayoutAdmin>
        </>
    )
}

export default HomeAdmin;