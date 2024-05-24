import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { showRoomById } from '../modules/fetch/rooms';
import { getBookingByRoomId } from "../modules/fetch/reservasi";
import ReservationRoomCard from "../components/form/formReservasi";
import SidebarUser from "../components/sidebarUser";
import CalenderBooking from "../components/calenderBooking";


const DetailRoom = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState([]);
    const [detail, setDetail] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isOpen, setIsOpen] = useState(false); 

    const handleCloseClick = () => {
        setIsOpen(false); 
    };

    const handleSelectRoom = () => {
        setSelectedRoomId(detail.room_id);
      };

    const handleReserveNow = () => {
        setShowForm(true);
      };

    const handleClick  = () => {
        handleReserveNow();
        setIsOpen(true)
        console.log(detail.room_id);
        if (detail.room_id) {
            handleSelectRoom(detail.room_id);
            console.log(selectedRoomId);
        } else {
            console.error("Room ID is not defined");
        }
    }

    useEffect(() => {
        const fetchDetailRoom = async () => {
        try {
                const response = await showRoomById(id);
                const detailJobData = response.data;
                const room_id = detailJobData.room_id;
                if(room_id !== null && room_id !== undefined){
                    const bookings = await getBookingByRoomId(room_id)
                    console.log("data:",bookings.data)
                    const Booking = bookings.data
                    setBooking(Booking);
                    
                }else {
                    return res.status(404).json({ message: `room_id: ${room_id} null?` });
                }
                console.log("bookingbyRoomId:",booking)
                setDetail(detailJobData);
                console.log("detail:",detail)
            ;
            
        } catch (e) {
            console.log("Error fetching detail Room", e);
        };
    };
        fetchDetailRoom();
    }, [selectedRoomId]);
    

    return (
        <div>
            <SidebarUser />
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-4 p-4 sm:ml-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="rounded-lg bg-gray-300 dark:bg-gray-700 ">
                        <img className="h-72 w-full rounded-lg object-cover" src={`http://localhost:3000/images/${detail.gambar_room}`} alt={detail.name_room}/>
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="flex items-start text-2xl font-bold text-gray-800 dark:text-white mb-2">{detail.name_room} - {detail.room_id}</h2>
                    <p className="flex items-start text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {detail.deskripsi_room}
                    </p>
                    <div className="flex mb-2">
                        <div className="mr-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Luas:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.luas}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Kapasitas:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.kapasitas}</span>
                        </div>
                    </div>
                    <div className="flex mb-2">
                        <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">Alamat/Lokasi:</span>
                        
                        <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.alamat_room}</span>
                    
                    </div>
                    <div className="mb-2">
                        <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">Fasilitas:</span>
                        <p className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                            {detail.fasilitas}
                        </p>
                    </div>
                    
                    <div className="flex -mx-2 mt-4">
                        <div className="w-1/2 px-2">
                            <button 
                                onClick={handleClick}
                                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                Pesan Ruangan
                            </button>
                        </div>
                    </div>    
                </div>
                {showForm && isOpen && 
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
                    <ReservationRoomCard RoomId={selectedRoomId}
                    isOpen={isOpen} 
                    handleCloseClick={handleCloseClick}
                    />
                </div>
                }
            </div>
                <CalenderBooking bookings={booking}/>
        </div>
    </div>
    </div>
    );
};

export default DetailRoom;
