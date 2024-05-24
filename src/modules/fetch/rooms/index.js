import { instance } from "../../axios/index";

async function createRoom(formData) { 
    try {
      const response = await instance.post("/room", formData, {
        headers:{ 'Content-Type': 'multipart/form-data',}
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }

async function findAllRoom() {
  try {
    const response = await instance.get('/room', {
      headers: { 'Content-Type': 'application/json'},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function showRoomById(id) {
  try {
    const response = await instance.get(`/room/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editRoom(id, formData) {
  try {
    const response = await instance.patch(`/room/edit/${id}`, formData,{
      headers:{ 'Content-Type': 'multipart/form-data',}
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export { createRoom, findAllRoom, showRoomById, editRoom};