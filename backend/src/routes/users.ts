import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { not, eq, like, or, and, sql } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

router.use(authMiddleware);

// Get Users (exclude Admins)
router.get('/', async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string;

        // Base condition: Not Admins (based on role)
        const baseCondition = and(
            not(eq(users.rid, 1)) // Assuming role 1 is admin
        );

        const whereClause = search ? and(
            baseCondition,
            like(users.fname, `%${search}%`)
        ) : baseCondition;

        const { page, limit, offset } = getPaginationParams(req);

        // Count
        const countResult = await db.select({ count: sql`count(*)` }).from(users).where(whereClause);
        // @ts-ignore
        const total = Number(countResult[0].count);

        const result = await db.select({
            id: users.id,
            username: users.uname,
            fname: users.fname,
            email: users.email,
            mobile: users.mobile,
            apikey: users.apikey,
            rid: users.rid,
            pid: users.pid
        }).from(users).where(whereClause).limit(limit).offset(offset);

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Roles
router.get('/roles', async (req: Request, res: Response) => {
    try {
        const roles = [
            { id: 1, name: 'Admin', description: 'Full system access' },
            { id: 2, name: 'Manager', description: 'Can manage users and operations' },
            { id: 3, name: 'User', description: 'Limited access to specific functions' }
        ];
        
        res.json({
            success: true,
            data: roles
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Privileges
router.get('/privileges', async (req: Request, res: Response) => {
    try {
        const privileges = [
            { id: 1, name: 'Full Access', description: 'Complete system access' },
            { id: 2, name: 'Read Only', description: 'Can view data but cannot modify' },
            { id: 3, name: 'Limited Access', description: 'Restricted access to specific features' }
        ];
        
        res.json({
            success: true,
            data: privileges
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
