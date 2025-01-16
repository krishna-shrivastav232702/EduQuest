import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import About from "../components/About"
import FileUpload from "../components/FileUpload"
import Pricing from "../components/Pricing"
import Dashboard from "../scenes/Dashboard/Dashboard"
import DashboardLayout from "../scenes/Dashboard/DashboardLayout"
import Home from "../scenes/Home/Home"
import Test from "../scenes/Test/Test"
import Reminder from "@/components/Reminder"
import Performance from "@/scenes/Dashboard/Performance"


const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/pricing",
                element: <Pricing />
            },
            {
                path: `/tests/:testId`,
                element: <Test />,
                loader:({params})=>fetch(`http://localhost:7008/tests/${params.testId}`)

            },
            {
                path: "/dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        path: '/dashboard/home',
                        element: <Dashboard />
                    },
                    {
                        path: "/dashboard/uploadPdf",
                        element: <FileUpload />
                    },
                    {
                        path:"/dashboard/reminder",
                        element:<Reminder/>
                    },
                    {
                        path:'/dashboard/performance',
                        element:<Performance/>
                    }
                ]
            }
        ]

    }
])

export default Router