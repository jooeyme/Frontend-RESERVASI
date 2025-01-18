// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const RoomEditCard = ({room, id, room_id,name_room, deskripsi_room, gambar_room, onDelete}) => {
    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (

        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`${BASE_URL}/images/${gambar_room}`} alt={`Room Image`} />
            
            <div className="px-5 py-2">
                <div className="flex justify-between items-center">
                    <span className="items-center text-sm font-bold text-gray-700 dark:text-gray-300">{room_id}</span>
                    <div className="flex ">
                    <Link 
                        to={`/editroom/${id}`} 
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        <FaRegEdit size={20} style={{color:"blue"}}/>
                    </Link>
                    <div className="flex items-center justify-center ml-3">
                    <button
                        onClick={handleDeleteClick}
                    >
                            <FaRegTrashAlt size={20} style={{color:"red"}}/>
                    </button>
                        
                    </div>
                    </div>
                </div>
            
                    <h5 className="flex text-left text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name_room}</h5>
            
                <p className="flex text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi_room}</p>
                
            </div>
        </div>

        
    );
};

export default RoomEditCard;