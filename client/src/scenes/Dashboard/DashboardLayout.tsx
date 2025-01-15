import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const DashboardLayout = () => {
    return (
        <div className="flex">
            <div><Sidebar/></div>
            <div><Outlet/></div>
        </div>
    )
}

export default DashboardLayout