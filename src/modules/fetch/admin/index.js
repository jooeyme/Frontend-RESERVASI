import { instance } from "../../axios";

async function getAdmin () {
    try {
        const response = await instance.get('/admin')
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateAdmin (id, formData) {
    try {
        const response = await instance.patch(`/admin/edit/${id}`, formData)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function addAdmin (formData) {
    try {
        const response = await instance.post('/admin', formData)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}
async function deleteAdmin (id) {
    try {
        const response = await instance.delete(`/admin/delete/${id}`)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getAdmin, updateAdmin, addAdmin, deleteAdmin }