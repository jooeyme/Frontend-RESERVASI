import React from 'react';
import Modal from 'react-modal';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
const BASE_URL = import.meta.env.VITE_BASE_URL;
Modal.setAppElement('#root');

const FileViewer = ({ file, isOpen, onClose  }) => {
    if (!file) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="File Viewer"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000, // Adjust this value to set the overlay z-index
                },
                content: {
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: 'auto',
                    //marginRight: '-50%',
                    //transform: 'translate(-50%, -50%)',
                    zIndex: 1001, // Adjust this value to set the modal content z-index
                },
            }}
        >
            <button onClick={onClose} style={{ float: 'right', marginBottom: '10px' }}>
                <svg className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div style={{ height: '600px' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                    <Viewer fileUrl= {`${BASE_URL}/${file}`} />
                </Worker>
            </div>
        </Modal>
    );
};

export default FileViewer;