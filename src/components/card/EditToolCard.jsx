// components/RoomCard.jsx
import React from 'react';
import {Link} from "react-router-dom";

const ToolEditCard = ({room, id, tool_id,name_tool, deskripsi, gambar_tool, showDetails}) => {
    
    return (
        <div className="bg-white overflow-hidden shadow-md rounded-md">
            
                <img className="h-40 w-full object-cover rounded-t-lg" src={`http://localhost:3000/images/${gambar_tool}`} alt={`Tool Image`} />
            
            <div className="px-5 py-2">
                <div className="flex justify-between items-center">
                    <span className="items-center text-sm font-bold text-gray-700 dark:text-gray-300">{tool_id}</span>
                    <Link 
                        to={`/edittool/${id}`} 
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17 15.9999V18.8329C17.0001 18.9862 16.97 19.138 16.9114 19.2797C16.8528 19.4213 16.7669 19.55 16.6585 19.6584C16.5501 19.7668 16.4214 19.8528 16.2797 19.9114C16.1381 19.97 15.9863 20.0001 15.833 19.9999H4.167C4.01371 20.0001 3.8619 19.97 3.72025 19.9114C3.57861 19.8528 3.44991 19.7668 3.34151 19.6584C3.23312 19.55 3.14717 19.4213 3.08857 19.2797C3.02996 19.138 2.99987 18.9862 3 18.8329V7.16695C2.99987 7.01366 3.02996 6.86184 3.08857 6.7202C3.14717 6.57855 3.23312 6.44985 3.34151 6.34146C3.44991 6.23307 3.57861 6.14711 3.72025 6.08851C3.8619 6.02991 4.01371 5.99981 4.167 5.99995H10.783M16.304 5.84395L19.156 8.69595M20.409 4.59095C20.5963 4.77817 20.745 5.00047 20.8464 5.24515C20.9478 5.48983 20.9999 5.75209 20.9999 6.01695C20.9999 6.2818 20.9478 6.54406 20.8464 6.78874C20.745 7.03342 20.5963 7.25573 20.409 7.44295L12.565 15.2869L9 15.9999L9.713 12.4349L17.557 4.59095C17.7442 4.4036 17.9665 4.25498 18.2112 4.15359C18.4559 4.05219 18.7181 4 18.983 4C19.2479 4 19.5101 4.05219 19.7548 4.15359C19.9995 4.25498 20.2218 4.4036 20.409 4.59095Z" stroke="blue" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
    
                <Link to={`/detailtool/${id}`}
                  onClick={() => showDetails()}>
                    <h5 className="flex text-left text-lg font-bold tracking-tight text-gray-900 dark:text-white">{name_tool}</h5>
                </Link>
                <p className="flex text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p>
                
            </div>
        </div>
    );
};

export default ToolEditCard;