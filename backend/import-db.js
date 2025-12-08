const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function importDatabase() {
    try {
        // Connect to MySQL without specifying database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });

        // Create database if it doesn't exist
        await connection.execute('CREATE DATABASE IF NOT EXISTS wb2025');
        await connection.execute('USE wb2025');
        
        console.log('Database wb2025 created/selected successfully');

        // Read and execute SQL file
        const sqlFile = path.join(__dirname, 'wb2025.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Split SQL into individual statements
        const statements = sql.split(';').filter(stmt => stmt.trim());
        
        for (const statement of statements) {
            if (statement.trim()) {
                await connection.execute(statement);
            }
        }
        
        console.log('Database imported successfully!');
        await connection.end();
        
    } catch (error) {
        console.error('Error importing database:', error);
    }
}

importDatabase();
