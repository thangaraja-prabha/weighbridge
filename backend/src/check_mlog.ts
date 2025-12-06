import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
async function check() {
    const config = { host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: parseInt(process.env.DB_PORT || '3306') };
    const conn = await mysql.createConnection(config);
    const [rows]: any = await conn.execute('SELECT * FROM mlog LIMIT 1');
    console.log(rows);
    conn.end();
}
check();
