import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import {motion} from "motion/react"

const MyFooter = () => {
    return (
        <div className="flex flex-col bg-Blue/80 text-white px-24 py-16 ">
            <motion.div  className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-4">
                <motion.div initial={{ opacity: 0, translateX: -50 }} transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateX: 0 }}>
                    <h2 className="text-3xl font-bold">EduQuest</h2>
                    <p className="text-lg font-medium mt-4">
                        Empowering innovation with smarter solutions. Contact us to transform your productivity today.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, translateX: -50 }} transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateX: 0 }} className="ml-24">
                    <h2 className="text-2xl font-bold mb-2">Company</h2>
                    <ul className="space-y-1 text-lg font-medium">
                        <li>About Us</li>
                        <li>Customers</li>
                        <li>Newsroom</li>
                        <li>Events</li>
                    </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, translateX: -50 }} transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateX: 0 }} className="ml-10">
                    <h2 className="text-2xl font-bold mb-2">Industries</h2>
                    <ul className="space-y-1 text-lg font-medium">
                        <li>Education</li>
                        <li>Technology</li>
                        <li>Healthcare</li>
                        <li>Finance</li>
                    </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, translateX: -50 }} transition={{ delay: 1, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateX: 0 }}>
                    <h2 className="text-2xl font-bold mb-2">Products</h2>
                    <ul className="space-y-1 text-lg font-medium">
                        <li>AI-Generated Tests</li>
                        <li>Smart Reminders</li>
                        <li>Performance Insights</li>
                        <li>Custom Solutions</li>
                    </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, translateX: -50 }} transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateX: 0 }}>
                    <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
                    <p className="text-lg font-medium">Email: <a href="mailto:eduquest@gmail.com" className="text-White">eduquest@gmail.com</a></p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" aria-label="Facebook" >
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" aria-label="Twitter" >
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="#" aria-label="Instagram" >
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
            <hr className=" mb-6 mt-4" />
            <motion.div initial={{ opacity: 0, translateY: -50 }} transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateY: 0 }} className="flex flex-col md:flex-row justify-between mt-4 text-sm">
                <p className="text-lg font-medium">© 2024 EduQuest. All rights reserved.</p>
                <div className="flex space-x-4 text-lg font-medium">
                    <a href="#" className="hover:text-blue-400">Terms & Conditions</a>
                    <a href="#" className="hover:text-blue-400">Privacy Policy</a>
                </div>
            </motion.div>
        </div >
    );
}

export default MyFooter;
