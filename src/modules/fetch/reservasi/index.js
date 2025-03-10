import { instance } from "../../axios";

async function createBookingRoom(formData){
    try {
        const response = await instance.post(`/booking/room`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }});
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

async function getFilteredBooking() {
    try {
        const response = await instance.get('/booking/get-filter/booking');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function verifyBooking(id, formData) {
    try {
        const response = await instance.patch(`/booking/verify/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findAllBookingWithApproved() {
    try {
        const response = await instance.get('/booking/status/approved');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findAlternativeRooms(id) {
    try {
        const response = await instance.get(`/booking/alternative-booking/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function moveReservation(id, formData) {
    try {
        const response = await instance.patch(`/booking/moved-booking/${id}`, formData);
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

async function DownloadAllRoomBooking(startDate, endDate) {
    try {
        const response = await instance.get(`/booking/recap/excel-room`, {
            params: { startDate, endDate },
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Rekap-Room-booking-${startDate}-${endDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function DownloadAllToolBooking(startDate, endDate) {
    try {
        const response = await instance.get(`/booking/recap/excel-tool`, {
            params: { startDate, endDate },
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Rekap-Tool-booking-${startDate}-${endDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function DownloadAllRoomRecapPDF(startDate, endDate) {
    try {
        const response = await instance.get(`/booking/recapPDF/pdf-room`, {
            params: { startDate, endDate },
            responseType: 'blob',
        });
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `Recap-Room-Bookings-${startDate}-to-${endDate}.pdf`);
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading PDF', error);
        alert('Failed to download PDF');
    }
}

async function DownloadAllToolRecapPDF(startDate, endDate) {
    try {
        const response = await instance.get(`/booking/recapPDF/pdf-room`, {
            params: { startDate, endDate },
            responseType: 'blob',
        });
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `Recap-Room-Bookings-${startDate}-to-${endDate}.pdf`);
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading PDF', error);
        alert('Failed to download PDF');
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

async function getAllTrackingBookings() {
    try {
        const response = await instance.get('/booking/tracking/status');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
};

async function getAllTrackingBookingsTool() {
    try {
        const response = await instance.get('/booking/tracking-tool/status');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findAllBookingByAdminId() {
    try {
        const response = await instance.get('/booking/admin_booking');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong"); 
    }
}

async function createBookingSpecialAdmin(formData) {
    try {
        const response = await instance.post('/booking/room-admin', formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong"); 
    }
}

async function createBookingToolSpecialAdmin(formData) {
    try {
        const response = await instance.post('/booking/tool-admin', formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong"); 
    }
}

export { 
    turnInRoom, 
    turnInTool, 
    findAllBookingByAdminId,
    createBookingSpecialAdmin,
    createBookingToolSpecialAdmin,
    verifyBooking,
    getAllTrackingBookingsTool,
    getAllTrackingBookings,
    findAllBookingWithApproved,
    findAlternativeRooms,
    moveReservation, 
    getFilteredBooking, 
    getTodayBookings, 
    DownloadAllRoomBooking,
    DownloadAllToolBooking, 
    DownloadAllRoomRecapPDF,
    DownloadAllToolRecapPDF,
    createBookingRoom, 
    deleteBooking, 
    createBookingTool,
    findAllBooking, 
    findAllBookingByUserId, 
    getBookingByRoomId, 
    getBookingByToolId, 
    editBooking, 
    showBookingById};