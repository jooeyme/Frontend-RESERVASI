import React from 'react';
import { HiUserCircle, HiOutlineTrash, HiOutlinePencilAlt, HiUserAdd } from "react-icons/hi";


const FileList = ({ files }) => {
    return (
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
                                        dept
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        surat
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                            {files.map((file, index) => (
                                    <tr 
                                    key={index} 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <td className="py-3 px-4">
                                        {index + 1}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {file.User.username}
                                        </td>
                                        <td className="py-3 px-4">
                                            {file.User.dept}
                                        </td>
                                        <td className="py-3 px-4">
                                            <a href={`http://localhost:3000${file.path}`} target="_blank" rel="noopener noreferrer">
                                                {file.nama}
                                            </a>
                                        </td>
                                        <td className="flex py-3 px-4">
                                            <a href="#" className="text-blue-600 hover:text-blue-800"><HiOutlinePencilAlt size={30}/></a>
                                            <button 
                                                //onClick={() =>handleDeleteUser(user.id)}
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
    );
};

export default FileList;
