import { instance } from "../../axios/index";

async function createAlat(formData) {
    try {
      const response = await instance.post("/tool", formData, { 
        headers: { 'Content-Type': 'multipart/form-data'}
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }

async function deleteTool(id) {
    try {
      const response = await instance.delete(`/tool/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function findAllTool() {
  try {
    const response = await instance.get("/tool", {
      headers: { 'Content-Type': 'application/json'},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function showToolById(id) {
  try {
    const response = await instance.get(`/tool/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editTool(id, formData) {
  try {
    const response = await instance.patch(`/tool/edit/${id}`, formData,{
      headers:{ 'Content-Type': 'multipart/form-data',}
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export { createAlat, showToolById, findAllTool, editTool, deleteTool };