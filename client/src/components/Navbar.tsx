import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "motion/react"
import LoginModal from "@/scenes/Authentication/LoginModal";
import { useState } from "react";
import SignupModal from "@/scenes/Authentication/SignupModal";

const Navbar: FC = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("Authcontext must be used within an authprovider");
    }
    const navigate = useNavigate();
    const { currUser, logout } = auth;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignupModalOpen,setIsSignupModalOpen]=useState(false);

    const navItems = [
        {
            link: "Home", path: "/"
        },
        {
            link: "About", path: "/about"
        },
        {
            link: "Dashboard", path: "/dashboard",
        },
        {
            link: "Pricing", path: "/pricing",
        }
    ]

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <>
            <motion.div className="flex justify-between bg-white py-4 px-10"
                initial={{ transform: "translateY(-100px)" }}
                animate={{ transform: "translateY(0px)" }}
                transition={{ type: "spring" }}
            >
                <div className="text-3xl ml-20 font-semibold text-gray-900 mt-1">Edu<span className="text-Blue">Quest</span></div>
                <ul className="flex justify-between gap-16 mt-2 ml-12">
                    {
                        navItems.map(({ link, path }) => (
                            <li key={path} className="text-xl font-medium text-gray-900 tranistion-all duration-200">
                                <Link to={path} className="hover:text-Blue" >{link}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="mr-20">
                    {
                        currUser ?
                            <button onClick={handleLogout} className="bg-Blue text-white px-6 py-2 rounded-lg text-xl hover:bg-Blue/80 transtion-all duration-300 hover:tranistion-all duration-300 ">Logout</button>
                            :
                            <div className="flex">
                                <button onClick={() => setIsSignupModalOpen(true)} className="text-xl font-medium mr-10 px-6 py-2 transition-all duration-200 text-Blue rounded-lg hover:bg-Blue/90 hover:text-white hover:transition-all hover:duration-200 hover:ease-in-out   " >Signup</button>
                                <button onClick={() => setIsModalOpen(true)} className="bg-Blue text-white px-6 py-2 rounded-lg text-xl hover:bg-Blue/80 transtion-all duration-300 hover:tranistion-all duration-300 ">Login</button>
                            </div>
                    }
                </div>
            </motion.div>
            {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
            {isSignupModalOpen && <SignupModal onClose={()=>setIsSignupModalOpen(false)}/>}    
        </>
    )
}

export default Navbar