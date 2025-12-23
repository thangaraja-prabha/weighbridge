import { db } from './db';
import { sql } from 'drizzle-orm';

async function check() {
    try {
        const result = await db.execute(sql`DESCRIBE vdetails`);
        console.log('vdetails columns:', result[0]);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
