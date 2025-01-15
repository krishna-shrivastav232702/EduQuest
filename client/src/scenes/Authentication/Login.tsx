import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

interface LoginProps {
    onLoginSuccess?: () => void;
}

const Login: FC<LoginProps> = ({onLoginSuccess}) => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { login } = auth;
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            if (!email || !password) {
                setError("All fields are required");
            }
            const user = await login({ email, password });
            if (onLoginSuccess) onLoginSuccess();
            navigate("/", { replace: true });
        } catch (error) {
            setError("Login Failed ,Please Try Again");
        }
    };


    return (
        <div className=" flex justify-center items-center  ">
            <div className=" w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Welcome Back!
                    </h2>
                    <p className="mt-3 text-center text-lg font-medium text-gray-600">
                        Sign in to continue exploring{" "}
                        <span className="text-Blue font-medium">EduQuest</span>
                    </p>
                </div>
                <form onSubmit={handleLogin} className="mt-8 space-y-6  ">
                    <div className="rounded-md shadow-sm space-y-4  flex flex-col">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-bold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition  sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-lg font-bold text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div >
                        <button
                            type="submit"
                            className="flex ml-40 justify-center py-2 px-4 border border-transparent text-sm hover:scale-95 scale:105 font-medium rounded-md text-white bg-Blue/90 hover:bg-Blue/75 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-Blue/90 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {error && (
                    <div className="text-red-600 text-center text-sm mt-4">
                        {error}
                    </div>
                )}
            </div>
        </div>

    )
}

export default Login