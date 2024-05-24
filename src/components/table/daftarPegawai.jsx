import React, {useEffect, useState} from "react";
import { findAllPegawai } from "../../modules/fetch/pegawai";
import { Link, useParams, useNavigate } from "react-router-dom";
import IdentitasformCard from "../form/formIdentitas";

const PegawaiList = () => {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [pegawai, setPegawai] = useState([])
    
    useEffect(() => {
        try {
            const fetchPegawai = async () => {
                const response = await findAllPegawai();
                console.log(response.data);
                const DataPegawai = (response.data);
                

                setPegawai(DataPegawai);
            }
            fetchPegawai()
        } catch (e) {
            console.log("Error fetching Pegawai", e)
        }
    }, [])

    
    

    const formatUpdatedAt = (updatedAt) => {
//        const date = new Date(updatedAt);
      
        // Mendapatkan tanggal dalam format YYYY-MM-DD
//        const formattedDate = date.toISOString().split('T')[0];
        
//        return formattedDate;
        
    };


    



    return (

        <div>
            <div className="bg-blue-100 py-4 mt-10">
                <h1 className="text-2xl text-center font-bold">Pegawai List</h1>
            </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
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

    )
}

export default PegawaiList;