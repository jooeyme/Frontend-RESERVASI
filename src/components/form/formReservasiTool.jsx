import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBookingTool } from '../../modules/fetch/reservasi';


const ReservationToolCard = ({ToolId, isOpen, handleCloseClick}) => {
    const navigate = useNavigate();
    const [dateBooks, setDateBooks] = useState([{ 
            booking_date: '',
            start_time: '',
            end_time: '',
        }])
    const [formData, setFormData] = useState({
        tool_id: ToolId,
        peminjam: '',
        kontak: '',
        bookings: dateBooks,
        desk_activity: '',
        dept: '',
        quantity: 0,
  });

  const [localIsOpen, setIsOpen] = useState(isOpen || true); 
  const [jenis_pengguna, setJenis_pengguna] = useState("");
  const [jenis_kegiatan, setJenis_kegiatan] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [isOtherKegiatan, setIsOtherKegiatan] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
      setFormData((prev) => ({
          ...prev,
          bookings: dateBooks,
      }));
  }, [dateBooks]);

  const handleAddSession = () => {
    setDateBooks([...dateBooks, { booking_date: '', start_time: '', end_time: ''}]);
  };

  const handleRemoveSession = (index) => {
    const updatedBookings = dateBooks.filter((_, i) => i !== index);
    setDateBooks(updatedBookings);
  }

  const handleLocalCloseClick = () => {
    handleCloseClick?.() || setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData) {
      setFormData({
        ...formData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAgreed) {
        alert("Anda harus menyetujui ketentuan yang berlaku untuk melanjutkan!");
        return;
    }

    try {
        await createBookingTool(formData);
        setFormData({
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
                <label htmlFor="jenis_pengguna" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                    Peruntukan pengguna
                </label>
                <select  
                    name="jenis_pengguna"    
                    id="jenis_pengguna"  
                    value={showOption ? "other": jenis_pengguna}   
                    onChange={(e) => {
                        const value = e.target.value;
                        setJenis_pengguna(value);
                        setShowOption(value === "other");
                    }}  
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required="" 
                    >
                        <option value="" disabled>Pilih Peruntukan Pengguna</option>
                        <option value="mahasiswa">Mahasiswa</option>
                        <option value="dosen">Dosen</option>
                        <option value="other">Lainnya</option>
                    </select>
                    {showOption && (
                        <input 
                        type="text" 
                        name="jenis_pengguna_lainnya" 
                        id="jenis_pengguna_lainnya" 
                        value={jenis_pengguna.startsWith("other:") ? jenis_pengguna.split(":")[1]: ""}
                        onChange={(e) => setJenis_pengguna(`other:${e.target.value}`)}
                        placeholder="pengguna lainnya" 
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        required />
                    )}
            </div>

            <div className='py-2'>
                <label htmlFor="jenis_kegiatan" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                    Kategori Kegiatan
                </label>
                <select  
                    name="jenis_kegiatan"    
                    id="jenis_kegiatan"  
                    value={isOtherKegiatan ? "other": jenis_kegiatan}   
                    onChange={(e) => {
                        const value = e.target.value;
                        setJenis_kegiatan(value);
                        setIsOtherKegiatan(value === "other");
                    }}  
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required="" 
                    >
                        <option value="" disabled>Pilih Kegiatan</option>
                        <option value="praktikum">Praktikum</option>
                        <option value="outbond">Outbond</option>
                        <option value="other">Lainnya</option>
                    </select>
                    {isOtherKegiatan && (
                        <input 
                        type="text" 
                        name="jenis_kegiatan_lainnya" 
                        id="jenis_kegiatan_lainnya" 
                        value={jenis_kegiatan.startsWith("other:") ? jenis_kegiatan.split(":")[1]: ""}
                        onChange={(e) => setJenis_kegiatan(`other:${e.target.value}`)}
                        placeholder="kegiatan lainnya" 
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        required />
                    )}
            </div>

            <div className='py-2'>
                <label htmlFor="desk_activity" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                    Nama Kegiatan
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
                <label htmlFor="quantity" className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                    Jumlah Alat dipinjam
                </label>
                <input 
                    type="number" 
                    name="quantity" 
                    id="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange}
                    placeholder="Jumlah Alat" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
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

            <div className="flex items-start py-2">
                <input
                    type="checkbox"
                    id="terms"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Saya telah membaca dan menyetujui{" "}
                    <a
                        href="/terms-and-conditions"
                        target="_blank"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                        Syarat dan Ketentuan
                    </a>
                </label>
            </div>

            <div className='grid grid-cols-2 gap-6 py-2'>
                <div className="col-span-2 sm:col-span-1">
                    <button 
                    type="button"
                    aria-label="Close"
                    onClick={handleLocalCloseClick}
                    className="w-full text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Batal
                    </button>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <button 
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
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

export default ReservationToolCard;