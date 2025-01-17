import React, { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaSearch, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaCheckDouble } from 'react-icons/fa';
import { showBookingById, createBookingSpecialAdmin, createBookingToolSpecialAdmin, findAllBookingByAdminId, turnInRoom, turnInTool } from '../../modules/fetch/reservasi';
import { findAllRoomsId } from '../../modules/fetch/rooms';
import { findAllToolId } from '../../modules/fetch/alat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ComponentPagination from "../pagination";
import ReservationCard from "../card/reservasiCard";
import { format, parse } from "date-fns";
import id from 'date-fns/locale/id'
import { Label, Button, Modal, TextInput, Select } from "flowbite-react";

const locale = id
const Booking_admin = () => {
    const itemsPerPage = 10;
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jenis_pengguna, setJenis_pengguna] = useState("");
    const [jenis_kegiatan, setJenis_kegiatan] = useState("");
    const [Rooms, setRooms] = useState([])
    const [Tools, setTools] = useState([])
    const [Bookings, setBookings] = useState([])
    const [isModalOpenRoom, setModalOpenRoom] = useState(false);
    const [isModalOpenTool, setModalOpenTool] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [isOtherKegiatan, setIsOtherKegiatan] = useState(false);
    const [room_id, setRoom_id] = useState("");
    const [tool_id, setTool_id] = useState("")
    const [dateBooks, setDateBooks] = useState([{ 
        booking_date: '',
        start_time: '',
        end_time: '',
    }]);
    const [formData, setFormData] = useState({
        room_id: room_id,
        peminjam: '',
        kontak: '',
        desk_activity: '',
        dept: '',
        bookings: dateBooks,
        jenis_kegiatan: jenis_kegiatan,
        jenis_pengguna: jenis_pengguna,
    });
    const [formDataTool, setFormDataTool] = useState({
        tool_id: tool_id,
        peminjam: '',
        kontak: '',
        desk_activity: '',
        dept: '',
        quantity: '',
        bookings: dateBooks,
        jenis_kegiatan: jenis_kegiatan,
        jenis_pengguna: jenis_pengguna,
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            room_id: room_id,
            tool_id: tool_id,
            bookings: dateBooks,
            jenis_kegiatan: jenis_kegiatan,
            jenis_pengguna: jenis_pengguna,
        }));

        setFormDataTool((prev) => ({
            ...prev,
            room_id: room_id,
            tool_id: tool_id,
            bookings: dateBooks,
            jenis_kegiatan: jenis_kegiatan,
            jenis_pengguna: jenis_pengguna,
        }));

    }, [Rooms, Tools, dateBooks, room_id, tool_id, jenis_pengguna, jenis_kegiatan]);

    useEffect(() => {
            try {
                const fetchBooking = async () => {
                const response = await findAllBookingByAdminId();
                const bookingData = (response);
                    
                setBookings(bookingData);
            }    
                fetchBooking();   
            } catch (e) {
                console.log("Error fetching Booking", e)
            }       
    }, []);
    
    const handleAddSession = () => {
        setDateBooks([...dateBooks, { booking_date: '', start_time: '', end_time: ''}]);
    };
    
    const handleRemoveSession = (index) => {
        const updatedBookings = dateBooks.filter((_, i) => i !== index);
        setDateBooks(updatedBookings);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name in formData) {
          setFormData({
            ...formData,
            [name]: value,
          });
          
        setFormDataTool({
            ...formDataTool,
            [name]: value,
        });
          
        } else {
          const [sessionIndex, sessionField] = name.split('-');
          const updatedBookings = dateBooks.map((booking, i) =>
            i === parseInt(sessionIndex)
              ? { ...booking, [sessionField]: value }
              : booking
          );
          setDateBooks(updatedBookings);
        }
    };

    const handleSearchRoomsId = async () => {
        setTools([])
        setTool_id("")
        setModalOpenRoom(true)
        try {
            const availableRooms = await findAllRoomsId();
            setRooms(availableRooms.rooms);    
        } catch (error) {
            console.error('Error fetching available rooms', error);
        }
    };

    const handleSearchToolsId = async () => {
        setRooms([])
        setRoom_id("")
        setModalOpenTool(true)
        try {
            const availableTools = await findAllToolId();
            setTools(availableTools.tools); 
        } catch (error) {
            console.error('Error fetching available tools', error);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        await createBookingSpecialAdmin(formData);
        setFormData({
            users_id: '',
            room_id: '',
            tool_id: '',
            peminjam: '',
            kontak: '',
            booking_date: '',
            start_time: '',
            end_time: '',
            desk_activity: '',
            dept: '',
            jenis_kegiatan: '',
            jenis_pengguna: '',
            });
        
        toast.success('Booking successfully', {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setModalOpenRoom(false);
        
    } catch (error) {
        console.error('Error Booking:', error.message);
        toast.error(`Error Booking ${error.message}`, {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 5000
        });     
    }
    };

    const handleSubmitTool = async (e) => {
    e.preventDefault();

    const formData = formDataTool;
    
    try {
        await createBookingToolSpecialAdmin(formData);
        setFormDataTool({
            users_id: '',
            tool_id: '',
            peminjam: '',
            kontak: '',
            booking_date: '',
            start_time: '',
            end_time: '',
            desk_activity: '',
            dept: '',
            quantity: '',
            jenis_kegiatan: '',
            jenis_pengguna: '',
            });
        
        toast.success('Booking successfully', {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setModalOpenTool(false);
        
    } catch (error) {
        console.error('Error Booking:', error.message);
        toast.error(`Error Booking ${error.message}`, {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 5000
        });     
    }
    };
      
    const handleTurnedClick = (id, room_id) => {
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

    const handleBookingClick = async (Booking) => {
        try {
            const Id = Booking;
            setIsOpen(true);
            const book = await showBookingById(Id); 
            setSelectedBookingId(book);
        } catch (error) {
            console.log("error:", error);
        }
    };

    const handleCloseClick = () => {
        setIsOpen(false); // Update state to hide the card
    };

    const formatTime = (timeString) => {
        const date = parse(timeString, 'HH:mm:ss', new Date());
        return format(date, 'hh:mm a');
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Bookings.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(Files.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
      };

      const formatDateString = (dateString) => {
          if (!dateString) return "Invalid date";
          const date = new Date(dateString);
          return format(date, "dd MMMM yyyy", {locale});
        };

    return (
        <>
                <div className="pt-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex mb-4 justify-start">
                    <div className="flex max-w-sm px-4 py-2">
                        <Button onClick={() => handleSearchRoomsId()}>Booking Room</Button>
                    </div>
                    <div className="flex max-w-sm px-4 py-2">
                        <Button onClick={() => handleSearchToolsId()}>Booking Tool</Button>
                    </div>
                        <Modal show={isModalOpenRoom} popup onClose={() => setModalOpenRoom(false)}>
                            <Modal.Header >
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Buat Reservasi Ruangan
                                    </h3>                                
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                {Rooms && Rooms.length > 0 ? (
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="room_id" value="Pilih ruangan" />
                                        </div>
                                        <Select id="room_id" value={room_id} onChange={(e) => setRoom_id(e.target.value)} required>
                                            <option value="">-- Select Room --</option>
                                            {Rooms.map((room, index) => (
                                            <option key={index} value={room.room_id}>
                                                {room.room_id} - {room.name_room}
                                            </option>
                                            ))}
                                        </Select>
                                    </div>
                                ) : (
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="tool_id" value="Pilih alat" />
                                        </div>
                                        <Select id="tool_id" value={tool_id} onChange={(e) => setTool_id(e.target.value)} required>
                                            <option value="">-- Select Tool --</option>
                                            {Tools.map((tool, index) => (
                                            <option key={index} value={tool.tool_id}>
                                                {tool.tool_id} - {tool.name_tool}
                                            </option>
                                            ))}
                                        </Select>
                                    </div>
                                )}
                                
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="peminjam" value="Nama Penanggungjawab" />
                                    </div>
                                    <TextInput 
                                        id="peminjam" 
                                        name="peminjam"
                                        value={formData.peminjam} 
                                        onChange={handleChange} 
                                        placeholder="Nama Lengkap" 
                                        required  
                                    />
                                </div>
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="kontak" value="Nomor kontak" />
                                    </div>
                                    <TextInput 
                                        id="kontak" 
                                        name="kontak"
                                        value={formData.kontak} 
                                        onChange={handleChange} 
                                        placeholder="no hp" 
                                        required  
                                    />
                                </div>
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="dept" value="Departemen" />
                                    </div>
                                    <TextInput 
                                        id="dept" 
                                        name="dept" 
                                        value={formData.dept} 
                                        onChange={handleChange} 
                                        placeholder="departemen penyelenggara" 
                                        required  
                                    />
                                </div>
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="jenis_pengguna" value="Peruntukan Pengguna" />
                                    </div>
                                    <Select 
                                        id="jenis_pengguna" 
                                        value={showOption ? "other": jenis_pengguna} 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setJenis_pengguna(value);
                                            setShowOption(value === "other");
                                        }}  
                                        required
                                        >
                                        <option value="">-- Pilih Pengguna --</option>
                                        <option value="mahasiswa">Mahasiswa</option>
                                        <option value="dosen">Dosen</option>
                                        <option value="tendik">Tendik</option>
                                        <option value="other">Lainnya</option>
                                    </Select>
                                    {showOption && (
                                        <TextInput 
                                        id="jenis_pengguna_lainnya"  
                                        value={jenis_pengguna.startsWith("other:") ? jenis_pengguna.split(":")[1]: ""}
                                        onChange={(e) => setJenis_pengguna(`other:${e.target.value}`)}
                                        placeholder="pengguna lainnya" 
                                        required />
                                    )}
                                </div>
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="jenis_kegiatan" value="Pilih kegiatan" />
                                    </div>
                                    <Select 
                                        id="jenis_kegiatan" 
                                        value={showOption ? "other": jenis_kegiatan} 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setJenis_kegiatan(value);
                                            setIsOtherKegiatan(value === "other");
                                        }}  
                                        required
                                        >
                                        <option value="">-- Pilih kegiatan --</option>
                                        <option value="konsi">Konsi</option>
                                        <option value="rapat">Rapat</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="ujian">Ujian</option>
                                        <option value="other">Lainnya</option>
                                    </Select>
                                    {isOtherKegiatan && (
                                        <TextInput 
                                        id="jenis_kegiatan_lainnya"
                                        value={jenis_kegiatan.startsWith("other:") ? jenis_pengguna.split(":")[1]: ""}
                                        onChange={(e) => setJenis_kegiatan(`other:${e.target.value}`)}
                                        placeholder="pengguna lainnya" 
                                        required />
                                    )}
                                </div>
                                <div className="">
                                    <div className="mb-2 block">
                                        <Label htmlFor="desk_activity" value="Nama kegiatan/forum" />
                                    </div>
                                    <TextInput 
                                        id="desk_activity" 
                                        name="desk_activity"
                                        value={formData.desk_activity} 
                                        onChange={handleChange} 
                                        placeholder="Deskripsi activity" 
                                        required  
                                    />
                                </div>
                                {dateBooks.map((booking, index) => (
                                    <div key={index}>
                                    <div className='py-2'>
                                        <label htmlFor={`${index}-booking_date`} className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                                            Tanggal Kegiatan
                                        </label>
                                        <input 
                                            type="Date" 
                                            name={`${index}-booking_date`}
                                            id="booking_date" 
                                            value={booking.booking_date}  
                                            onChange={handleChange}
                                            placeholder="" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                            required />
                                    </div>

                                    <div className='grid grid-cols-2 gap-6 py-2'>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor={`${index}-start_time`} className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Waktu mulai</label>
                                            <input 
                                                type="time" 
                                                name={`${index}-start_time`}
                                                id="start_time" 
                                                value={booking.start_time}   
                                                onChange={handleChange}
                                                placeholder="" 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                                required />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor={`${index}-end_time`} className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Waktu selesai</label>
                                            <input 
                                                type="time" 
                                                name={`${index}-end_time`}
                                                id="end_time"  
                                                value={booking.end_time}    
                                                onChange={handleChange}
                                                placeholder="" 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                                required />
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveSession(index)}
                                        className="w-full text-white bg-red-500 hover:bg-red-600 my-3 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                            Hapus
                                    </button>
                                    </div>
                                    ))}
                                    <button 
                                        type="button" 
                                        onClick={handleAddSession}
                                        className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Tambah Hari
                                    </button>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleSubmit}>Kirim</Button>
                                <Button color="gray" onClick={() => setModalOpenRoom(false)}>
                                    Batal
                                </Button>
                            </Modal.Footer>
                            
                        </Modal>

                        <Modal show={isModalOpenTool} popup onClose={() => setModalOpenTool(false)}>
                            <Modal.Header >
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Buat Reservasi Alat
                                    </h3>                                
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="tool_id" value="Pilih alat" />
                                        </div>
                                        <Select id="tool_id" value={tool_id} onChange={(e) => setTool_id(e.target.value)} required>
                                            <option value="">-- Select Tool --</option>
                                            {Tools.map((tool, index) => (
                                            <option key={index} value={tool.tool_id}>
                                                {tool.tool_id} - {tool.name_tool}
                                            </option>
                                            ))}
                                        </Select>
                                    </div>
                                
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="peminjam" value="Nama Penanggungjawab" />
                                        </div>
                                        <TextInput 
                                            id="peminjam" 
                                            name="peminjam"
                                            value={formDataTool.peminjam} 
                                            onChange={handleChange} 
                                            placeholder="Nama Lengkap" 
                                            required  
                                        />
                                    </div>
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="kontak" value="Nomor kontak" />
                                        </div>
                                        <TextInput 
                                            id="kontak" 
                                            name="kontak"
                                            value={formDataTool.kontak} 
                                            onChange={handleChange} 
                                            placeholder="no hp" 
                                            required  
                                        />
                                    </div>
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="dept" value="Departemen" />
                                        </div>
                                        <TextInput 
                                            id="dept" 
                                            name="dept" 
                                            value={formDataTool.dept} 
                                            onChange={handleChange} 
                                            placeholder="departemen penyelenggara" 
                                            required  
                                        />
                                    </div>
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="jenis_pengguna" value="Peruntukan pengguna" />
                                        </div>
                                        <Select 
                                            id="jenis_pengguna" 
                                            value={showOption ? "other": jenis_pengguna} 
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setJenis_pengguna(value);
                                                setShowOption(value === "other");
                                            }}  
                                            required
                                            >
                                            <option value="">-- Pilih Pengguna --</option>
                                            <option value="mahasiswa">Mahasiswa</option>
                                            <option value="dosen">Dosen</option>
                                            <option value="tendik">Tendik</option>
                                            <option value="other">Lainnya</option>
                                        </Select>
                                        {showOption && (
                                            <TextInput 
                                            id="jenis_pengguna_lainnya"  
                                            value={jenis_pengguna.startsWith("other:") ? jenis_pengguna.split(":")[1]: ""}
                                            onChange={(e) => setJenis_pengguna(`other:${e.target.value}`)}
                                            placeholder="pengguna lainnya" 
                                            required />
                                        )}
                                    </div>
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="jenis_kegiatan" value="Pilih kegiatan" />
                                        </div>
                                        <Select 
                                            id="jenis_kegiatan" 
                                            value={showOption ? "other": jenis_kegiatan} 
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setJenis_kegiatan(value);
                                                setIsOtherKegiatan(value === "other");
                                            }}  
                                            required
                                            >
                                            <option value="">-- Pilih kegiatan --</option>
                                            <option value="penelitian">Penelitian</option>
                                            <option value="Praktikum">Praktikum</option>
                                            <option value="Outbond">Outbond</option>
                                            <option value="other">Lainnya</option>
                                        </Select>
                                        {isOtherKegiatan && (
                                            <TextInput 
                                            id="jenis_kegiatan_lainnya"
                                            value={jenis_kegiatan.startsWith("other:") ? jenis_pengguna.split(":")[1]: ""}
                                            onChange={(e) => setJenis_kegiatan(`other:${e.target.value}`)}
                                            placeholder="pengguna lainnya" 
                                            required />
                                        )}
                                    </div>
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="desk_activity" value="Nama kegiatan/forum" />
                                        </div>
                                        <TextInput 
                                            id="desk_activity" 
                                            name="desk_activity"
                                            value={formDataTool.desk_activity} 
                                            onChange={handleChange} 
                                            placeholder="Deskripsi activity" 
                                            required  
                                        />
                                    </div>
                                    <div className="">
                                        <div className="mb-2 block">
                                            <Label htmlFor="quantity" value="Jumlah alat" />
                                        </div>
                                        <TextInput 
                                            id="quantity" 
                                            name="quantity"
                                            type='number' 
                                            value={formDataTool.quantity} 
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                // Mengonversi nilai menjadi integer
                                                setFormDataTool(prev => ({
                                                  ...prev,
                                                  [name]: value === '' ? 0 : parseInt(value),  // Mengonversi string kosong ke 0
                                                }));
                                              }} 
                                            placeholder="Jumlah alat"  
                                            required  
                                        />
                                    </div>
                                    {dateBooks.map((booking, index) => (
                                        <div key={index}>
                                        <div className='py-2'>
                                            <label htmlFor={`${index}-booking_date`} className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                                                Tanggal Kegiatan
                                            </label>
                                            <input 
                                                type="Date" 
                                                name={`${index}-booking_date`}
                                                id="booking_date" 
                                                value={booking.booking_date}  
                                                onChange={handleChange}
                                                placeholder="" 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                                required />
                                        </div>

                                        <div className='grid grid-cols-2 gap-6 py-2'>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor={`${index}-start_time`} className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Waktu mulai</label>
                                                <input 
                                                    type="time" 
                                                    name={`${index}-start_time`}
                                                    id="start_time" 
                                                    value={booking.start_time}   
                                                    onChange={handleChange}
                                                    placeholder="" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                                    required />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor={`${index}-end_time`} className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Waktu selesai</label>
                                                <input 
                                                    type="time" 
                                                    name={`${index}-end_time`}
                                                    id="end_time"  
                                                    value={booking.end_time}    
                                                    onChange={handleChange}
                                                    placeholder="" 
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                                    required />
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveSession(index)}
                                            className="w-full text-white bg-red-500 hover:bg-red-600 my-3 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                Hapus
                                        </button>
                                        </div>
                                        ))}
                                        <button 
                                            type="button" 
                                            onClick={handleAddSession}
                                            className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Tambah Hari
                                        </button>
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={handleSubmitTool}>Kirim</Button>
                                <Button color="gray" onClick={() => setModalOpenTool(false)}>
                                    Batal
                                </Button>
                            </Modal.Footer>
                            
                        </Modal>
    
                
            </div>
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
                            <th scope="col" className="px-6 py-3">
                                Tracking
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
                            {booking.room_id ? (
                                <>
                                {booking.room_id}
                                </>
                            ) : (
                                <>
                                {booking.tool_id}
                                </>
                            )}
                            
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
                             <span className="flex items-start justify-start">
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
                                </span>
                                 
                        </td>
                        <td className="px-4 py-4">
                            {booking.booking_status === 'approved' && (
                                <button 
                                onClick={() => handleTurnedClick(booking.id, booking.room_id)}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    tandai Selesai
                            </button>
                            )}
                            
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

                </div>
                <ComponentPagination
                itemsPerPage={itemsPerPage}
                totalItems={Bookings.length}
                paginate={paginate}
                />
                
                <ToastContainer />

                {selectedBookingId && isOpen && 
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
                        <ReservationCard 
                            bookingData={selectedBookingId}
                            isOpen={isOpen} // Pass the isOpen state
                            handleCloseClick={handleCloseClick} />
                    </div>
                }
                </div>
        </>   
    );
};

export default Booking_admin;
