import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthProvider';
import { useContext } from 'react';

const Reminder = () => {
    const auth = useContext(AuthContext);

    const [testDate, setTestDate] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    if (!auth) {
        throw new Error("Authprovider must be valid");
    }
    const { currUser } = auth;

    const userId = currUser?.id;

    // Create a new reminder
    const handleCreateReminder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!testDate) {
            setMessage({ text: 'Please select a test date', type: 'error' });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:7008/reminder/${userId}`, {
                testDate: new Date(testDate).toISOString(),
            });

            if (response.status === 200) {
                setMessage({ text: 'Reminder created successfully!', type: 'success' });
                setTestDate('');
            }
        } catch (err) {
            console.error('Error creating reminder:', err);
            setMessage({ text: 'Failed to create reminder. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto  mt-[250px]">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Set Test Reminder</h1>
                <p className="text-gray-600">
                    Set a reminder for your upcoming test. You'll receive an email notification one day before the test.
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                {message && (
                    <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleCreateReminder}>
                    <div className="mb-4">
                        <label htmlFor="testDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Test Date
                        </label>
                        <input
                            type="date"
                            id="testDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={testDate}
                            onChange={(e) => setTestDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]} // Prevent past dates
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            You will receive a reminder email one day before this date.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? 'Setting reminder...' : 'Set Reminder'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reminder;