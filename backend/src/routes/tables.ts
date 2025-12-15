import { Router, Request, Response } from 'express';
import { db } from '../db';
import { customers, materials, suppliers, tdetails, modes, roles, privillages, ulog, users, wlog } from '../db/schema';
import { eq, like, or, and, sql, desc } from 'drizzle-orm';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();
router.use(authMiddleware);

// Generic CRUD operations for any table
const createTableRoutes = (tableName: string, table: any, searchFields: string[]) => {

    // Get all records with pagination and search
    router.get(`/${tableName}`, async (req: Request, res: Response) => {
        try {
            const search = req.query.search as string;
            const { page, limit, offset } = getPaginationParams(req);

            let whereClause;
            if (search) {
                const searchConditions = searchFields.map(field =>
                    like(table[field], `%${search}%`)
                );
                whereClause = or(...searchConditions);
            }

            // Count
            const countResult = await db.select({ count: sql`count(*)` }).from(table).where(whereClause);
            // @ts-ignore
            const total = Number(countResult[0].count);

            // Data
            const result = await db.select().from(table).where(whereClause).limit(limit).offset(offset).orderBy(desc(table.id));

            res.json(createPaginatedResponse(result, total, page, limit));
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });

    // Get single record by ID
    router.get(`/${tableName}/:id`, async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await db.select().from(table).where(eq(table.id, parseInt(id))).limit(1);

            if (result.length === 0) {
                res.status(404).json({ error: 'Record not found' });
                return;
            }

            res.json({ success: true, data: result[0] });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });

    // Create new record
    router.post(`/${tableName}`, async (req: Request, res: Response) => {
        try {
            const result = await db.insert(table).values({
                ...req.body,
                udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });

            res.status(201).json({
                success: true,
                message: `${tableName} created successfully`,
                data: { id: result[0].insertId }
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update record
    router.put(`/${tableName}/:id`, async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await db.update(table).set({
                ...req.body,
                udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }).where(eq(table.id, parseInt(id)));

            res.json({
                success: true,
                message: `${tableName} updated successfully`
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete record
    router.delete(`/${tableName}/:id`, async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await db.delete(table).where(eq(table.id, parseInt(id)));

            res.json({
                success: true,
                message: `${tableName} deleted successfully`
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });
};

// Create routes for all tables
createTableRoutes('customers', customers, ['cname', 'cnum', 'crem']);
createTableRoutes('materials', materials, ['mname', 'mdetail']);
createTableRoutes('suppliers', suppliers, ['sname', 'snum', 'srem']);
createTableRoutes('transporters', tdetails, ['tname', 'tnum', 'tmob']);
createTableRoutes('modes', modes, ['mode']);
createTableRoutes('roles', roles, ['role']);
createTableRoutes('privileges', privillages, ['privil']);
createTableRoutes('userlog', ulog, ['apikey']);
createTableRoutes('weighlog', wlog, ['vnum', 'tname']);

// Special route for users (exclude sensitive data)
router.get('/users', async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string;
        const { page, limit, offset } = getPaginationParams(req);

        let whereClause;
        if (search) {
            whereClause = or(
                like(users.uname, `%${search}%`),
                like(users.fname, `%${search}%`),
                like(users.email, `%${search}%`)
            );
        }

        // Count
        const countResult = await db.select({ count: sql`count(*)` }).from(users).where(whereClause);
        // @ts-ignore
        const total = Number(countResult[0].count);

        // Data (exclude password)
        const result = await db.select({
            id: users.id,
            uname: users.uname,
            fname: users.fname,
            email: users.email,
            mobile: users.mobile,
            rid: users.rid,
            pid: users.pid,
            apikey: users.apikey,
            udt: users.udt
        }).from(users).where(whereClause).limit(limit).offset(offset).orderBy(desc(users.id));

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
