import React from "react";
import BookingToolList from "../components/table/bookingToolTable.jsx";
import MainLayoutAdmin from "./MainLayoutAdmin.jsx";
import PrivateRoute from "../components/protectedRoutes.jsx";

const DaftarPeminjamTool = () => {
    
    return (
        <>
        
                <MainLayoutAdmin>
                    <BookingToolList />
                </MainLayoutAdmin>
        
            
        </>
    );
}

export default DaftarPeminjamTool;