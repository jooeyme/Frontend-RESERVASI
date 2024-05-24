// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";

const RoomCard = ({room, id, room_id,name_room, deskripsi_room, gambar_room, showDetails}) => {
    
    return (


        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`http://localhost:3000/images/${gambar_room}`} alt={`Room Image`} />
            
            <div className="px-5 py-2">
                <h3 className="flex items-start text-xl font-semibold">{room_id}</h3>
                <Link to={`/detailroom/${id}`}
                  onClick={() => showDetails()}>
                    <h5 className="flex text-left text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name_room}</h5>
                </Link>
                <p className="flex text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi_room}</p>
                
            </div>
        </div>

        
    );
};

export default RoomCard;