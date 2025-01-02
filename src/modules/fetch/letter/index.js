import { instance } from "../../axios";

async function reqLetters(formName, nim, formData){
    try {
        const response = await instance.post('/pdf/reqLetter', { formName, nim, formData }, { responseType: 'blob' });
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getAllReq() {
    try {
        const response = await instance.get('/pdf/all');
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function generatePDF(formName, nim) {
    try {
        const response = await instance.post('/pdf/generate-pdf', { formName, nim}, { responseType: 'blob'});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { reqLetters, generatePDF, getAllReq }