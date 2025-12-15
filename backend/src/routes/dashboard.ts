import { Router, Request, Response } from 'express';
import { db } from '../db';
import { wlog, mdetail, tdetail, sdetail, cdetail, customers, materials, suppliers, tdetails, vdetails } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
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
        // Use existing tables for dropdown data
        const [materialsList, transporters, suppliersList, customersList] = await Promise.all([
            db.select({ id: materials.id, value: materials.mname }).from(materials),
            db.select({ id: tdetails.id, value: tdetails.tname }).from(tdetails),
            db.select({ id: suppliers.id, value: suppliers.sname }).from(suppliers),
            db.select({ id: customers.id, value: customers.cname }).from(customers),
        ]);

        res.json({
            success: true,
            data: {
                materials: materialsList,
                transporters: transporters,
                suppliers: suppliersList,
                customers: customersList,
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
        const { vnum, mname, tname, sname, cname, remarks, mode = 1 } = req.body;

        // Read current weight from file
        let currentWeight = '0';
        try {
            const filePath = 'C:\\WindowsService\\latest_data.txt';
            if (fs.existsSync(filePath)) {
                currentWeight = fs.readFileSync(filePath, 'utf-8').trim();
            }
        } catch (e) {
            console.error('Could not read weight for storage', e);
        }

        // Get IDs from the new relational tables
        const material = await db.select({ id: materials.id }).from(materials).where(eq(materials.mname, mname)).limit(1);
        const transporter = await db.select({ id: tdetails.id }).from(tdetails).where(eq(tdetails.tname, tname)).limit(1);
        const supplier = await db.select({ id: suppliers.id }).from(suppliers).where(eq(suppliers.sname, sname)).limit(1);
        const customer = await db.select({ id: customers.id }).from(customers).where(eq(customers.cname, cname)).limit(1);
        const vehicle = await db.select({ id: vdetails.id }).from(vdetails).where(eq(vdetails.vnum, vnum)).limit(1);

        // Insert with new relational structure
        await db.insert(wlog).values({
            fwt: parseInt(currentWeight) || 0,
            lwt: 0,
            swt: 0,
            mode: mode,
            mid: material.length > 0 ? material[0].id : null,
            vid: vehicle.length > 0 ? vehicle[0].id : null,
            tid: transporter.length > 0 ? transporter[0].id : null,
            sid: supplier.length > 0 ? supplier[0].id : null,
            cid: customer.length > 0 ? customer[0].id : null,
            apikey: (req as any).user.apikey || 'WESOPC01',
            uid: (req as any).user.id || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            remarks: remarks || null
        });

        res.json({ success: true, message: 'First weighment recorded successfully' });
    } catch (error) {
        console.error('Error submitting weigh-in:', error);
        res.status(500).json({ success: false, message: 'Failed to record weighment' });
    }
});

export default router;
