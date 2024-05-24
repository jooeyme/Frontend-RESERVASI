import SidebarUser from "../components/sidebarUser"; 
import ToolDetailPage from "../components/detailTool";

const DetailTool = () => {
 
    return (
        <>
        <SidebarUser />
        <div className="p-4 sm:ml-64">
            <ToolDetailPage />
        </div>
        </>
    )
}

export default DetailTool;