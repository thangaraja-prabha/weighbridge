import { Router, Request, Response } from 'express';
import { db } from '../db';
import { wlog_legacy } from '../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();
router.use(authMiddleware);

// Create First Weighment
router.post('/first', async (req: Request, res: Response) => {
    try {
        const { vnum, mname, tname, sname, cname, remarks, wt1 } = req.body;

        // In a real app, wt1 comes from serial port / scale. Here we accept it from body or simulate it.
        // PHP code hardcoded '555105' in header and '56675' in update?
        // We'll trust the input for now (Simulated Scale).

        const now = new Date();
        const trn_date = now.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss

        await db.insert(wlog_legacy).values({
            vnum, mname, tname, sname, cname, remarks,
            wt1: wt1 || '0',
            wt1at: trn_date,
            wt1by: (req as any).user.uname,
            stat: 'W1',
            username: (req as any).user.uname,
            trn_date: trn_date
        });

        res.json({ success: true, message: 'First weighment saved' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Pending Weighments (W1)
router.get('/pending', async (req: Request, res: Response) => {
    try {
        const { page, limit, offset } = getPaginationParams(req);

        // Count total
        const countResult = await db.select({ count: sql`count(*)` }).from(wlog_legacy).where(eq(wlog_legacy.stat, 'W1'));
        // @ts-ignore
        const total = Number(countResult[0].count);

        const result = await db.select()
            .from(wlog_legacy)
            .where(eq(wlog_legacy.stat, 'W1'))
            .orderBy(desc(wlog_legacy.id))
            .limit(limit)
            .offset(offset);

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get Single Record
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(wlog_legacy).where(eq(wlog_legacy.id, parseInt(req.params.id)));
        if (result.length === 0) return res.status(404).json({ error: 'Record not found' });
        res.json(result[0]);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Submit Second Weighment
router.post('/second', async (req: Request, res: Response) => {
    try {
        const { id, wt2, remarks } = req.body;

        // Calculate Net Weight
        const record = await db.select().from(wlog_legacy).where(eq(wlog_legacy.id, parseInt(id)));
        if (record.length === 0) return res.status(404).json({ error: 'Record not found' });

        const wt1 = parseFloat(record[0].wt1 || '0');
        const wt2Val = parseFloat(wt2 || '0');
        const netWt = Math.abs(wt2Val - wt1).toString();

        const now = new Date();
        const trn_date = now.toISOString().slice(0, 19).replace('T', ' ');

        await db.update(wlog_legacy).set({
            wt2: wt2,
            wt2at: trn_date,
            wt2by: (req as any).user.uname,
            wt: netWt,
            stat: 'Second Completed', // Or 'W2' ? PHP used 'Completed' in mlog, 'W1' in wlog. I'll use 'Completed'.
            remarks: remarks || record[0].remarks
        }).where(eq(wlog_legacy.id, parseInt(id)));

        res.json({ success: true, message: 'Second weighment saved', netWeight: netWt });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
