import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { not, eq, like, or, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

// Get Users (exclude Admins)
router.get('/', async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string;

        // Base condition: Not Admins
        // Note: In PHP it was "NOT type='Admins' AND NOT type='Administrator'"
        // Drizzle specific filter construction

        let whereClause = and(
            not(eq(users.type, 'Admins')),
            not(eq(users.type, 'Administrator'))
        );

        if (search) {
            whereClause = and(
                whereClause,
                like(users.empname, `%${search}%`)
            );
        }

        const result = await db.select({
            id: users.id,
            username: users.username,
            empname: users.empname,
            empdest: users.empdest,
            empcode: users.empcode,
            email: users.email,
            mobile: users.mobile,
            rights: users.rights
        }).from(users).where(whereClause);

        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
