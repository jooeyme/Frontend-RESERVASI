import React, { useState } from "react";
import { generatePDF } from "../../modules/fetch/letter";

const formNames = {
    KOLO: 'form blanko kolokium',
    SEMI: 'percobaan5',
}

const FormGeneratePDF = () => {
    const [formName, setFormName] = useState('');
    const [nim, setNim] = useState('');
    const [pdfUrl, setPDFUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await generatePDF(formName, nim);
            const url = window.URL.createObjectURL(response);
            setPDFUrl(url);
        } catch (error) {
            console.error('Error generating PDF', error);
        }
    }


    return (
        <>
        <form onSubmit={handleSubmit} className='border border-gray-300 rounded mx-auto max-w-6xl w-full my-5 inputs space-y-6'>
            <div className="flex flex-col md:flex-row gap-y-0 gap-x-4">
                <div className='w-full md:w-1/2 p-4 pl-10'>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Form Name:
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={formName.formNames} 
                            onChange={(e) => setFormName(e.target.value)}>
                            <option value={null}>pilih surat</option>  
                            <option value={formNames.KOLO}>Kolokium</option>
                            <option value={formNames.SEMI}>Seminar</option>
                            
                        </select>
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
            </div>
        )}
        </>
    )
}

export default FormGeneratePDF;