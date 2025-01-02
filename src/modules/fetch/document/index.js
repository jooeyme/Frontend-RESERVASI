import { instance } from "../../axios";

async function getAllDocuments() {
    try {
        const result = await instance.get(`/doc`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getDocumentsByEmployeeId(nip) {
    try {
        const result = await instance.get(`/doc/employee/${nip}`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createDocument(formData ) {
    try {
        const result = await instance.post(`/doc/add-doc`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }});
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateDocument(id) {
    try {
        const result = await instance.patch(`/doc/edit/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteDocument(id) {
    try {
        const result = await instance.delete(`/doc/delete/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAllDocuments, getDocumentsByEmployeeId, createDocument, updateDocument, deleteDocument}