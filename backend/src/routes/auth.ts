import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Helper function to generate API key
function generateApiKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Register endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, personName, email, mobile, password } = req.body;

        // Validate required fields
        if (!username || !personName || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
            return;
        }

        // Check if user already exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.uname, username))
            .limit(1);

        if (existingUser.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Username already exists',
            });
            return;
        }

        // Check if email already exists
        const existingEmail = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingEmail.length > 0) {
            res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const apikey = generateApiKey();
        const result = await db.insert(users).values({
            uname: username,
            fname: personName,
            email,
            mobile: mobile || '',
            pass: hashedPassword,
            rid: 1, // Default role
            pid: 1, // Default privilege
            comname: 'Default Company',
            comadd: '',
            comnum: '',
            comail: '',
            apikey: apikey,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: result[0].insertId,
                username,
                email,
            },
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide username and password',
            });
            return;
        }

        // Find user
        const userResult = await db
            .select()
            .from(users)
            .where(eq(users.uname, username))
            .limit(1);

        if (userResult.length === 0) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        const user = userResult[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.pass);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'default-secret-key';
        const token = jwt.sign(
            {
                id: user.id,
                uname: user.uname,
                fname: user.fname,
                apikey: user.apikey,
                rid: user.rid,
                pid: user.pid,
            },
            jwtSecret,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.uname,
                    personName: user.fname,
                    email: user.email,
                    mobile: user.mobile,
                    apikey: user.apikey,
                    rid: user.rid,
                    pid: user.pid,
                },
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        // Log detailed DB error if available
        if (error && typeof error === 'object' && 'sql' in error) {
            console.error('SQL Error:', (error as any).sql);
            console.error('SQL Message:', (error as any).sqlMessage);
        }

        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

// Get current user endpoint (protected)
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }

        // Fetch full user details
        const userResult = await db
            .select({
                id: users.id,
                username: users.uname,
                personName: users.fname,
                email: users.email,
                mobile: users.mobile,
                apikey: users.apikey,
                rid: users.rid,
                pid: users.pid,
            })
            .from(users)
            .where(eq(users.id, req.user.id))
            .limit(1);

        if (userResult.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.json({
            success: true,
            data: userResult[0],
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user data',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

export default router;
