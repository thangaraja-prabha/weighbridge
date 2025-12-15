import { Router, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { db } from '../db';
import { wlog, materials, tdetails, customers, suppliers, vdetails } from '../db/schema';
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
                like(customers.cname, `%${search}%`),
                like(vdetails.vnum, `%${search}%`),
                like(tdetails.tname, `%${search}%`)
            )
        ) : baseCondition;

        // Count total records
        const countResult = await db
            .select({ count: sql`count(*)` })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(vdetails, eq(wlog.vid, vdetails.id))
            .leftJoin(tdetails, eq(wlog.tid, tdetails.id))
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
                tid: wlog.tid,
                vid: wlog.vid,
                mname: materials.mname,
                vnum: vdetails.vnum,
                tname: tdetails.tname,
                sname: suppliers.sname,
                cname: customers.cname,
                apikey: wlog.apikey,
                uid: wlog.uid,
                udt: wlog.udt,

                remarks: wlog.remarks,
                fwtdt: wlog.fwtdt
            })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(vdetails, eq(wlog.vid, vdetails.id))
            .leftJoin(tdetails, eq(wlog.tid, tdetails.id))
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
                tid: wlog.tid,
                vid: wlog.vid,
                mname: materials.mname,
                vnum: vdetails.vnum,
                tname: tdetails.tname,
                sname: suppliers.sname,
                cname: customers.cname,
                apikey: wlog.apikey,
                uid: wlog.uid,
                udt: wlog.udt,

                remarks: wlog.remarks,
                fwtdt: wlog.fwtdt
            })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(vdetails, eq(wlog.vid, vdetails.id))
            .leftJoin(tdetails, eq(wlog.tid, tdetails.id))
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
        const { fwt, lwt, swt, mode, vid, mid, sid, cid, remarks, fwtdt, tid } = req.body;
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
        // Fetch associated names
        let vnumVal = null;
        if (vid) {
            const v = await db.select().from(vdetails).where(eq(vdetails.id, parseInt(vid)));
            if (v.length > 0) vnumVal = v[0].vnum;
        }

        let tnameVal = null;
        if (tid) {
            const t = await db.select().from(tdetails).where(eq(tdetails.id, parseInt(tid)));
            if (t.length > 0) tnameVal = t[0].tname;
        }

        // Create new weight log entry
        const result = await db.insert(wlog).values({
            fwt: fwt ? parseInt(fwt) : null,
            lwt: lwt ? parseInt(lwt) : null,
            swt: swt ? parseInt(swt) : null,
            mode: mode ? parseInt(mode) : null,
            vid: vid ? parseInt(vid) : null,
            tid: tid ? parseInt(tid) : null,
            mid: parseInt(mid),
            sid: sid ? parseInt(sid) : null,
            cid: cid ? parseInt(cid) : null,
            apikey: userApiKey,
            uid: userId || 1,
            udt: new Date().toISOString().slice(0, 19).replace('T', ' '),

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
        const { fwt, lwt, swt, mode, vid, tid, mid, sid, cid, remarks, fwtdt, swtdt, lwtdt } = req.body;
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
        if (lwt !== undefined) {
            updateData.lwt = parseInt(lwt);
            updateData.swt = null;
        }
        if (swt !== undefined) updateData.swt = parseInt(swt);
        if (mode !== undefined) updateData.mode = parseInt(mode);

        if (vid !== undefined) {
            updateData.vid = parseInt(vid);
            const v = await db.select().from(vdetails).where(eq(vdetails.id, parseInt(vid)));
            if (v.length > 0) updateData.vnum = v[0].vnum;
        }
        if (tid !== undefined) {
            updateData.tid = parseInt(tid);
            const t = await db.select().from(tdetails).where(eq(tdetails.id, parseInt(tid)));
            if (t.length > 0) updateData.tname = t[0].tname;
        }

        if (mid !== undefined) updateData.mid = parseInt(mid);
        if (sid !== undefined) updateData.sid = parseInt(sid);
        if (cid !== undefined) updateData.cid = parseInt(cid);
        if (remarks !== undefined) updateData.remarks = remarks;
        if (fwtdt !== undefined) updateData.fwtdt = fwtdt;
        if (lwtdt !== undefined) updateData.lwtdt = lwtdt;
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

// Generate PDF receipt for weight log entry
router.get('/:id/pdf', async (req: AuthRequest, res: Response) => {
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
                tid: wlog.tid,
                vid: wlog.vid,
                mname: materials.mname,
                vnum: vdetails.vnum,
                tname: tdetails.tname,
                cname: customers.cname,
                sname: suppliers.sname,
                remarks: wlog.remarks,
                fwtdt: wlog.fwtdt,
                lwtdt: wlog.lwtdt
            })
            .from(wlog)
            .leftJoin(materials, eq(wlog.mid, materials.id))
            .leftJoin(vdetails, eq(wlog.vid, vdetails.id))
            .leftJoin(tdetails, eq(wlog.tid, tdetails.id))
            .leftJoin(suppliers, eq(wlog.sid, suppliers.id))
            .leftJoin(customers, eq(wlog.cid, customers.id))
            .where(and(eq(wlog.id, parseInt(id)), eq(wlog.apikey, userApiKey)));

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Weight log entry not found'
            });
        }

        const entry = result[0];
        const doc = new PDFDocument({ size: 'A5', layout: 'landscape', margin: 30 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=ticket-${entry.id}.pdf`);

        doc.pipe(res);

        // Header
        // Draw Border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

        doc.fontSize(16).font('Helvetica-Bold').text('WESCO PRIVATE LIMITED', { align: 'center' });
        doc.fontSize(10).font('Helvetica').text('204, P.T Gera Centre, Bund Garden Road', { align: 'center' });
        doc.text('PUNE - 411 001', { align: 'center' });
        doc.moveDown();

        // Horizontal Line
        const y = doc.y;
        doc.moveTo(20, y).lineTo(doc.page.width - 20, y).stroke();
        doc.moveDown(0.5);

        // Ticket Details Row 1
        const startY = doc.y;
        doc.font('Helvetica-Bold').text('PRINT DATE     :', 30, startY);
        doc.font('Helvetica').text(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), 120, startY);

        doc.font('Helvetica-Bold').text('PRINT TIME     :', 300, startY);
        doc.font('Helvetica').text(new Date().toLocaleTimeString('en-GB'), 400, startY);

        // Ticket Details Row 2
        doc.moveDown();
        const row2Y = doc.y;
        doc.font('Helvetica-Bold').text('TICKET NO.     :', 30, row2Y);
        doc.font('Helvetica').text(entry.id.toString(), 120, row2Y);

        doc.font('Helvetica-Bold').text('VEHICLE NO.    :', 300, row2Y);
        doc.font('Helvetica').text(entry.vnum || '-', 400, row2Y);

        // Ticket Details Row 3
        doc.moveDown();
        const row3Y = doc.y;
        doc.font('Helvetica-Bold').text('MATERIAL       :', 30, row3Y);
        doc.font('Helvetica').text(entry.mname || '-', 120, row3Y);

        doc.font('Helvetica-Bold').text('CUSTOMER       :', 300, row3Y);
        doc.font('Helvetica').text(entry.cname || entry.sname || '-', 400, row3Y);

        doc.moveDown();
        const lineY2 = doc.y;
        doc.moveTo(20, lineY2).lineTo(doc.page.width - 20, lineY2).stroke();
        doc.moveDown();

        // Weights
        // Gross Weight
        let currentY = doc.y;
        doc.font('Helvetica-Bold').text('GROSS WEIGHT   :', 50, currentY);
        doc.text(entry.fwt ? entry.fwt.toString() : '0', 200, currentY, { align: 'right', width: 60 });
        doc.text('kg', 270, currentY);
        doc.font('Helvetica').text(entry.fwtdt || '', 350, currentY);

        // Tare Weight (if present)
        doc.moveDown();
        currentY = doc.y;
        if (entry.lwt) {
            doc.font('Helvetica-Bold').text('TARE WEIGHT    :', 50, currentY);
            doc.text(entry.lwt.toString(), 200, currentY, { align: 'right', width: 60 });
            doc.text('kg', 270, currentY);
            doc.font('Helvetica').text(entry.lwtdt || '', 350, currentY);
        }

        // Net Weight
        doc.moveDown();
        const lineY3 = doc.y;
        doc.moveTo(40, lineY3).lineTo(doc.page.width - 40, lineY3).stroke(); // Separator for Net
        doc.moveDown(0.5);
        currentY = doc.y;

        const netWeight = entry.swt ? entry.swt : (entry.fwt && entry.lwt ? Math.abs(entry.fwt - entry.lwt) : 0);

        doc.font('Helvetica-Bold').text('NET WEIGHT     :', 50, currentY);
        doc.text(netWeight.toString(), 200, currentY, { align: 'right', width: 60 });
        doc.text('kg', 270, currentY);

        // Footer line
        doc.moveDown();
        const footerY = doc.page.height - 60;
        doc.moveTo(20, footerY).lineTo(doc.page.width - 20, footerY).stroke();

        doc.fontSize(8).text('WEIGHMENT CHARGES - Rs. 10', 30, footerY + 10);
        doc.text('Operator sign', doc.page.width - 100, footerY + 10);


        doc.end();

    } catch (err: any) {
        console.error("Error generating PDF:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
