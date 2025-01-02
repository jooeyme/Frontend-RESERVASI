import { instance } from "../../axios";

async function fileUpload(formData) {
    try {
        const response = await instance.post('/file/upload', formData);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getFile(){
    try {
        const response = await instance.get('/file/all');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getFilesByUserId(){
    try {
        const response = await instance.get('/file');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteFile(id){
    try {
        const response = await instance.delete(`/file/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function SaveFile(id){
    try {
        const response = await instance.get(`/file/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {fileUpload, getFile, getFilesByUserId, deleteFile, SaveFile}