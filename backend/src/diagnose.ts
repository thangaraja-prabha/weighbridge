import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
async function inspect() {
    const config = { host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: parseInt(process.env.DB_PORT || '3306') };
    const conn = await mysql.createConnection(config);
    const tables = ['wlog', 'vdetail', 'tdetail', 'sdetail', 'cdetail', 'mdetail'];
    for (const t of tables) {
        console.log(`\n--- ${t} ---`);
        try {
            const [rows]: any = await conn.execute(`DESCRIBE ${t}`);
            rows.forEach((r: any) => console.log(`- ${r.Field} (${r.Type})`));
        } catch (e: any) { console.log(e.message); }
    }
    conn.end();
}
inspect();
