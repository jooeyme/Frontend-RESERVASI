import { instance } from "../../axios";

async function createBookingRoom(formData){
    try {
        const response = await instance.post(`/booking/room`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
} 

async function createBookingTool(formData){
    try {
        const response = await instance.post(`/booking/tool`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findAllBooking() {
    try {
        const response = await instance.get(`/booking`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findAllBookingByUserId() {
    try {
        const response = await instance.get(`/booking/my_booking`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getBookingByRoomId(room_id) {
    try {
        const response = await instance.get(`/booking/room/${room_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getBookingByToolId(tool_id) {
    try {
        const response = await instance.get(`/booking/tool/${tool_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editBooking(id, formData) {
    try {
        const response = await instance.patch(`/booking/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function showBookingById(id) {
    try {
        const response = await instance.get(`/booking/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteBooking (id) {
    try {
        const response = await instance.delete(`/booking/delete/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function DownloadAllBooking(year, month) {
    try {
        const response = await instance.get(`/booking/excel/${year}/${month}`, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getTodayBookings() {
    try {
        const response = await instance.get(`/booking/day/teh`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function turnInTool(id) {
    try {
        const response = await instance.post(`/booking/return/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function turnInRoom(id) {
    try {
        const response = await instance.post(`/booking/return-room/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export { turnInRoom, turnInTool, getTodayBookings, DownloadAllBooking, createBookingRoom, deleteBooking, createBookingTool,findAllBooking, findAllBookingByUserId, getBookingByRoomId, getBookingByToolId, editBooking, showBookingById};