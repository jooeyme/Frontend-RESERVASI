import React, { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBookingRoom } from '../../modules/fetch/reservasi';


const ReservationRoomCard = ({RoomId, isOpen, handleCloseClick}) => {
    
    const [formData, setFormData] = useState({
        room_id: RoomId,
        peminjam: '',
        kontak: '',
        booking_date: '',
        start_time: '',
        end_time: '',
        desk_activity: '',
        dept: '',
  });

  const [localIsOpen, setIsOpen] = useState(isOpen || true); 

  const handleLocalCloseClick = () => {
    handleCloseClick?.() || setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, 
        [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const today = new Date();
    const selectedDate = new Date(formData.booking_date);
    console.log("today: ", today);
    console.log("selectedDate: ", selectedDate);
    console.log("starttime:", formData.start_time);
    console.log("endtime:", formData.end_time);

    if (selectedDate <= today) {
        console.error("Tanggal harus di masa sekarang atau masa depan");
        toast.error('Reservasi maksimal dilakukan H-1 acara', {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 5000
        });
        return;
    }

    // Periksa apakah waktu dipilih bertumpang tindih dengan waktu yang sudah dipesan
    

    try {
        const response = await createBookingRoom(formData);
        console.log(response.data);
        setFormData({
            users_id: '',
            room_id: '',
            peminjam: '',
            kontak: '',
            booking_date: '',
            start_time: '',
            end_time: '',
            desk_activity: '',
            dept: '',
          });
        
        console.log('Booking successfully');
        toast.success('Booking successfully', {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));

        handleCloseClick?.(); // Call external close handler if available
        setIsOpen(false);
        
    } catch (error) {
        console.error('Error Booking:', error.message);
        toast.error(`Error Booking ${error.message}`, {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 5000
        });
        
    }
  };

  return (
    <>
    <div className={`overflow-auto max-w-md w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p- ${!localIsOpen && 'hidden'}`}>
        <form onSubmit={handleSubmit} >
            <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Reservasi</h5>
            
            <div className='py-2'>
                <label htmlFor="peminjam" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Nama Penanggungjawab</label>
                <input 
                    type="text" 
                    name="peminjam" 
                    id="peminjam" 
                    value={formData.peminjam} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    placeholder="Nama Lengkap" 
                    required />
            </div>

            <div className='py-2'>
                <label htmlFor="kontak" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Kontak</label>
                <input 
                    type="text" 
                    name="kontak" 
                    id="kontak" 
                    value={formData.kontak} 
                    onChange={handleChange}
                    placeholder="no HP" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div className='py-2'>
                <label htmlFor="dept" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                    Departemen
                </label>
                <input 
                    type="text" 
                    name="dept" 
                    id="dept" 
                    value={formData.dept} 
                    onChange={handleChange}
                    placeholder="departmen penyelenggara" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div className='py-2'>
                <label htmlFor="desk_activity" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                    Kegiatan/Forum
                </label>
                <textarea 
                    type="text" 
                    name="desk_activity" 
                    id="desk_activity" 
                    value={formData.desk_activity} 
                    onChange={handleChange}
                    placeholder="Deskripsi Kegiatan " 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div className='py-2'>
                <label htmlFor="booking_date" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Tanggal Reservasi</label>
                <input 
                    type="Date" 
                    name="booking_date" 
                    id="booking_date" 
                    value={formData.booking_date}  
                    onChange={handleChange}
                    placeholder="" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div className='grid grid-cols-2 gap-6 py-2'>
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="start_time" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Waktu mulai</label>
                    <input 
                        type="time" 
                        name="start_time" 
                        id="start_time" 
                        value={formData.start_time}   
                        onChange={handleChange}
                        placeholder="" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="end_time" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">Waktu selesai</label>
                    <input 
                        type="time" 
                        name="end_time" 
                        id="end_time"  
                        value={formData.end_time}    
                        onChange={handleChange}
                        placeholder="" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        required />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-6 pt-4 pb-2'>
                <div className="col-span-2 sm:col-span-1">
                    <button 
                    type="button"
                    aria-label="Close"
                    onClick={handleLocalCloseClick}
                    className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Batal
                    </button>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <button 
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Kirim
                    </button>
                </div>
            </div>
            
        </form>
        <ToastContainer/>
    </div>

    
    

    </>
  );
};

export default ReservationRoomCard;