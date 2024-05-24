import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { showToolById } from "../modules/fetch/alat";
import ReservationRoomCard from "./form/formReservasi";

const ToolDetailPage = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedToolId, setSelectedToolId] = useState('');
    const [isOpen, setIsOpen] = useState(false); 

    const handleCloseClick = () => {
        setIsOpen(false); 
    };

    const handleSelectRoom = () => {
        setSelectedToolId(detail.tool_id);
      };

    const handleReserveNow = () => {
        setShowForm(true);
      };

    const handleClick  = () => {
        handleReserveNow();
        setIsOpen(true)
        console.log(detail.tool_id);
        if (detail.tool_id) {
            handleSelectRoom(detail.tool_id);
            console.log(selectedToolId);
        } else {
            console.error("Room ID is not defined");
        }
    }

    useEffect(() => {
        try {
            const fetchDetailRoom = async () => {
                const response = await showToolById(id);
                const detailJobData = response.data;
                setDetail(detailJobData);
                
            };
            fetchDetailRoom();
        } catch (e) {
            console.log("Error fetching detail Room", e);
        }
    }, [selectedToolId]);
    

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="rounded-md bg-gray-300 dark:bg-gray-700 ">
                        <img className="h-72 w-full rounded-lg object-cover" src={`http://localhost:3000/images/${detail.gambar_room}`} alt={detail.name_room}/>
                    </div>
                </div>
                <div className="md:flex-1 px-2">
                    <h2 className="flex items-start text-2xl font-bold text-gray-800 dark:text-white mb-2">{detail.name_tool} - {detail.tool_id}</h2>
                    <p className="flex items-start text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {detail.deskripsi}
                    </p>
                    <div className="flex mb-2">
                        <div className="mr-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Luas:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.luas}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Kapasitas:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.kapasitas}</span>
                        </div>
                    </div>
                    <div className="flex mb-2">
                        <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">Alamat/Lokasi:</span>
                        
                        <span className="text-gray-600 dark:text-gray-300 ml-2">{detail.alamat_room}</span>
                    
                    </div>
                    <div className="mb-2">
                        <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">Fasilitas:</span>
                        <p className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                            {detail.fasilitas}
                        </p>
                    </div>
                    
                    <div className="flex -mx-2 mt-4">
                        <div className="w-1/2 px-2">
                            <button 
                                onClick={handleClick}
                                className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                Pesan Alat
                            </button>
                        </div>
                    </div>    
                </div>
                {showForm && isOpen && 
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
                    <ReservationRoomCard ToolId={selectedToolId}
                    isOpen={isOpen} 
                    handleCloseClick={handleCloseClick}
                    />
                </div>
                }
            </div>
        </div>
    </div>
    );
};

export default ToolDetailPage;
