import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from "./components/protectedRoutes";
import './App.css'
import FormAddRoom from './pages/addroom'
import FormAddAlat from './pages/addAlat'
import DaftarPeminjam from './pages/daftarPeminjam'
import DaftarPeminjamTool from './pages/daftarPeminjamTool';
import HomeUser from './pages/homeUser'
import RoomsPage from './pages/allRoom'
import DetailRoom from './pages/detailRoom'
import DetailTool from './pages/detailTool'
import DaftarPegawai from './pages/daftarPegawai'
import DetailPegawai from './pages/detailPegawai'
import EditEmployee from './pages/editEmployee';
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
import SessionExpired from './pages/sessionExpired';
import DaftarBookingFiltered from './pages/daftarBookingFiltered';
import MovedBooking from './pages/movedReservation';
import DaftarTrackBooking from './pages/ListBookingTrack';
import DaftarTrackBookingTool from './pages/ListBookingToolTrack';
import TermsAndConditions from './pages/termsAndCondition';
import ToolTermsAndConditions from './pages/ToolTermsAndConditions';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path={'/terms-and-conditions'}
            element={<TermsAndConditions />}
          />

          <Route 
            path={'/tool-terms-and-conditions'}
            element={<ToolTermsAndConditions />}
          />

          <Route 
            path={"/tracked-booking"}
            element={
              <PrivateRoute allowedRoles={["admin", "super_admin", "admin_staff", 'admin_leader', 'admin_tu']}>
                <DaftarTrackBooking/>
              </PrivateRoute>
          }
          />
          <Route 
            path={"/tracked-booking-tool"}
            element={
              <PrivateRoute allowedRoles={["admin_tu", "super_admin", "admin_staff", 'admin_leader', 'admin_mm']}>
                <DaftarTrackBookingTool/>
              </PrivateRoute>
          }
          />
          <Route 
            path={"/moved-booking"}
            element={<MovedBooking/>}
          />

          <Route 
            path={"/expired"}
            element={<SessionExpired />}
          />
          
          <Route 
            path={"/register"}
            element={<RegisterPage/>}
          />

          <Route 
            path={"/list-user"}
            element={
            <PrivateRoute allowedRoles={["super_admin"]}>
              <UserListPage/>
            </PrivateRoute>
          }
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
            path={"/edit-pegawai/:id"}
            element={<EditEmployee/>}
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
            path={"/"}
            element={
              <HomeUser/>
          }
          />

          <Route 
            path={"/home-admin"}
            element={
            <PrivateRoute allowedRoles={["admin", "super_admin", "admin_staff", 'admin_leader', 'admin_mm', 'admin_tu']}>
              <HomeAdmin/>
            </PrivateRoute>
          }
          />

          {/* Halaman ADMIN ROOM */}
          <Route 
            path={"/inventaris-room"}
            element={
            <PrivateRoute allowedRoles={["admin", "super_admin"]}>
              <RoomsforEdit />
            </PrivateRoute>
            }
          />

          <Route 
            path={"/editroom/:id"}
            element={
            <PrivateRoute allowedRoles={["admin", "super_admin"]}>
              <RoomEdit />
            </PrivateRoute>
          }
          />
          {/* Halaman peminjam filtered */}
          <Route
            path={"/filtered-booking"}
            element={
              <PrivateRoute allowedRoles={["admin", "admin_staff", "admin_leader", "admin_mm", "admin_tu"]}>
                <DaftarBookingFiltered />
              </PrivateRoute>
            }
          />
          
          {/* Halaman peminjam Room */}
          <Route
            path={"/daftar-peminjam"}
            element={
            <PrivateRoute allowedRoles={["admin", "super_admin"]}>
              <DaftarPeminjam/>
            </PrivateRoute>}
          />
          {/* Halaman Add Room */}
          <Route
            path={"/tambah-room"}
            element={
              <PrivateRoute allowedRoles={["admin", "super_admin"]}>
                <FormAddRoom/>
              </PrivateRoute>
            }
            />
            
          {/* Halaman ADMIN TOOL */}
          <Route 
            path={"/inventaris-alat"}
            element={
            <PrivateRoute allowedRoles={["super_admin", "admin_staff"]}>
              <ToolsforEdit />
            </PrivateRoute>
            }
          />

          <Route 
            path={"/edittool/:id"}
            element={
            <PrivateRoute allowedRoles={["super_admin", "admin_staff"]}>
              <ToolEdit />
            </PrivateRoute>
          }
          />

          <Route 
            path={"/daftar-peminjam-tool"}
            element={
              <PrivateRoute allowedRoles={["super_admin", "admin_staff"]}>
                <DaftarPeminjamTool /> 
              </PrivateRoute>
              }
          />
          {/* Halaman Add Tool */}
          <Route
            path={"/tambah-alat"}
            element={
              <PrivateRoute allowedRoles={["super_admin", "admin_staff"]}>
                <FormAddAlat/>
              </PrivateRoute>
            }
            />
        </Routes>
      </Router>
    
    </>
  )
}

export default App
