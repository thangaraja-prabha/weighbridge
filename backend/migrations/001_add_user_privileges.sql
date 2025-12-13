-- Migration script to add user_privileges table and migrate existing data
-- Run this SQL script on your database

-- Step 1: Create the user_privileges junction table
CREATE TABLE IF NOT EXISTS user_privileges (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  privilege_id INT NOT NULL,
  apikey VARCHAR(10) NOT NULL,
  uid INT NOT NULL,
  udt VARCHAR(20) NOT NULL,
  UNIQUE KEY unique_user_privilege (user_id, privilege_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (privilege_id) REFERENCES privillages(id) ON DELETE CASCADE
);

-- Step 2: Migrate existing data from users.pid to user_privileges table
-- Only migrate users that have a valid pid (not NULL)
INSERT INTO user_privileges (user_id, privilege_id, apikey, uid, udt)
SELECT id, pid, apikey, id, COALESCE(udt, NOW())
FROM users 
WHERE pid IS NOT NULL
ON DUPLICATE KEY UPDATE user_id = user_id; -- Avoid duplicates if script is run multiple times

-- Step 3: (Optional) After verifying the migration worked, you can remove the pid column
-- ALTER TABLE users DROP COLUMN pid;
-- Note: We're keeping the pid column for now for backward compatibility
