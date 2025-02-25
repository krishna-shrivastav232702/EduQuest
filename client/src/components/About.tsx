
const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-6xl font-bold text-blue-600 mb-6">About EduQuest</h1>
                    <p className="text-2xl text-gray-700 font-semibold">
                        Revolutionizing Test Preparation with AI
                    </p>
                </div>

                {/* Main Description */}
                <div className="bg-white rounded-xl p-10 shadow-sm mb-16">
                    <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                        EduQuest is an innovative AI-powered platform designed to transform how students prepare for exams.
                        We understand that every student has unique learning needs, which is why we've developed
                        cutting-edge AI technology that adapts to your individual study patterns and creates
                        personalized test questions based on your learning materials.
                    </p>
                    <p className="text-gray-600 text-xl leading-relaxed">
                        Our mission is simple: help students practice smarter, not harder. We combine advanced
                        artificial intelligence with proven learning methodologies to create an efficient and
                        effective study experience.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-12 text-center">
                        Why Choose EduQuest?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">🤖</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                AI-Generated Tests
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Our AI engine analyzes your study material and creates custom questions
                                that target your specific learning needs.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Performance Insights
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Track your progress with detailed analytics and get personalized
                                recommendations for improvement.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">⏰</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Smart Reminders
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Stay on track with intelligent notifications that adapt to your
                                study schedule and goals.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <span className="text-3xl">✨</span>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Seamless Experience
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Enjoy an intuitive, user-friendly interface designed to make your
                                test preparation journey smooth and efficient.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white rounded-xl p-10 shadow-sm mb-16">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
                        The EduQuest Advantage
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-600 text-xl">Personalized learning paths adapted to your progress</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-600 text-xl">Real-time feedback on your performance</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-600 text-xl">AI-powered question generation that evolves with you</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-600 text-xl">Comprehensive progress tracking and analytics</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                        Ready to Transform Your Test Preparation?
                    </h2>
                    <p className="text-gray-600 text-xl mb-8">
                        Join thousands of students who are already experiencing the power of AI-driven learning.
                    </p>
                    <button className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-xl">
                        Get Started with EduQuest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;