import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users, user_privileges } from '../db/schema';
import { not, eq, like, or, and, sql } from 'drizzle-orm';
import { authMiddleware, AuthRequest } from '../middleware/auth';
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
            pid: users.pid, // Keep for backward compatibility
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

        // Fetch privileges for each user from user_privileges table
        const userIds = result.map(u => u.id);
        const privilegesMap = new Map<number, number[]>();

        if (userIds.length > 0) {
            const privilegesResult = await db
                .select({
                    user_id: user_privileges.user_id,
                    privilege_id: user_privileges.privilege_id
                })
                .from(user_privileges)
                .where(sql`${user_privileges.user_id} IN (${sql.join(userIds.map(id => sql`${id}`), sql`, `)})`);

            privilegesResult.forEach(p => {
                if (!privilegesMap.has(p.user_id)) {
                    privilegesMap.set(p.user_id, []);
                }
                privilegesMap.get(p.user_id)!.push(p.privilege_id);
            });
        }

        // Map results with privilege arrays
        const mappedResult = result.map(user => ({
            ...user,
            privileges: privilegesMap.get(user.id) || (user.pid ? [user.pid] : []) // Fallback to old pid
        }));

        res.json(createPaginatedResponse(mappedResult, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Roles
router.get('/roles', async (req: AuthRequest, res: Response) => {
    try {
        // Get the authenticated user's apikey
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Filter roles by apikey
        const rolesData = await db.select()
            .from(roles)
            .where(eq(roles.apikey, userApiKey));

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
router.get('/privileges', async (req: AuthRequest, res: Response) => {
    try {
        // Get the authenticated user's apikey
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Filter privileges by apikey
        const privilegesData = await db.select()
            .from(privillages)
            .where(eq(privillages.apikey, userApiKey));

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
