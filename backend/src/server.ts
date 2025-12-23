import { createServer } from 'http';
import { Server } from 'socket.io';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import masterRoutes from './routes/master';
import userRoutes from './routes/users';
import reportRoutes from './routes/reports';
import weighmentRoutes from './routes/weighment';
import kycRoutes from './routes/kyc';
import tableRoutes from './routes/tables';
import wlogRoutes from './routes/wlog';
import { testConnection } from './db';

// Load environment variables
dotenv.config();


const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 4000;

// --- Serial Port Logic ---
let activePort: SerialPort | null = null;
let currentConfig = {
    path: '',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
};

// Function to open serial port
const openSerialPort = (config: { path: string, baudRate: number, dataBits?: number, parity?: string, stopBits?: number }) => {
    if (activePort && activePort.isOpen) {
        activePort.close();
    }

    // If no path provided, don't attempt (or handle graceful 'disconnected' state)
    if (!config.path) return;

    try {
        // cast to any to avoid strict type checking on dynamic properties if necessary, or just rely on JS flexibility
        const portConfig: any = {
            path: config.path,
            baudRate: config.baudRate,
            dataBits: config.dataBits || 8,
            parity: config.parity || 'none',
            stopBits: config.stopBits || 1,
            autoOpen: false
        };
        const port = new SerialPort(portConfig);

        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

        port.open((err) => {
            if (err) {
                console.error('Error opening port:', err.message);
                io.emit('serial:status', { connected: false, error: err.message });
                return;
            }
            console.log(`Connected to ${config.path} [${config.baudRate}, ${config.dataBits}, ${config.parity}, ${config.stopBits}]`);
            io.emit('serial:status', { connected: true, port: config.path });
        });

        port.on('error', (err) => {
            console.error('Serial Port Error:', err.message);
            io.emit('serial:status', { connected: false, error: err.message });
        });

        port.on('close', () => {
            console.log('Serial port closed');
            activePort = null;
            // Fail-safe: Reset weight to 0 on disconnect
            io.emit('weight:update', '0.000');
            io.emit('serial:status', { connected: false });
        });

        parser.on('data', (data) => {
            // Trim whitespace and broadcast
            const weight = data.toString().trim();
            // console.log('Weight:', weight); 
            io.emit('weight:update', weight);
        });

        activePort = port;
        currentConfig = {
            path: config.path,
            baudRate: config.baudRate,
            dataBits: config.dataBits || 8,
            parity: config.parity || 'none',
            stopBits: config.stopBits || 1
        };

    } catch (error: any) {
        console.error("Failed to setup serial port:", error);
        io.emit('serial:status', { connected: false, error: error.message });
    }
};


// --- Client Tracking ---
let connectedClients = 0;

io.on('connection', (socket) => {
    connectedClients++;
    console.log(`Client connected. Total clients: ${connectedClients}`);

    // Send current status
    if (activePort && activePort.isOpen) {
        socket.emit('serial:status', { connected: true, port: currentConfig.path });
    } else {
        socket.emit('serial:status', { connected: false });
    }

    // Handle configuration requests
    socket.on('serial:config', (config) => {
        console.log('Received serial config:', config);
        openSerialPort(config);
    });

    // List ports request
    socket.on('serial:list-ports', async () => {
        try {
            const ports = await SerialPort.list();
            socket.emit('serial:ports', ports);
        } catch (error) {
            console.error('Error listing ports:', error);
            socket.emit('serial:ports', []);
        }
    });

    socket.on('disconnect', () => {
        connectedClients--;
        console.log(`Client disconnected. Total clients: ${connectedClients}`);

        // Auto-close port if no clients are connected
        if (connectedClients <= 0 && activePort && activePort.isOpen) {
            console.log('No active clients. Closing serial port...');
            activePort.close();
            activePort = null;
        }
    });
});


// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Build path
const buildPath = path.join(__dirname, '../../frontend/dist');
// Serve static files (React app)
app.use(express.static(buildPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/master', masterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/weighment', weighmentRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/wlog', wlogRoutes);

// Serve index.html for any other GET request (SPA fallback)
app.get('/{*splat}', (req: Request, res: Response) => {
    res.sendFile(path.join(buildPath, 'index.html'), (err) => {
        if (err) {
            // Prevent attempting to send response if headers already sent (though sendFile handles this mostly)
            if (!res.headersSent) {
                res.status(500).send('Error loading the application');
            }
        }
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.error('❌ Failed to connect to database. Please check your .env configuration.');
            process.exit(1);
        }

        httpServer.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════╗
║   🚀 Server is running on port ${PORT}   ║
║   📊 Database: Connected                ║
║   🌐 Environment: ${process.env.NODE_ENV || 'development'}          ║
╚════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
