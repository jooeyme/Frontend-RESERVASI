import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRoom } from '../../modules/fetch/rooms/index';

const FormRoom = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
    const [formData, setFormData] = useState({
      room_id: '',
      name_room: '',
      alamat_room: '',
      kapasitas: '',
      luas: '',
      deskripsi_room: '',
      fasilitas: '',
      gambar_room: '',
    
    });


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
      setFormData({ ...formData, gambar_room: e.target.files[0] });
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
        formdata.append('gambar_room', formData.gambar_room);

        try {
            await createRoom(formData);

            setFormData({
                room_id: '',
                name_room: '',
                alamat_room: '',
                kapasitas: '',
                luas: '',
                deskripsi_room: '',
                fasilitas: '',
                gambar_room: '',

            });

            console.log('Room Added successfully');
            toast.success('Room Added successfully', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
            });

            setTimeout(() => {
              navigate("/inventaris-room");
          }, 2000);

        } catch (error) {
            console.error('Error Add Room:', error.message);
            toast.error('Error Add Room', {
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 5000
            });

        }
      };
      

    return (
      <>
      <div>
        <div className="bg-blue-100 py-4">
            <h1 className="text-2xl text-center font-bold">Tambah Ruangan</h1>
        </div>
          <form onSubmit={handleFormSubmit} className='border border-gray-300 rounded mx-auto max-w-6xl w-full my-5 inputs space-y-6' >
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
                onChange={handleInputChange}
                value={formData.room_id} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
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
                onChange={handleInputChange}
                value={formData.name_room} 
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
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
                onChange={handleInputChange}
                value={formData.alamat_room}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
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
                onChange={handleInputChange}
                value={formData.kapasitas}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
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
                onChange={handleInputChange}
                value={formData.luas}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gambar_room" className="block text-left text-sm font-semibold font-poppins">
                Gambar Ruangan
              </label>
              
              <input
                type="file"
                id="gambar_room"
                accept='image/**'
                name='gambar_room'
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
              <label htmlFor="deskripsi_room" className="block text-left text-sm font-semibold font-poppins">
                Deskripsi Ruangan
              </label>
              <textarea
                placeholder='Room Functionality'
                type="text"
                id="deskripsi_room"
                name="deskripsi_room"
                onChange={handleInputChange}
                value={formData.deskripsi_room}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full min-h-5"
                required
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
                onChange={handleInputChange}
                value={formData.fasilitas}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              ></textarea>
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

export default FormRoom;