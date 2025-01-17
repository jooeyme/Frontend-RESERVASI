import React, { useState, useEffect } from 'react';
import FileUpload from '../components/form/fileUpload';
import FileList from '../components/table/ListFile';
import { getFile } from '../modules/fetch/file';

const ListFile = () => {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        try {
            const response = await getFile();
            setFiles(response);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = (newFile) => {
        setFiles([...files, newFile]);
    };

    return (
        <div>
            <h1>PDF Upload</h1>
            <FileUpload onUpload={handleUpload} />
            <FileList files={files} />
        </div>
    );
};

export default ListFile;
