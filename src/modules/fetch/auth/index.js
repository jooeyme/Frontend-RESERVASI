import { instance } from "../../axios";

async function loginUser(credentials){
    try {
        const response = await instance.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
      }
}

async function forgotPassword(email) {
  try {
    const response = await instance.post('/auth/forgot-password', {email});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function resetPassword(token, formData) {
  try {
    const response = await instance.post(`/auth/reset-password/${token}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function Register(userData) {
    try {
        const response = await instance.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
      }
}

async function LoginAdmin(credentials){
    try {
        const response = await instance.post('/auth/login-admin', credentials);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
      }
}

async function AddAdmin(adminData) {
    try {
        const response = await instance.post('/auth/add-admin', adminData);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
      }
}

export {LoginAdmin, loginUser, Register, AddAdmin, forgotPassword, resetPassword}