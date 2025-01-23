import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "flowbite-react";
import {
  getAllTrackingBookings,
  DownloadAllRoomBooking,
  DownloadAllRoomRecapPDF,
  showBookingById,
} from "../../modules/fetch/reservasi/index";
import ReservationCard from "../card/reservasiCard";
import { format, parse } from "date-fns";
import Select from "react-select";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaCheckDouble,
  FaRetweet
} from "react-icons/fa";
import ComponentPagination from "../pagination";
import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";
import { Modal } from "flowbite-react";

const TrackTableBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for card visibility
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useState('');
  const [value, setValue] = useState({ startDate: null, endDate: null });

  const handleOpenNote = (bookingNote) => {
    setNote(bookingNote);
    setOpenNote(true)
  }
  const handleCloseClick = () => {
    setIsOpen(false); // Update state to hide the card
  };

  const handleBookingClick = async (Booking) => {
    try {
      const Id = Booking;
      setIsOpen(true);
      const book = await showBookingById(Id);

      setSelectedBookingId(book);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Internal server error: ${error.message}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    try {
      const fetchBooking = async () => {
        const response = await getAllTrackingBookings();
        setBooking(response);
      };
      fetchBooking();
    } catch (e) {
      console.log("Error fetching Booking", e);
    }
  }, []);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleDownloadExcel = async () => {
    const { startDate, endDate } = value;

    if (!startDate || !endDate) {
      Swal.fire({
        title: "Perhatian!",
        text: `Tolong pilih rentang tanggal`,
        icon: "info",
        timer: 2000,
        showConfirmButton: true,
        });
      return;
    }

    try {
      await DownloadAllRoomBooking(startDate, endDate);
      Swal.fire({
        title: "Berhasil!",
        text: `file Room rekap Excel downloaded successfully`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Error downloading file Room rekap Excel`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        });
    }
  };

  const handleDownloadPDF = async () => {
    const { startDate, endDate } = value;

    if (!startDate || !endDate) {
      Swal.fire({
        title: "Perhatian!",
        text: `Tolong pilih rentang tanggal`,
        icon: "info",
        timer: 2000,
        showConfirmButton: true,
        });
      return;
    }

    try {
      await DownloadAllRoomRecapPDF(startDate, endDate);
      Swal.fire({
        title: "Berhasil!",
        text: `file Room rekap PDF downloaded successfully`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Error downloading file Tool rekap PDF`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        });
    }
  };

  const formatDateString = (dateString) => {
    if (!dateString) return "Invalid date";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy");
  };

  const formatTime = (timeString) => {
    const date = parse(timeString, "HH:mm:ss", new Date());
    return format(date, "hh:mm a");
  };

  const filteredData = () => {
    let filteredBookings;
    if (activeTab === 1) {
      filteredBookings = booking.filter(
        (booking) => booking.booking_status === "approved"
      );
    } else if (activeTab === 2) {
      filteredBookings = booking.filter(
        (booking) => booking.booking_status === "rejected"
      );
    } else if (activeTab === 3) {
      filteredBookings = booking.filter(
        (booking) => booking.booking_status === "moved"
      );
    } else if (activeTab === 4) {
      filteredBookings = booking.filter(
        (booking) => booking.booking_status === "returned"
      );
    } else {
      filteredBookings = booking.filter(
        (booking) => booking.booking_status === "pending"
      );
    }
    return filteredBookings;
  };

  const handleTrackingClick = (booking) => {
    setOpenModal(true);
    setSelectedTracking(booking.tracking); // Set data booking yang akan ditampilkan
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData().slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(filteredData().length / itemsPerPage)
    )
      return;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="py-4">
        <h1 className="text-2xl text-center font-bold">Booking Room List</h1>
        <div className="flex gap-10 justify-end pt-4">
          <Datepicker
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
            showFooter={true}
            placeholder="Select Date"
            separator="to"
            containerClassName="relative w-64"
            inputClassName="border-2 border-blue-500 rounded-lg p-2 w-full"
            classNames={{
              popover:
                "bg-white border border-gray-300 shadow-lg rounded-lg p-4",
              header: "text-lg font-semibold text-gray-700",
              dayButton: "hover:bg-blue-100",
              dayButtonSelected: "bg-blue-500 text-white",
              footer: "flex justify-end space-x-2",
              shortcutButton:
                "bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg px-3 py-1",
            }}
          />

          <button
            onClick={() => handleDownloadExcel()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save Recap Excel
          </button>
          <button
            onClick={() => handleDownloadPDF()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save Recap PDF
          </button>
        </div>
      </div>

      <Tabs
        aria-label="Default tabs"
        ref={tabsRef}
        onActiveTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
        style="default"
      >
        <Tabs.Item active title="Pending" icon={FaHourglassHalf}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <div className="flex justify-center mb-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Nama Peminjam
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reservasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Waktu
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tracking
                    </th>
                  </tr>
                </thead>
                {currentItems.length > 0 ? (
                  <tbody>
                    {currentItems.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                        //onClick={() => handleBookingClick(booking.id)}
                      >
                        <td className="px-4 py-4">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td
                          scope="row"
                          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {booking.peminjam}
                        </td>
                        <td className="px-4 py-4">{booking.room_id}</td>
                        <td className="px-4 py-4">
                          {formatDateString(booking.booking_date)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            {formatTime(booking.start_time)} -{" "}
                            {formatTime(booking.end_time)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                            onClick={() => handleBookingClick(booking.id)}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span className="hidden md:inline-block">View</span>
                          </button>
                        </td>
                        <td className="px-4 py-4 items-start justify-start">
                          <span className="flex items-start justify-start">
                            {booking.booking_status === "approved" && (
                              <FaCheckCircle
                                className="mr-2"
                                style={{ color: "green" }}
                                size={20}
                              />
                            )}
                            {booking.booking_status === "rejected" && (
                              <FaTimesCircle
                                className="mr-2"
                                style={{ color: "red" }}
                                size={20}
                              />
                            )}
                            {booking.booking_status === "returned" && (
                              <FaCheckDouble
                                className="mr-2"
                                style={{ color: "blue" }}
                                size={20}
                              />
                            )}

                            {booking.booking_status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleTrackingClick(booking)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Tracking
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="8" className="text-center py-4 text-lg">
                        No data available.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <ComponentPagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData().length}
              paginate={paginate}
            />
          </div>
        </Tabs.Item>
        <Tabs.Item active title="Approve" icon={FaCheckCircle}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <div className="flex justify-center mb-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Nama Peminjam
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reservasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Waktu
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tracking
                    </th>
                  </tr>
                </thead>
                {currentItems.length > 0 ? (
                  <tbody>
                    {currentItems.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                        //onClick={() => handleBookingClick(booking.id)}
                      >
                        <td className="px-4 py-4">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td
                          scope="row"
                          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {booking.peminjam}
                        </td>
                        <td className="px-4 py-4">{booking.room_id}</td>
                        <td className="px-4 py-4">
                          {formatDateString(booking.booking_date)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            {formatTime(booking.start_time)} -{" "}
                            {formatTime(booking.end_time)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                            onClick={() => handleBookingClick(booking.id)}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span className="hidden md:inline-block">View</span>
                          </button>
                        </td>
                        <td className="px-4 py-4 items-start justify-start">
                          <span className="flex items-start justify-start">
                            {booking.booking_status === "approved" && (
                              <FaCheckCircle
                                className="mr-2"
                                style={{ color: "green" }}
                                size={20}
                              />
                            )}
                            {booking.booking_status === "rejected" && (
                              <FaTimesCircle
                                className="mr-2"
                                style={{ color: "red" }}
                                size={20}
                              />
                            )}
                            {booking.booking_status === "returned" && (
                              <FaCheckDouble
                                className="mr-2"
                                style={{ color: "blue" }}
                                size={20}
                              />
                            )}

                            {booking.booking_status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleTrackingClick(booking)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Tracking
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="8" className="text-center py-4 text-lg">
                        No data available.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <ComponentPagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData().length}
              paginate={paginate}
            />
          </div>
        </Tabs.Item>
        <Tabs.Item active title="Rejected" icon={FaTimesCircle}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <div className="flex justify-center mb-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Nama Peminjam
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reservasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Waktu
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tracking
                    </th>
                  </tr>
                </thead>
                {currentItems.length > 0 ? (
                  <tbody>
                    {currentItems.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                        //onClick={() => handleBookingClick(booking.id)}
                      >
                        <td className="px-4 py-4">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td
                          scope="row"
                          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {booking.peminjam}
                        </td>
                        <td className="px-4 py-4">{booking.room_id}</td>
                        <td className="px-4 py-4">
                          {formatDateString(booking.booking_date)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex">
                            {formatTime(booking.start_time)} -{" "}
                            {formatTime(booking.end_time)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                            onClick={() => handleBookingClick(booking.id)}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span className="hidden md:inline-block">View</span>
                          </button>
                        </td>
                        <td className="px-4 py-4 items-start justify-start">
                          <span className="flex items-start justify-start">
                            {booking.booking_status === "approved" && (
                              <FaCheckCircle
                                className="mr-2"
                                style={{ color: "green" }}
                                size={20}
                              />
                            )}
                            {booking.booking_status === "rejected" && (
                              <FaTimesCircle
                                className="mr-2"
                                style={{ color: "red" }}
                                size={20}
                              />
                            )}
                            {booking.booking_status === "returned" && (
                              <FaCheckDouble
                                className="mr-2"
                                style={{ color: "blue" }}
                                size={20}
                              />
                            )}

                            {booking.booking_status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleTrackingClick(booking)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Tracking
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="8" className="text-center py-4 text-lg">
                        No data available.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <ComponentPagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData().length}
              paginate={paginate}
            />
          </div>
        </Tabs.Item>
        <Tabs.Item 
                active
                title="Dipindahkan" 
                icon={FaRetweet} 
                >
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                    <div className="flex justify-center mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Peminjam
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Reservasi
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Waktu 
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Detail
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Catatan
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    
                                </tr>
                            </thead>
                            {currentItems.length > 0 ? (
                            <tbody>
                            {currentItems.map((booking, index) => (
                            <tr 
                                key={booking.id} 
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                            >
                                <td className="px-4 py-4">
                                    {index + 1}
                                </td>
                                <td scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {booking.peminjam}
                                </td>
                                <td className="px-4 py-4">
                                    {booking.room_id}
                                </td>
                                <td className="px-4 py-4">
                                    {formatDateString(booking.booking_date)}
                                </td>
                                <td className="px-4 py-4">
                                    <span className="flex items-center justify-start ">
                                        {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                <button
                                    type="button"
                                    className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                    onClick={() => handleBookingClick(booking.id)}
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <span className="hidden md:inline-block">View</span>
                                </button>
                                </td>
                                <td className="px-4 py-4">
                                    <>
                                                    
                                                      <button
                                                        onClick={() => handleOpenNote(booking.note)}
                                                        className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                      >
                                                        Catatan
                                                      </button>
                                                    
                                                    <Modal show={openNote} onClose={() => setOpenNote(false)}>
                                                      <Modal.Header className="p-2 font-sm">
                                                        Alasan peminjaman Dipindahkan
                                                      </Modal.Header>
                                                      <Modal.Body>
                                                        <div className="space-y-6">
                                                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                            {note}
                                                          </p>
                                                        </div>
                                                      </Modal.Body>
                                                    </Modal>
                                                  </>
                                </td>
                                <td className="px-4 py-4">
                                {booking.booking_status === 'pending' ? (
                                        <CustomSelect
                                            booking={booking}
                                            handleChangeStatus={handleChangeStatus}
                                        />
                                    ) : (
                                        <span className="flex items-center justify-start ">
                                            {booking.booking_status === 'approved' && (
                                                <>
                                                <FaCheckCircle className="mr-2" style={{ color: "green" }} size={12} />
                                                <div className="text-sm font-semibold text-gray-800">Disetujui</div>
                                                </>
                                            )}
                                            {booking.booking_status === 'rejected' && (
                                                <>
                                                <FaTimesCircle className="mr-2" style={{ color: "red" }} size={12} />
                                                <div className="text-sm font-semibold text-gray-800">Ditolak</div>
                                                </>
                                            )}
                                            {booking.booking_status === 'pending' && (
                                                <>
                                                <FaHourglassHalf className="mr-2" style={{ color: "gray" }} size={12} />
                                                <div className="text-sm font-semibold text-gray-800">Pending</div>
                                                </>
                                            )}
                                            {booking.booking_status === 'returned' && (
                                                <>
                                                <FaCheckDouble className="mr-2" style={{ color: "blue" }} size={12} />
                                                <div className="text-sm font-semibold text-gray-800">Selesai</div>
                                                </>
                                            )} 
                                            {booking.booking_status === 'moved' && (
                                                <>
                                                <FaRetweet className="mr-2" style={{ color: "gray" }} size={12} />
                                                <div className="text-sm font-semibold text-gray-800">Dipindahkan</div>
                                                </>
                                            )}    
                                        </span>
                                    )}    
                                </td>
                            </tr>    
                            ))}
                                
                            </tbody>
                            ) : (
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                        <td colSpan="8" className="text-center py-4 text-lg">No data available.</td>
                                    </tr>
                                </tbody>
                                )}
                        </table>
                    </div>
                    <ComponentPagination
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredData().length}
                            paginate={paginate}
                            
                />
                </div>
                </Tabs.Item>
        <Tabs.Item active title="Selesai" icon={FaCheckDouble}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <div className="flex justify-center mb-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Nama Peminjam
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reservasi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Waktu
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tracking
                    </th>
                  </tr>
                </thead>
                {currentItems.length > 0 ? (
                  <tbody>
                    {currentItems.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <td className="px-4 py-4">{index + 1}</td>
                        <td
                          scope="row"
                          className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {booking.peminjam}
                        </td>
                        <td className="px-4 py-4">{booking.room_id}</td>
                        <td className="px-4 py-4">
                          {formatDateString(booking.booking_date)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="flex items-center justify-start ">
                            {formatTime(booking.start_time)} -{" "}
                            {formatTime(booking.end_time)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 font-medium px-4 py-2 inline-flex space-x-1 items-center"
                            onClick={() => handleBookingClick(booking.id)}
                          >
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span className="hidden md:inline-block">View</span>
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <span className="flex items-center justify-start ">
                            {booking.booking_status === "approved" && (
                              <>
                                <FaCheckCircle
                                  className="mr-2"
                                  style={{ color: "green" }}
                                  size={12}
                                />
                                <div className="text-sm font-semibold text-gray-800">
                                  Disetujui
                                </div>
                              </>
                            )}
                            {booking.booking_status === "rejected" && (
                              <>
                                <FaTimesCircle
                                  className="mr-2"
                                  style={{ color: "red" }}
                                  size={12}
                                />
                                <div className="text-sm font-semibold text-gray-800">
                                  Ditolak
                                </div>
                              </>
                            )}
                            {booking.booking_status === "pending" && (
                              <>
                                <FaHourglassHalf
                                  className="mr-2"
                                  style={{ color: "gray" }}
                                  size={12}
                                />
                                <div className="text-sm font-semibold text-gray-800">
                                  Pending
                                </div>
                              </>
                            )}
                            {booking.booking_status === "returned" && (
                              <>
                                <FaCheckDouble
                                  className="mr-2"
                                  style={{ color: "blue" }}
                                  size={12}
                                />
                                <div className="text-sm font-semibold text-gray-800">
                                  Selesai
                                </div>
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleTrackingClick(booking)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Tracking
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="8" className="text-center py-4 text-lg">
                        No data available.
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <ComponentPagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData().length}
              paginate={paginate}
            />
          </div>
        </Tabs.Item>
      </Tabs>

      {selectedBookingId && isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 pt-20 overflow-auto">
          <ReservationCard
            bookingData={selectedBookingId}
            isOpen={isOpen} // Pass the isOpen state
            handleCloseClick={handleCloseClick}
          />
        </div>
      )}

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tracking Verifikasi
          </h3>
        </Modal.Header>
        <Modal.Body>
          <ol className="list-disc list-inside">
            {selectedTracking &&
              selectedTracking.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
          </ol>
        </Modal.Body>
      </Modal>

      {/* {selectedTracking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg w-1/2">
                    <h2 className="text-xl font-bold mb-4">Tracking Verifikasi</h2>
                    <ol className="list-disc list-inside">
                        {selectedTracking &&
                        selectedTracking.map((track, index) => (
                        <li key={index}>{track}</li>
                        ))}
                    </ol>
                    <button
                    onClick={closeTracking}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                    Tutup
                    </button>
                </div>
                </div>
            )} */}
    </div>
  );
};

export default TrackTableBooking;
