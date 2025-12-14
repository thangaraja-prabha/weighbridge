import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { not, eq, like, or, and, sql } from 'drizzle-orm';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

router.use(authMiddleware);

import { roles, privillages } from '../db/schema';

// Get Users (exclude Admins)
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const search = req.query.search as string;

        // Get the authenticated user's apikey
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Base condition: Not Admins (based on role) AND same apikey (company)
        const baseCondition = and(
            not(eq(users.rid, 1)), // Assuming role 1 is admin
            eq(users.apikey, userApiKey) // Filter by company apikey
        );

        const whereClause = search ? and(
            baseCondition,
            or(
                like(users.fname, `%${search}%`),
                like(users.uname, `%${search}%`),
                like(users.email, `%${search}%`),
                like(users.mobile, `%${search}%`),
                like(users.comname, `%${search}%`)
            )
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
            privilege_ids: users.privilege_ids, // Get privilege array
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

        // Fetch all privileges for mapping
        const allPrivileges = await db.select().from(privillages);
        const privMap = new Map(allPrivileges.map(p => [p.id, p.privil]));

        // Map results with privilege arrays and names
        const mappedResult = result.map(user => {
            let userPrivs: any = user.privilege_ids;

            // Handle potential string response for JSON column
            if (typeof userPrivs === 'string') {
                try {
                    userPrivs = JSON.parse(userPrivs);
                } catch (e) {
                    console.warn('Failed to parse privilege_ids for user', user.id, e);
                    userPrivs = [];
                }
            }

            // Ensure we have an array
            const rawIds = Array.isArray(userPrivs) ? userPrivs : (user.pid ? [user.pid] : []);

            // Convert to numbers safely
            const pIds = rawIds.map((id: any) => Number(id)).filter((n: number) => !isNaN(n));

            // Map IDs to names
            const pNames = pIds.map(id => privMap.get(id)).filter(Boolean);

            return {
                ...user,
                privileges: pIds,
                privilege_names: pNames.join(', ') // Return comma separated names
            };
        });

        res.json(createPaginatedResponse(mappedResult, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Search Users endpoint
router.get('/search', async (req: AuthRequest, res: Response) => {
    try {
        const search = req.query.search as string;
        const { page, limit, offset } = getPaginationParams(req);

        // Get the authenticated user's apikey
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Base condition: Not Admins (based on role) AND same apikey (company)
        const baseCondition = and(
            not(eq(users.rid, 1)), // Assuming role 1 is admin
            eq(users.apikey, userApiKey) // Filter by company apikey
        );

        const whereClause = search ? and(
            baseCondition,
            or(
                like(users.fname, `%${search}%`),
                like(users.uname, `%${search}%`),
                like(users.email, `%${search}%`),
                like(users.mobile, `%${search}%`),
                like(users.comname, `%${search}%`)
            )
        ) : baseCondition;

        // Count
        const countResult = await db.select({ count: sql`count(*)` }).from(users).where(whereClause);
        // @ts-ignore
        const total = Number(countResult[0].count);

        // Perform Left Joins manually or select all and map if not using relations API
        const result = await db.select({
            id: users.id,
            username: users.uname,
            fname: users.fname,
            email: users.email,
            mobile: users.mobile,
            apikey: users.apikey,
            rid: users.rid,
            pid: users.pid, // Keep for backward compatibility
            privilege_ids: users.privilege_ids, // Get privilege array
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

        // Fetch all privileges for mapping
        const allPrivileges = await db.select().from(privillages);
        const privMap = new Map(allPrivileges.map(p => [p.id, p.privil]));

        // Map results with privilege arrays and names
        const mappedResult = result.map(user => {
            let userPrivs: any = user.privilege_ids;

            // Handle potential string response for JSON column
            if (typeof userPrivs === 'string') {
                try {
                    userPrivs = JSON.parse(userPrivs);
                } catch (e) {
                    console.warn('Failed to parse privilege_ids for user', user.id, e);
                    userPrivs = [];
                }
            }

            // Ensure we have an array
            const rawIds = Array.isArray(userPrivs) ? userPrivs : (user.pid ? [user.pid] : []);

            // Convert to numbers safely
            const pIds = rawIds.map((id: any) => Number(id)).filter((n: number) => !isNaN(n));

            // Map IDs to names
            const pNames = pIds.map(id => privMap.get(id)).filter(Boolean);

            return {
                ...user,
                privileges: pIds,
                privilege_names: pNames.join(', ') // Return comma separated names
            };
        });

        res.json(createPaginatedResponse(mappedResult, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Roles (lookup table - read-only, not filtered by apikey)
router.get('/roles', async (req: AuthRequest, res: Response) => {
    try {
        // Roles are a lookup table - return all available roles
        // These are NOT filtered by apikey as they are shared across all companies
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
        console.error('Roles query error:', err);
        // Return empty array if table doesn't exist or query fails
        res.json({
            success: true,
            data: []
        });
    }
});

// Update user
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { uname, fname, email, mobile, rid, pid, pass } = req.body;

        // Get the authenticated user's apikey
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Build update object
        const updateData: any = {
            uname,
            fname,
            email,
            mobile,
            rid: rid ? Number(rid) : undefined,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        // Handle privilege_ids array
        if (pid !== undefined) {
            const rawIds = Array.isArray(pid) ? pid : [pid];
            const privilegeIds = rawIds.map((id: any) => Number(id)).filter((n: number) => !isNaN(n));

            updateData.privilege_ids = privilegeIds;
            updateData.pid = privilegeIds.length > 0 ? privilegeIds[0] : null; // Keep first for backward compatibility
        }

        // Only update password if provided
        if (pass && pass.trim() !== '') {
            const bcrypt = require('bcryptjs');
            updateData.pass = await bcrypt.hash(pass, 10);
        }

        // Remove undefined values
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        // Update user (only if belongs to same company)
        await db.update(users)
            .set(updateData)
            .where(and(
                eq(users.id, parseInt(id)),
                eq(users.apikey, userApiKey) // Ensure user belongs to same company
            ));

        res.json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (err: any) {
        console.error('Update user error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Delete user
router.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        // Get the authenticated user's apikey
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Delete user (only if belongs to same company)
        await db.delete(users)
            .where(and(
                eq(users.id, parseInt(id)),
                eq(users.apikey, userApiKey) // Ensure user belongs to same company
            ));

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err: any) {
        console.error('Delete user error:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Get Privileges (lookup table - read-only, not filtered by apikey)
router.get('/privileges', async (req: AuthRequest, res: Response) => {
    try {
        // Privileges are a lookup table - return all available privileges
        // These are NOT filtered by apikey as they are shared across all companies
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
        console.error('Privileges query error:', err);
        // Return empty array if table doesn't exist or query fails
        res.json({
            success: true,
            data: []
        });
    }
});

export default router;
