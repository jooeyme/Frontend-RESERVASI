// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";

const ToolCard = ({alat, id, tool_id,name_tool, deskripsi, gambar_tool, showDetails}) => {
    
    return (

        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`http://localhost:3000/images/${gambar_tool}`} alt={`Tool Image`} />
            
            <div className="px-4 py-4">
                <h3 className="flex items-start text-lg font-light">{tool_id}</h3>
                <Link to={`/detailtool/${id}`}
                  onClick={() => showDetails()}>
                    <h5 className="flex text-left mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{name_tool}</h5>
                </Link>
                <p className="flex text-left font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p>
                
            </div>
        </div>

        
    );
};

export default ToolCard;