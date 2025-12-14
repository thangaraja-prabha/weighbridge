import { Router, Request, Response } from 'express';
import { db } from '../db';
import { depts, shifts, nopt, mdetail, vdetail, tdetail, sdetail, cdetail, customers, materials, suppliers, tdetails, modes } from '../db/schema';
import { eq, desc, like, sql, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';
import { validateIndianMobileNumber } from '../utils/validation';

const router = Router();

router.use(authMiddleware);

// Modes
router.get('/modes', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(modes).orderBy(modes.id);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Departments
router.get('/dept', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const userApiKey = (req as any).user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({ error: 'Unauthorized - API key required' });
        }

        const whereCondition = eq(depts.apikey, userApiKey);
        const countResult = await db.select({ count: sql`count(*)` }).from(depts).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(depts).where(whereCondition).limit(limit).offset(offset).orderBy(desc(depts.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Shifts
router.get('/shifts', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const userApiKey = (req as any).user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({ error: 'Unauthorized - API key required' });
        }

        const whereCondition = eq(shifts.apikey, userApiKey);
        const countResult = await db.select({ count: sql`count(*)` }).from(shifts).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(shifts).where(whereCondition).limit(limit).offset(offset).orderBy(desc(shifts.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// NOP
router.get('/nop', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const userApiKey = (req as any).user?.apikey;

        if (!userApiKey) {
            return res.status(401).json({ error: 'Unauthorized - API key required' });
        }

        const whereCondition = eq(nopt.apikey, userApiKey);
        const countResult = await db.select({ count: sql`count(*)` }).from(nopt).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(nopt).where(whereCondition).limit(limit).offset(offset).orderBy(desc(nopt.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Materials (New relational table)
router.get('/materials', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const { search } = req.query;
        const userApiKey = (req as any).user?.apikey;

        let conditions = [];
        if (userApiKey) conditions.push(eq(materials.apikey, userApiKey));
        if (search && typeof search === 'string') conditions.push(like(materials.mname, `%${search}%`));

        const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

        const countResult = await db.select({ count: sql`count(*)` }).from(materials).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(materials).where(whereCondition).limit(limit).offset(offset).orderBy(desc(materials.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.post('/materials', async (req: Request, res: Response) => {
    try {
        const { mname, mdetail } = req.body;
        await db.insert(materials).values({
            mname,
            mdetail,
            apikey: (req as any).user.apikey || 'WESOPC01',
            uid: (req as any).user.id || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Customers (New relational table)
router.get('/customers', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const { search } = req.query;
        const userApiKey = (req as any).user?.apikey;

        let conditions = [];
        if (userApiKey) conditions.push(eq(customers.apikey, userApiKey));
        if (search && typeof search === 'string') conditions.push(like(customers.cname, `%${search}%`));

        const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

        const countResult = await db.select({ count: sql`count(*)` }).from(customers).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(customers).where(whereCondition).limit(limit).offset(offset).orderBy(desc(customers.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.post('/customers', async (req: Request, res: Response) => {
    try {
        const { cname, cadd, cnum, crem } = req.body;
        await db.insert(customers).values({
            cname,
            cadd,
            cnum,
            crem,
            apikey: (req as any).user.apikey || 'WESOPC01',
            uid: (req as any).user.id || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Suppliers (New relational table)
router.get('/suppliers', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const { search } = req.query;
        const userApiKey = (req as any).user?.apikey;

        let conditions = [];
        if (userApiKey) conditions.push(eq(suppliers.apikey, userApiKey));
        if (search && typeof search === 'string') conditions.push(like(suppliers.sname, `%${search}%`));

        const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

        const countResult = await db.select({ count: sql`count(*)` }).from(suppliers).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(suppliers).where(whereCondition).limit(limit).offset(offset).orderBy(desc(suppliers.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.post('/suppliers', async (req: Request, res: Response) => {
    try {
        const { sname, sadd, snum, srem } = req.body;
        await db.insert(suppliers).values({
            sname,
            sadd,
            snum,
            srem,
            apikey: (req as any).user.apikey || 'WESOPC01',
            uid: (req as any).user.id || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Transporters (New relational table)
router.get('/transporters', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const { search } = req.query;
        const userApiKey = (req as any).user?.apikey;

        let conditions = [];

        // Filter by company API key
        if (userApiKey) {
            conditions.push(eq(tdetails.apikey, userApiKey));
        }

        // Add search functionality
        if (search && typeof search === 'string') {
            conditions.push(sql`(tnum LIKE ${`%${search}%`} OR tname LIKE ${`%${search}%`} OR tmob LIKE ${`%${search}%`})`);
        }

        const whereCondition = conditions.length > 0 ? conditions.length === 1 ? conditions[0] : and(...conditions) : undefined;

        const countResult = await db.select({ count: sql`count(*)` }).from(tdetails).where(whereCondition);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(tdetails).where(whereCondition).limit(limit).offset(offset).orderBy(desc(tdetails.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Transporter search endpoint for autocomplete
router.get('/transporters/search', async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        const userApiKey = (req as any).user?.apikey;

        if (!q || typeof q !== 'string') {
            return res.status(400).json({ error: 'Search query is required' });
        }

        let conditions = [];

        // Filter by company API key
        if (userApiKey) {
            conditions.push(eq(tdetails.apikey, userApiKey));
        }

        // Search across multiple fields
        conditions.push(sql`(tnum LIKE ${`%${q}%`} OR tname LIKE ${`%${q}%`} OR tmob LIKE ${`%${q}%`})`);

        const whereCondition = conditions.length > 0 ? conditions.length === 1 ? conditions[0] : and(...conditions) : undefined;

        const result = await db.select({
            id: tdetails.id,
            tnum: tdetails.tnum,
            tname: tdetails.tname,
            tadd: tdetails.tadd,
            tmob: tdetails.tmob,
            trem: tdetails.trem
        }).from(tdetails).where(whereCondition).limit(10);

        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.post('/transporters', async (req: Request, res: Response) => {
    try {
        const { tnum, tname, tadd, tmob, trem } = req.body;

        // Validate mobile number if provided
        if (tmob && !validateIndianMobileNumber(tmob)) {
            return res.status(400).json({
                error: 'Please enter a valid Indian mobile number (10 digits starting with 6, 7, 8, or 9)'
            });
        }

        await db.insert(tdetails).values({
            tnum,
            tname,
            tadd,
            tmob,
            trem,
            apikey: (req as any).user.apikey || 'WESOPC01',
            uid: (req as any).user.id || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Legacy endpoints for backward compatibility
// Machine Detail
router.get('/mdetail', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(mdetail);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(mdetail).limit(limit).offset(offset).orderBy(desc(mdetail.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Vehicles
router.get('/vehicle', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(vdetail);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(vdetail).limit(limit).offset(offset).orderBy(desc(vdetail.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Transporters
router.get('/transporter', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(tdetail);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(tdetail).limit(limit).offset(offset).orderBy(desc(tdetail.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Suppliers
router.get('/supplier', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(sdetail);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(sdetail).limit(limit).offset(offset).orderBy(desc(sdetail.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Customers (Legacy)
router.get('/customer', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(cdetail);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(cdetail).limit(limit).offset(offset).orderBy(desc(cdetail.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/customer', async (req: Request, res: Response) => {
    try {
        const { cname } = req.body;
        await db.insert(cdetail).values({ cname, username: (req as any).user.uname, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Delete generic
router.delete('/:type/:id', async (req: Request, res: Response) => {
    try {
        const { type, id } = req.params;
        let table;
        if (type === 'dept') table = depts;
        else if (type === 'shifts') table = shifts;
        else if (type === 'nop') table = nopt;
        else if (type === 'mdetail') table = mdetail;
        else if (type === 'vehicle') table = vdetail;
        else if (type === 'transporter') table = tdetail;
        else if (type === 'supplier') table = sdetail;
        else if (type === 'customer') table = cdetail;
        // New relational tables
        else if (type === 'materials') table = materials;
        else if (type === 'customers') table = customers;
        else if (type === 'suppliers') table = suppliers;
        else if (type === 'transporters') table = tdetails;
        else return res.status(400).json({ error: 'Invalid type' });

        await db.delete(table).where(eq(table.id, parseInt(id)));
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
