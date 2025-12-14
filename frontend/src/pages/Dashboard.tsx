import React, { useState } from 'react';

const Dashboard: React.FC = () => {
    const [liveWeight] = useState<string>('No Device');

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Live Weight Display */}
            <div className="bg-black overflow-hidden shadow-2xl rounded-xl border border-gray-800">
                <div className="px-4 py-5 sm:p-6 text-center">
                    <h1 className="text-lg leading-6 font-medium text-green-400 uppercase tracking-widest font-orbitron">Live Weight</h1>
                    <div className="mt-2 text-9xl font-bold text-green-400 font-orbitron" style={{ textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00' }}>
                        {liveWeight}<span className="text-4xl ml-4 text-green-300">kg</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
