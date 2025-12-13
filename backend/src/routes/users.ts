import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { not, eq, like, or, and, sql } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

router.use(authMiddleware);

import { roles, privillages } from '../db/schema';

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

        // Perform Left Joins manually or select all and map if not using relations API
        // For Drizzle standard query builder:
        const result = await db.select({
            id: users.id,
            username: users.uname,
            fname: users.fname,
            email: users.email,
            mobile: users.mobile,
            apikey: users.apikey,
            rid: users.rid,
            pid: users.pid,
            role: roles.role,
            privilege: privillages.privil,
            comname: users.comname,
            comadd: users.comadd,
            comnum: users.comnum,
            comail: users.comail
        })
            .from(users)
            .leftJoin(roles, eq(users.rid, roles.id))
            .leftJoin(privillages, eq(users.pid, privillages.id))
            .where(whereClause)
            .limit(limit)
            .offset(offset);

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Roles
router.get('/roles', async (req: Request, res: Response) => {
    try {
        const rolesData = await db.select().from(roles);
        const mappedRoles = rolesData.map(r => ({
            id: r.id,
            name: r.role,
            description: '' // DB doesn't have description currently
        }));

        res.json({
            success: true,
            data: mappedRoles
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Privileges
router.get('/privileges', async (req: Request, res: Response) => {
    try {
        const privilegesData = await db.select().from(privillages);
        const mappedPrivileges = privilegesData.map(p => ({
            id: p.id,
            name: p.privil,
            description: ''
        }));

        res.json({
            success: true,
            data: mappedPrivileges
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
