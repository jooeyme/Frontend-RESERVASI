import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAlat } from '../../modules/fetch/alat/index';

const FormAlat = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState("");
    const [formData, setFormData] = useState({
        tool_id: '',
        name_tool: '',
        alamat_tool: '',
        kondisi: '',
        jumlah: '',
        deskripsi: '',
        gambar_tool: '',
        require_double_verification: false,
        type: '',
        pengelola: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            gambar_tool: e.target.files[0],
        });
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target.result); // Set preview image URL
        };
        reader.readAsDataURL(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('gambar_tool', formData.gambar_tool);

        try {
            await createAlat(formData);

            setFormData({
                tool_id: '',
                name_tool: '',
                alamat_tool: '',
                kondisi: '',
                jumlah: '',
                deskripsi: '',
                gambar_tool: '',
                require_double_verification: false,
                type: '',
                pengelola: '',
            });

            toast.success('Tool Added successfully', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
            });

            setTimeout(() => {
                navigate("/inventaris-alat");
            }, 2000);

        } catch (error) {
            console.error('Error Add Tool:', error.message);
            toast.error('Error Add Tool', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 5000
            });

        }
      };
      

    return (
      <>
      <div>
        <div class="bg-blue-100 py-4 mt-10">
            <h1 class="text-2xl text-center font-bold">Tambah Alat</h1>
        </div>
        <form onSubmit={handleFormSubmit} className='border border-gray-300 rounded mx-auto max-w-6xl w-full my-5 inputs space-y-6' >
            <div className="flex flex-col md:flex-row gap-y-0 gap-x-4">
                <div className='w-full md:w-1/2 p-4 pl-10'>
                    <div className="mb-4">
                        <label htmlFor="room_id" className="block text-left text-sm font-semibold font-poppins">
                            Id Alat
                        </label>
                        <input
                            placeholder='id tool'
                            type="text"
                            id="tool_id"
                            name="tool_id"
                            onChange={handleInputChange}
                            value={formData.tool_id} 
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name_tool" className="block text-left text-sm font-semibold font-poppins">
                            Nama Alat
                        </label>
                        <input
                            placeholder='Tool Name'
                            type="text"
                            id="name_tool"
                            name="name_tool"
                            onChange={handleInputChange}
                            value={formData.name_tool} 
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="alamat_tool" className="block text-left text-sm font-semibold font-poppins">
                            Lokasi/Alamat penyimpanan
                        </label>
                        <input
                            placeholder='Tool Address'
                            id="alamat_tool"
                            name="alamat_tool"
                            onChange={handleInputChange}
                            value={formData.alamat_tool}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Kondisi" className="block text-left text-sm font-semibold font-poppins">
                            Kondisi Alat
                        </label>
                        <input
                            placeholder='Tool Condition'
                            type="text"
                            id="kondisi"
                            name="kondisi"
                            onChange={handleInputChange}
                            value={formData.kondisi}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="jumlah" className="block text-left text-sm font-semibold font-poppins">
                            Jumlah Alat
                        </label>
                        <input
                            placeholder='Total Tool '
                            type="text"
                            id="jumlah"
                            name="jumlah"
                            onChange={handleInputChange}
                            value={formData.jumlah}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gambar_tool" className="block text-left text-sm font-semibold font-poppins">
                            Gambar Alat
                        </label>
                        <input
                            type="file"
                            id="gambar_tool"
                            accept='image/**'
                            name="gambar_tool"
                            onChange={handleImageChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                            required
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
                            onChange={handleInputChange}
                            value={formData.deskripsi_tool}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full min-h-5"
                            required
                        />
                    </div>

                    <div className="flex mb-4 gap-5">
                        <label htmlFor="require_double_verification" className="block text-left text-sm font-semibold font-poppins">
                            Double Verification
                        </label>
                        <input
                            type="checkbox"
                            id="require_double_verification"
                            name="require_double_verification"
                            onChange={handleInputChange}
                            value={formData.require_double_verification}
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
                            onChange={handleInputChange} 
                            className="mt-1 p-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                            >
                                <option value="">-- Pilih jenis alat --</option>
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
                                onChange={handleInputChange}
                                value={formData.pengelola} 
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                </div>

            </div>
    
            <div className="flex flex-row-reverse space-x-3 space-x-reverse">
              <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add Tool
              </button>
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

export default FormAlat;