import { Router, Request, Response } from 'express';
import { db } from '../db';
import { wlog, vdetail, mdetail, tdetail, sdetail, cdetail } from '../db/schema';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import fs from 'fs';
import path from 'path';

const router = Router();

// Get live weight from file
router.get('/live-weight', (req: Request, res: Response) => {
    const filePath = 'C:\\WindowsService\\latest_data.txt';
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8').trim();
            res.json({ success: true, weight: data || '0' });
        } else {
            res.json({ success: true, weight: 'No Device' });
        }
    } catch (error) {
        console.error('Error reading weight file:', error);
        res.status(500).json({ success: false, message: 'Failed to read weight data' });
    }
});

// Get dropdown data
router.get('/dropdowns', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const [vehicles, materials, transporters, suppliers, customers] = await Promise.all([
            db.selectDistinct({ value: vdetail.vnum }).from(vdetail),
            db.selectDistinct({ value: mdetail.mname }).from(mdetail),
            db.selectDistinct({ value: tdetail.tname }).from(tdetail),
            db.selectDistinct({ value: sdetail.sname }).from(sdetail),
            db.selectDistinct({ value: cdetail.cname }).from(cdetail),
        ]);

        res.json({
            success: true,
            data: {
                vehicles: vehicles.map(v => v.value),
                materials: materials.map(m => m.value),
                transporters: transporters.map(t => t.value),
                suppliers: suppliers.map(s => s.value),
                customers: customers.map(c => c.value),
            },
        });
    } catch (error) {
        console.error('Error fetching dropdowns:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch dropdown data' });
    }
});

// Get Next Ticket Number
router.get('/next-ticket', authMiddleware, async (req: Request, res: Response) => {
    try {
        // SELECT * from wlog Order by id desc limit 1
        // Drizzle: .orderBy(desc(wlog.id)).limit(1)
        // Need to import desc
        const { desc } = require('drizzle-orm');

        const lastRecord = await db.select({ id: wlog.id }).from(wlog).orderBy(desc(wlog.id)).limit(1);
        const nextId = lastRecord.length > 0 ? lastRecord[0].id + 1 : 1;

        res.json({ success: true, ticketBox: nextId });
    } catch (error) {
        console.error('Error fetching next ticket:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch ticket number' });
    }
});

// Submit Weigh-in
router.post('/weigh-in', authMiddleware, async (req: AuthRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    try {
        const { vnum, mname, tname, sname, cname, remarks } = req.body;

        // Read current weight internally to be safe? 
        // Usually weighbridge sends weight from UI or read again from backend.
        // The PHP does not seem to read it, it takes inputs. 
        // Wait, PHP index.php says:
        // $wt1 = '56675'; (HARDCODED???)
        // Ah, line 407: $wt1 = '56675';
        // This looks like testing code in the PHP user provided.
        // Ideally we should read the weight from the file at moment of submission.

        // Let's read from file for the actual weight
        let currentWeight = '0';
        try {
            const filePath = 'C:\\WindowsService\\latest_data.txt';
            if (fs.existsSync(filePath)) {
                currentWeight = fs.readFileSync(filePath, 'utf-8').trim();
            }
        } catch (e) {
            console.error('Could not read weight for storage', e);
        }

        // Insert
        // stat = 'W1' (First Weighment)
        await db.insert(wlog).values({
            vnum,
            mname,
            tname,
            sname,
            cname,
            wt1: currentWeight,
            wt1at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            wt1by: req.user.username,
            remarks,
            stat: 'W1',
            username: req.user.username,
            trn_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        });

        res.json({ success: true, message: 'First weighment recorded successfully' });
    } catch (error) {
        console.error('Error submitting weigh-in:', error);
        res.status(500).json({ success: false, message: 'Failed to record weighment' });
    }
});

export default router;
