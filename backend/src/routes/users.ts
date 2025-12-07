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

        // Base condition: Not Admins
        const baseCondition = and(
            not(eq(users.type, 'Admins')),
            not(eq(users.type, 'Administrator'))
        );

        const whereClause = search ? and(
            baseCondition,
            like(users.empname, `%${search}%`)
        ) : baseCondition;

        const { page, limit, offset } = getPaginationParams(req);

        // Count
        const countResult = await db.select({ count: sql`count(*)` }).from(users).where(whereClause);
        // @ts-ignore
        const total = Number(countResult[0].count);

        const result = await db.select({
            id: users.id,
            username: users.username,
            empname: users.empname,
            empdest: users.empdest,
            empcode: users.empcode,
            email: users.email,
            mobile: users.mobile,
            rights: users.rights
        }).from(users).where(whereClause).limit(limit).offset(offset);

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
