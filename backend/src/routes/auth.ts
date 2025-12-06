import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Register endpoint
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, personName, email, mobile, password, rights } = req.body;

        // Validate required fields
        if (!username || !personName || !email || !password || !rights) {
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
            .where(eq(users.username, username))
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
        const result = await db.insert(users).values({
            username,
            empname: personName, // Map frontend personName to DB empname
            email,
            mobile: mobile || '',
            password: hashedPassword,
            rights,
            trn_date: new Date(),
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
            .where(eq(users.username, username))
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
        const isPasswordValid = await bcrypt.compare(password, user.password);

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
                username: user.username,
                rights: user.rights,
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
                    username: user.username,
                    personName: user.empname, // Map DB empname to frontend personName
                    email: user.email,
                    rights: user.rights,
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
                username: users.username,
                personName: users.empname, // Map DB empname to frontend personName
                email: users.email,
                mobile: users.mobile,
                rights: users.rights,
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
