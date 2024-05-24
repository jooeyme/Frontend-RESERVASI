import React from "react";
import { format, parse, parseISO } from 'date-fns';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaAccessibleIcon } from 'react-icons/fa';


const MyBooking = ({
    Room, 
    booking_date, 
    booking_status, 
    kontak, peminjam, 
    start_time, 
    end_time,
    desk_activity,
    dept,
    }) => {

        const formatDateString = (dateString) => {
            if (!dateString) return 'Invalid date';
            const date = parseISO(dateString);
            return format(date, 'eeee, dd MMMM yyyy');
        };
        
        const formatTime = (timeString) => {
            const date = parse(timeString, 'HH:mm:ss', new Date());
            return format(date, 'hh:mm a');
        };

    return (
       
        <div className="flex flex-col justify-center">
            <div className="relative flex flex-col md:flex-row space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <img src={`http://localhost:3000/images/${Room.gambar_room}`} alt="gambar" 
                className="mb-6 shadow-md rounded-lg bg-slate-50 w-lg sm:w-[17rem] sm:mb-0" width="1216" height="640"/>
            <div className="w-full flex flex-col space-y-2 p-3">
                <div className="flex items-center justify-start">
                    <span className="flex">
                        {booking_status === 'approved' && <FaCheckCircle className="mr-2" style={{color: "green"}} size={18} />}
                        {booking_status === 'rejected' && <FaTimesCircle className="mr-2" style={{color: "red"}} size={18}/>}            
                        {booking_status === 'pending' && <FaHourglassHalf className="mr-2" style={{color: "gray"}} size={18}/>} 
                        
                                    
                    </span>
                    <div className="text-sm font-semibold text-gray-800">
                    {booking_status }
                    </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{Room.name_room} - {Room.room_id}</h3>
                <div className="flex items-center justify-start">
                <p className="font-semibold text-gray-800 mr-3">{peminjam}</p>
                <span>{kontak}</span>
                </div>
                <span className="font-medium flex text-left">
                    {formatDateString(booking_date)}
                    <span className="font-normal text-gray-600 text-base"> {formatTime(start_time)} - {formatTime(end_time)}</span>
                </span>
                
                <p className="flex text-lg text-gray-800 items-start">
                    {dept}
                </p>
                <p className="flex text-left text-gray-500 text-base">{desk_activity} Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, sapiente?</p>
                
            </div>

                
            </div>
            
        </div>
    )
}

export default MyBooking;