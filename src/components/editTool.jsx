import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editTool, showToolById } from '../modules/fetch/alat';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditFormTool = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");
    const [existingImageURL, setExistingImageURL] = useState(null);
    const [formData, setFormData] = useState({
      tool_id: '',
      name_tool: '',
      alamat_tool: '',
      kondisi: '',
      jumlah: '',
      deskripsi: '',
      gambar_tool: null,
      require_double_verification: false,
      type: '',
      pengelola: '',
    });

    const handleChange = (e) => {
      const { name, type, checked, value } = e.target;

      const inputValue = type === "checkbox" ? checked : value;
      setFormData((prevState) => ({
        ...prevState,
        [name]: inputValue, // Update properti berdasarkan nama input
      }));  
    }

    const handleFileChange = (e) => {
      setFormData({ ...formData, gambar_tool: e.target.files[0] });
        setSelectedFile( {gambar_tool: e.target.files[0]});
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target.result); // Set preview image URL
        };
        reader.readAsDataURL(file); // Read file as data URL
      };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('gambar_tool', selectedFile);

        try {
            await editTool(id, formData);
            toast.success('Tool successfully Edit', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
            });

            setTimeout(() => {
                navigate("/inventaris-alat");
            }, 2000);

        } catch (error) {
            console.error('Error Edit Tool:', error.message);
            toast.error('Error Edit Tool', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 5000
            });

        }
      };
    
      useEffect(() => {
        const fetchUpdateTool = async () => {
            try {
                const response = await showToolById(id);
                const toolData = response.data;

                setFormData({
                    tool_id: toolData.tool_id,
                    name_tool: toolData.name_tool,
                    alamat_tool: toolData.alamat_tool,
                    kondisi: toolData.kondisi,
                    jumlah: toolData.jumlah,
                    deskripsi: toolData.deskripsi,
                    gambar_tool: toolData.gambar_tool,
                    require_double_verification: toolData.require_double_verification,
                    type: toolData.type,
                    pengelola: toolData.pengelola
                })
                if (toolData.gambar_tool) {
                  setExistingImageURL(toolData.gambar_tool); // Set existing image URL
                }
            } catch (error) {
                console.error("Error fetching Tool data:", error.message);
            }
        };
        fetchUpdateTool();
      },[]);
      

    return (
      <>
      <div>
        <div className="py-4 mt-10">
            <h1 className="text-2xl text-center font-bold">Edit Peralatan</h1>
        </div>
          <form onSubmit={handleFormSubmit} className='border border-gray-300 rounded mx-auto max-w-6xl w-full my-5 inputs space-y-6' >
            <div className="flex flex-col md:flex-row gap-y-0 gap-x-4">
              <div className='w-full md:w-1/2 p-4 pl-10'>
            <div className="mb-4">
              <label htmlFor="tool_id" className="block text-left text-sm font-semibold font-poppins">
                Id Alat
              </label>
              <input
                placeholder='id tool'
                type="text"
                id="tool_id"
                name="tool_id"
                onChange={handleChange}
                value={formData.tool_id} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name_tool" className="block text-left text-sm font-semibold font-poppins">
                Nama Alat
              </label>
              <input
                placeholder='tool Name'
                type="text"
                id="name_tool"
                name="name_tool"
                onChange={handleChange}
                value={formData.name_tool} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alamat_tool" className="block text-left text-sm font-semibold font-poppins">
                Lokasi/Alamat
              </label>
              <input
                placeholder='tool Address'
                type='text'
                id="alamat_tool"
                name="alamat_tool"
                onChange={handleChange}
                value={formData.alamat_tool}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
              <label htmlFor="kondisi" className="block text-left text-sm font-semibold font-poppins">
                kondisi Ruangan
              </label>
              <input
                placeholder='Maxs Tool Capacity'
                type="text"
                id="kondisi"
                name="kondisi"
                onChange={handleChange}
                value={formData.kondisi}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="jumlah" className="block text-left text-sm font-semibold font-poppins">
                jumlah Ruangan
              </label>
              <input
                placeholder='Tool Wide'
                type="text"
                id="jumlah"
                name="jumlah"
                onChange={handleChange}
                value={formData.jumlah}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gambar_tool" className="block text-left text-sm font-semibold font-poppins">
                Gambar Ruangan
              </label>
              {existingImageURL && (
              <div className="existing-image">
                <img src={`${BASE_URL}/images/${existingImageURL}`} alt="Existing Image" />
              </div>
              )}

              <input
                type="file"
                id="gambar_tool"
                accept='image/**'
                name='gambar_tool'
                onChange={handleFileChange}
                className="file-input mt-1 p-2 border border-gray-300 rounded-md w-full "
              />
            
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                </div>
              )}
              
            </div>
            
            </div>

              <div className='w-full md:w-1/2 p-4 pr-10'>
            <div className="mb-4">
              <label htmlFor="deskripsi" className="block text-left text-sm font-semibold font-poppins">
                Deskripsi Alat
              </label>
              <textarea
                placeholder='Tool Functionality'
                type="text"
                id="deskripsi"
                name="deskripsi"
                onChange={handleChange}
                value={formData.deskripsi}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full min-h-5"            
              ></textarea>
            </div>

            <div className="flex mb-4 gap-5">
              <label htmlFor="require_double_verification" className="block text-left text-sm font-semibold font-poppins">
                Double Verification
              </label>
              <input
                type="checkbox"
                id="require_double_verification"
                name="require_double_verification"
                onChange={handleChange}
                checked={formData.require_double_verification}
                className="p-2.5 border border-gray-300 rounded-md"
              />
              <label className="block text-left text-sm font-semibold font-poppins">
                Iya
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-left text-sm font-semibold font-poppins">
                type alat
              </label>
              <select  
                name="type" 
                id="type" 
                value={formData.type}  
                onChange={handleChange} 
                className="mt-1 p-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
                >
                    <option value="lab">Alat Laboratorium</option>
                    <option value="multimedia">Alat Multimedia</option>
                    
                </select>
            </div>
            <div className="mb-4">
              <label htmlFor="pengelola" className="block text-left text-sm font-semibold font-poppins">
                Nomor WhatsApp Pengelola
              </label>
              <input
                placeholder='Nomor WhatsApp cont: 62822..'
                type="text"
                id="pengelola"
                name="pengelola"
                onChange={handleChange}
                value={formData.pengelola} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            
            </div>

            </div>
    
            <div className="flex flex-row-reverse space-x-3 space-x-reverse">
                        <button 
                            type="submit" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >Save</button>
                        <button 
                            type="button" 
                            onClick={() => navigate("/inventaris-alat")}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >Cancel</button>
            </div>
          </form>
          <ToastContainer />
        </div>
        </>
    );
};

export default EditFormTool;