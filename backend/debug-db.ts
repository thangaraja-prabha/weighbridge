import { db } from './src/db';
import { sql } from 'drizzle-orm';

async function debugDatabase() {
    try {
        console.log('Testing database connection...');

        // Check if users table exists and get its structure
        const tableStructure = await db.execute(sql`
            DESCRIBE users
        `);

        console.log('Users table structure:');
        console.table(tableStructure);

        // Try to select all users
        const users = await db.execute(sql`
            SELECT * FROM users LIMIT 5
        `);

        console.log('Sample users:');
        console.table(users);

    } catch (error) {
        console.error('Database debug error:', error);
    }
}

debugDatabase();
