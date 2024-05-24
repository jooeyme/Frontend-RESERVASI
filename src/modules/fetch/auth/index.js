import { instance } from "../../axios";

async function loginUser(credentials){
    try {
        const response = await instance.post('/auth/login', credentials);
        return response.data;
      } catch (error) {
        throw error;
      }
}

async function Register(userData) {
    try {
        const response = await instance.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

async function LoginAdmin(credentials){
    try {
        const response = await instance.post('/auth/login-admin', credentials);
        return response.data;
      } catch (error) {
        throw error;
      }
}

async function AddAdmin(adminData) {
    try {
        const response = await instance.post('/auth/add-admin', adminData);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export {LoginAdmin, loginUser, Register, AddAdmin}