import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const pricingPlans = [
        {
            name: 'Basic',
            price: '₹999',
            period: '/month',
            description: 'Perfect for small operations',
            features: [
                'Up to 50 weighments/month',
                'Basic reporting',
                'Email support',
                'Single user account',
                'Data backup for 30 days'
            ],
            icon: '📊',
            popular: false
        },
        {
            name: 'Professional',
            price: '₹2,499',
            period: '/month',
            description: 'Ideal for growing businesses',
            features: [
                'Unlimited weighments',
                'Advanced analytics & reports',
                'Priority support',
                'Up to 5 user accounts',
                'Data backup for 1 year',
                'API access',
                'Custom integrations'
            ],
            icon: '🚀',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'For large-scale operations',
            features: [
                'Everything in Professional',
                'Unlimited users',
                'Dedicated account manager',
                'On-premise deployment option',
                'Custom training & onboarding',
                'SLA guarantee',
                'Advanced security features'
            ],
            icon: '🏢',
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-primary">WeighBridge Pro</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute top-[30%] right-[0%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Professional <span className="text-primary">Weighbridge</span> Management
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Streamline your weighing operations with our comprehensive digital solution.
                        Track, manage, and analyze all your weighment data in one powerful platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="ml-4 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 shadow-lg"
                        >
                            Get Started Now
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200">
                            Request Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose WeighBridge Pro?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Built for efficiency, designed for simplicity, trusted by industry leaders.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                            <p className="text-gray-600">Process weighments in seconds with our optimized workflow and intuitive interface.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📈</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                            <p className="text-gray-600">Get detailed insights and reports to make data-driven decisions for your business.</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                            <p className="text-gray-600">Enterprise-grade security with automatic backups and 99.9% uptime guarantee.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Choose the perfect plan for your business. No hidden fees, no surprises.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl shadow-lg p-8 ${plan.popular
                                    ? 'ring-2 ring-primary transform scale-105'
                                    : 'border border-gray-200'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <div className="text-4xl mb-4">{plan.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                        <span className="text-gray-600 ml-1">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <svg
                                                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate('/login')}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${plan.popular
                                        ? 'bg-primary text-white hover:bg-sky-600'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                                        }`}
                                >
                                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">WeighBridge Pro</h3>
                    <p className="text-gray-400 mb-6">
                        Transforming weighbridge management with digital innovation
                    </p>
                    <div className="flex justify-center space-x-6">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            Sign In
                        </button>
                        <span className="text-gray-600">•</span>
                        <button className="text-gray-400 hover:text-white transition-colors duration-200">
                            Contact
                        </button>
                        <span className="text-gray-600">•</span>
                        <button className="text-gray-400 hover:text-white transition-colors duration-200">
                            Support
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-8">
                        © 2024 WeighBridge Pro. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
