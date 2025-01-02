import React from "react";
import { format, parse, parseISO } from 'date-fns';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaAccessibleIcon, FaRegTrashAlt  } from 'react-icons/fa';


const BookTheDay
 = ({
    Room, 
    Tool,
    room_id,
    tool_id,
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

        const imageSource = room_id ? Room.gambar_room : Tool.gambar_tool;
        const nameReserve = room_id ? Room.name_room : Tool.name_tool;
        const reserve_id = room_id ? room_id : tool_id;

    return (
       
        <div className="flex flex-col justify-center">
            <div className="relative flex flex-col lg:flex-row space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <img src={`http://localhost:3000/images/${imageSource}`} alt="gambar" 
                className="mb-6 shadow-md rounded-lg bg-slate-50 w-lg sm:w-[17rem] sm:mb-0" width="1216" height="640"/>
            <div className="w-full flex flex-col space-y-2 p-3">
                <div className="flex items-center justify-between">
                    <span className="flex">
                        {booking_status === 'approved' && <FaCheckCircle className="mr-2" style={{color: "green"}} size={18} />}
                        {booking_status === 'rejected' && <FaTimesCircle className="mr-2" style={{color: "red"}} size={18}/>}            
                        {booking_status === 'pending' && <FaHourglassHalf className="mr-2" style={{color: "gray"}} size={18}/>} 
                        
                        <div className="text-sm font-semibold text-gray-800">
                            {booking_status }
                        </div>      
                    </span>
                    
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{nameReserve} - {reserve_id}</h3>
                <div className="flex items-center justify-start">
                <span className="font-semibold text-gray-800 mr-3">{peminjam}</span>
                <span>{kontak}</span>
                </div>
                <span className="font-medium text-left">
                    {formatDateString(booking_date)}
                </span>
                <span className="font-normal text-left text-gray-600 text-base"> {formatTime(start_time)} - {formatTime(end_time)}</span>
                
                <p className="flex text-lg text-gray-800 items-start">
                    {dept}
                </p>
                <p className="flex text-left text-gray-500 text-base">{desk_activity} </p>
                
            </div>

                
            </div>
            
        </div>
    )
}

export default BookTheDay
;