import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { findAllTool, deleteTool } from '../modules/fetch/alat';
import ToolEditCard from '../components/card/EditToolCard';
//import RoomDetailPage from '../components/detailRoom';
import MainLayoutAdmin from './MainLayoutAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ToolsforEdit= () => {
    const navigate = useNavigate();
  const [tool, setTools] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllTool();
        setTools(response.data);
        
      } catch (error) {
        console.error('Error Tools data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTool = async (id) => {
    Swal.fire({
      title: 'Konfirmasi Penghapusan',
      text: 'Apakah Anda yakin ingin menghapus data Alat ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
  }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await deleteTool(id);
            setTools((prevTools) => prevTools.filter((tool) => tool.id !== id));
            toast.success('Data Alat berhasil dihapus.', { 
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000 
            });
        } catch (error) {
            console.error("Error deleting Tool:", error.message);
            toast.error('Gagal menghapus Alat. Silahkan coba lagi.', { 
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            });
        } 
      }
    })
  };


  return (
    <>
    <MainLayoutAdmin>
    <div>
    <div className="container mx-auto flex flex-col">
        <div className="py-4">
            <h1 className="text-2xl text-center font-bold">Alat Terdaftar</h1>
        </div>
        <div className="flex items-center justify-center mb-2">
                <button 
                    type="button" 
                    onClick={() => navigate("/tambah-alat")}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mb-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Tambah Peralatan</button>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
        {tool.map((tool) => (
          (tool.tool_id && tool.tool_id !== null) ? (
            <ToolEditCard key={tool.id} {...tool} onDelete={handleDeleteTool}/>
          ) : (
            // Handle cases where room_id is null or missing
            <div key={tool.id}>
              <p>Room data incomplete</p>
            </div>
        )))}
      </div>
      
      
    </div>
    </div>
    </MainLayoutAdmin>
    <ToastContainer/>
    </>
  );
};

export default ToolsforEdit;