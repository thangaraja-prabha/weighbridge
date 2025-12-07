import { Router, Request, Response } from 'express';
import { db } from '../db';
import { mlog } from '../db/schema';
import { sql, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { getPaginationParams, createPaginatedResponse } from '../utils/pagination';

const router = Router();

router.use(authMiddleware);

// Aggregated Maintenance Report
router.get('/maintenance', async (req: Request, res: Response) => {
    try {
        const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
        const groupByParam = (req.query.groupBy as string) || 'stat';

        // Map groupBy param to schema column
        let groupCol;
        if (groupByParam === 'dept') groupCol = mlog.dept;
        else if (groupByParam === 'nop') groupCol = mlog.nop;
        else if (groupByParam === 'item_description1') groupCol = mlog.item_description1;
        else if (groupByParam === 'stype') groupCol = mlog.stype;
        else if (groupByParam === 'username') groupCol = mlog.username;
        else if (groupByParam === 'stat') groupCol = mlog.stat;
        else groupCol = mlog.stat; // default

        // RAW SQL approach for date parsing is easier with Drizzle sql`` template
        // Note: SQLite uses different date functions, but we are on MySQL (or similar).
        // Using STR_TO_DATE(stdate, '%d-%m-%Y')

        const result = await db.select({
            group: groupCol,
            month: sql`MONTH(STR_TO_DATE(${mlog.stdate}, '%d-%m-%Y'))`.as('month'),
            count: sql`count(*)`.as('count')
        })
            .from(mlog)
            .where(
                sql`YEAR(STR_TO_DATE(${mlog.stdate}, '%d-%m-%Y')) = ${year}`
            )
            .groupBy(groupCol, sql`month`);

        // Transform to pivot format: { "Completed": { 1: 5, 2: 10... } }
        const pivoted: any = {};

        result.forEach((row: any) => {
            const g = row.group || 'Unknown';
            if (!pivoted[g]) pivoted[g] = {};
            pivoted[g][row.month] = row.count;
        });

        res.json(pivoted);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// List endpoint for drill-down or detailed search
router.get('/list', async (req: Request, res: Response) => {
    try {
        const { stdate, eddate, stat, dept, page: p, limit: l } = req.query;
        // Use utility but pass limit if provided differently or just use req
        const { page, limit, offset } = getPaginationParams(req);

        let conditions = [];

        if (stdate) {
            conditions.push(sql`STR_TO_DATE(${mlog.stdate}, '%d-%m-%Y') >= ${stdate}`);
        }
        if (eddate) {
            conditions.push(sql`STR_TO_DATE(${mlog.stdate}, '%d-%m-%Y') <= ${eddate}`);
        }
        if (stat) {
            conditions.push(sql`${mlog.stat} = ${stat}`);
        }
        if (dept) {
            conditions.push(sql`${mlog.dept} = ${dept}`);
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        // Count
        const countQuery = db.select({ count: sql`count(*)` }).from(mlog);
        if (whereClause) countQuery.where(whereClause);

        const countResult = await countQuery;
        // @ts-ignore
        const total = Number(countResult[0].count);

        // Data
        const query = db.select().from(mlog);
        if (whereClause) {
            query.where(whereClause);
        }

        const result = await query
            .orderBy(sql`STR_TO_DATE(${mlog.stdate}, '%d-%m-%Y') DESC`)
            .limit(limit)
            .offset(offset);

        res.json(createPaginatedResponse(result, total, page, limit));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
