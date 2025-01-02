import React, { useState, useEffect} from "react";
import { Tabs, Label, TextInput, Modal } from "flowbite-react";
import { HiUserCircle, HiOutlineTrash, HiOutlinePencilAlt, HiUserAdd } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { getUser, deleteUser, updateUser, getUserById } from "../../modules/fetch/user";
import { getAdmin, deleteAdmin, updateAdmin, getAdminById } from "../../modules/fetch/admin";
import TambahAdmin from "../form/formAddAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const UserList = () => {
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [isOpen, setIsOpen] = useState(false); 
    const [formDatauser, setFormDatauser] = useState({
        username: "",
        email: "",
        password: "",
        NIM: "",
        dept: ""
    })
    const [formDataadmin, setFormDataadmin] = useState({
        username_admn: "",
        email_admn: "",
        password: "",
        role: ""
    })
    const [openModal, setOpenModal] = useState(false);
    const [openModal1, setOpenModal1] = useState(false);
    const [id, setId] = useState("");

    const handleChangeAdmin = () => {
        setFormDataadmin({
            ...formDataadmin,
            [e.target.name]: e.target.value,
        })
    }

    const handleEditAdminClick = async(id) => {
        try {
            // Fetch admin data
            const responseAdmin = await getAdminById(id);
            const admin = responseAdmin.data;

            // Set state for admin form
            setFormDataadmin({
            username_admn: admin.username_admn, // Corrected typo
            email_admn: admin.email_admn,
            password: admin.password,
            role: admin.role,
            });

        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    const handleSubmitAdmin = async (e) => {
        e.preventDefault();
        const formData = formDataadmin
        try {
            console.log("data:", formData);
            await updateAdmin(id, formData);
            
            console.log("User successfully Edit");
            toast.success("User successfully Edit", {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 3000,
            });

        } catch (error) {
            console.error("Error Edit User:", error.message);
            toast.error("Error Edit User", {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 5000,
            });
    }}

    const handldeChangeUsers = (e) => {
        setFormDatauser({
            ...formDatauser,
            [e.target.name]: e.target.value,
        })
    }

    const handleEditUserClick = async(id) => {
        try {
            // Fetch user data
            const responseUser = await getUserById(id);
            const user = responseUser.data;

            // Debugging output
            console.log("user:", user);
            setId(user.id);

            // Set state for user form
            setFormDatauser({
            username: user.username,
            email: user.email,
            password: user.password,
            NIM: user.NIM,
            dept: user.dept,
            });


        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        const formData = formDatauser
        try {
            console.log("data:", formData);
            await updateUser(id, formData);
            
            console.log("User successfully Edit");
            toast.success("User successfully Edit", {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 3000,
            });

        } catch (error) {
            console.error("Error Edit User:", error.message);
            toast.error("Error Edit User", {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 5000,
            });
    }}

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
        const fetchDataUser = async() => {
            try {
                    const resultUser = await getUser();
                    console.log(resultUser.data);
                    setUser(resultUser.data);
                    const resultAdmin =await getAdmin();
                    console.log(resultAdmin.data);
                    setAdmin(resultAdmin.data);
                
            } catch (error) {
                console.log("Error fetching User", error)
            }}
        fetchDataUser();
    },[])



    return (
        <div>
            <div className="py-4 mb-4">
                <h1 className="text-2xl text-center font-bold">Pengelolaan User</h1>
            </div>
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
                                            <a onClick={() => {setOpenModal(true), handleEditUserClick(user.id)}} className="text-blue-600 hover:text-blue-800"><HiOutlinePencilAlt size={30}/></a>
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
                        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                                                        <Modal.Header>
                                                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            Edit User
                                                          </h3>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                          <form onSubmit={handleSubmitUser} className="p-4 md:p-5">
                                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                              <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="username" value="Username"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="username"
                                                                          name="username"
                                                                          type="text"
                                                                          placeholder="nama"
                                                                          value={formDatauser.username}
                                                                          onChange={handldeChangeUsers}
                                                                          required
                                                                          
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="email" value="Email"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="email"
                                                                          name="email"
                                                                          type="text"
                                                                          placeholder="email"
                                                                          value={formDatauser.email}
                                                                          onChange={handldeChangeUsers}
                                                                          required
                                                                          
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="password" value="Password"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="password"
                                                                          name="password"
                                                                          type="text"
                                                                          placeholder="password"
                                                                          value={formDatauser.password}
                                                                          onChange={handldeChangeUsers}
                                                                          require
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="NIM" value="NIM"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="NIM"
                                                                          name="NIM"
                                                                          type="text"
                                                                          placeholder="NIM"
                                                                          value={formDatauser.NIM}
                                                                          onChange={handldeChangeUsers}
                                                                          required
                                                                          
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="dept" value="Departemen"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="dept"
                                                                          name="dept"
                                                                          type="text"
                                                                          placeholder="dept"
                                                                          value={formDatauser.dept}
                                                                          onChange={handldeChangeUsers}
                                                                          required
                                                                          
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
                                <a onClick={() => {setOpenModal1(true), handleEditAdminClick(admin.id)}} className="text-blue-600 hover:text-blue-800"><HiOutlinePencilAlt size={30}/></a>
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
                        <Modal dismissible show={openModal1} onClose={() => setOpenModal1(false)}>
                                                        <Modal.Header>
                                                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            Edit Admin
                                                          </h3>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                          <form onSubmit={handleSubmitAdmin} className="p-4 md:p-5">
                                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                              <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="username_admn" value="Username"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="username_admn"
                                                                          name="username_admn"
                                                                          type="text"
                                                                          placeholder="nama"
                                                                          value={formDataadmin.username_admn}
                                                                          onChange={handleChangeAdmin}
                                                                          required
                                                                          
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="email_admn" value="Email"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="email_admn"
                                                                          name="email_admn"
                                                                          type="text"
                                                                          placeholder="email"
                                                                          value={formDataadmin.email_admn}
                                                                          onChange={handleChangeAdmin}
                                                                          required
                                                                          
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="password" value="Password"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="password"
                                                                          name="password"
                                                                          type="text"
                                                                          placeholder="password"
                                                                          value={formDatauser.password}
                                                                          onChange={handldeChangeUsers}
                                                                          require
                                                                        />
                                                                      </div>
                                                                      <div >
                                                                        <div className="mb-2 block">
                                                                          <Label htmlFor="role" value="role"  />
                                                                        </div>
                                                                      <TextInput
                                                                          id="role"
                                                                          name="role"
                                                                          type="text"
                                                                          placeholder="role"
                                                                          value={formDataadmin.role}
                                                                          onChange={handleChangeAdmin}
                                                                          required
                                                                          
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