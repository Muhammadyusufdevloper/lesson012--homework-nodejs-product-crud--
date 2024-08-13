import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
const Admin = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Outlet />
            </div>
        </>
    );
};

export default Admin;
