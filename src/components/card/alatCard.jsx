// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";

const ToolCard = ({alat, id, tool_id,name_tool, deskripsi, gambar_tool, showDetails}) => {
    
    return (

        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`http://localhost:3000/images/${gambar_tool}`} alt={`Room Image`} />
            
            <div className="px-5 py-2">
                <h3 className="flex items-start text-xl font-semibold mb-2">{tool_id}</h3>
                <Link to={`/detailtool/${id}`}
                  onClick={() => showDetails()}>
                    <h5 className="flex text-left mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name_tool}</h5>
                </Link>
                <p className="flex text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p>
                
            </div>
        </div>

        
    );
};

export default ToolCard;