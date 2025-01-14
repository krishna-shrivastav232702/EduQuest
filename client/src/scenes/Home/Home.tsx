import { ClipboardList } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import image from "../../assets/ai-technology.png"

const Home = () => {
    return (
        <div className="bg-White px-20 py-12 " >
            <motion.div className="text-center" initial={{ scale: 0.6 }} animate={{ scale: 1 ,transition: { duration: 1,type:"spring"}}}>
                <h1 className="text-7xl font-bold text-gray-800 px-[200px] pt-[50px] pb-8 mt-6 ">
                    The Future of Personalized Learning <br/> with{" "}
                    <span className="text-Blue"> AI-Powered Tools</span>
                </h1>
            
                <p className="text-gray-900 text-2xl mt-4">
                    Simplify your study process with AI-generated tests and smart reminders.
                </p>
                <div className="mt-6 flex justify-center space-x-4 mt-10">
                    <Link to="/test">
                        <button className="bg-Blue text-white px-6 py-3 rounded-lg text-xl hover:bg-Blue/80 transtion-all duration-300 hover:tranistion-all duration-300 ">
                            Generate a Test
                        </button>
                    </Link>
                </div>
                <img src={image} className="w-14 ml-[250px] mt-[-80px] mt-8 h-14"/>
                <ClipboardList size={40} className="ml-[1400px] mt-4" />
            </motion.div>
            <motion.div  className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-center" >
                <motion.div initial={{scaleX:0,transformOrigin:"left"}} animate={{ scaleX:1 }} transition={{ delay:0.5,ease: "easeInOut",duration: 0.25 }} className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center shadow-[7px_7px_0px_0px_rgba(50,44,197,255)]">
                    <h2 className="text-4xl font-extrabold text-Blue">5000+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900 ">AI-Generated Tests</p>
                    <p className="mt-2 text-lg text-gray-900">Helping students practice smarter</p>
                </motion.div>

                <motion.div initial={{scaleY:0,transformOrigin:"top"}} animate={{ scaleY:1 }} transition={{ delay:1.5,ease: "easeInOut",duration: 0.3 }} className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center shadow-[7px_7px_0px_0px_rgba(50,44,197,255)]">
                    <h2 className="text-4xl font-extrabold text-Blue">12000+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900">Students Served</p>
                    <p className="mt-2 text-lg text-gray-900">Growing by 250+ new users each month</p>
                </motion.div>

                <motion.div initial={{scaleY:0,transformOrigin:"top"}} animate={{ scaleY:1 }} transition={{ delay:1.5,ease: "easeInOut",duration: 0.3 }} className=" rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center shadow-[7px_7px_0px_0px_rgba(50,44,197,255)]">
                    <h2 className="text-4xl font-extrabold text-Blue">2+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900">Years of Excellence</p>
                    <p className="mt-2 text-lg text-gray-900">Continuously innovating in education</p>
                </motion.div>

                <motion.div initial={{scaleX:0,transformOrigin:"right"}} animate={{ scaleX:1 }} transition={{ delay:1,ease: "easeInOut",duration: 0.25 }} className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center shadow-[7px_7px_0px_0px_rgba(50,44,197,255)]">
                    <h2 className="text-4xl font-extrabold text-Blue">10,000+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900">Smart Reminders Sent</p>
                    <p className="mt-2 text-lg text-gray-900">Keeping students on track with their studies</p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Home