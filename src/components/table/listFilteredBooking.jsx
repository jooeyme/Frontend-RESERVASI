import React, {useEffect, useState, useContext, createContext} from "react";
import { showBookingById, getFilteredBooking, verifyBooking } from "../../modules/fetch/reservasi/index";
import ReservationCard from "../card/reservasiCard";
import { format, parse } from 'date-fns';
import Select from 'react-select';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaCheckDouble } from 'react-icons/fa';
import ComponentPagination from "../pagination";
import Swal from "sweetalert2";

const AuthContext = createContext();
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
        value: true,
        label: (
            <div className="flex items-center">
                <FaCheckCircle className="mr-2" style={{color: "green"}}/>
                Approved
            </div>
        ),
    },
    {
        value: false,
        label: (
            <div className="flex items-center">
                <FaTimesCircle className="mr-2" style={{color: "red"}}/>
                Rejected
            </div>
        ),
    },
];

const CustomSelect = ({ booking, handleChangeStatus, field }) => {
    const selectedOption = statusOptions.find(option => option.value === booking.booking_status);
    const handleChange = (selectedOption) => {
        handleChangeStatus(booking.id, selectedOption.value, field);
    };

    return (
        <div>
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={statusOptions}
            className="w-full"
            classNamePrefix="react-select"
        />    
        </div>
    );
};

const ListFilteredBooking = () => {
    const [room_Id, setRoom_id] = useState("");
    const [booking, setBooking] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State for card visibility
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const roleAdm = useContext(AuthContext)

    const handleCloseClick = () => {
        setIsOpen(false); // Update state to hide the card
    };

    const handleBookingClick = async (Booking) => {
        try {
            const Id = Booking;
            setRoom_id(Id);
            setIsOpen(true);
            const book = await showBookingById(Id);
            setSelectedBookingId(book);
        } catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
            try {
                const fetchBooking = async () => {
                    const response = await getFilteredBooking();
                    const bookingData = (response.data);
                    setBooking(bookingData);
            }   
                fetchBooking();   
            } catch (e) {
                console.log("Error fetching Booking", e)
            }       
    }, []);

    const handleChangeStatus = async (id, verify_status, field) => {
        if (verify_status === false) {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to change the booking status to "${verify_status}"?`,
                icon: 'question',
                input: 'textarea',
                inputLabel: 'Catatan',
                inputPlaceholder: 'Tulis alasan ditolak',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Change it!',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write a reason!'
                    }
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const note = result.value;
            try {
                const formData = { verify_status, field, note };
                const response = await verifyBooking(id, formData);
                if (response.status === 200) {
                    // Update daftar reservasi di state
                    setBooking(prevBookings => {
                        const updatedBookings = prevBookings.map(booking =>
                            booking.id === id ? { ...booking, [field]: verify_status } : booking
                        )
                        return updatedBookings;
                    });
                  } else {
                    // Tampilkan pesan error jika update status gagal
                    console.error('Gagal memperbarui status reservasi:', response);
                  }
                  Swal.fire({
                    title: 'Success!',
                    text: `Booking status successfully changed to "${verify_status}".`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update booking status. Please try again.',
                    icon: 'error',
                });
                console.error('Terjadi kesalahan saat memperbarui status reservasi:', error);
            }
        }})
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to change the booking status to "${verify_status}"?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Change it!',
                cancelButtonText: 'Cancel',
            }).then(async (result) => {
                if (result.isConfirmed) {
            try {
                const formData = { verify_status, field };
                const response = await verifyBooking(id, formData);
                
                if (response.status === 200) {
                    // Update daftar reservasi di state
                    setBooking(prevBookings => {
                        const updatedBookings = prevBookings.map(booking =>
                            booking.id === id ? { ...booking, [field]: verify_status } : booking
                        )
                        console.log('Updated Bookings:', updatedBookings);
                        return updatedBookings;
                    });
                  } else {
                    // Tampilkan pesan error jika update status gagal
                    console.error('Gagal memperbarui status reservasi:', response);
                  }
                  Swal.fire({
                    title: 'Success!',
                    text: `Booking status successfully changed to "${verify_status}".`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update booking status. Please try again.',
                    icon: 'error',
                });
                console.error('Terjadi kesalahan saat memperbarui status reservasi:', error);
            }
        }})
        }
    };

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
        if (pageNumber < 1 || pageNumber > Math.ceil(filteredData().length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
      };
    
    return (
        
        <div>
            <div className="py-4">
                <h1 className="text-2xl text-center font-bold">Waiting List Approvement Booking</h1>
            </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                    <div className="flex justify-center mb-4">
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
                            {currentItems.length > 0 ? (
                            <tbody>
                            {currentItems.map((booking, index) => (
                            <tr 
                                key={booking.id} 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
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
                                <td className="px-4 py-4">
                                <div className="flex">
                                    {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                    </div>
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
                                <td className="px-4 py-4 items-start justify-start">
                                {booking.booking_status === 'pending' ? (
                                    <CustomSelect
                                    booking={booking}
                                    field={
                                        roleAdm === 'admin_staff'
                                          ? 'verified_admin_lab'
                                          : roleAdm === 'admin' || roleAdm === 'admin_tu'
                                          ? 'verified_admin_room'
                                          : roleAdm === 'admin_tu'
                                          ? 'verified_admin_tu'
                                          : 'verified_admin_leader'
                                      }
                                    handleChangeStatus={handleChangeStatus}
                                />
                                    ) : (
                                        <span className="flex items-start justify-start">
                                            {booking.booking_status === 'approved' && <FaCheckCircle className="mr-2" style={{color: "green"}} size={20} />}
                                            {booking.booking_status === 'rejected' && <FaTimesCircle className="mr-2" style={{color: "red"}} size={20}/>}
                                            {booking.booking_status === 'returned' && <FaCheckDouble className="mr-2" style={{color: "blue"}} size={20}/>}
                                                                                        
                                            {booking.booking_status}      
                                        </span>
                                    )}       
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

export default ListFilteredBooking;