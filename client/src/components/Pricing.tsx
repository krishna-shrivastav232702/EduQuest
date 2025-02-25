
const Pricing = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-6xl font-bold text-blue-600 mb-6">Pricing Plans</h1>
                    <p className="text-2xl text-gray-700">
                        Choose the perfect plan for your test preparation journey
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Basic Plan */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic</h2>
                            <div className="text-blue-600 mb-4">
                                <span className="text-4xl font-bold">$9.99</span>
                                <span className="text-gray-600">/month</span>
                            </div>
                            <p className="text-gray-600">Perfect for individual subject preparation</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">50 AI-generated questions per day</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Basic performance analytics</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Study reminders</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Single subject focus</p>
                            </div>
                        </div>
                        <button className="w-full py-3 px-6 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-blue-600 rounded-2xl shadow-sm p-8 transform scale-105">
                        <div className="text-center mb-8">
                            <div className="text-white inline-block px-4 py-1 rounded-full bg-blue-500 text-sm font-medium mb-4">
                                MOST POPULAR
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Pro</h2>
                            <div className="text-white mb-4">
                                <span className="text-4xl font-bold">$19.99</span>
                                <span>/month</span>
                            </div>
                            <p className="text-blue-100">Ideal for comprehensive exam preparation</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="text-white">✓</div>
                                <p className="text-blue-100">Unlimited AI-generated questions</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-white">✓</div>
                                <p className="text-blue-100">Advanced analytics dashboard</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-white">✓</div>
                                <p className="text-blue-100">Smart study schedule</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-white">✓</div>
                                <p className="text-blue-100">Multi-subject support</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-white">✓</div>
                                <p className="text-blue-100">Progress predictions</p>
                            </div>
                        </div>
                        <button className="w-full py-3 px-6 text-lg font-medium bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium</h2>
                            <div className="text-blue-600 mb-4">
                                <span className="text-4xl font-bold">$29.99</span>
                                <span className="text-gray-600">/month</span>
                            </div>
                            <p className="text-gray-600">For intensive test preparation</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Everything in Pro plan</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">1-on-1 AI tutoring sessions</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Personalized study paths</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Priority support</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-blue-600">✓</div>
                                <p className="text-gray-600">Advanced performance insights</p>
                            </div>
                        </div>
                        <button className="w-full py-3 px-6 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;