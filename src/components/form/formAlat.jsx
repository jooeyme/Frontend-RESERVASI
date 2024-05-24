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
            });

            console.log('Tool Added successfully');
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
                        <label htmlFor="deskripsi_tool" className="block text-left text-sm font-semibold font-poppins">
                            Deskripsi Alat
                        </label>
                        <textarea
                            placeholder='Tool Functionality'
                            type="text"
                            id="deskripsi_tool"
                            name="deskripsi_tool"
                            onChange={handleInputChange}
                            value={formData.deskripsi_tool}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full min-h-5"
                            required
                        />
                    </div>
                </div>

            </div>
    
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 font-poppins text-white p-2 rounded-md">
                    Add Room
                </button>
            </div>
        </form>
          <ToastContainer />
    </div>
    </>
    );
};

export default FormAlat;