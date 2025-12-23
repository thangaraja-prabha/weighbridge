import React, { useState, useEffect } from 'react';
import { Settings, X, RefreshCw } from 'lucide-react';
import { useSerial } from '../context/SerialContext';

const Dashboard: React.FC = () => {
    // Consume Global Context
    const {
        isConnected,
        liveWeight,
        ports,
        settings,
        updateSettings,
        connect,
        refreshPorts
    } = useSerial();

    // Local UI State
    const [showSettings, setShowSettings] = useState(false);

    // Fetch ports when settings open
    useEffect(() => {
        if (showSettings) {
            refreshPorts();
        }
    }, [showSettings, refreshPorts]);

    const handleConnect = () => {
        connect();
        setShowSettings(false);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gray-900">

            {/* Settings Button */}
            <button
                onClick={() => setShowSettings(true)}
                className="absolute top-4 right-4 p-2 bg-gray-800 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
            >
                <Settings size={24} />
            </button>

            {/* Live Weight Display */}
            <div className="bg-black overflow-hidden shadow-2xl rounded-xl border border-gray-800 relative">
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} title={isConnected ? "Hardware Connected" : "Hardware Disconnected"}></div>
                <div className="px-4 py-5 sm:p-6 text-center">
                    <h1 className="text-lg leading-6 font-medium text-green-400 uppercase tracking-widest font-orbitron">Live Weight</h1>
                    <div className="mt-2 text-9xl font-bold text-green-400 font-orbitron" style={{ textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00' }}>
                        {liveWeight}
                        {settings.unit !== 'off' && <span className="text-4xl ml-4 text-green-300">{settings.unit}</span>}
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto shadow-xl border border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">Hardware Settings</h2>
                            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Port Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">COM Port</label>
                                <div className="flex gap-2">
                                    <select
                                        value={settings.path}
                                        onChange={(e) => updateSettings({ path: e.target.value })}
                                        className="flex-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2"
                                    >
                                        <option value="">Select Port</option>
                                        {ports.map((port) => (
                                            <option key={port.path} value={port.path}>
                                                {port.path} {port.manufacturer ? `(${port.manufacturer})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={refreshPorts}
                                        className="p-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
                                        title="Refresh Ports"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Baud Rate Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Baud Rate</label>
                                <select
                                    value={settings.baudRate}
                                    onChange={(e) => updateSettings({ baudRate: Number(e.target.value) })}
                                    className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2"
                                >
                                    {[1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200].map(rate => (
                                        <option key={rate} value={rate}>{rate}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {/* Data Bits */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Data Bits</label>
                                    <select
                                        value={settings.dataBits}
                                        onChange={(e) => updateSettings({ dataBits: Number(e.target.value) })}
                                        className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2"
                                    >
                                        <option value="8">8</option>
                                        <option value="7">7</option>
                                        <option value="6">6</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>

                                {/* Parity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Parity</label>
                                    <select
                                        value={settings.parity}
                                        onChange={(e) => updateSettings({ parity: e.target.value })}
                                        className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2"
                                    >
                                        <option value="none">None</option>
                                        <option value="even">Even</option>
                                        <option value="odd">Odd</option>
                                        <option value="mark">Mark</option>
                                        <option value="space">Space</option>
                                    </select>
                                </div>

                                {/* Stop Bits */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Stop Bits</label>
                                    <select
                                        value={settings.stopBits}
                                        onChange={(e) => updateSettings({ stopBits: Number(e.target.value) })}
                                        className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2"
                                    >
                                        <option value="1">1</option>
                                        <option value="1.5">1.5</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            {/* Unit Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Unit</label>
                                <select
                                    value={settings.unit}
                                    onChange={(e) => updateSettings({ unit: e.target.value })}
                                    className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-3 py-2"
                                >
                                    <option value="t">t (Tonnes)</option>
                                    <option value="Kg">Kg (Kilograms)</option>
                                    <option value="lb">lb (Pounds)</option>
                                    <option value="g">g (Grams)</option>
                                    <option value="off">Unit Off</option>
                                </select>
                            </div>

                            <button
                                onClick={handleConnect}
                                className="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {isConnected && settings.path ? 'Update Connection' : 'Connect'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
