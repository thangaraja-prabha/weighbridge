import { Router, Request, Response } from 'express';
import { db } from '../db';
import { depts, shifts, nopt, mdetail, vdetail, tdetail, sdetail, cdetail } from '../db/schema';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

// Departments
router.get('/dept', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(depts);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/dept', async (req: Request, res: Response) => {
    try {
        const { dept } = req.body;
        await db.insert(depts).values({ dept, username: (req as any).user.username, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Shifts
router.get('/shifts', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(shifts);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/shifts', async (req: Request, res: Response) => {
    try {
        const { shift, stshift, edshift } = req.body;
        await db.insert(shifts).values({
            shift, stshift, edshift,
            username: (req as any).user.username,
            trn_date: new Date().toISOString()
        });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// NOP
router.get('/nop', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(nopt);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/nop', async (req: Request, res: Response) => {
    try {
        const { nop } = req.body;
        await db.insert(nopt).values({ nop, username: (req as any).user.username, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Machine Detail
router.get('/mdetail', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(mdetail);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/mdetail', async (req: Request, res: Response) => {
    try {
        const { mname } = req.body;
        await db.insert(mdetail).values({ mname, username: (req as any).user.username, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Vehicles
router.get('/vehicle', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(vdetail);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/vehicle', async (req: Request, res: Response) => {
    try {
        const { vnum } = req.body;
        await db.insert(vdetail).values({ vnum, username: (req as any).user.username, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Transporters
router.get('/transporter', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(tdetail);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/transporter', async (req: Request, res: Response) => {
    try {
        const { tname } = req.body;
        await db.insert(tdetail).values({ tname, username: (req as any).user.username, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Suppliers
router.get('/supplier', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(sdetail);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/supplier', async (req: Request, res: Response) => {
    try {
        const { sname } = req.body;
        await db.insert(sdetail).values({ sname, username: (req as any).user.username, trn_date: new Date().toISOString() });
        res.json({ success: true });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Customers
router.get('/customer', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(cdetail);
        res.json(result);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
});
router.post('/customer', async (req: Request, res: Response) => {
    try {
        const { cname } = req.body;
        await db.insert(cdetail).values({ cname, username: (req as any).user.username, trn_date: new Date().toISOString() });
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
        else return res.status(400).json({ error: 'Invalid type' });

        await db.delete(table).where(eq(table.id, parseInt(id)));
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
