import React, {useEffect, useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { findAllBooking, findAllBookingWithApproved, showBookingById, findAlternativeRooms, moveReservation } from "../../modules/fetch/reservasi/index";
import ReservationCard from "../card/reservasiCard";
import { format, parse } from 'date-fns';
import ComponentPagination from "../pagination";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaAccessibleIcon, FaRegTrashAlt  } from 'react-icons/fa';
import {Modal, Label, Select, Textarea, Button} from "flowbite-react";
import Swal from "sweetalert2";

const BookingTableMoved = ({onDelete}) => {
    const navigate = useNavigate();
    const [Rooms, setRooms] = useState([])
    const [room_Id, setRoom_id] = useState("");
    const [booking, setBooking] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State for card visibility
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [note, setNote] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    
    //const [filteredRoomBookings, setFilteredRoomBookings] = useState([]);
    

    const handleDeleteClick = () => {
        onDelete(booking.id);
    };

    const handleCloseClick = () => {
        setIsOpen(false); // Update state to hide the card
    };

    const handleFindAlternativeRooms = async (bookingId) => {
        setSelectedBooking(bookingId);
        setModalOpen(true)
        try {
            const availableRooms = await findAlternativeRooms(bookingId);
            setRooms(availableRooms.rooms); 
        } catch (error) {
            console.error('Error fetching available rooms', error);
        }
        
    };

    const handleMoveReservation = async () => {
        const id = selectedBooking
        const formData = {
            newRoomId: selectedRoom,
            note: note,
          };
        try {
            if (!selectedRoom) {
                Swal.fire({
                    title: "Perhatian!",
                    text: `Pilih pengganti ruangan terlebih dahulu`,
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                return;
            }
        
            const movedReservation = await moveReservation(id, formData);
            if (movedReservation) {
                Swal.fire({
                    title: "Berhasil!",
                    text: `Reservasi berhasil dipindahkan`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                setSelectedBooking(null);
                setRooms([]);
                setSelectedRoom("");
                setNote("");
                setModalOpen(false);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: `Gagal memindahkan reservasi`,
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false,
                  });
            }    
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Error moving reservation ${error.message}`,
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });
        }
    };

    const handleBookingClick = async (Booking) => {
        try {
            const Id = Booking;
            setRoom_id(Id);
            setIsOpen(true);
            const book = await showBookingById(Id);
            
            setSelectedBookingId(book);
        } catch (error) {
            console.log("error:", error.message);
        }
    };

    useEffect(() => {
        const filteredRoomBookings = [];
        const filteredToolBookings = [];
            try {
                const fetchBooking = async () => {
                    const response = await findAllBookingWithApproved();
                    const bookingData = response.data;
                    bookingData.forEach(booking => {
                        if (booking.room_id === null) {
                            filteredToolBookings.push(booking);
                        } else {
                            filteredRoomBookings.push(booking);
                        }
                    })
                setBooking(filteredRoomBookings);
            }    
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
                <h1 className="text-2xl text-center font-semibold">Booking List yang dapat dipindahkan</h1>  
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
                                    <th scope="col" className="px-4 py-3">
                                        Aksi
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
                                    {booking.booking_status === 'approved' && (
                                        <>
                                        <FaCheckCircle className="mr-2" style={{ color: "green" }} size={12} />
                                        <div className="text-sm font-semibold text-gray-800">Disetujui</div>
                                        </>
                                    )}
                                    {booking.booking_status === 'rejected' && (
                                        <>
                                        <FaTimesCircle className="mr-2" style={{ color: "red" }} size={12} />
                                        <div className="text-sm font-semibold text-gray-800">Ditolak</div>
                                        </>
                                    )}
                                    {booking.booking_status === 'pending' && (
                                        <>
                                        <FaHourglassHalf className="mr-2" style={{ color: "gray" }} size={12} />
                                        <div className="text-sm font-semibold text-gray-800">Pending</div>
                                        </>
                                    )}
                                    {booking.booking_status === 'returned' && (
                                        <>
                                        <FaCheckDouble className="mr-2" style={{ color: "blue" }} size={12} />
                                        <div className="text-sm font-semibold text-gray-800">Selesai</div>
                                        </>
                                    )}        
                                </td>
                                <td className="px-4 py-4">
                                    <button 
                                        onClick={() => handleFindAlternativeRooms(booking.id)}
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                            Pindahkan
                                    </button>    
                                </td>
                            </tr>
                            ))}
                            </tbody>
                            ) : (
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                    <td colSpan="8" className="text-center py-4 text-lg">No data available.</td>
                                </tr>
                            </tbody>
                            )}
                        </table>
                        <Modal show={isModalOpen} popup onClose={() => setModalOpen(false)}>
                            <Modal.Header >
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Pindahkan Reservasi
                                    </h3>                                
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">

                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="room_id" value="Pilih ruangan pengganti" />
                                    </div>
                                    <Select id="room_id" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
                                        <option value="">-- Select Room --</option>
                                        {Rooms.map((room, index) => (
                                        <option key={index} value={room.room_id}>
                                            {room.room_id} - {room.name_room}
                                        </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="note" value="Alasan pemindahan ruangan" />
                                    </div>
                                    <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="comment..." required rows={4} />
                                </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleMoveReservation}>Setuju</Button>
                                <Button color="gray" onClick={() => setModalOpen(false)}>
                                    Batal
                                </Button>
                            </Modal.Footer>
                            
                        </Modal>
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

export default BookingTableMoved;