import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editRoom, showRoomById } from '../modules/fetch/rooms/index';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditFormRoom = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState("");
    const [preview, setPreview] = useState("");
    const [existingImageURL, setExistingImageURL] = useState(null);
    const [formData, setFormData] = useState({
      room_id: '',
      name_room: '',
      alamat_room: '',
      kapasitas: '',
      luas: '',
      deskripsi_room: '',
      fasilitas: '',
      gambar_room: null,
      require_double_verification: false,
      type: ''
    
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
      setFormData({ ...formData, gambar_room: e.target.files[0] });
        setSelectedFile( {gambar_room: e.target.files[0]});
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
        formdata.append('gambar_room', selectedFile);

        try {
            await editRoom(id, formData);
            
            toast.success('Room successfully Edit', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
            });

            setTimeout(() => {
                navigate("/inventaris-room");
            }, 2000);

        } catch (error) {
            console.error('Error Edit Room:', error.message);
            toast.error('Error Edit Room', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 5000
            });
        }
      };
    
      useEffect(() => {
        const fetchUpdateRoom = async () => {
            try {
                const response = await showRoomById(id);
                const roomData = response.data;

                setFormData({
                    room_id: roomData.room_id,
                    name_room: roomData.name_room,
                    alamat_room: roomData.alamat_room,
                    kapasitas: roomData.kapasitas,
                    luas: roomData.luas,
                    deskripsi_room: roomData.deskripsi_room,
                    fasilitas: roomData.fasilitas,
                    gambar_room: roomData.gambar_room,
                    require_double_verification: roomData.require_double_verification,
                    type: roomData.type
                })
                if (roomData.gambar_room) {
                  setExistingImageURL(roomData.gambar_room); // Set existing image URL
                }
            } catch (error) {
                console.error("Error fetching room data:", error.message);
            }
        };
        fetchUpdateRoom();
      },[]);
      

    return (
      <>
      <div>
        <div className="py-4 mt-10">
            <h1 className="text-2xl text-center font-bold">Edit Ruangan</h1>
        </div>
          <form onSubmit={handleFormSubmit} className='border border-gray-300 rounded mx-auto max-w-6xl w-full my-4 inputs space-y-6' >
            <div className="flex flex-col md:flex-row gap-y-0 gap-x-4">
              <div className='w-full md:w-1/2 p-4 pl-10'>
            <div className="mb-4">
              <label htmlFor="room_id" className="block text-left text-sm font-semibold font-poppins">
                Id Ruangan
              </label>
              <input
                placeholder='id room'
                type="text"
                id="room_id"
                name="room_id"
                onChange={handleChange}
                value={formData.room_id} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name_room" className="block text-left text-sm font-semibold font-poppins">
                Nama Ruangan
              </label>
              <input
                placeholder='Room Name'
                type="text"
                id="name_room"
                name="name_room"
                onChange={handleChange}
                value={formData.name_room} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alamat_room" className="block text-left text-sm font-semibold font-poppins">
                Lokasi/Alamat
              </label>
              <input
                placeholder='Room Address'
                type='text'
                id="alamat_room"
                name="alamat_room"
                onChange={handleChange}
                value={formData.alamat_room}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
              <label htmlFor="kapasitas" className="block text-left text-sm font-semibold font-poppins">
                Kapasitas Ruangan
              </label>
              <input
                placeholder='Maxs Room Capacity'
                type="text"
                id="kapasitas"
                name="kapasitas"
                onChange={handleChange}
                value={formData.kapasitas}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="luas" className="block text-left text-sm font-semibold font-poppins">
                Luas Ruangan
              </label>
              <input
                placeholder='Room Wide'
                type="text"
                id="luas"
                name="luas"
                onChange={handleChange}
                value={formData.luas}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gambar_room" className="block text-left text-sm font-semibold font-poppins">
                Gambar Ruangan
              </label>
              {existingImageURL && (
              <div className="existing-image">
                <img src={`${BASE_URL}/images/${existingImageURL}`} alt="Existing Image" />
              </div>
              )}

              <input
                type="file"
                id="gambar_room"
                accept='image/**'
                name='gambar_room'
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
              <label htmlFor="deskripsi_room" className="block text-left text-sm font-semibold font-poppins">
                Deskripsi Ruangan
              </label>
              <textarea
                placeholder='Room Functionality'
                type="text"
                id="deskripsi_room"
                name="deskripsi_room"
                onChange={handleChange}
                value={formData.deskripsi_room}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full min-h-5"
                
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="fasilitas" className="block text-left text-sm font-semibold font-poppins">
                Fasilitas Ruangan
              </label>
              <textarea
                placeholder='Room Facility'
                type="text"
                id="fasilitas"
                name="fasilitas"
                onChange={handleChange}
                value={formData.fasilitas}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                
              ></textarea>
            </div>
            <div className="flex mb-4 gap-5">
              <label htmlFor="require_double_verification" className="block text-left text-sm font-semibold font-poppins">
                Double Verification?
              </label>
              <input
                type="checkbox"
                id="require_double_verification"
                name="require_double_verification"
                onChange={handleChange}
                value={formData.require_double_verification}
                className="flex p-2.5 border border-gray-300 rounded-md align-end "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-left text-sm font-semibold font-poppins">
                Type alat
              </label>
              <select  
                name="type" 
                id="type" 
                value={formData.type}  
                onChange={handleChange} 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
                >
                    <option value="class">Ruang Kelas</option>
                    <option value="lab">Ruang Laboratorium</option>
                    <option value="meeting">Ruang Meeting</option>
                </select>
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
                            onClick={() => navigate("/inventaris-room")}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >Cancel</button>
            </div>
          </form>
          <ToastContainer />
        </div>
        </>
    );
};

export default EditFormRoom;