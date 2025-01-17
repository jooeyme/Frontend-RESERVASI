import React, { useState, useEffect } from 'react';
import { findAllTool } from '../modules/fetch/alat';
import ToolCard from '../components/card/alatCard';
import ToolDetailPage from './detailTool';
import MainLayoutUser from './MainLayoutUser';

const ToolsPage = () => {
  const [tool, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllTool();
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
    <MainLayoutUser>
    
    <div className="container mx-auto flex flex-col">
    <div className=" py-4">
                <h1 className="text-2xl text-left font-semibold">Daftar Peralatan</h1>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
        {tool.map((tool) => (
          (tool.tool_id && tool.tool_id !== null) ? (
            <ToolCard key={tool.id} {...tool} showDetails={showToolDetails}/>
          ) : (
            // Handle cases where room_id is null or missing
            <div key={tool.id}>
              <p>tool data incomplete</p>
            </div>
        )))}
      </div>
      {selectedTool && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <ToolDetailPage room={selectedTool} hideDetails={hideToolDetails} />
                </div>
            )}
      
    </div>
    
    </MainLayoutUser>
    </>
  );
};

export default ToolsPage;