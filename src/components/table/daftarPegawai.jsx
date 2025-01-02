import React, {useEffect, useState} from "react";
import { findAllPegawai } from "../../modules/fetch/pegawai";
import { Link, useParams, useNavigate } from "react-router-dom";
import IdentitasformCard from "../form/formIdentitas";
import { createPegawai } from "../../modules/fetch/pegawai";
import { FaSearch } from "react-icons/fa";
import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { ToastContainer } from "react-toastify";

const gender = {
    Lakilaki : "Laki-laki",
    perempuan : "perempuan"
  }

const PegawaiList = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [originalPegawai, setOriginalPegawai] = useState([]);
    const [pegawai, setPegawai] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        NIP: '',
        agama: '',
        gender: '',
        umur: '',
      });
    const [openModal, setOpenModal] = useState(false);
      
    
    
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        // Filter data berdasarkan teks pencarian
        const filtered = originalPegawai.filter((item) =>
          item.name.toLowerCase().includes(query) ||
          item.jabatan.toLowerCase().includes(query)
        );
        setPegawai(filtered);
      };

    useEffect(() => {
        try {
            const fetchPegawai = async () => {
                const response = await findAllPegawai();
                console.log(response.data);
                const DataPegawai = (response.data);
                
                setOriginalPegawai(DataPegawai)
                setPegawai(DataPegawai);
            }
            fetchPegawai()
        } catch (e) {
            console.log("Error fetching Pegawai", e)
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // FormData untuk mengirim file dan data lainnya

        try {
          const newEmployee = await createPegawai(formData);
    
          setPegawai((prevEmployee) => [...prevEmployee, newEmployee.data]);
    
          setFormData({
            name: '',
            NIP: '',
            agama: '',
            gender: '',
            umur: '',
          });
    
          console.log("Employee Added successfully");
          toast.success("Employee Added successfully", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
          });
    
          setOpenModal(false);
        } catch (error) {
          console.error("Error Add Employee:", error.message);
          toast.error("Error Add Employee", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 5000,
          });
        }
      };
    

      const inputStyle = {
        WebkitAppearance: "none", // Untuk Chrome, Safari, dan Edge
        MozAppearance: "textfield", // Untuk Firefox
      };


    return (
        <>
        <div>
            <div className=" py-4 mt-10">
                <h1 className="text-2xl text-center font-bold">Pegawai List</h1>
            </div>

        
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
            
            
                <div className="flex mb-4 justify-between">
                <div className="flex max-w-sm px-4 py-2">
                <Button onClick={() => setOpenModal(true)}
                className="flex justify-start"
                >Tambah Pegawai</Button>
                </div>
                  <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Tambah Pegawai
                      </h3>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                          <div className="col-span-2">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Nama Lengkap 
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="nama lengkap"
                              required=""
                            />
                          </div>
                          <div className="col-span-2">
                            <div className="mb-2 block">
                                        <Label htmlFor="NIP" value="NIP" />
                                      </div>
                            <TextInput
                                        id="NIP"
                                        name="NIP"
                                        type="number"
                                        placeholder="NIP"
                                        value={formData.NIP}
                                        onChange={handleInputChange}
                                        style={inputStyle}
                                        required
                                        shadow
                                    />
                          </div>
                          <div className="col-span-2">
                            <div className="mb-2 block">
                                        <Label htmlFor="agama" value="Agama" />
                                      </div>
                                      <TextInput
                                        id="agama"
                                        name="agama"
                                        type="text"
                                        placeholder="agama"
                                        value={formData.agama}
                                        onChange={handleInputChange}
                                        required
                                        shadow
                                      />
                          </div>
                          <div className="col-span-2">
                            <div className="mb-2 block">
                                        <Label htmlFor="gender" value="Gender" />
                                      </div>
                                      <Select 
                                        id="gender" 
                                        name="gender"
                                        value={formData.gender} 
                                        onChange={handleInputChange}
                                        required
                                      >
                                        {Object.entries(gender).map(([key, value]) => (
                                        <option key={key} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                      </Select>
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="umur"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              umur
                            </label>
                            <input
                              type="text"
                              name="umur"
                              id="umur"
                              value={formData.umur}
                              onChange={handleInputChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="umur"
                              required=""
                            />
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
                                    placeholder="Cari pegawai"
                                    className="flex justify-end max-w-sm px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    icon={FaSearch}
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pangkat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                NIP/KPE
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Requirement
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3">
                                Description
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3">
                                Required Skill
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3">
                                Salary
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                No. Induk Dosen
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Detail
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {pegawai.map((pegawai, index) => (
                        <tr 
                            key={index} 
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                        <td className="px-6 py-4">
                            {index + 1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {pegawai.name}
                        </td>
                        <td className="px-6 py-4">
                            {pegawai.jabatan}
                        </td>
                        <td className="px-6 py-4">
                            {pegawai.NIP}/{pegawai.KPE}
                        </td>
                        <td className="px-6 py-4">
                            {pegawai.NIDN}
                        </td>
                        <td className="px-6 py-4">
                            <Link 
                                to={`/pegawai/${pegawai.id}`} 
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 22 22">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>

                            </Link>
                                
                        </td>
                    </tr>
                    ))}
                        
                    </tbody>
                </table>
            </div>
                
        </div>
        <ToastContainer/>
        </>

    )
}

export default PegawaiList;