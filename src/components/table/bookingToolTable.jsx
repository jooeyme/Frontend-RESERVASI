import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "flowbite-react";
import {
  findAllBooking,
  editBooking,
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
} from "react-icons/fa";
import ComponentPagination from "../pagination";
import * as XLSX from "xlsx";
import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";

const statusOptions = [
  {
    value: "pending",
    label: (
      <div className="flex items-center">
        <FaHourglassHalf className="mr-2" />
        Pending
      </div>
    ),
  },
  {
    value: "approved",
    label: (
      <div className="flex items-center">
        <FaCheckCircle className="mr-2" style={{ color: "green" }} />
        Approved
      </div>
    ),
  },
  {
    value: "rejected",
    label: (
      <div className="flex items-center">
        <FaTimesCircle className="mr-2" style={{ color: "red" }} />
        Rejected
      </div>
    ),
  },
];

const CustomSelect = ({ booking, handleChangeStatus }) => {
  const handleChange = (selectedOption) => {
    handleChangeStatus(booking.id, selectedOption.value);
  };

  const selectedOption = statusOptions.find(
    (option) => option.value === booking.booking_status
  );

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={statusOptions}
      className="w-full"
      classNamePrefix="react-select"
    />
  );
};

const BookingToolList = () => {
  const navigate = useNavigate();
  const [Tool_Id, setTool_id] = useState("");
  const [booking, setBooking] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for card visibility
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredToolBookings, setFilteredToolBookings] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleCloseClick = () => {
    setIsOpen(false); // Update state to hide the card
  };

  const handleBookingClick = async (Booking) => {
    try {
      const Id = Booking;
      setTool_id(Id);
      setIsOpen(true);
      console.log(`Booking`, Tool_Id);
      const book = await showBookingById(Id);
      console.log(`Bookinghh`, book);

      setSelectedBookingId(book);
      console.log("selectedBooking:", selectedBookingId);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    const filteredRoomBookings = [];
    const filteredToolBookings = [];
    try {
      const fetchBooking = async () => {
        const response = await findAllBooking();
        const bookingData = response.data;
        //const RoomId = (response.data.room_id);
        console.log("data1:", bookingData);
        bookingData.forEach((booking) => {
          if (booking.tool_id === null) {
            filteredRoomBookings.push(booking);
          } else {
            filteredToolBookings.push(booking);
          }
        });
        setBooking(filteredToolBookings);
        setFilteredToolBookings(filteredToolBookings);
      };
      //setRoom_id(RoomId);
      fetchBooking();
    } catch (e) {
      console.log("Error fetching Booking", e);
    }
  }, []);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const filterDataByDate = (data) => {
    const { startDate, endDate } = value;
    if (!startDate || !endDate) return data; // Jika startDate atau endDate tidak diisi, tidak ada filter

    // Konversi string tanggal menjadi objek Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.filter((booking) => {
      const bookingDate = new Date(booking.booking_date); // Asumsi booking.booking_date dalam format ISO string

      // Membandingkan tanggal booking dengan rentang yang dipilih
      return bookingDate >= start && bookingDate <= end;
    });
  };

  const downloadExcel = (data, filename) => {
    const filteredData = filterDataByDate(data); // Terapkan filter tanggal
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleChangeStatus = async (id, newStatus) => {
    if (newStatus === "rejected") {
      Swal.fire({
        title: "Konfirmasi tindakan",
        input: "textarea",
        text: `Apakah yakin ingin "${newStatus}" reservasi ini?`,
        icon: "question",
        inputLabel: "Keterangan",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
       
        inputValidator: (value) => {
          if (!value) {
            return "You need to write a reason!";
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const note = result.value;
          try {
            const formData = { booking_status: newStatus, note };
            const response = await editBooking(id, formData);
            console.log("note:", note)
            if (response.status === 200) {
              setBooking((prevBookings) => {
                const updatedBookings = prevBookings.map((booking) =>
                  booking.id === id
                    ? { ...booking, booking_status: newStatus }
                    : booking
                );
                console.log("Updated Bookings:", updatedBookings);
                return updatedBookings;
              });
            } else {
              // Tampilkan pesan error jika update status gagal
              console.error("Gagal memperbarui status reservasi:", response);
            }
            Swal.fire({
              title: "Berhasil!",
              text: `Status booking berhasil diubah menjadi "${newStatus}".`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Gagal melakukan ubah status booking. Coba lagi.",
              icon: "error",
            });
            console.error(
              "Terjadi kesalahan saat memperbarui status reservasi:",
              error
            );
          }
        }
      });
    } else {
      Swal.fire({
        title: "Konfirmasi tindakan",
        text: `Apakah yakin ingin "${newStatus}" reservasi ini?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const formData = { booking_status: newStatus };
            const response = await editBooking(id, formData);

            if (response.status === 200) {
              // Update daftar reservasi di state
              setBooking((prevBookings) => {
                const updatedBookings = prevBookings.map((booking) =>
                  booking.id === id
                    ? { ...booking, booking_status: newStatus }
                    : booking
                );
                console.log("Updated Bookings:", updatedBookings);
                return updatedBookings;
              });
            } else {
              // Tampilkan pesan error jika update status gagal
              console.error("Gagal memperbarui status reservasi:", response);
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Failed to update booking status. Please try again.",
              icon: "error",
            });
            console.error(
              "Terjadi kesalahan saat memperbarui status reservasi:",
              error
            );
          }
        }
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
        (booking) => booking.booking_status === "returned"
      );
    } else {
      filteredBookings = booking.filter(
        (booking) => booking.booking_status === "pending"
      );
    }
    return filteredBookings;
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
        <h1 className="text-2xl text-center font-bold">Booking Tool List</h1>
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
            onClick={() =>
              downloadExcel(filteredToolBookings, "Tool_bookings.xlsx")
            }
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save Recap Tool Bookings
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
                        <td className="px-4 py-4">{booking.tool_id}</td>
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
                        <td className="px-4 py-4 items-center justify-start">
                          {booking.booking_status === "pending" ? (
                            <CustomSelect
                              booking={booking}
                              handleChangeStatus={handleChangeStatus}
                            />
                          ) : (
                            <span className="flex items-center justify-center">
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
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="7" className="text-center py-4 text-lg">
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
                        <td className="px-4 py-4">{booking.tool_id}</td>
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
                        <td className="px-4 py-4 items-center justify-start">
                          {booking.booking_status === "pending" ? (
                            <CustomSelect
                              booking={booking}
                              handleChangeStatus={handleChangeStatus}
                            />
                          ) : (
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
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="7" className="text-center py-4 text-lg">
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
                        <td className="px-4 py-4">{booking.tool_id}</td>
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
                          {booking.booking_status === "pending" ? (
                            <CustomSelect
                              booking={booking}
                              handleChangeStatus={handleChangeStatus}
                            />
                          ) : (
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
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="7" className="text-center py-4 text-lg">
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
        <Tabs.Item active title="Returned" icon={FaCheckDouble}>
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
                        <td className="px-4 py-4">{booking.tool_id}</td>
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
                          {booking.booking_status === "pending" ? (
                            <CustomSelect
                              booking={booking}
                              handleChangeStatus={handleChangeStatus}
                            />
                          ) : (
                            <span className="flex items-center justify-start ">
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
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <td colSpan="7" className="text-center py-4 text-lg">
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
    </div>
  );
};

export default BookingToolList;
