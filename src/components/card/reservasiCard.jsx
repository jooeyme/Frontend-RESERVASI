import React, { useState, useEffect } from "react";
import { format, parse, parseISO } from 'date-fns';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBookingByRoomId } from "../../modules/fetch/reservasi";
import {
  FaRegUser,
  FaRegClock,
  FaRegCalendarAlt,
  FaBoxOpen,
  FaRegThumbsUp,
  FaPhoneAlt
} from "react-icons/fa";
import  id  from 'date-fns/locale/id';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const locale = id;

const ReservationCard = ({ bookingData, isOpen, handleCloseClick }) => {
  const [localIsOpen, setIsOpen] = useState(isOpen || true); // Local state for fallback

  const handleLocalCloseClick = () => {
    // Call the provided handleCloseClick function if available, otherwise toggle localIsOpen
    handleCloseClick?.() || setIsOpen(false);
  };

  const {
    room_id,
    tool_id,
    peminjam,
    kontak,
    booking_date,
    start_time,
    end_time,
    booking_status,
    desk_activity,
    quantity,
    jenis_kegiatan,
    jenis_pengguna,
    dept,
    Room,
    Tool,
  } = bookingData;

  const formatDateString = (dateString) => {
    if (!dateString) return 'Invalid date';
    const date = parseISO(dateString);
    return format(date, 'eeee, dd MMMM yyyy', {locale});
};

  const formatTime = (timeString) => {
    const date = parse(timeString, 'HH:mm:ss', new Date());
    return format(date, 'hh:mm a');
  };

  const imageSource = room_id ? Room.gambar_room : Tool.gambar_tool;
  const nameReserve = room_id ? Room.name_room : Tool.name_tool;
  const id = room_id ? room_id : tool_id;

  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 rounded-lg pb-4 ${
        !localIsOpen && "hidden"
      }`}
    >
      <div className="max-w-2xl mx-auto ">
        <div className="flex justify-between items-center px-2 sm:px-2 lg:px-4">
          <span className="items-center text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 pt-4">
            Detail Reservasi
          </span>
          <button
            type="button"
            aria-label="Close"
            onClick={handleLocalCloseClick}
          >
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr className="border border-gray-600 dark:border-gray-700 border-opacity-50" />
        <div className="flex flex-col md:flex-row -mx-4 px-2 sm:px-2 lg:px-4 pt-4">
          <div className="min-w-80 px-4">
            <div className="rounded-md bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="h-48 w-full rounded-lg object-cover"
                src={`${BASE_URL}/images/${imageSource}`}
                alt={nameReserve}
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="flex items-start text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {nameReserve} {id}
            </h2>

            <div className="flex items-center mb-2">
              <FaRegUser />
              <span className="font-medium text-gray-600 dark:text-gray-300 ml-2">
                {peminjam}
              </span>
            </div>
            <div className="flex items-center mb-2">
            <FaPhoneAlt />
              <span className="text-gray-600 dark:text-gray-300 ml-2">
                {kontak}
              </span>
            </div>
            {!room_id && (
              <div className="flex items-center mb-2">
              <FaBoxOpen />
                <span className="text-gray-600 dark:text-gray-300 ml-2">
                {quantity} alat
              </span>
              </div>
              )}

            <div className="flex items-center mb-2">
              <FaRegCalendarAlt />
              <span className="text-gray-600 dark:text-gray-300 ml-2">
              {formatDateString(booking_date)}
              </span>
            </div>

            <div className="flex items-center mb-2">
              <FaRegClock />
              <span className="text-gray-600 dark:text-gray-300 ml-2">
              {formatTime(start_time)} - {formatTime(end_time)}
              </span>
            </div>
          
          <div className="flex items-center mb-2">
            <FaRegThumbsUp />
            <span className="text-gray-600 dark:text-gray-300 ml-2">
              {booking_status}
            </span>
          </div>
          </div>
        </div>
      
      <div className="px-2 sm:px-2 lg:px-4">
        
        <span className="flex items-start font-semibold text-gray-700 dark:text-gray-300">
          {dept}
        </span>
        <div className="flex gap-4">
          <span>
            {jenis_kegiatan}
          </span>
          <span>
            {jenis_pengguna}
          </span>
        </div>
        <p className="flex text-left text-gray-600 dark:text-gray-300 text-sm">
          {desk_activity} 
        </p>
      </div>
      </div>
    </div>
  );
};

export default ReservationCard;
