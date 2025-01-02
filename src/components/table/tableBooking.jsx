import React, {useEffect, useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { findAllBookingByUserId, showBookingById } from "../../modules/fetch/reservasi/index";
import ReservationCard from "../card/reservasiCard";
import { format, parse } from 'date-fns';
import ComponentPagination from "../pagination";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaAccessibleIcon, FaRegTrashAlt  } from 'react-icons/fa';


const BookingTable = ({onDelete}) => {
    const navigate = useNavigate();
    const [room_Id, setRoom_id] = useState("");
    const [booking, setBooking] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State for card visibility
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    //const [filteredRoomBookings, setFilteredRoomBookings] = useState([]);
    

    const handleDeleteClick = () => {
        onDelete(booking.id);
    };

    const handleCloseClick = () => {
        setIsOpen(false); // Update state to hide the card
    };

    const handleBookingClick = async (Booking) => {
        try {
            const Id = Booking;
            setRoom_id(Id);
            setIsOpen(true);
            console.log(`Booking`, room_Id);
            const book = await showBookingById(Id);
            console.log(`Bookinghh`, book);
            
            setSelectedBookingId(book);
            console.log("selectedBooking:", selectedBookingId);
        } catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        const filteredRoomBookings = [];
        const filteredToolBookings = [];
            try {
                const fetchBooking = async () => {
                    const response = await findAllBookingByUserId();
                    const bookingData = response;
                    //const RoomId = (response.data.room_id);
                    console.log("data1:",bookingData);
                    bookingData.forEach(booking => {
                        if (booking.room_id === null) {
                            filteredToolBookings.push(booking);
                        } else {
                            filteredRoomBookings.push(booking);
                        }
                    })
                setBooking(filteredRoomBookings);
                //setFilteredRoomBookings(filteredRoomBookings);
            }   
                //setRoom_id(RoomId); 
                fetchBooking();   
            } catch (e) {
                console.log("Error fetching Booking", e)
            }        
    }, []);
    
    const formatDateString = (dateString) => {
        if (!dateString) return 'Invalid date';
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy');
        
    };
    
    const formatTime = (timeString) => {
        const date = parse(timeString, 'HH:mm:ss', new Date());
        return format(date, 'hh:mm a');
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = booking.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(booking.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
      };
    
    return (
        <div>
            <div className="py-2">
                <h1 className="text-2xl text-center font-semibold">Booking List</h1>  
            </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                    <div className="flex justify-center mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3"></th>
                                    <th scope="col" className="px-4 py-3">
                                        Nama Peminjam
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Reservasi
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Waktu 
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Detail
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            {currentItems.length > 0 ? (
                            <tbody>
                            {currentItems.map((booking, index) => (
                            <tr 
                                key={booking.id} 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                //onClick={() => handleBookingClick(booking.id)}
                            >
                                <td className="px-4 py-4">
                                    {indexOfFirstItem + index + 1}
                                </td>
                                <td scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {booking.peminjam}
                                </td>
                                <td className="px-4 py-4">
                                    {booking.room_id}
                                </td>
                                <td className="px-4 py-4">
                                    {formatDateString(booking.booking_date)}
                                </td>
                                <td className="flex px-4 py-4">
                                    {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex">
                                        <div className="">
                                            <button
                                                type="button"
                                                className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 rounded-full px-2 py-1 inline-flex space-x-1 items-center"
                                                onClick={() => handleBookingClick(booking.id)}
                                                >
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                        stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button 
                                                onClick={handleDeleteClick}
                                                className="flex items-center justify-center p-2 hover:bg-red-100 rounded-full"
                                            >
                                                <FaRegTrashAlt 
                                                    style={{ display: booking.booking_status === 'pending' ? 'inline' : 'none', color:'red' }} 
                                                    size={18} 
                                                />
                                            </button>
                                        </div>
                                </div>
                                </td>
                                <td className="px-4 py-4 flex items-start justify-start">
                                {booking.booking_status}         
                                </td>
                            </tr>
                            ))}
                            </tbody>
                            ) : (
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                    <td colSpan="7" className="text-center py-4 text-lg">No data available.</td>
                                </tr>
                            </tbody>
                            )}
                        </table>
                    </div>
                    <ComponentPagination
                    itemsPerPage={itemsPerPage}
                    totalItems={booking.length}
                    paginate={paginate}
                    
                />
                </div>
                

            {selectedBookingId && isOpen && 
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
                    <ReservationCard 
                        bookingData={selectedBookingId}
                        isOpen={isOpen} // Pass the isOpen state
                        handleCloseClick={handleCloseClick} />
                </div>
            }
        </div>
    )
};

export default BookingTable;