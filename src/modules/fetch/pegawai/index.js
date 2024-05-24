import { instance } from "../../axios";


async function findAllPegawai() {
    try {
        const result = await instance.get(`/pegawai/all`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findPegawaibyId(id) {
    try {
        const result = await instance.get(`/pegawai/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createPegawai(formData) {
    try {
        const result = await instance.post(`/pegawai/baru`, formData);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editIdentitas(id, formData) {
    try {
        const result = await instance.patch(`/pegawai/idn/${id}`, formData);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editJabatan(id, formData) {
    try {
        const result = await instance.patch(`/pegawai/jb/${id}`, formData);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editPNS(id, formData) {
    try {
        const result = await instance.patch(`/pegawai/pns/${id}`, formData);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editPangkat(id, formData) {
    try {
        const result = await instance.patch(`/pegawai/pks/${id}`, formData);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}
async function deletePegawai(id) {
    try {
        const result = await instance.delete(`/pegawai/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { createPegawai, findAllPegawai, findPegawaibyId, editIdentitas, editJabatan, editPNS, editPangkat, deletePegawai}