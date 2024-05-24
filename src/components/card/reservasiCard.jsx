import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBookingByRoomId } from '../../modules/fetch/reservasi';

const ReservationCard = ({bookingData, isOpen, handleCloseClick}) => {

  const [localIsOpen, setIsOpen] = useState(isOpen || true); // Local state for fallback

  const handleLocalCloseClick = () => {
    // Call the provided handleCloseClick function if available, otherwise toggle localIsOpen
    handleCloseClick?.() || setIsOpen(false);
  };
  
  
  
  const { 
    room_id, 
    tool_id, 
    peminjam, 
    kontak,
    booking_date, 
    start_time, 
    end_time, 
    booking_status, 
    Room,
    Tool, 
  } = bookingData;
  
  const imageSource = room_id ? Room.gambar_room : Tool.gambar_tool;
  const nameReserve = room_id ? Room.name_room : Tool.name_tool;
  const id = room_id ? room_id : tool_id;


  return (
    
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg pb-4 ${!localIsOpen && 'hidden'}`}>
    <div className="max-w-2xl mx-auto " >
    <div className="flex justify-between items-center px-2 sm:px-2 lg:px-4">
      <span className="items-center text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 pt-4">Detail Reservasi</span>
      <button 
        type="button" 
        aria-label="Close"
        onClick={handleLocalCloseClick}
        >
        <svg className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <hr className="border border-gray-600 dark:border-gray-700 border-opacity-50" />
        <div className="flex flex-col md:flex-row -mx-4 px-2 sm:px-2 lg:px-4 pt-4">
            <div className="md:flex-1 px-4">
                <div className="rounded-md bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="h-48 w-full rounded-lg object-cover" src={`http://localhost:3000/images/${imageSource}`} alt={nameReserve}/>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="flex items-start text-lg font-semibold text-gray-800 dark:text-white mb-4">{nameReserve} {id}</h2>
                <div className="flex mb-2">
                    <div>
                        <span className="flex">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                            </svg>  :
                        <span className="flex text-gray-600 dark:text-gray-300 ml-2">{booking_date}</span>
                        </span>
                    </div>
                </div>
                <div className="flex mb-2">
                    <div>
                        <span className="flex">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg> :
                        <span className="text-gray-600 dark:text-gray-300 ml-2">{start_time} - {end_time}</span>
                        </span>
                    </div> 
                </div>
                <div className="flex mb-2">
                    <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">status:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">{booking_status}</span>
                </div>  
            </div>
        </div>
        <div className="px-2 sm:px-2 lg:px-4">
            <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">{peminjam}  
              <span className="text-gray-600 font-light dark:text-gray-300 ml-2">{kontak}</span>
            </span>
            <span className="flex items-start font-semibold text-gray-700 dark:text-gray-300">Asal Departemen</span>
            <p className="flex text-left text-gray-600 dark:text-gray-300 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sedante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p>
    </div>
    </div>
</div>
  );
};

export default ReservationCard;