import React from "react";
import MainLayoutAdmin from "./MainLayoutAdmin.jsx";
import ListFilteredBooking from "../components/table/listFilteredBooking.jsx";

const DaftarBookingFiltered = () => {
    return (
        <>
        <MainLayoutAdmin>
            <ListFilteredBooking />
        </MainLayoutAdmin>        
        </>
    );
}

export default DaftarBookingFiltered;