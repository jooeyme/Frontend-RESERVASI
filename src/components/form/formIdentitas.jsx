import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findPegawaibyId, editIdentitas, editJabatan, editPNS, editPangkat } from '../../modules/fetch/pegawai';

const gender = {
    L: 'Laki-laki',
    P: 'Perempuan',
}

const IdentitasformCard = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        NIP: '',
        KPE: '',
        NIDN: '',
        agama: '',
        gender: '',
        nokarpeg: '',
        lahir: '',
        ttl: '',
        umur: '',
    })

    const handleChange = (e) => {
        console.log("Handling change:", e.target.name, e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await editIdentitas(id, formData);
    
            console.log("profil updated");
            toast.success("profil updated", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 3000,
            });

            //setTimeout(() => {
            //    navigate("/joblist");
            //}, 2000);
        } catch (error) {
            console.error("Error updating profil:", error.message);
            toast.error(`Error updating profil: ${error.message}`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 5000,
            });
        }
    };

    useEffect(() => {
        const fetchUpdateProfil = async () => {
            try {
            const response = await findPegawaibyId(id)
            const pegawai = response.data;
            setFormData({
                name: pegawai.name,
                NIP: pegawai.NIP,
                KPE: pegawai.KPE,
                NIDN: pegawai.NIDN,
                agama: pegawai.agama,
                gender: pegawai.gender,
                nokarpeg: pegawai.nokarpeg,
                lahir: pegawai.lahir,
                ttl: pegawai.ttl,
                umur: pegawai.umur,
            });
            } catch (error) {
            console.error("Error fetching profil pegawai data:", error.message);
            }
        };
    
        fetchUpdateProfil();
    }, []);

    
    
  return (
    <>
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6" >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
            <div>
                <label htmlFor="name" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Lengkap
                </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"  
                    value={formData.name} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    placeholder="Nama Lengkap" 
                    required />
            </div>
            <div>
                <label htmlFor="NIP" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    NIP
                </label>
                <input 
                    type="text" 
                    name="NIP"
                    id="NIP" 
                    value={formData.NIP} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    placeholder="Nomor Induk Pegawai" 
                    required />
            </div>
            <div>
                <label htmlFor="KPE" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kontak Penanggungjawab</label>
                <input 
                    type="text" 
                    name="KPE" 
                    id="KPE" 
                    value={formData.KPE} 
                    onChange={handleChange}
                    placeholder="KPE" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div>
                <label htmlFor="NIDN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Reservasi</label>
                <input 
                    type="text" 
                    name="NIDN" 
                    id="NIDN" 
                    value={formData.NIDN}  
                    onChange={handleChange}
                    placeholder="NIDN" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div>
                <label htmlFor="agama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu mulai</label>
                <input 
                    type="text" 
                    name="agama" 
                    id="agama" 
                    value={formData.agama}   
                    onChange={handleChange}
                    placeholder="agama" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required />
            </div>

            <div>
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu selesai</label>
                <select 
                    name="gender" 
                    id="gender"  
                    value={formData.gender}    
                    onChange={handleChange} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                    required >

                        <option value={gender.L}>Laki-laki</option>
                        <option value={gender.P}>Perempuan</option>

                    </select>
            </div>
            <div>
                <label htmlFor="nokarpeg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    NOKARPEG
                </label>
                <input 
                    type="text" 
                    name="nokarpeg"
                    id="nokarpeg" 
                    value={formData.nokarpeg} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    placeholder="Nomor karppeg" 
                    required />
            </div>
            <div>
                <label htmlFor="lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    tempat lahir
                </label>
                <input 
                    type="text" 
                    name="lahir"
                    id="lahir" 
                    value={formData.lahir} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    placeholder="tempat lahir" 
                    required />
            </div>
            <div>
                <label htmlFor="ttl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    tanggal lahir
                </label>
                <input 
                    type="date" 
                    name="ttl"
                    id="ttl" 
                    value={formData.ttl} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    placeholder="tanggal lahir" 
                    required />
            </div>
            <div>
                <label htmlFor="umur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Umur
                </label>
                <input 
                    type="number" 
                    name="umur"
                    id="umur" 
                    value={formData.umur} 
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"    
                    
                    required />
            </div>

            <button 
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Kirim
            </button>
            
        </form>
        <ToastContainer/>
    </div>

    
    

    </>
  );
};

export default IdentitasformCard;