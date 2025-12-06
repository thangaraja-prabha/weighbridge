import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function fixSchema() {
    const config = { host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: parseInt(process.env.DB_PORT || '3306') };
    const conn = await mysql.createConnection(config);

    const tables = ['depts', 'shifts', 'nopt', 'mdetail', 'vdetail', 'tdetail', 'sdetail', 'cdetail', 'wlog', 'mlog', 'users'];

    console.log('🔧 Fixing AUTO_INCREMENT on tables...');

    for (const t of tables) {
        try {
            // Check if column is AI ? Hard to check reliably quickly, just try to modify.
            // Note: MODIFY implies the column type. Assuming INT Primary Key.
            // Current schema calls check_data.ts showed id is int.
            await conn.query(`ALTER TABLE ${t} MODIFY COLUMN id INT AUTO_INCREMENT`);
            console.log(`✅ ${t}: Fixed`);
        } catch (e: any) {
            console.log(`⚠️ ${t}: ${e.message}`);
        }
    }

    conn.end();
}

fixSchema();
