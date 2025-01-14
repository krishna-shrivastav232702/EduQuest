import { ClipboardList } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import image from "../../assets/ai-technology.png"

interface ProjectStats {
    totalTests: number;
    growthPercentage: number;
    totalProjectsIncrease: number;
    stats: {
        finished: number;
        inProgress: number;
        upcoming: number;
    };
}





const Home = () => {

    const stats: ProjectStats = {
        totalTests: 1475,
        growthPercentage: 45,
        totalProjectsIncrease: 126,
        stats: {
            finished: 70,
            inProgress: 40,
            upcoming: 20
        }
    };

    const ProgressBar = ({ value }: { value: number }) => (
        <div className="w-full bg-gray-200 rounded h-2">
            <div
                className="h-full bg-Blue rounded transition-all duration-500"
                style={{ width: `${value}%` }}
            />
        </div>
    );

    // Circular progress component
    const CircularProgress = () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#edf2f7"
                    strokeWidth="8"
                    fill="none"
                />
                <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="Blue"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - 45 / 100)}`}
                    className="transition-all duration-500"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-Blue font-medium">
                45%
            </div>
        </div>
    );
    return (
        <div className="bg-White px-20 py-12 " >
            <motion.div className="text-center" initial={{ scale: 0.6 }} animate={{ scale: 1, transition: { duration: 1, type: "spring" } }}>
                <h1 className="text-7xl font-bold text-gray-800 px-[200px] pt-[50px] pb-8 mt-6 ">
                    The Future of Personalized Learning <br /> with{" "}
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
                <img src={image} className="w-14 ml-[250px] mt-[-80px] mt-8 h-14" />
                <ClipboardList size={40} className="ml-[1400px] mt-4" />
            </motion.div>
            <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-center" >
                <motion.div style={{ boxShadow: '7px 7px 0px 0px rgba(50, 44, 197, 1)' }} initial={{ scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, ease: "easeInOut", duration: 0.25 }} className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center ">
                    <h2 className="text-4xl font-extrabold text-Blue">5000+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900 ">AI-Generated Tests</p>
                    <p className="mt-2 text-lg text-gray-900">Helping students practice smarter</p>
                </motion.div>

                <motion.div style={{ boxShadow: '7px 7px 0px 0px rgba(50, 44, 197, 1)' }} initial={{ scaleY: 0, transformOrigin: "top" }} animate={{ scaleY: 1 }} transition={{ delay: 1.5, ease: "easeInOut", duration: 0.3 }} className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center ">
                    <h2 className="text-4xl font-extrabold text-Blue">12000+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900">Students Served</p>
                    <p className="mt-2 text-lg text-gray-900">Growing by 250+ new users each month</p>
                </motion.div>

                <motion.div style={{ boxShadow: '7px 7px 0px 0px rgba(50, 44, 197, 1)' }} initial={{ scaleY: 0, transformOrigin: "top" }} animate={{ scaleY: 1 }} transition={{ delay: 1.5, ease: "easeInOut", duration: 0.3 }} className=" rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center ">
                    <h2 className="text-4xl font-extrabold text-Blue">2+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900">Years of Excellence</p>
                    <p className="mt-2 text-lg text-gray-900">Continuously innovating in education</p>
                </motion.div>

                <motion.div style={{ boxShadow: '7px 7px 0px 0px rgba(50, 44, 197, 1)' }} initial={{ scaleX: 0, transformOrigin: "right" }} animate={{ scaleX: 1 }} transition={{ delay: 1, ease: "easeInOut", duration: 0.25 }} className="rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 h-[200px] flex flex-col item-center border border-Blue border-2 justify-center ">
                    <h2 className="text-4xl font-extrabold text-Blue">10,000+</h2>
                    <p className="mt-4 text-xl font-bold text-gray-900">Smart Reminders Sent</p>
                    <p className="mt-2 text-lg text-gray-900">Keeping students on track with their studies</p>
                </motion.div>
            </motion.div>
            {/* next page  starts */}
            <motion.div initial={{ opacity: 0, translateY: 50 }} transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }} whileInView={{ opacity: 1, translateY: 0 }} className="max-w-full  h-[850px] mt-[200px] flex justify-around gap-20">
                <div className="bg-White  w-1/2 flex  items-center justify-center ">
                    <div className=" min-w-[500px]  ">
                        <div className="min-w-2xl p-8 ">
                            <div className="text-center font-bold text-3xl mt-6 mb-10 ">Performance Overview</div>
                            {/* First Card - Project Status */}
                            <motion.div initial={{ scaleX: 0, transformOrigin: "left", opacity: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1, ease: "easeOut", duration: 0.7 }} className="bg-White rounded-lg shadow-lg p-8 mb-8 ">
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <h2 className="text-gray-600 text-lg mb-2">Total Tests</h2>
                                        <div className="flex items-center gap-3">
                                            <span className="text-4xl font-semibold">{stats.totalTests}</span>
                                            <span className="text-lg text-Blue">
                                                ↑ {stats.growthPercentage}%
                                            </span>
                                        </div>
                                    </div>
                                    <CircularProgress />
                                </div>

                                <div className="space-y-6">
                                    {Object.entries(stats.stats).map(([key, value]) => (
                                        <div key={key} className="space-y-2">
                                            <div className="flex justify-between text-base">
                                                <span className="text-gray-600">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </span>
                                                <span>{value}%</span>
                                            </div>
                                            <motion.div initial={{ scaleX: 0, transformOrigin: "left", opacity: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.25, ease: "easeOut", duration: 1 }} ><ProgressBar value={value} /></motion.div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Second Card - Monthly Growth */}
                            <motion.div initial={{ scaleY: 0, transformOrigin: "bottom", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2, ease: "easeOut", duration: 1 }} className="bg-White rounded-lg shadow-lg p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-gray-600 text-lg mb-2">Total Tests Prediction</h2>
                                        <div className="text-4xl font-semibold mb-2">1951+</div>
                                        <div className="text-base text-gray-600">
                                            Increase of{" "}
                                            <span className="text-Blue">{stats.totalProjectsIncrease}</span>{" "}
                                            this month
                                        </div>
                                    </div>
                                    <div className="bg-Blue p-3 rounded-lg">
                                        <span className="text-White text-lg">↑ 8%</span>
                                    </div>
                                </div>

                                {/* Fixed Bar Graph */}
                                <motion.div className="flex justify-between items-end gap-4 h-40 mt-6">
                                    <motion.div initial={{ scaleY: 0, transformOrigin: "bottom", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2, ease: "easeOut", duration: 1 }} className="w-16 bg-blue-900 rounded-md h-full"></motion.div>
                                    <motion.div initial={{ scaleY: 0, transformOrigin: "bottom", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2, ease: "easeOut", duration: 1 }} className="w-16 bg-Blue rounded-md h-3/4"></motion.div>
                                    <motion.div initial={{ scaleY: 0, transformOrigin: "bottom", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2, ease: "easeOut", duration: 1 }} className="w-16 bg-blue-900/80 rounded-md h-1/2"></motion.div>
                                    <motion.div initial={{ scaleY: 0, transformOrigin: "bottom", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2, ease: "easeOut", duration: 1 }} className="w-16 bg-Blue/70 rounded-md h-5/6"></motion.div>
                                </motion.div>
                            </motion.div>
                        </div>

                    </div>
                </div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-1/2 p-4  mt-4">
                    <h1 className="text-4xl font-extrabold mb-8">Key Benefits of EduQuest for Smarter Learning</h1>
                    <div className="flex flex-col  justify-center  min-h-[600px] items-center gap-4">
                        <h2 className="text-gray-800 font-medium mb-6 text-lg">EduQuest provides personalized, AI-driven learning experiences, helping students stay organized, enhance performance, and achieve their academic goals with smart reminders and tailored test generation.</h2>
                        <div className="space-y-8">
                            <motion.div initial={{ scaleY: 0, transformOrigin: "top", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2.5, ease: "easeIn", duration: 0.5 }} className="border p-6 rounded-lg shadow-md bg-white" >
                                <h3 className="text-2xl font-bold mb-2">AI-Powered Test Generation</h3>
                                <p className="text-lg font-medium text-gray-700">
                                    Using the advanced Gemini AI model, EduQuest delivers personalized tests that adapt to your learning pace and strengths, helping you improve continuously.
                                </p>
                            </motion.div>
                            <motion.div initial={{ scaleY: 0, transformOrigin: "top", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 2.75, ease: "easeInOut", duration: 0.5 }} className="border p-6 rounded-lg shadow-md bg-white">
                                <h3 className="text-2xl font-bold mb-2">Smart Reminders for Better Performance</h3>
                                <p className="text-lg font-medium text-gray-700">
                                    Stay on track with AI-driven reminders for upcoming tests and study sessions, ensuring you never miss important milestones.
                                </p>
                            </motion.div>
                            <motion.div initial={{ scaleY: 0, transformOrigin: "top", opacity: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ delay: 3, ease: "easeInOut", duration: 0.5 }} className="border p-6 rounded-lg shadow-md bg-white">
                                <h3 className="text-2xl font-bold mb-2">Actionable Insights for Students</h3>
                                <p className="text-lg font-medium text-gray-700">
                                    Track your progress with detailed insights, helping you focus on areas for improvement and maximize your learning potential.
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>

            </motion.div>


        </div >
    )
}

export default Home