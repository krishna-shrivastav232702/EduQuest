import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/contexts/AuthProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Award, CheckCircle } from "lucide-react";

// const Dashboard = () => {
//     const [overview, setOverview] = useState<{ totalTests: number; averageScore: number; highestScore: number } | null>(null);
//     const [performance, setPerformance] = useState<{ date: string; score: number }[]>([]);
//     const [reminders, setReminders] = useState<{ testDate: string; emailSent: boolean }[]>([]);
//     const [loading, setLoading] = useState(true);

//     const auth = useContext(AuthContext);
//     if (!auth) {
//         throw new Error("Authprovider must be valid");
//     }

//     const { currUser } = auth;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const overviewRes = await axios.get(`http://localhost:7008/dashboard/overview/${currUser?.id}`);
//                 setOverview(overviewRes.data);
//                 const performanceRes = await axios.get(`http://localhost:7008/dashboard/performance/${currUser?.id}`);
//                 setPerformance(performanceRes.data);
//                 const reminderRes = await axios.get(`http://localhost:7008/dashboard/reminders/${currUser?.id}`);
//                 setReminders(reminderRes.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching dashboard data", error);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [currUser?.id]);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="text-lg text-gray-600 flex items-center gap-2">
//                     <Activity className="animate-pulse" />
//                     Loading Dashboard...
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen max-w-7xl mx-auto">
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Overview Cards */}
//                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//                     <CardHeader>
//                         <CardTitle className="text-xl flex items-center gap-2">
//                             <Activity className="w-5 h-5 text-blue-500" />
//                             Performance Overview
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid grid-cols-3 gap-4">
//                             <div className="text-center p-4 bg-blue-50 rounded-lg">
//                                 <p className="text-3xl font-bold text-blue-600">{overview?.totalTests}</p>
//                                 <p className="text-gray-600 mt-1">Total Tests</p>
//                             </div>
//                             <div className="text-center p-4 bg-green-50 rounded-lg">
//                                 <p className="text-3xl font-bold text-green-600">{overview?.averageScore.toFixed(1)}</p>
//                                 <p className="text-gray-600 mt-1">Average Score</p>
//                             </div>
//                             <div className="text-center p-4 bg-purple-50 rounded-lg">
//                                 <p className="text-3xl font-bold text-purple-600">{overview?.highestScore}</p>
//                                 <p className="text-gray-600 mt-1">Highest Score</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Performance Chart */}
//                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//                     <CardHeader>
//                         <CardTitle className="text-xl flex items-center gap-2">
//                             <Award className="w-5 h-5 text-green-500" />
//                             Performance Trends
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="h-72">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={performance}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                                     <XAxis
//                                         dataKey="date"
//                                         stroke="#666"
//                                         tick={{ fill: '#666' }}
//                                     />
//                                     <YAxis
//                                         stroke="#666"
//                                         tick={{ fill: '#666' }}
//                                     />
//                                     <Tooltip
//                                         contentStyle={{
//                                             backgroundColor: 'white',
//                                             border: 'none',
//                                             borderRadius: '8px',
//                                             boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
//                                         }}
//                                     />
//                                     <Line
//                                         type="monotone"
//                                         dataKey="score"
//                                         stroke="#8b5cf6"
//                                         strokeWidth={3}
//                                         dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
//                                         activeDot={{ r: 6, fill: '#8b5cf6' }}
//                                     />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Reminders Section */}
//                 <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                     <CardHeader>
//                         <CardTitle className="text-xl flex items-center gap-2">
//                             <CheckCircle className="w-5 h-5 text-purple-500" />
//                             Upcoming Reminders
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         {reminders.length > 0 ? (
//                             <ul className="divide-y divide-gray-100">
//                                 {reminders.map((reminder, index) => (
//                                     <li
//                                         key={index}
//                                         className="flex justify-between items-center py-4 hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200"
//                                     >
//                                         <span className="text-gray-700 font-medium">
//                                             {new Date(reminder.testDate).toLocaleDateString()}
//                                         </span>
//                                         <span
//                                             className={`px-4 py-1.5 text-sm font-medium rounded-full ${reminder.emailSent
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-amber-100 text-amber-700"
//                                                 }`}
//                                         >
//                                             {reminder.emailSent ? "Notification Sent" : "Reminder Pending"}
//                                         </span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <div className="text-center py-8">
//                                 <p className="text-gray-500">No upcoming reminders at this time.</p>
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };
const Dashboard = () => {
    const [overview, setOverview] = useState<{ totalTests: number; averageScore: number; highestScore: number } | null>(null);
    const [performance, setPerformance] = useState<{ date: string; score: number }[]>([]);
    const [reminders, setReminders] = useState<{ testDate: string; emailSent: boolean }[]>([]);
    const [loading, setLoading] = useState(true);

    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("Authprovider must be valid");
    }

    const { currUser } = auth;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const overviewRes = await axios.get(`http://localhost:7008/dashboard/overview/${currUser?.id}`);
                setOverview(overviewRes.data);
                const performanceRes = await axios.get(`http://localhost:7008/dashboard/performance/${currUser?.id}`);
                setPerformance(performanceRes.data);
                const reminderRes = await axios.get(`http://localhost:7008/dashboard/reminders/${currUser?.id}`);
                setReminders(reminderRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [currUser?.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600 flex items-center gap-2">
                    <Activity className="animate-pulse" />
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 bg-gray-50 min-h-screen max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overview Cards */}
                <Card className="shadow-md hover:shadow-lg rounded-2xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-500" />
                            Performance Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-blue-100 rounded-lg shadow-sm">
                                <p className="text-3xl font-semibold text-blue-700">{overview?.totalTests}</p>
                                <p className="text-gray-600 mt-1">Total Tests</p>
                            </div>
                            <div className="text-center p-4 bg-green-100 rounded-lg shadow-sm">
                                <p className="text-3xl font-semibold text-green-700">{overview?.averageScore.toFixed(1)}</p>
                                <p className="text-gray-600 mt-1">Average Score</p>
                            </div>
                            <div className="text-center p-4 bg-purple-100 rounded-lg shadow-sm">
                                <p className="text-3xl font-semibold text-purple-700">{overview?.highestScore}</p>
                                <p className="text-gray-600 mt-1">Highest Score</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card className="shadow-md hover:shadow-lg rounded-2xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-500" />
                            Performance Trends
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performance}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b' }} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#8b5cf6' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Reminders Section */}
                <Card className="lg:col-span-2 shadow-md hover:shadow-lg rounded-2xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-purple-500" />
                            Upcoming Reminders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {reminders.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {reminders.map((reminder, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center py-4 hover:bg-gray-100 px-6 rounded-lg transition-colors duration-200"
                                    >
                                        <span className="text-gray-700 font-medium">
                                            {new Date(reminder.testDate).toLocaleDateString()}
                                        </span>
                                        <span
                                            className={`px-4 py-1.5 text-sm font-medium rounded-full ${reminder.emailSent
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {reminder.emailSent ? "Notification Sent" : "Reminder Pending"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No upcoming reminders at this time.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};


export default Dashboard;