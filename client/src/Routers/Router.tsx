import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../scenes/Home/Home"
import Signup from "../scenes/Authentication/Signup"
import VerifyEmail from "../scenes/Authentication/VerifyEmail"
import Login from "../scenes/Authentication/Login"


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
        ]

    }
])

export default Router