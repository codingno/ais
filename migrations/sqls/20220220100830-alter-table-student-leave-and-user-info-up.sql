/* Replace with your SQL commands */
ALTER TABLE `student_leave` 
CHANGE COLUMN `approved` `approved` TINYINT(1) NULL DEFAULT NULL ;

ALTER TABLE `user_info` 
ADD COLUMN `expiredVisa` DATETIME NULL DEFAULT NULL AFTER `updatedAt`;
