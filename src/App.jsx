import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import PrivateRoute from "./components/protectedRoutes";
import './App.css'
import FormAddRoom from './pages/addroom'
import FormAddAlat from './pages/addAlat'
import DaftarPeminjam from './pages/daftarPeminjam'
import HomeUser from './pages/homeUser'
import FormRoomReservasi from './pages/roomReservasi'
import RoomsPage from './pages/allRoom'
import DetailRoom from './pages/detailRoom'
import DetailTool from './pages/detailTool'
import DaftarPegawai from './pages/daftarPegawai'
import DetailPegawai from './pages/detailPegawai'
import HomeAdmin from './pages/homeAdmin'
import RoomsforEdit from './pages/inventarisRoom'
import ToolsforEdit from './pages/inventarisTool'
import RoomEdit from './pages/roomEdit'
import ToolsPage from './pages/allTool'
import Profil from './pages/profilPegawai'
import ToolEdit from './pages/toolEdit'
import UserLoginPage from './pages/UserLogin'
import AdminLoginPage from './pages/AdminLogin'
import UserListPage from './pages/ListUserPage';
import RegisterPage from './pages/Register';
import Navbar from './components/navbar';

function App() {

  return (
    <>
      <Router>
      
        <Routes> 
        <Route 
          path={'/navbar'}
          element={<Navbar />}
        />

        <Route 
              path={"/register"}
              element={<RegisterPage/>}
            />

        <Route 
              path={"/list-user"}
              element={<UserListPage/>}
            />

            <Route 
              path={"/login"}
              element={<UserLoginPage/>}
            />

            <Route 
              path={"/admin"}
              element={<AdminLoginPage/>}
            />
            

        <Route 
            path={"/pegawai/:id"}
            element={<DetailPegawai/>}
          /> 

          <Route 
            path={"/profil/:id"}
            element={<Profil/>}
          />

          <Route 
            path={"/daftar-pegawai"}
            element={<DaftarPegawai/>}
          /> 

          <Route 
            path={"/detailroom/:id"}
            element={<DetailRoom />}
          />

          <Route 
            path={"/detailtool/:id"}
            element={<DetailTool />}
          />
          
          <Route 
            path={"/allRoom"}
            element={<RoomsPage />}
          />

          <Route 
            path={"/allTool"}
            element={<ToolsPage />}
          />

          <Route 
            path={"/inventaris-room"}
            element={<RoomsforEdit />}
          />

          <Route 
            path={"/inventaris-alat"}
            element={<ToolsforEdit />}
          />

          <Route 
            path={"/editroom/:id"}
            element={<RoomEdit />}
          />

          <Route 
            path={"/edittool/:id"}
            element={<ToolEdit />}
          />

          <Route 
            path={"/home-user"}
            element={<HomeUser/>}
          />

          <Route 
            path={"/home-admin"}
            element={<HomeAdmin/>}
          />

          <Route
            path={"/daftar-peminjam"}
            element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
            <DaftarPeminjam/>
            
            </PrivateRoute>}
          />
          

          <Route
            path={"/tambah-room"}
            element={<FormAddRoom/>}
            />

          <Route
            path={"/tambah-alat"}
            element={<FormAddAlat/>}
            />

          <Route 
            path={"/room-reservasi"}
            element={<FormRoomReservasi />}
          />



        </Routes>
      </Router>
    
    </>
  )
}

export default App
