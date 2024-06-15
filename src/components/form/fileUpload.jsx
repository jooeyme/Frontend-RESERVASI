import React, { useState } from 'react';
import { fileUpload } from '../../modules/fetch/file';

const FileUpload = ({ onUpload }) => {
    const [pdfFile, setpdfFile] = useState(null);

    const handleFileChange = (e) => {
        setpdfFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);

        try {
            const response = await fileUpload(formData);
            console.log(response)
            onUpload(response);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
        <div className='flex justify-center'>
            <label
                className="flex max-w-sm cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                tabIndex="0">
                <span htmlFor="photo-dropbox" className="flex items-center space-x-2">
                    <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                    <path
                        d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"></path>
                    <path
                        d="M80,128a80,80,0,1,1,144,48"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"></path>
                    <polyline
                        points="118.1 161.9 152 128 185.9 161.9"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"></polyline>
                    <line
                        x1="152"
                        y1="208"
                        x2="152"
                        y2="128"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="24"></line>
                    </svg>
                    <span className="text-xs font-medium text-gray-600">
                    Drop files to Attach, or 
                    <span className="text-blue-600 underline">browse</span>
                    </span>
                </span>
                <input id="photo-dropbox" type="file" className="sr-only" onChange={handleFileChange} />
            </label>
        
            
        </div>
        <button 
            onClick={handleUpload}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >Upload</button>
        </div>
    );
};

export default FileUpload;
