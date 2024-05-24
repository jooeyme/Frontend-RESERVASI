import React, { useState, useEffect } from 'react';
import { findAllTool } from '../modules/fetch/alat';
import ToolCard from '../components/card/alatCard';
import ToolDetailPage from '../components/detailTool';
import SidebarUser from '../components/sidebarUser';

const ToolsPage = () => {
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
    <SidebarUser/>
    <div className="p-4 sm:ml-64">
    <div className="container mx-auto flex flex-col">
    <div className="bg-blue-100 py-4 mb-5">
                <h1 className="text-2xl text-center font-bold">Daftar Peralatan</h1>
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
    </div>
    </>
  );
};

export default ToolsPage;