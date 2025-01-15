import { FC } from "react"
import Dashboard from "./Dashboard"
import { House, LogOut } from "lucide-react"
import { FileUp, AlarmClockCheck, ChartNoAxesCombined } from "lucide-react"
import FileUpload from "@/components/FileUpload"
import Reminder from "@/components/Reminder"
import Performance from "./Performance"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
const Sidebar: FC = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("Authcontext must be used within an authprovider");
    }
    const navigate = useNavigate();
    const { logout } = auth;
    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const sidebarItems = [
        {
            text: "Overview",
            icon: <Dashboard />,
            element: 'home',
            sidebaricon: <House />
        },
        {
            text: "Upload File",
            icon: <FileUpload />,
            element: 'uploadPdf',
            sidebaricon: <FileUp />,
        },
        {
            text: "Reminders",
            icon: <Reminder />,
            element: 'Reminder',
            sidebaricon: <AlarmClockCheck />,
        },
        {
            text: "Performance",
            icon: <Performance />,
            element: "Performance",
            sidebaricon: <ChartNoAxesCombined />
        }
    ]
    return (
        <div className="flex flex-col  justify-around w-60  bg-gray-100 border-r border-gray-200 min-h-screen ">
            {/* Dashboard Header */}
            <div>
                <div className=" ml-7 font-bold text-3xl mb-20 ">
                    <Link to="/dashboard/home" className="text-gray-800 hover:text-Blue transition duration-200">
                        Dashboard
                    </Link>
                </div>

                {/* Sidebar Items */}
                <div className="flex flex-col  text-center mx-4 gap-6 ">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            to={`/dashboard/${item.element}`}
                            className="flex items-center gap-4 p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-500 rounded-lg transition duration-200"
                        >
                            <div className="text-xl">{item.sidebaricon}</div>
                            <div className="text-lg">{item.text}</div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Logout Button */}
            <div className=" mx-5">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-500 p-3 rounded-lg hover:bg-red-100 transition duration-200 w-full"
                >
                    <LogOut className="text-xl" />
                    <span className="text-lg">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar