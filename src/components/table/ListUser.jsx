import React, { useState, useEffect} from "react";
import { Tabs } from "flowbite-react";
import { HiUserCircle, HiOutlineTrash, HiOutlinePencilAlt, HiUserAdd } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { getUser, deleteUser } from "../../modules/fetch/user";
import { getAdmin, deleteAdmin } from "../../modules/fetch/admin";
import TambahAdmin from "../form/formAddAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const UserList = () => {
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [isOpen, setIsOpen] = useState(false); 

    const handleCloseClick = () => {
        setIsOpen(false); 
    };

    const handleOpenClick = () => {
        setIsOpen(true);
    }

    const handleDeleteUser = async (id) => {
        Swal.fire({
          title: 'Konfirmasi Penghapusan',
          text: 'Apakah Anda yakin ingin menghapus data User ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, Hapus',
          cancelButtonText: 'Batal'
      }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                await deleteUser(id);
                setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
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
      //ALERT DELETE ADMIN
      const handleDeleteAdmin = async (id) => {
        Swal.fire({
          title: 'Konfirmasi Penghapusan',
          text: 'Apakah Anda yakin ingin menghapus data Admin ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, Hapus',
          cancelButtonText: 'Batal'
      }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                await deleteAdmin(id);
                setAdmin((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
                toast.success('Data Admin berhasil dihapus.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000 
                });
            } catch (error) {
                console.error("Error deleting Tool:", error.message);
                toast.error('Gagal menghapus Admin. Silahkan coba lagi.', { 
                  position: 'top-center',
                  hideProgressBar: true,
                  autoClose: 3000
                });
            } 
          }
        })
      };

    useEffect(() => {
        try {
            const fetchDataUser = async() => {
                const resultUser = await getUser();
                console.log(resultUser.data);
                setUser(resultUser.data);
                const resultAdmin =await getAdmin();
                console.log(resultAdmin.data);
                setAdmin(resultAdmin.data);
            }
            fetchDataUser();
        } catch (error) {
            console.log("Error fetching User", error)
        }
    },[])



    return (
        <div>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item active title="User" icon={HiUserCircle}>
                <div className="items-center justify-center">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                                <tr className="bg-blue-gray-400 text-gray-700">
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        NIM
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {user.map((user, index) => (
                                    <tr 
                                    key={index} 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <td className="py-3 px-4">
                                        {index + 1}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.username}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4">J0303211144</td>
                                        <td className="flex py-3 px-4">
                                            <a href="#" className="text-blue-600 hover:text-blue-800"><HiOutlinePencilAlt size={30}/></a>
                                            <button 
                                                onClick={() =>handleDeleteUser(user.id)}
                                                className="text-red-600 hover:text-red-800 px-2">
                                                <HiOutlineTrash size={30} />
                                            
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                </Tabs.Item>
                <Tabs.Item title="Admin" icon={MdDashboard}>
                <div className="items-center justify-center">
                    <div className="flex items-end justify-end">
                        <button 
                            type="button" 
                            onClick={handleOpenClick}
                            className="flex  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <HiUserAdd size={20}/>Tambah Admin
                        </button>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3">
                    
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                            <tr className="bg-blue-gray-400 text-gray-700">
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">Nama</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                        {admin.map((admin, index) => (
                            <tr 
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                            <td className="py-3 px-4">
                                {index + 1}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {admin.username_admn}
                            </td>
                            <td className="py-3 px-4">
                                {admin.email_admn}
                            </td>
                            <td className="py-3 px-4">
                                {admin.role}
                            </td>
                            <td className="flex py-3 px-4">
                                <a href="#" className="text-blue-600 hover:text-blue-800"><HiOutlinePencilAlt size={30}/></a>
                                <button 
                                    onClick={()=> handleDeleteAdmin(admin.id)}
                                    className="text-red-600 hover:text-red-800 px-2">
                                    <HiOutlineTrash size={30} />
                                </button>
                            </td>
                            </tr>
                            ))}
                            
                        </tbody>
                        </table>
                    
                    </div>
                    {isOpen && 
                        <div className="fixed top-0 left-0 w-full h-full items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
                            <TambahAdmin 
                            isOpen={isOpen} 
                            handleCloseClick={handleCloseClick}
                            />
                        </div>
                        }
                    </div>
                </Tabs.Item>
            </Tabs>
        <ToastContainer />
    </div>
    )
}

export default UserList;