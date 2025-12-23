import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { masterApi } from '../api/master';
import { useSerial } from '../context/SerialContext';
import FirstWeight from './wlog/FirstWeight';
import SecondWeight from './wlog/SecondWeight';
import SingleWeight from './wlog/SingleWeight';

type TabId = 'firstWeight' | 'secondWeight' | 'singleWeight';

const Wlog: React.FC = () => {
    const { isConnected, liveWeight, settings } = useSerial();
    const [activeTab, setActiveTab] = useState<TabId>('firstWeight');
    const [modes, setModes] = useState<any[]>([]);

    useEffect(() => {
        const loadModes = async () => {
            try {
                const data = await masterApi.getModes();
                setModes(data);
            } catch (error) {
                console.error('Error loading modes:', error);
            }
        };
        loadModes();
    }, []);

    const handleEntryCreated = () => {
        // Optional: Switch tab or show notification
        // For now, we can stay on the same tab or switch to Second Weight to see the list?
        // User requirements didn't specify auto-switching.
        // But refreshing the list in SecondWeight might be good if we were there.
        // Since SecondWeight fetches its own data on mount/update, we rely on user action.
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <Toaster position="top-right" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Weighbridge Log</h1>
                <p className="text-gray-600">Manage vehicle weight entries and transactions</p>
            </div>

            {/* Live Weight Display */}
            <div className="mb-8 flex justify-center">
                <div className="bg-black overflow-hidden shadow-2xl rounded-xl border border-gray-800 relative min-w-[300px]">
                    <div
                        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
                        title={isConnected ? "Hardware Connected" : "Hardware Disconnected"}
                    ></div>
                    <div className="px-6 py-6 sm:p-8 text-center">
                        <h2 className="text-sm leading-6 font-medium text-green-400 uppercase tracking-widest font-mono mb-2">
                            Live Scale Weight
                        </h2>
                        <div
                            className="text-6xl sm:text-7xl font-bold text-green-400 font-mono tracking-tighter"
                            style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
                        >
                            {liveWeight}
                            {settings.unit !== 'off' && (
                                <span className="text-2xl sm:text-3xl ml-2 text-green-600 align-top mt-2 inline-block">
                                    {settings.unit}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    <button
                        className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 whitespace-nowrap ${activeTab === 'firstWeight'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        onClick={() => setActiveTab('firstWeight')}
                    >
                        First Weight Entry
                    </button>
                    <button
                        className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 whitespace-nowrap ${activeTab === 'secondWeight'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        onClick={() => setActiveTab('secondWeight')}
                    >
                        Second Weight Entry
                    </button>
                    <button
                        className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 whitespace-nowrap ${activeTab === 'singleWeight'
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        onClick={() => setActiveTab('singleWeight')}
                    >
                        Single Weight Entry
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'firstWeight' && (
                    <FirstWeight
                        modes={modes}
                        liveWeight={liveWeight}
                        onEntryCreated={handleEntryCreated}
                    />
                )}
                {activeTab === 'secondWeight' && (
                    <SecondWeight
                        modes={modes}
                        liveWeight={liveWeight}
                    />
                )}
                {activeTab === 'singleWeight' && (
                    <SingleWeight
                        modes={modes}
                        liveWeight={liveWeight}
                    />
                )}
            </div>
        </div>
    );
};

export default Wlog;
