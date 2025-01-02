import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { findPegawaibyId } from "../../modules/fetch/pegawai";
import ListDocument from "../table/documentList";
import {
  getDocumentsByEmployeeId,
} from "../../modules/fetch/document";
import { Avatar  } from "flowbite-react";
import { ChevronLeftIcon } from '@heroicons/react/solid'



const IdentitasformCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState([]);
  const [detail, setDetail] = useState({});
  const [nip, setNip] = useState("");

  useEffect(() => {
    const fetchUpdateProfil = async () => {
      try {
        const pegawai = await findPegawaibyId(id);
        const nip = pegawai.data.NIP;
        setNip(nip);
        setDetail(pegawai.data);
        console.log('detail:', pegawai.data);
        const response = await getDocumentsByEmployeeId(nip);
        console.log('response:', response);
        setDocument(response.data);
        //console.log("document:", response.data);
      } catch (error) {
        console.error("Error fetching profil pegawai data:", error.message);
      }
    };

    fetchUpdateProfil();
  }, [id]);

  console.log("document:", document);
  return (
    <>
    <div className="flex justify-start">
                            <Link to={`/daftar-pegawai`}
                            className="flex items-center justify-center">
                        <button
                            type="button"
                            className="-my-1.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true"/>
                        </button>
                        </Link>
                        <h2 className="flex text-xl font-bold text-gray-900 dark:text-white">Detail Pegawai</h2>
                        </div>
      <div className="flex justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center py-10">
            <Avatar rounded size="lg"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {detail.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {detail.jabatan}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {detail.NIP}
            </span>
            <div className="flex mt-4 md:mt-6 gap-8">
            <button 
                    type="button" 
                    onClick={() => navigate(``)}
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mb-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Detail</button>
              <button 
                    type="button" 
                    onClick={() => navigate(`/edit-pegawai/${id}`)}
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Edit</button>
            </div>
          </div>
        </div>
      </div>

      <ListDocument file={document} nip={nip}/>
      <ToastContainer/>
    </>
  );
};

export default IdentitasformCard;
