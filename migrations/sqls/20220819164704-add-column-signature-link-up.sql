/* Replace with your SQL commands */

ALTER TABLE `departements` 
ADD COLUMN `signature_link` VARCHAR(255) NULL DEFAULT NULL AFTER `teacher_id`;
