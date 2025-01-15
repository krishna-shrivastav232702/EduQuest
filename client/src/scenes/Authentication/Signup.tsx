import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

interface SignupProps{
    onSignupSuccess?:()=>void;
}
const Signup: React.FC<SignupProps> = ({onSignupSuccess}) => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { signup } = auth;
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const state = (form.elements.namedItem("state") as HTMLInputElement).value;
        const city = (form.elements.namedItem("city") as HTMLInputElement).value;

        try {
            if (!email || !password || !name || !state || !city) {
                setError("All fields are required");
                return;
            }
            const user = await signup({ email, password, name, city, state });
            if (onSignupSuccess) onSignupSuccess();
            navigate("/", { replace: true });
        } catch (error) {
            setError("Signup failed, please try again");
        }
    };

    return (
        <div className=" flex items-center justify-center ">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-200">
                <h1 className="text-3xl font-extrabold text-center text-gray-800">Create an Account</h1>
                {error && <p className="text-center text-red-500">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    {["Name", "Email", "Password", "State", "City"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="font-semibold text-gray-700">{field}</label>
                            <input
                                type={field === "Password" ? "password" : "text"}
                                name={field.toLowerCase()}
                                placeholder={`Enter your ${field.toLowerCase()}`}
                                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className=" ml-32 w-1/3 bg-Blue/90 hover:bg-Blue/80 text-white font-bold py-3  rounded-lg shadow-md transition transform hover:scale-95"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
