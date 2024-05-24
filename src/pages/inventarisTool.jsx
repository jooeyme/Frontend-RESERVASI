import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { findAllTool } from '../modules/fetch/alat';
import ToolEditCard from '../components/card/EditToolCard';
//import RoomDetailPage from '../components/detailRoom';
import Sidebar from '../components/sidebar';

const ToolsforEdit= () => {
    const navigate = useNavigate();
  const [tool, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllTool();
        console.log('Response:', response.data );
        setTools(response.data);
        
      } catch (error) {
        console.error('Error rooms data:', error);
      }
    };

    fetchData();
  }, []);

  const showToolDetails = (tool) => {
    setSelectedTool(tool);
};

const hideToolDetails = () => {
    setSelectedTool(null);
};

  return (
    <>
    <Sidebar/>
    <div className="p-4 sm:ml-64">
    <div className="container mx-auto flex flex-col">
        <div className="bg-blue-100 py-4 mb-5">
            <h1 className="text-2xl text-center font-bold">Alat Terdaftar</h1>
        </div>
        <div className="flex justify-center">
                <button 
                    type="button" 
                    onClick={() => navigate("/tambah-alat")}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 my-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Tambah Peralatan</button>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
        {tool.map((tool) => (
          (tool.tool_id && tool.tool_id !== null) ? (
            <ToolEditCard key={tool.id} {...tool} showDetails={showToolDetails}/>
          ) : (
            // Handle cases where room_id is null or missing
            <div key={tool.id}>
              <p>Room data incomplete</p>
            </div>
        )))}
      </div>
      {selectedTool && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <ToolDetailPage room={selectedTool} hideDetails={hideToolDetails} />
                </div>
            )}
      
    </div>
    </div>
    </>
  );
};

export default ToolsforEdit;