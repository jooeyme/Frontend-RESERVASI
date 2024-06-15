import React, { useState, useEffect } from 'react';
import { findAllRoom } from '../modules/fetch/rooms';
import RoomCard from '../components/card/roomCard';
import DetailRoom from './detailRoom';
import MainLayoutUser from './MainLayoutUser';

const RoomsPage = () => {
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
    console.log("selected:", selectedRoom)
  };

  const hideRoomDetails = () => {
      setSelectedRoom(null);
  };

  return (
    <>
    <MainLayoutUser>
    
    <div className="container mx-auto flex flex-col">
    <div className=" py-4 mb-5">
                <h1 className="text-2xl text-center font-bold">Daftar Ruangan</h1>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
        {room.map((room) => (
          (room.room_id && room.room_id !== null) ? (
            <RoomCard key={room.id} {...room} showDetails={showRoomDetails}/>
          ) : (
            // Handle cases where room_id is null or missing
            <div key={room.id}>
              <p>Room data incomplete</p>
            </div>
        )))}
      </div>
      {selectedRoom && 
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex">
                    <DetailRoom room={selectedRoom} hideDetails={hideRoomDetails} />
                </div>
            }
      
    </div>

    </MainLayoutUser>
    </>
  );
};

export default RoomsPage;