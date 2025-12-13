-- Migration script to add privilege_ids JSON column to users table
-- Run this SQL script on your database

-- Step 1: Add privilege_ids column to users table
ALTER TABLE users ADD COLUMN privilege_ids JSON DEFAULT NULL;

-- Step 2: Migrate existing data from pid to privilege_ids
UPDATE users 
SET privilege_ids = JSON_ARRAY(pid) 
WHERE pid IS NOT NULL;

-- Step 3: (Optional) After verifying the migration worked, you can remove the pid column
-- ALTER TABLE users DROP COLUMN pid;
-- Note: We're keeping the pid column for now for backward compatibility
