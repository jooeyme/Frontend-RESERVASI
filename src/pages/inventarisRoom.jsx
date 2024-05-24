import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { findAllRoom } from '../modules/fetch/rooms';
import RoomEditCard from '../components/card/EditRoomCard';
import DetailRoom from './detailRoom';
import Sidebar from '../components/sidebar';

const RoomsforEdit= () => {
    const navigate = useNavigate();
  const [room, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

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

  const showRoomDetails = (room) => {
    setSelectedRoom(room);
};

const hideRoomDetails = () => {
    setSelectedRoom(null);
};

  return (
    <>
    <Sidebar/>
    <div className="p-4 sm:ml-64">
    <div className="container mx-auto flex flex-col">
        <div className="bg-blue-100 py-4 mb-5">
            <h1 className="text-2xl text-center font-bold">Ruangan Terdaftar</h1>
        </div>
        <div className="flex justify-center">
                <button 
                    type="button" 
                    onClick={() => navigate("/tambah-room")}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 my-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Tambah Ruangan</button>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
        {room.map((room) => (
          (room.room_id && room.room_id !== null) ? (
            <RoomEditCard key={room.id} {...room} showDetails={showRoomDetails}/>
          ) : (
            // Handle cases where room_id is null or missing
            <div key={room.id}>
              <p>Room data incomplete</p>
            </div>
        )))}
      </div>
      {selectedRoom && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <DetailRoom room={selectedRoom} hideDetails={hideRoomDetails} />
                </div>
            )}
      
    </div>
    </div>
    </>
  );
};

export default RoomsforEdit;