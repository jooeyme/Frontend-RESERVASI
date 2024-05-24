import UserList from "../components/table/ListUser";
import Sidebar from "../components/sidebar";

const UserListPage = () => {
    return (
        <>
        <Sidebar/>
        <div className="p-4 sm:ml-64">
            <UserList/>
        </div>
        </>
    )
}

export default UserListPage;