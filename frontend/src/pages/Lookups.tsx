import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LookupCard {
    title: string;
    description: string;
    icon: string;
    route: string;
    gradient: string;
}

const Lookups: React.FC = () => {
    const navigate = useNavigate();

    const lookupCards: LookupCard[] = [
        {
            title: 'Vehicles',
            description: 'Manage vehicle details and tare weights',
            icon: '🚛',
            route: '/lookups/vehicles',
            gradient: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Transporters',
            description: 'Manage transporter information and contacts',
            icon: '🚚',
            route: '/lookups/transporters',
            gradient: 'from-green-500 to-green-600'
        },
        {
            title: 'Materials',
            description: 'Manage material types and descriptions',
            icon: '📦',
            route: '/lookups/materials',
            gradient: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Customers',
            description: 'Manage customer details and addresses',
            icon: '👥',
            route: '/lookups/customers',
            gradient: 'from-orange-500 to-orange-600'
        },
        {
            title: 'Suppliers',
            description: 'Manage supplier information and contacts',
            icon: '🏭',
            route: '/lookups/suppliers',
            gradient: 'from-red-500 to-red-600'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Lookup Management</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lookupCards.map((card) => (
                    <div
                        key={card.route}
                        onClick={() => navigate(card.route)}
                        className="cursor-pointer group"
                    >
                        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className={`bg-gradient-to-r ${card.gradient} p-6 text-white`}>
                                <div className="text-5xl mb-3">{card.icon}</div>
                                <h3 className="text-xl font-bold">{card.title}</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 text-sm">{card.description}</p>
                                <div className="mt-4 flex items-center text-primary group-hover:text-sky-600 transition-colors">
                                    <span className="text-sm font-medium">Manage</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lookups;
