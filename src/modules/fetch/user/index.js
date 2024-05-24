import { instance } from "../../axios";

async function getUser() {
    try {
        const response = await instance.get('user/')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateUser(id, formData) {
    try {
        const response = await instance.patch(`/user/edit/${id}`, formData)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteUser(id) {
    try {
        const response = await instance.delete(`/user/delete/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { getUser, updateUser, deleteUser }