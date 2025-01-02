import React, { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaFileDownload, FaRegEye } from "react-icons/fa";
import { deleteFile, SaveFile } from '../../modules/fetch/file';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import FileViewer from '../fileViewer';


const FileList = ({ files, role }) => {
    const [Files, setFiles] = useState(files)
    const [selectedFile, setSelectedFile] = useState('')
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
        setFiles(files);
      }, [files]);

    const handleFileClick = (file) => {
        setSelectedFile(file.path);
        setIsViewerOpen(true);
    };

    const handleCloseViewer = () => {
        setIsViewerOpen(false);
        setSelectedFile('');
    };

    const handleDeleteFile = async (id) => {
        Swal.fire({
          title: 'Konfirmasi Penghapusan',
          text: 'Apakah Anda yakin ingin menghapus data File ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, Hapus',
          cancelButtonText: 'Batal'
      }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                await deleteFile(id);
                setFiles((prevFiles) => prevFiles.filter((Files) => Files.id !== id));
                toast.success('Data User berhasil dihapus.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000 
                });
            } catch (error) {
                console.error("Error deleting Tool:", error.message);
                toast.error('Gagal menghapus User. Silahkan coba lagi.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000
                });
            } 
          }
        })
      };

      const handleDownloadFile = async (id) => {
        try {
            await SaveFile(id);
            console.log(`File with id ${id} has been successfully downloaded.`);
        } catch (error) {
            console.error(`Failed to download file with id ${id}:`, error.message);
        }
      }

    return (
                <div className="items-center justify-center pt-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                                <tr className="bg-blue-gray-400 text-gray-700">
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        dept
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        surat
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                            {Files.map((file, index) => (
                                    <tr 
                                    key={index} 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <td className="py-3 px-4">
                                        {index + 1}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {file.User.username}
                                        </td>
                                        <td className="py-3 px-4">
                                            {file.User.dept}
                                        </td>
                                        <td className="py-3 px-4">
                                            <a href={`http://localhost:3000${file.path}`} target="_blank" rel="noopener noreferrer">
                                                {file.nama}
                                            </a>
                                        </td>
                                        <td className="flex py-3 px-4">
                                            <button 
                                                onClick={() =>handleFileClick(file)}
                                                className="text-gray-600 hover:text-gray-800 px-2">
                                                <FaRegEye  size={30} />
                                            
                                            </button>
                                        {role === 'user' ? (
                                            <button 
                                                onClick={() =>handleDeleteFile(file.id)}
                                                className="text-red-600 hover:text-red-800 px-2">
                                                <HiOutlineTrash size={30} />
                                            
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() =>handleDownloadFile(file.id)}
                                                className="text-yellow-600 hover:text-yellow-800 px-2">
                                                <FaFileDownload size={30} />
                                            
                                            </button>
                                        )}
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                        
                    </div>
                    <ToastContainer />
                    {selectedFile && 
                            <FileViewer 
                                file={selectedFile}
                                isOpen={isViewerOpen}
                                onClose={handleCloseViewer} 
                            />
                        }
                </div>
    );
};

export default FileList;
