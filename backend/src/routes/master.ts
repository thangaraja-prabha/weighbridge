import { Router, Request, Response } from 'express';
import { db } from '../db';
import { depts, shifts, nopt, mdetail, vdetail, tdetail, sdetail, cdetail, customers, materials, suppliers, tdetails } from '../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

router.use(authMiddleware);

// Departments
router.get('/dept', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(depts);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(depts).limit(limit).offset(offset).orderBy(desc(depts.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Shifts
router.get('/shifts', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(shifts);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(shifts).limit(limit).offset(offset).orderBy(desc(shifts.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// NOP
router.get('/nop', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(nopt);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(nopt).limit(limit).offset(offset).orderBy(desc(nopt.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Materials (New relational table)
router.get('/materials', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);
        const countResult = await db.select({ count: sql`count(*)` }).from(materials);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(materials).limit(limit).offset(offset).orderBy(desc(materials.id));
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
        const countResult = await db.select({ count: sql`count(*)` }).from(customers);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(customers).limit(limit).offset(offset).orderBy(desc(customers.id));
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
        const countResult = await db.select({ count: sql`count(*)` }).from(suppliers);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(suppliers).limit(limit).offset(offset).orderBy(desc(suppliers.id));
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
        const countResult = await db.select({ count: sql`count(*)` }).from(tdetails);
        // @ts-ignore
        const total = Number(countResult[0].count);
        const result = await db.select().from(tdetails).limit(limit).offset(offset).orderBy(desc(tdetails.id));
        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

router.post('/transporters', async (req: Request, res: Response) => {
    try {
        const { tnum, tname, tadd, tmob, trem } = req.body;
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
