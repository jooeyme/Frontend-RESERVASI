// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const RoomCard = ({room, id, room_id,name_room, deskripsi_room, gambar_room, showDetails}) => {
    
    return (


        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`${BASE_URL}/images/${gambar_room}`} alt={`Room Image`} />
            
            <div className="px-4 py-4">
                <h3 className="flex items-start text-lg font-light text-green-900 dark:text-white">{room_id}</h3>
                <Link to={`/detailroom/${id}`}
                  onClick={() => showDetails()}>
                    <h5 className="flex text-left text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{name_room}</h5>
                </Link>
                <p className="flex text-left font-normal text-gray-700 dark:text-gray-400">{deskripsi_room}</p>
                
            </div>
        </div>

        
    );
};

export default RoomCard;