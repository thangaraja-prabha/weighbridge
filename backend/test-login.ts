import { db } from './src/db';
import { users } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function testUsers() {
    try {
        console.log('Testing database connection and users...');
        
        // Get all users
        const allUsers = await db.select().from(users);
        console.log('All users in database:');
        console.table(allUsers);
        
        // Test specific user
        const testUser = await db
            .select()
            .from(users)
            .where(eq(users.username, 'thangaraja'))
            .limit(1);
            
        console.log('Test user (thangaraja):');
        console.table(testUser);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

testUsers();
