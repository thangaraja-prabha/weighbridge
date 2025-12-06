import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
async function check() {
    const config = { host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: parseInt(process.env.DB_PORT || '3306') };
    const conn = await mysql.createConnection(config);

    console.log('--- wlog (First 2) ---');
    const [wlogRows]: any = await conn.execute('SELECT * FROM wlog LIMIT 2');
    console.log(wlogRows);

    console.log('\n--- depts (First 2) ---');
    const [deptRows]: any = await conn.execute('SELECT * FROM depts LIMIT 2');
    console.log(deptRows);

    console.log('\n--- mlog (First 2) ---');
    const [mlogRows]: any = await conn.execute('SELECT stdate, trn_date FROM mlog LIMIT 2');
    console.log(mlogRows);

    conn.end();
}
check();
