// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const ToolEditCard = ({ id, tool_id,name_tool, deskripsi, gambar_tool, onDelete}) => {
    const handleDeleteClick = () => {
        onDelete(id);
    };

    return (
        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`http://localhost:3000/images/${gambar_tool}`} alt={`Tool Image`} />
            
            <div className="px-5 py-2">
                <div className="flex justify-between items-center">
                    <span className="items-center text-sm font-bold text-gray-700 dark:text-gray-300">{tool_id}</span>
                    <div className="flex ">
                    <Link 
                        to={`/edittool/${id}`} 
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
    
                    <h5 className="flex text-left text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name_tool}</h5>
             
                <p className="flex text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p>
                
            </div>
        </div>
    );
};

export default ToolEditCard;