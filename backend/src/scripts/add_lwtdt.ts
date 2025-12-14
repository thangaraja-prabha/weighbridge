import { db } from '../db';
import { sql } from 'drizzle-orm';

async function updateSchema() {
    try {
        console.log('Adding "lwtdt" column...');
        await db.execute(sql`ALTER TABLE wlog ADD COLUMN lwtdt VARCHAR(30)`);
        console.log('✅ Added "lwtdt" column');
    } catch (e: any) {
        console.log('ℹ️ lwtdt column might already exist:', e.message);
    }
    process.exit(0);
}

updateSchema();
