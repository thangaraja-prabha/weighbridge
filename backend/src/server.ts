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
import { testConnection } from './db';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

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

// Serve index.html for any other GET request (SPA fallback)
app.get('/{*splat}', (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Error loading the application');
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

        app.listen(PORT, () => {
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
