import React, { useState, useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import { FaFileDownload, FaRegEye, FaSearch } from "react-icons/fa";
import { deleteDocument, createDocument, getDocumentsByEmployeeId } from '../../modules/fetch/document';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import FileViewer from '../fileViewer';
import ComponentPagination from "../pagination";
import { format, parse } from "date-fns";
import id from 'date-fns/locale/id'
import { Button, Modal, TextInput } from "flowbite-react";

const locale = id
const ListDocument = ({ file, nip }) => {
    const [Files, setFiles] = useState(file)
    const [selectedFile, setSelectedFile] = useState('')
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        employee_id: nip,
        document_type: "",
        file_path: null,
      });

    const filteredFiles = Files.filter((file) => {
        const searchValue = searchTerm.toLowerCase();
        return (
            file.document_name.toLowerCase().includes(searchValue) ||
            file.document_type.toLowerCase().includes(searchValue)
        );
    });

    const [openModal, setOpenModal] = useState(false);


      useEffect(() => {
         setFormData((prev) => ({
           ...prev,
           employee_id: nip,
         }));
       }, [nip]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, file_path: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // FormData untuk mengirim file dan data lainnya
        const formdata = new FormData();
        formdata.append("employee_id", formData.employee_id);
        formdata.append("document_type", formData.document_type);
        formdata.append("file_path", formData.file_path);
        console.log("data nip:", formData.employee_id);
        console.log("data2:", formData.document_type);
        console.log("data3:", formData.file_path);
        try {
          const newDocument = await createDocument(formData);
    
          setFiles((prevDocuments) => [...prevDocuments, newDocument.data]);
    
          setFormData({
            employee_id: nip,
            document_type: "",
            file_path: null,
          });
    
          console.log("Document Added successfully");
          toast.success("Document Added successfully", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
          });
    
          setOpenModal(false);
        } catch (error) {
          console.error("Error Add Document:", error.message);
          toast.error("Error Add Document", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 5000,
          });
        }
      };

    useEffect(() => {
         setFiles(file);
       }, [file]);

    const handleFileClick = (file) => {
        setSelectedFile(file.file_path);
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
                await deleteDocument(id);
                setFiles((prevFiles) => prevFiles.filter((Files) => Files.id !== id));
                toast.success('Data Doc berhasil dihapus.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000 
                });
            } catch (error) {
                console.error("Error deleting file:", error.message);
                toast.error('Gagal menghapus User. Silahkan coba lagi.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000
                });
            } 
          }
        })
      };
      console.log("data files:", Files)

    //   const handleDownloadFile = async (id) => {
    //     try {
    //         await SaveFile(id);
    //         console.log(`File with id ${id} has been successfully downloaded.`);
    //     } catch (error) {
    //         console.error(`Failed to download file with id ${id}:`, error.message);
    //     }
    //   }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFiles.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(Files.length / itemsPerPage)) return;
        setCurrentPage(pageNumber);
      };

      const formatDateString = (dateString) => {
          if (!dateString) return "Invalid date";
          const date = new Date(dateString);
          return format(date, "dd MMMM yyyy", {locale});
        };

    return (
        <>
                <div className="pt-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <div className="flex mb-4 justify-between">
                    <div className="flex max-w-sm px-4 py-2">
                        <Button onClick={() => setOpenModal(true)}>Tambah</Button>
                        </div>
                              <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Tambah Dokumen
                                  </h3>
                                </Modal.Header>
                                <Modal.Body>
                                  <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                      <div className="col-span-2">
                                        <label
                                          htmlFor="document_type"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          Dokumen type
                                        </label>
                                        <input
                                          type="text"
                                          name="document_type"
                                          id="document_type"
                                          value={formData.document_type}
                                          onChange={handleInputChange}
                                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          placeholder="Type product name"
                                          required=""
                                        />
                                      </div>
                        
                                      <div className="col-span-2">
                                        <label
                                          htmlFor="file_path"
                                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                          file
                                        </label>
                        
                                        <div class="flex items-center justify-center w-full">
                                          <label
                                            htmlFor="file_path"
                                            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                          >
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                              <svg
                                                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                              >
                                                <path
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                              </svg>
                                              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span class="font-semibold">Click to upload</span> or
                                                drag and drop
                                              </p>
                                              <p class="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                              </p>
                                            </div>
                                            <input
                                              id="file_path"
                                              type="file"
                                              onChange={handleFileChange}
                                              class="hidden"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      Simpan
                                    </button>
                                  </form>
                                </Modal.Body>
                              </Modal>
    
                <TextInput
                    type="text"
                    placeholder="Cari dokumen..."
                    className="flex justify-end max-w-sm px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    icon={FaSearch}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset ke halaman pertama jika mencari
                    }}
                />
            </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                                <tr className="bg-blue-gray-400 text-gray-700">
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Dokumen
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Jenis Dokumen
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {currentItems.length > 0 ? (
                            <tbody className="text-blue-gray-900">
                            {currentItems.map((file, index) => (
                                    <tr 
                                    key={index} 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <td className="py-3 px-4">
                                        {index + 1}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {file.document_name}
                                        </td>
                                        <td className="py-3 px-4">
                                            {file.document_type}
                                        </td>
                                        {/* <td className="py-3 px-4">
                                            <a href={`http://localhost:3000/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                                                {file.document_name}
                                            </a>
                                        </td> */}
                                        <td className="py-3 px-4">
                                            {formatDateString(file.upload_date)}
                                        </td>
                                        <td className="flex py-3 px-4">
                                            <button 
                                                onClick={() =>handleFileClick(file)}
                                                className="text-gray-600 hover:text-gray-800 px-2">
                                                <FaRegEye  size={30} />
                                            
                                            </button>
                                     
                                            <button 
                                                onClick={() =>handleDeleteFile(file.id)}
                                                className="text-red-600 hover:text-red-800 px-2">
                                                <HiOutlineTrash size={30} />
                                            
                                            </button>
                                        
                                            {/* <button 
                                                onClick={() =>handleDownloadFile(file.id)}
                                                className="text-yellow-600 hover:text-yellow-800 px-2">
                                                <FaFileDownload size={30} />
                                            
                                            </button> */}
                                        
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                            ) : (
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <td colSpan="7" className="text-center py-4 text-lg">Tidak ada dokumen yang dapat ditampilkan</td>
                                    </tr>
                                </tbody>
                                )}
                        </table>
                        
                    </div>
                    <ComponentPagination
                    itemsPerPage={itemsPerPage}
                    totalItems={Files.length}
                    paginate={paginate}
                    
                />
                    <ToastContainer />
                    {selectedFile && 
                            <FileViewer 
                                file={selectedFile}
                                isOpen={isViewerOpen}
                                onClose={handleCloseViewer} 
                            />
                        }
                </div>
                

        </>
                
    );
};

export default ListDocument;
