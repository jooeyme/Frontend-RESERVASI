import React, { useState } from 'react';
import { reqLetters, getAllReq } from '../../modules/fetch/letter';
import FileViewer from '../fileViewer';




const FormReqLetter = (FormName) => {
    const [formName, setFormName] = useState('');
    const [nim, setNim] = useState('');
    const [formData, setFormData] = useState({});
    const [pdfUrl, setPdfUrl] = useState(null);
    const [path, setPath] = useState('')
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    
    
    const handleOpenClick = () => {
        setIsViewerOpen(true); // Update state to hide the card
        console.log("path:", path)
    };

    const handleCloseViewer = () => {
        setIsViewerOpen(false);
        setSelectedFile(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: { type: 'PDFTextField', data: value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await reqLetters(formName, nim, formData);
        const url = window.URL.createObjectURL(response);
        
        setPdfUrl(url);
        
        setPath(`application/${formName}-${nim}.pdf`);
        } catch (error) {
        console.error('Error saving fo rm data:', error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className='border border-gray-300 rounded mx-auto max-w-6xl w-full my-5 inputs space-y-6'>
            <div className="flex flex-col md:flex-row gap-y-0 gap-x-4">
                <div className='w-full md:w-1/2 p-4 pl-10'>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Form Name:
                        </label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formName.formNames} 
                            onChange={(e) => setFormName(FormName)}>
                            
                        </input>
                    </div>
            
                    <div className="mb-4">
                        <label className="block text-left text-sm font-semibold font-poppins">
                        NIM:
                        </label>
                        <input 
                            type="text" 
                            value={nim} 
                            onChange={(e) => 
                            setNim(e.target.value)} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-left text-sm font-semibold font-poppins">
                        Nama Lengkap:
                        </label>
                        <input 
                            type="text" 
                            name="FieldNama" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
                    
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        NRP:
                        </label>
                        <input 
                            type="text" 
                            name="FieldNRP" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
                    
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Hari:
                        </label>
                        <input 
                            type="text" 
                            name="FieldHari" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
                    
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Tanggal:
                        </label>
                        <input 
                            type="text" 
                            name="FieldTanggal" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
                </div>
                
                <div className='w-full md:w-1/2 p-4 pr-10'>
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Waktu:
                        </label>
                        <input 
                            type="text" 
                            name="FieldWaktu" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Tempat:
                        </label>
                        <input 
                            type="text" 
                            name="FieldTempat" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
            
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Topik:
                        </label>
                        <input 
                            type="text" 
                            name="FieldTopik" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Pembimbing 1:
                        </label>
                        <input 
                            type="text" 
                            name="FieldPembimbing1" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
            
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Pembimbing 2:
                        </label>
                        <input 
                            type="text" 
                            name="FieldPembimbing2" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
            
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Pembimbing 3:
                        </label>
                        <input 
                            type="text" 
                            name="FieldPembimbing3" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
            
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Tanggal Surat:
                        </label>
                        <input 
                            type="text" 
                            name="FieldTanggalSurat" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
            
                    <div className="mb-4">
                        <label className="flex items-start mb-1 font-semibold text-gray-700 dark:text-white">
                        Ketua Komisi:
                        </label>
                        <input 
                            type="text" 
                            name="FieldNRPKetuaKomisi" 
                            onChange={handleChange} 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                            required />
                    </div>
            
            <button 
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
            </button>
                </div>
            </div>
        </form>
        {pdfUrl && (
            <div>
            <a href={pdfUrl} download={`${formName}-filled.pdf`}>Download PDF</a>
            
            <button 
                type="button"
                onClick={() => handleOpenClick()}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    preview
            </button>
            </div>

            
        )}
        {path && 
                            <FileViewer 
                                file={path}
                                isOpen={isViewerOpen}
                                onClose={handleCloseViewer} 
                            />
                        }
        </div>
    );
    };

export default FormReqLetter;
