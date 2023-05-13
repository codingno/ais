/* Replace with your SQL commands */
ALTER TABLE `user_info` 
ADD COLUMN `nationality` ENUM('WNI', 'WNA') NOT NULL DEFAULT 'WNI' AFTER `identity_type_id`;