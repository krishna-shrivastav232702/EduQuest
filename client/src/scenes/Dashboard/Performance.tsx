import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/contexts/AuthProvider';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


interface PerformanceDataItem {
    date: string;
    score: number;
}


const Performance = () => {
    const [performanceData, setPerformanceData] = useState<PerformanceDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("AuthProvider must be valid");
    }
    const { currUser } = auth;

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                if (!currUser?.id) {
                    throw new Error("User ID not found");
                }

                const response = await axios.get<PerformanceDataItem[]>(`http://localhost:7008/dashboard/performance/${currUser.id}`);
                if (!response.data) {
                    throw new Error("No data received");
                }

                const formattedData = response.data.map(item => ({
                    ...item,
                    date: new Date(item.date).toLocaleDateString(),
                    score: Number(item.score)
                })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                setPerformanceData(formattedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch performance data");
            } finally {
                setLoading(false);
            }
        };

        fetchPerformance();
    }, [currUser?.id]);

    const calculateStats = () => {
        if (!performanceData.length) return { avg: 0, highest: 0, lowest: 0, recent: 0 };

        const scores = performanceData.map(item => item.score);
        return {
            avg: Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)),
            highest: Math.max(...scores),
            lowest: Math.min(...scores),
            recent: scores[scores.length - 1]
        };
    };

    const stats = calculateStats();

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                Error loading performance data: {error}
            </div>
        );
    }

    if (!currUser) {
        return (
            <div className="p-4 text-yellow-500">
                Please log in to view your performance data.
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded shadow">
                    <p className="font-medium">Date: {label}</p>
                    <p className="text-blue-600">Score: {payload[0].value}/10</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Performance Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.avg}/10</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Highest Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">{stats.highest}/10</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Lowest Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-600">{stats.lowest}/10</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Most Recent Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-600">{stats.recent}/10</p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Trend Chart */}
            <Card className="p-6">
                <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px] w-full">
                        {performanceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12 }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis
                                        domain={[0, 10]}
                                        ticks={[0, 2, 4, 6, 8, 10]}
                                        tick={{ fontSize: 12 }}
                                        label={{ value: 'Score (out of 10)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={{ fill: '#2563eb' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-500">
                                No performance data available
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Performance;