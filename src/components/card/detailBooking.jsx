import React from "react";
import { format, parse, parseISO } from 'date-fns';
import  id  from 'date-fns/locale/id';
import { 
    FaHourglassHalf, 
    FaCheckCircle, 
    FaTimesCircle, 
    FaRegTrashAlt, 
    FaCheckDouble, 
    FaRegUser,
    FaRegClock,
    FaRegCalendarAlt,
    FaPhone     } from 'react-icons/fa';
import { turnInRoom, turnInTool } from "../../modules/fetch/reservasi";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";

const locale = id
const MyBooking = ({
    Room, 
    Tool,
    id,
    room_id,
    tool_id,
    booking_date, 
    booking_status, 
    kontak, peminjam, 
    start_time, 
    end_time,
    desk_activity,
    dept,
    note,
    onDelete,
    }) => {
        const [openModal, setOpenModal] = useState(false);
        
        const handleDeleteClick = () => {
            onDelete(id);
        };

        // const handleTurnedClick = () => {
        //     if (!room_id) {
        //         return turnInTool(id)
        //     } else {
        //         return turnInRoom(id)
        //     }
        // }

        const handleTurnedClick = () => {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: 'Booking ini akan ditandai sebagai selesai.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Selesai',
                cancelButtonText: 'Batal',
                dangerMode: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Jika pengguna mengonfirmasi
                    if (!room_id) {
                        turnInTool(id)
                            .then(() => {
                                Swal.fire('Berhasil!', 'Booking berhasil diselesaikan.', 'success');
                            })
                            .catch((error) => {
                                Swal.fire('Gagal!', `Terjadi kesalahan: ${error.message}`, 'error');
                            });
                    } else {
                        turnInRoom(id)
                            .then(() => {
                                Swal.fire('Berhasil!', 'Booking berhasil diselesaikan.', 'success');
                            })
                            .catch((error) => {
                                Swal.fire('Gagal!', `Terjadi kesalahan: ${error.message}`, 'error');
                            });
                    }
                } else if (result.isDismissed) {
                    // Jika pengguna membatalkan
                    console.error(result.message);
                    //Swal.fire('Dibatalkan', 'Tidak ada perubahan pada booking.', 'info');
                }
            });
        };

        const formatDateString = (dateString) => {
            if (!dateString) return 'Invalid date';
            const date = parseISO(dateString);
            return format(date, 'eeee, dd MMMM yyyy', {locale} );
        };
        
        const formatTime = (timeString) => {
            const date = parse(timeString, 'HH:mm:ss', new Date());
            return format(date, 'hh:mm a');
        };

        const imageSource = room_id ? Room.gambar_room : Tool.gambar_tool;
        const nameReserve = room_id ? Room.name_room : Tool.name_tool;
        const reserve_id = room_id ? room_id : tool_id;

        

    return (
       
        
            <div className="flex flex-col lg:flex-row space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xl md:max-w-full border border-white bg-white">
                <div className="flex">
                <img src={`http://localhost:3000/images/${imageSource}`} alt="gambar" 
                    className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-90 md:w-60 lg:w-80 sm:mb-0" />
                </div>
                <div className="w-full flex flex-col px-3">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                        <span className="flex items-center ">
                            {booking_status === 'approved' && <FaCheckCircle className="mr-2" style={{color: "green"}} size={12} />}
                            {booking_status === 'rejected' && <FaTimesCircle className="mr-2" style={{color: "red"}} size={12}/>}            
                            {booking_status === 'pending' && <FaHourglassHalf className="mr-2" style={{color: "gray"}} size={12}/>} 
                            {booking_status === 'returned' && <FaCheckDouble className="mr-2" style={{color: "blue"}} size={12}/>} 
                            
                            <div className="text-sm font-semibold text-gray-800">
                                {booking_status }
                            </div>   
                            
                        </span>
                        {booking_status === 'rejected' && (
                            <>
                            <div className="col-span-2 sm:col-span-1 items-end">
                            <button 
                                    onClick={() => setOpenModal(true)}
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Catatan
                                </button>
                            </div>
                            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                              <Modal.Header className="p-2 font-sm">Alasan peminjaman ditolak</Modal.Header>
                              <Modal.Body>
                                <div className="space-y-6">
                                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    {note}
                                  </p>
                                
                                </div>
                              </Modal.Body>
                              </Modal>
                              </>
                        )}
                        {booking_status === 'approved' && (
                            <div className="col-span-2 sm:col-span-1 items-end">
                                <button 
                                    onClick={handleTurnedClick}
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Selesai
                                </button>
                            </div>
                        )}
                        </div>
                        
                        <div className="flex">
                            <button 
                                onClick={handleDeleteClick}
                                className="flex"
                            >
                                <FaRegTrashAlt 
                                    style={{ display: booking_status === 'pending' ? 'inline' : 'none', color:'red' }} 
                                    size={12} 
                                />
                            </button>
                        </div>
                    </div>
                    
                    <p className="font-semibold text-gray-800 text-sm mt-0">{nameReserve} - {reserve_id}</p>
                        <div className="">
                        <div className="flex items-center justify-start">
                            <FaRegUser size={12}/>
                            <span className="font-sans text-sm ml-3">
                                {peminjam}
                            </span>
                        </div>
                        <div className="flex items-center justify-start">
                            <FaPhone size={12}/>
                            <span className="font-sans text-sm ml-3">
                                {kontak}
                            </span>
                        </div>
                        <div className="flex items-center justify-start">
                            <FaRegCalendarAlt size={12}/>
                            <span className="font-sans text-sm text-left ml-3">
                                {formatDateString(booking_date)}
                            </span>
                        </div>
                        <div className="flex items-center justify-start">
                            <FaRegClock size={12}/>
                            <span className="font-sans text-sm text-left ml-3 text-gray-600 "> 
                                {formatTime(start_time)} - {formatTime(end_time)}
                            </span>
                        </div>
                    
                        <span className="flex text-gray-800 items-start font-sans text-sm">
                            {dept}
                        </span>
                        <span className="flex text-left text-gray-500 font-sans text-sm">
                            {desk_activity} 
                        </span>
                    </div>
                    
                </div>
            </div>
            
       
    )
}

export default MyBooking;