// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ToolCard = ({alat, id, tool_id,name_tool, deskripsi,jumlah, gambar_tool, showDetails}) => {
    
    return (

        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`${BASE_URL}/images/${gambar_tool}`} alt={`Tool Image`} />
            
            <div className="px-4 py-4">
            <h3 className="text-left text-sm font-bold text-gray-700 dark:text-gray-300">{tool_id}</h3>
            
                <Link to={`/detailtool/${id}`}
                  onClick={() => showDetails()}>
                    <h5 className="flex text-left mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{name_tool}</h5>
                </Link>
                <p className="flex text-left font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p>
                <p className="flex items-start text-lg font-medium text-gray-700 dark:text-gray-400">Tersedia: {jumlah}</p>
            
            </div>
        </div>

        
    );
};

export default ToolCard;