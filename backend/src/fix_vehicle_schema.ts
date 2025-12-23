import { db } from './db';
import { sql } from 'drizzle-orm';

async function fix() {
    try {
        await db.execute(sql`ALTER TABLE vdetails ADD COLUMN twt INT DEFAULT 0`);
        console.log('Added twt column to vdetails');
        process.exit(0);
    } catch (e) {
        console.error(e);
        // Error code 1060 means duplicate column name
        if ((e as any).errno === 1060) {
            console.log('Column already exists');
            process.exit(0);
        }
        process.exit(1);
    }
}

fix();
