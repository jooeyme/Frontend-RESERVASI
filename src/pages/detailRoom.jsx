import {useParams, useNavigate, Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { showRoomById } from '../modules/fetch/rooms';
import { getBookingByRoomId } from "../modules/fetch/reservasi";
import ReservationRoomCard from "../components/form/formReservasi";
import MainLayoutUser from "./MainLayoutUser";
import CalenderBooking from "../components/calenderBooking";
import Swal from 'sweetalert2';
import { ChevronLeftIcon } from '@heroicons/react/solid'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const DetailRoom = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState([]);
    const [detail, setDetail] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate();

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
        if (detail.room_id) {
            handleSelectRoom(detail.room_id);
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
                    const Booking = bookings.data
                    setBooking(Booking);
                    
                }else {
                    return res.status(404).json({ message: `room_id: ${room_id} null?` });
                }
                setDetail(detailJobData);
        } catch (e) {
            console.log("Error fetching detail Room", e);
        };
    };
        fetchDetailRoom();
    }, [selectedRoomId]);
    
    const token = localStorage.getItem('token');
    

    const handleShowAlert = () => {
        Swal.fire({
            title: 'Anda Belum Login!',
            text: 'Silakan login untuk mengakses halaman reservasi.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Login',
            cancelButtonText: 'Tidak'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login')
            }
          });
          };

    return (
        <>
        <MainLayoutUser>
        <div className="flex justify-start">
            <Link to={"/allroom"}
            className="flex items-center justify-center">
                <button
                    type="button"
                    className="-my-1.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
                </button>
            </Link>
            <h1 className="flex items-start font-semibold text-gray-900 text-2xl dark:text-gray-300 my-4">Ruangan {detail.room_id}</h1>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-4 mx-auto max-w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="rounded-lg bg-gray-300 dark:bg-gray-700">
                        <img className="h-72 w-full rounded-lg object-cover" src={`${BASE_URL}/images/${detail.gambar_room}`} alt={detail.name_room}/>
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="flex items-start text-2xl font-semibold text-gray-900 dark:text-white mb-2">{detail.name_room} - {detail.room_id}</h2>
                    <p className="flex text-start text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {detail.deskripsi_room}
                    </p>
                    <div className="flex mb-2">
                    <div className="mr-4">
                            <span className="items-start font-semibold text-gray-900 dark:text-gray-300">Tipe ruangan:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.type}</span>
                        </div>
                        <div className="mr-4">
                            <span className="items-start font-semibold text-gray-900 dark:text-gray-300">Luas:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.luas}</span>
                        </div>
                        <div>
                            <span className="items-start font-semibold text-gray-900 dark:text-gray-300">Kapasitas:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.kapasitas}</span>
                        </div>
                    </div>
                    <div className="flex mb-2">
                        <span className="flex items-start font-semibold text-gray-900 dark:text-gray-300">Alamat/Lokasi:</span>
                        
                        <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.alamat_room}</span>
                    
                    </div>
                    <div className="mb-2">
                        <span className="flex items-start font-semibold text-gray-900 dark:text-gray-300">Fasilitas:</span>
                        <p className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                            {detail.fasilitas}
                        </p>
                    </div>
                    
                    <div className="flex -mx-2 mt-4">
                        <div className="w-1/2 px-2">
                            <button 
                                onClick= {() =>{
                                    if (token)  {
                                        handleClick();
                                      } else {
                                        handleShowAlert();
                                      }
                                }}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Pesan Ruangan
                            </button>
                        </div>
                    </div>    
                </div>
                
                {showForm && isOpen && 
                <div className="fixed top-0 left-0 w-full h-full flex justify-center bg-gray-900 bg-opacity-50 z-50 py-10 overflow-auto">
                    <ReservationRoomCard RoomId={selectedRoomId}
                    isOpen={isOpen} 
                    handleCloseClick={handleCloseClick}
                    />
                </div>
                }
            </div>
                
        </div>
    </div>
    <div className="flex items-start justify-start">
        <h1 className="flex items-start font-semibold text-gray-900 text-2xl dark:text-white my-4 ml-8" >Jadwal Kegiatan</h1>
    </div>
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto py-4 max-w-full ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
            <CalenderBooking bookings={booking}/>
        </div>
    </div>
    </MainLayoutUser>
    </>
    );
};

export default DetailRoom;
