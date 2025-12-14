import { Router, Request, Response } from 'express';
import { db } from '../db';
import { wlog, materials, tdetails, customers, suppliers } from '../db/schema';
import { eq, like, or, and, sql, desc, isNotNull } from 'drizzle-orm';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

router.use(authMiddleware);

// Get weight log entries with pagination and search
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const search = req.query.search as string;
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Base condition: Filter by company API key
        const baseCondition = eq(wlog.apikey, userApiKey);

        // Add search functionality - search across joined tables
        const whereClause = search ? and(
            baseCondition,
            or(
                // Search by mapped names
                like(materials.mname, `%${search}%`),
                like(tdetails.tname, `%${search}%`),
                like(customers.cname, `%${search}%`),
                // Search by vehicle ID (as string)
                sql`CAST(${wlog.vid} AS CHAR) LIKE ${`%${search}%`}`
            )
        ) : baseCondition;

        // Count total records
        const countResult = await db
            .select({ count: sql`count(*)` })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(tdetails, eq(wlog.vid, tdetails.id))
            .leftJoin(suppliers, eq(wlog.sid, suppliers.id))
            .leftJoin(customers, eq(wlog.cid, customers.id))
            .where(whereClause);
        // @ts-ignore
        const total = Number(countResult[0].count);

        // Get paginated results with joins to get text fields
        const result = await db
            .select({
                id: wlog.id,
                fwt: wlog.fwt,
                lwt: wlog.lwt,
                swt: wlog.swt,
                mode: wlog.mode,
                vnum: isNotNull(tdetails.tnum) ? tdetails.tnum : sql<string>`CAST(${wlog.vid} AS CHAR)`,
                mname: materials.mname,
                tname: tdetails.tname,
                sname: suppliers.sname,
                cname: customers.cname,
                apikey: wlog.apikey,
                uid: wlog.uid,
                udt: wlog.udt,
                driver: wlog.driver,
                remarks: wlog.remarks,
                fwtdt: wlog.fwtdt
            })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(tdetails, eq(wlog.vid, tdetails.id))
            .leftJoin(suppliers, eq(wlog.sid, suppliers.id))
            .leftJoin(customers, eq(wlog.cid, customers.id))
            .where(whereClause)
            .limit(limit)
            .offset(offset)
            .orderBy(desc(wlog.id));

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        console.error("Error fetching wlog:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get weight log entry by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        const result = await db
            .select({
                id: wlog.id,
                fwt: wlog.fwt,
                lwt: wlog.lwt,
                swt: wlog.swt,
                mode: wlog.mode,
                vnum: isNotNull(tdetails.tnum) ? tdetails.tnum : sql<string>`CAST(${wlog.vid} AS CHAR)`,
                mname: materials.mname,
                tname: tdetails.tname,
                sname: suppliers.sname,
                cname: customers.cname,
                apikey: wlog.apikey,
                uid: wlog.uid,
                udt: wlog.udt,
                driver: wlog.driver,
                remarks: wlog.remarks,
                fwtdt: wlog.fwtdt
            })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(tdetails, eq(wlog.vid, tdetails.id))
            .leftJoin(suppliers, eq(wlog.sid, suppliers.id))
            .leftJoin(customers, eq(wlog.cid, customers.id))
            .where(and(eq(wlog.id, parseInt(id)), eq(wlog.apikey, userApiKey)));

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Weight log entry not found'
            });
        }

        res.json(result[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Create new weight log entry
router.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const { fwt, lwt, swt, mode, vid, mid, sid, cid, driver, remarks, fwtdt } = req.body;
        const userApiKey = req.user?.apikey;
        const userId = req.user?.id;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Validate required fields
        if (!vid || !mid) {
            return res.status(400).json({
                success: false,
                error: 'Vehicle ID and Material ID are required'
            });
        }

        // Create new weight log entry
        const result = await db.insert(wlog).values({
            fwt: fwt ? parseInt(fwt) : null,
            lwt: lwt ? parseInt(lwt) : null,
            swt: swt ? parseInt(swt) : null,
            mode: mode ? parseInt(mode) : null,
            vid: parseInt(vid),
            mid: parseInt(mid),
            sid: sid ? parseInt(sid) : null,
            cid: cid ? parseInt(cid) : null,
            apikey: userApiKey,
            uid: userId || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            driver: driver || null,
            remarks: remarks || null,
            fwtdt: fwtdt || null
        });

        res.json({
            success: true,
            message: 'Weight log entry created successfully',
            data: result
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update weight log entry
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { fwt, lwt, swt, mode, vid, mid, sid, cid, driver, remarks, fwtdt, swtdt } = req.body;
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Check if entry exists and belongs to user's company
        const existing = await db.select().from(wlog).where(and(eq(wlog.id, parseInt(id)), eq(wlog.apikey, userApiKey)));

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Weight log entry not found'
            });
        }

        // Update weight log entry
        const updateData: any = {
            udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        if (fwt !== undefined) updateData.fwt = parseInt(fwt);
        if (lwt !== undefined) updateData.lwt = parseInt(lwt);
        if (swt !== undefined) updateData.swt = parseInt(swt);
        if (mode !== undefined) updateData.mode = parseInt(mode);
        if (vid !== undefined) updateData.vid = parseInt(vid);
        if (mid !== undefined) updateData.mid = parseInt(mid);
        if (sid !== undefined) updateData.sid = parseInt(sid);
        if (cid !== undefined) updateData.cid = parseInt(cid);
        if (driver !== undefined) updateData.driver = driver;
        if (remarks !== undefined) updateData.remarks = remarks;
        if (fwtdt !== undefined) updateData.fwtdt = fwtdt;
        if (swtdt !== undefined) updateData.swtdt = swtdt;

        await db.update(wlog).set(updateData).where(and(eq(wlog.id, parseInt(id)), eq(wlog.apikey, userApiKey)));

        res.json({
            success: true,
            message: 'Weight log entry updated successfully'
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete weight log entry
router.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userApiKey = req.user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({
                success: false,
                error: 'User not authenticated'
            });
        }

        // Check if entry exists and belongs to user's company
        const existing = await db.select().from(wlog).where(and(eq(wlog.id, parseInt(id)), eq(wlog.apikey, userApiKey)));

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Weight log entry not found'
            });
        }

        await db.delete(wlog).where(and(eq(wlog.id, parseInt(id)), eq(wlog.apikey, userApiKey)));

        res.json({
            success: true,
            message: 'Weight log entry deleted successfully'
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
