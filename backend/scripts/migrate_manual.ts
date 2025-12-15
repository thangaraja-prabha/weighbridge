import { db } from '../src/db';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log('Creating vdetails table...');
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS vdetails (
                id int AUTO_INCREMENT PRIMARY KEY,
                vnum varchar(20),
                apikey varchar(10),
                uid int,
                udt varchar(20)
            )
        `);
        console.log('vdetails table created.');

        console.log('Adding tid column to wlog table...');
        try {
            await db.execute(sql`ALTER TABLE wlog ADD COLUMN tid int`);
            console.log('tid column added.');
        } catch (e: any) {
            if (e.message.includes("Duplicate column name")) {
                console.log('tid column already exists.');
            } else {
                throw e;
            }
        }

        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
}

main();
