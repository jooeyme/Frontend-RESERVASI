import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { findAllRoom, deleteRoom } from '../modules/fetch/rooms';
import RoomEditCard from '../components/card/EditRoomCard';
import MainLayoutAdmin from './MainLayoutAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const RoomsforEdit= () => {
    const navigate = useNavigate();
  const [room, setRooms] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllRoom();
        console.log('Response:', response.data );
        setRooms(response.data);
        
      } catch (error) {
        console.error('Error rooms data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRoom = async (id) => {
    Swal.fire({
      title: 'Konfirmasi Penghapusan',
      text: 'Apakah Anda yakin ingin menghapus data Ruangan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
  }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await deleteRoom(id);
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
            toast('Data Ruangan berhasil dihapus.', { type: 'success' });
        } catch (error) {
            console.error("Error deleting job:", error.message);
            toast('Gagal menghapus Ruangan. Silahkan coba lagi.', { type: 'error' });
        } 
      }
    })
};


  return (
    <>
    <MainLayoutAdmin>
    <div>
    <div className="container mx-auto flex flex-col">
        <div className="py-4">
            <h1 className="text-2xl text-center font-bold">Ruangan Terdaftar</h1>
        </div>
        <div className="flex items-center justify-center mb-2">
                <button 
                    type="button" 
                    onClick={() => navigate("/tambah-room")}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mb-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Tambah Ruangan</button>
          </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
        {room.map((room) => (
          (room.room_id && room.room_id !== null) ? (
            <RoomEditCard key={room.id} {...room} onDelete={handleDeleteRoom} />
          ) : (
            // Handle cases where room_id is null or missing
            <div key={room.id}>
              <p>Room data incomplete</p>
            </div>
        )))}
      </div>
      
      
    </div>
    </div>
    </MainLayoutAdmin>
    <ToastContainer />
    </>
  );
};

export default RoomsforEdit;