import React, { useState, useEffect } from "react";
import {
  findAllBookingByUserId,
  deleteBooking,
  findAllBooking,
} from "../modules/fetch/reservasi";
import MainLayoutUser from "./MainLayoutUser";
import MyBooking from "../components/card/detailBooking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import { TataTertib } from "../components/tataTertib";
import { jwtDecode } from "jwt-decode";
import CalenderBooking from "../components/calenderBooking";

const HomeUser = () => {
  const [booking, setBookings] = useState([]);
  const [allBooking, setAllBooking] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [files, setFiles] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const role = decodedToken.type;
        if (role === "user") {
          setIsLoggedIn(true);
          setRole(role);
          fetchData();
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    fetchDataBookTheDay();
  }, []);

  const fetchData = async () => {
    try {
      const response = await findAllBookingByUserId();
      setBookings(response);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchDataBookTheDay = async () => {
    try {
      const bookings = await findAllBooking();

      setAllBooking(bookings.data);
    } catch (error) {
      console.error("Error fetching today's bookings:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    Swal.fire({
      title: "Konfirmasi Penghapusan",
      text: "Apakah Anda yakin ingin membatalkan reservasi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Batalkan",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBooking(id);
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking.id !== id)
          );
          toast.success("Reservasi berhasil dibatalkan", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
          });
        } catch (error) {
          console.error("Error deleting Tool:", error.message);
          toast.error("Gagal membatalkan reservasi. Silahkan coba lagi.", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
          });
        }
      }
    });
  };

  if (!isLoggedIn) {
    return (
      <MainLayoutUser>
        <div className="max-w-xl px-4 mx-auto sm:px-7 md:max-w-4xl xl:max-w-6xl md:px-6">
          {/* <Accordion /> */}
          <TataTertib/>
          <div className="flex justify-center home-not-logged-in mt-10 mb-4">
            <h2>Anda Belum Login! </h2>
            <p>
              Silahkan login untuk mengakses riwayat reservasi dan melakukan
              reservasi baru.
            </p>
          </div>
          <div className="flex justify-center home-not-logged-in mb-4">
            <Link to="/login">
              <button className="w text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </Link>
          </div>
          <div className="pb-4">
            <div className="pt-4">
              <h1 className="text-2xl text-left font-semibold mb-8">
                Jadwal booking hari ini
              </h1>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-4 m-auto max-w-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
                <CalenderBooking bookings={allBooking} />
              </div>
            </div>
          </div>
        </div>
      </MainLayoutUser>
    );
  } else if (booking.length === 0) {
    return (
      <MainLayoutUser>
        <div className="max-w-xl px-4 mx-auto sm:px-7 md:max-w-4xl xl:max-w-6xl md:px-6">
          {/* <Accordion /> */}
          <TataTertib/>
          <div className="pb-4">
            <div className="pt-4">
              <h1 className="text-2xl text-left font-semibold mb-8">
                Jadwal booking hari ini
              </h1>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-4 m-auto max-w-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
                <CalenderBooking bookings={allBooking} />
              </div>
            </div>
          </div>

          <div className="home-logged-in-no-reservations mt-10">
            <h2>Selamat Datang,!</h2>
            <p>Anda belum memiliki riwayat reservasi.</p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/allroom">
                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Buat Reservasi Ruangan
                </button>
              </Link>
              <Link to="/allTool">
                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Buat Reservasi Alat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayoutUser>
    );
  } else {
    return (
      <>
        <MainLayoutUser>
          <div className="max-w-xl px-4 mx-auto sm:px-7 md:max-w-4xl xl:max-w-full md:px-6">
            {/* <Accordion /> */}
            <TataTertib/>
            <div className="pb-4">
              <div className="pt-4">
                <h1 className="text-2xl text-left font-semibold mb-8">
                  Jadwal booking hari ini
                </h1>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl py-4 m-auto max-w-full">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
                  <CalenderBooking bookings={allBooking} />
                </div>
              </div>
            </div>

            <div className="pb-4">
              <div className="py-4">
                <h1 className="text-2xl text-center font-bold">
                  History pesanan
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booking.map((booking) =>
                  booking.id && booking.id !== null ? (
                    <MyBooking
                      key={booking.id}
                      {...booking}
                      onDelete={handleDeleteBooking}
                    />
                  ) : (
                    <p>anda belum melakukan booking.</p>
                  )
                )}
              </div>
            </div>
          </div>
        </MainLayoutUser>
        <ToastContainer />
      </>
    );
  }
};

export default HomeUser;
