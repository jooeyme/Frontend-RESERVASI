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
export { createBookingRoom, createBookingTool,findAllBooking, findAllBookingByUserId, getBookingByRoomId, editBooking, showBookingById};