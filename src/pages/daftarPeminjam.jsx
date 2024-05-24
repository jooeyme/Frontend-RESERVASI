import Sidebar from "../components/sidebar.jsx";
import BookingRoomList from "../components/table/bookingRoomTable.jsx";

const DaftarPeminjam = () => {
    return (
        <>
            <Sidebar/>
                <div className="p-4 sm:ml-64">
                <BookingRoomList />
                </div>
            
        </>
    );
}

export default DaftarPeminjam;