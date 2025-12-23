import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

// Interfaces
interface SerialPortInfo {
    path: string;
    manufacturer?: string;
}

interface SerialSettings {
    path: string;
    baudRate: number;
    dataBits: number;
    parity: string;
    stopBits: number;
    unit: string;
}

interface SerialContextType {
    socket: Socket | null;
    isConnected: boolean;
    liveWeight: string;
    ports: SerialPortInfo[];
    settings: SerialSettings;
    updateSettings: (newSettings: Partial<SerialSettings>) => void;
    connect: () => void;
    refreshPorts: () => void;
}

const SerialContext = createContext<SerialContextType | undefined>(undefined);

export const SerialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [liveWeight, setLiveWeight] = useState<string>('0.000');
    const [ports, setPorts] = useState<SerialPortInfo[]>([]);

    // Default Settings
    const [settings, setSettingsState] = useState<SerialSettings>({
        path: '',
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        unit: 'Kg'
    });

    // Helper to update settings and persist
    const updateSettings = (newSettings: Partial<SerialSettings>) => {
        setSettingsState(prev => {
            const updated = { ...prev, ...newSettings };
            return updated;
        });
    };

    // Initialize Socket
    useEffect(() => {
        const newSocket = io('http://localhost:4000');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        newSocket.on('weight:update', (weight: string) => {
            setLiveWeight(weight);
        });

        newSocket.on('serial:status', (status: { connected: boolean, port?: string, error?: string }) => {
            setIsConnected(status.connected);
            if (status.connected) {
                if (status.port) {
                    toast.success(`Connected to ${status.port}`, { id: 'serial-connected' }); // Use ID to prevent duplicates
                    updateSettings({ path: status.port });
                }
            } else {
                // Fail-safe: Hardware removed / not connected
                setLiveWeight('0.000');
                if (status.error) {
                    // Optional: toast.error(`Serial Error: ${status.error}`); 
                    // Too many error toasts might be annoying during auto-reconnect loop
                }
            }
        });

        newSocket.on('serial:ports', (availablePorts: SerialPortInfo[]) => {
            setPorts(availablePorts);
        });

        return () => {
            newSocket.close();
            console.log('Socket closed');
        };
    }, []);

    // Auto-Connect (On Load) AND Auto-Reconnect (On Disconnect Loop)
    useEffect(() => {
        // Initial Load Logic
        const savedRaw = localStorage.getItem('serialSettings');
        if (savedRaw) {
            try {
                const saved = JSON.parse(savedRaw);
                // Only update state if it's the initial load to prevent loop quirks
                if (!settings.path) {
                    setSettingsState(prev => ({ ...prev, ...saved }));
                }
            } catch (e) { console.error(e); }
        }

        // Reconnect Interval
        let intervalId: ReturnType<typeof setInterval>;

        if (!isConnected && socket && settings.path) {
            console.log('Context: Connection lost or not active. Starting auto-reconnect loop...');

            // Try immediately once
            const tryConnect = () => {
                socket.emit('serial:config', {
                    path: settings.path,
                    baudRate: Number(settings.baudRate),
                    dataBits: Number(settings.dataBits),
                    parity: settings.parity,
                    stopBits: Number(settings.stopBits)
                });
            };

            // Then every 3 seconds
            intervalId = setInterval(() => {
                console.log('Context: Retrying connection...');
                tryConnect();
            }, 3000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [socket, isConnected, settings.path]); // Dependency ensures this runs when connection drops

    // Save settings to localstorage whenever they change
    useEffect(() => {
        localStorage.setItem('serialSettings', JSON.stringify(settings));
    }, [settings]);

    const connect = () => {
        if (!socket) return;
        if (!settings.path) {
            toast.error('Please select a COM port');
            return;
        }
        socket.emit('serial:config', {
            path: settings.path,
            baudRate: Number(settings.baudRate),
            dataBits: Number(settings.dataBits),
            parity: settings.parity,
            stopBits: Number(settings.stopBits)
        });
    };

    const refreshPorts = () => {
        if (socket) socket.emit('serial:list-ports');
    };

    return (
        <SerialContext.Provider value={{
            socket,
            isConnected,
            liveWeight,
            ports,
            settings,
            updateSettings,
            connect,
            refreshPorts
        }}>
            {children}
        </SerialContext.Provider>
    );
};

export const useSerial = () => {
    const context = useContext(SerialContext);
    if (context === undefined) {
        throw new Error('useSerial must be used within a SerialProvider');
    }
    return context;
};
