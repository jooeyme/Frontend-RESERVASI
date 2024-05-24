import React, {useState, useEffect} from "react";
import { findAllBookingByUserId } from "../modules/fetch/reservasi";
import SidebarUser from "../components/sidebarUser";
import MyBooking from "../components/card/detailBooking";

const HomeUser = () => {
    const [booking, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await findAllBookingByUserId();
            console.log('Response:', response );
            setBookings(response);
            
          } catch (error) {
            console.error('Error rooms data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <>
            <SidebarUser/>
            <div className="p-4 sm:ml-64">
            <div className="bg-blue-100 py-4 mb-5 ">
                <h1 className="text-2xl text-center font-bold">History pesanan</h1>
            </div>
            <ul className="grid grid-cols-1 gap-y-10 gap-x-6 items-start p-8">
            {booking.map((booking) => (
                (booking.id && booking.id !== null) ? (
                    <MyBooking key={booking.id}{...booking} />
                ) : (
                  <p>anda belum melakukan booking.</p>
                )
                ))}

            </ul>
            </div>
            
        </>
    )
};

export default HomeUser;