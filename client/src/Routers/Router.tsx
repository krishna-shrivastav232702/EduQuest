import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../scenes/Home/Home"
import Signup from "../scenes/Authentication/Signup"
import VerifyEmail from "../scenes/Authentication/VerifyEmail"
import Login from "../scenes/Authentication/Login"
import About from "../components/About"
import Pricing from "../components/Pricing"
import DashboardLayout from "../scenes/Dashboard/DashboardLayout"
import Dashboard from "../scenes/Dashboard/Dashboard"
import FileUpload from "../components/FileUpload"
import Test from "../scenes/Test/Test"


const Router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path:'/verifyEmail/:id',
                element:<VerifyEmail/>,
                loader:({params})=>fetch(`http://localhost:7008/auth/verifyEmail/${params.userId}`)
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/pricing",
                element:<Pricing/>
            },
            {
                path:"/test",
                element:<Test/>
            },
            {
                path:"/dashboard",
                element:<DashboardLayout/>,
                children:[
                    {
                        path:'/dashboard/home',
                        element:<Dashboard/>
                    },
                    {
                        path:"/dashboard/uploadPdf",
                        element:<FileUpload/>
                    },
                ]
            }
        ]

    }
])

export default Router