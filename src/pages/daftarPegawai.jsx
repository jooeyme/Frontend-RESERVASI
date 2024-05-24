import Sidebar from "../components/sidebar";
import PegawaiList from "../components/table/daftarPegawai";

const DaftarPegawai = () => {
    return (
    <>
        <Sidebar />
        <div className="p-4 sm:ml-64">
            <PegawaiList />
        </div>
    </>
    )
}

export default DaftarPegawai;