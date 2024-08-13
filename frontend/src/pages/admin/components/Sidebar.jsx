import { MdCreateNewFolder } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (
        <>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform   '-translate-x-full' bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink to={"/admin/product"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <SiNginxproxymanager />
                                <span className="ms-3">Manage products</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/create"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdCreateNewFolder />
                                <span className="ms-3">Create product</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar