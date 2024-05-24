import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { findAllBooking, editBooking, showBookingById } from "../../modules/fetch/reservasi/index";
import ReservationCard from "../card/reservasiCard";
import { format, parse } from 'date-fns';
import Select from 'react-select';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const status = {
    P: 'pending', 
    A: 'approved',
    R: 'rejected',
}

const statusOptions = [
    {
        value: 'pending',
        label: (
            <div className="flex items-center">
                <FaHourglassHalf className="mr-2" />
                Pending
            </div>
        ),
    },
    {
        value: 'approved',
        label: (
            <div className="flex items-center">
                <FaCheckCircle className="mr-2" style={{color: "green"}}/>
                Approved
            </div>
        ),
    },
    {
        value: 'rejected',
        label: (
            <div className="flex items-center">
                <FaTimesCircle className="mr-2" style={{color: "red"}}/>
                Rejected
            </div>
        ),
    },
];

const CustomSelect = ({ booking, handleChangeStatus }) => {
    const handleChange = (selectedOption) => {
        handleChangeStatus(booking.id, selectedOption.value);
    };

    const selectedOption = statusOptions.find(option => option.value === booking.booking_status);

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={statusOptions}
            className="w-full"
            classNamePrefix="react-select"
        />
    );
};


const BookingRoomList = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [room_Id, setRoom_id] = useState("");
    const [booking, setBooking] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State for card visibility

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
                const response = await findAllBooking();

                const bookingData = (response.data);
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
            }
                
                //setRoom_id(RoomId); 
                fetchBooking();   
            } catch (e) {
                console.log("Error fetching Booking", e)
            }
         
        
    }, []);


    const handleChangeStatus = async (id, newStatus) => {
        try {
            
            const formData = { booking_status: newStatus };
            const response = await editBooking(id, formData);
            
            console.log(response.booking_status)
            if (response.status === 200) {
                // Update daftar reservasi di state
                //setBooking(
                //  booking.map((booking) => {
                //    if (booking.id === id) {
                //      return { ...booking, booking_status: newStatus };
                //   }
                //    return booking;
                //  })
                //);
                setBooking(prevBookings => {
                    const updatedBookings = prevBookings.map(booking =>
                        booking.id === id ? { ...booking, booking_status: newStatus } : booking
                    )
                    console.log('Updated Bookings:', updatedBookings);
                    return updatedBookings;
            });
              } else {
                // Tampilkan pesan error jika update status gagal
                console.error('Gagal memperbarui status reservasi:', response);
              }
        } catch (error) {
            console.error('Terjadi kesalahan saat memperbarui status reservasi:', error);
        }
    };

    const formatDateString = (dateString) => {
        if (!dateString) return 'Invalid date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    
    const formatTime = (timeString) => {
        const date = parse(timeString, 'HH:mm:ss', new Date());
        return format(date, 'hh:mm a');
    };
    


    
    return (

        <div>
            <div className="bg-blue-100 py-4 mt-10">
                <h1 className="text-2xl text-center font-bold">Booking List</h1>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">
                                Nama Peminjam
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reservasi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Waktu 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Detail
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {booking.map((booking, index) => (
                    <tr 
                        key={booking.id} 
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                          
                        //onClick={() => handleBookingClick(booking.id)}
                    >
                        <td className="px-4 py-4">
                            {index + 1}
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
                        <button
                            type="button"
                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 font-medium px-4 py-2 inline-flex space-x-1 items-center"
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
                            <span className="hidden md:inline-block">View</span>
                        </button>
                        </td>
                        <td className="px-4 py-4 flex items-start justify-start">
                        {booking.booking_status === 'pending' ? (
                                <CustomSelect
                                    booking={booking}
                                    handleChangeStatus={handleChangeStatus}
                                />
                            ) : (
                                <span className="flex items-start justify-start">
                                    {booking.booking_status === 'approved' && <FaCheckCircle className="mr-2" style={{color: "green"}} size={20} />}
                                    {booking.booking_status === 'rejected' && <FaTimesCircle className="mr-2" style={{color: "red"}} size={20}/>}
                                    
                                    {booking.booking_status }
                                    
                                </span>
                            )}
                            
                                
                        </td>
                    </tr>
                    
                    ))}
                    
                        
                    </tbody>
                </table>
                {selectedBookingId && isOpen && 
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
                    <ReservationCard 
                        bookingData={selectedBookingId}
                        isOpen={isOpen} // Pass the isOpen state
                        handleCloseClick={handleCloseClick} />
                    </div>
                }
            </div>
        </div>

    )
}

export default BookingRoomList;