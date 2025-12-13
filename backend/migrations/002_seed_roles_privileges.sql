-- Seed data for roles and privileges tables
-- Run this SQL script on your database to populate lookup tables

-- Insert default roles (if they don't exist)
INSERT INTO roles (id, role, apikey, uid, udt) VALUES
(1, 'Admin', 'SYSTEM00', 1, NOW()),
(2, 'Manager', 'SYSTEM00', 1, NOW()),
(3, 'User', 'SYSTEM00', 1, NOW()),
(4, 'Operator', 'SYSTEM00', 1, NOW())
ON DUPLICATE KEY UPDATE role = VALUES(role);

-- Insert default privileges (if they don't exist)
INSERT INTO privillages (id, privil, apikey, uid, udt) VALUES
(1, 'Full Access', 'SYSTEM00', 1, NOW()),
(2, 'Read Only', 'SYSTEM00', 1, NOW()),
(3, 'Read/Write', 'SYSTEM00', 1, NOW()),
(4, 'Limited Access', 'SYSTEM00', 1, NOW())
ON DUPLICATE KEY UPDATE privil = VALUES(privil);

-- Verify the data
SELECT * FROM roles;
SELECT * FROM privillages;
