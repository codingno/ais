/* Replace with your SQL commands */
ALTER TABLE `faculties` 
ADD COLUMN `accreditation` VARCHAR(2) NULL AFTER `code`;

ALTER TABLE `departements` 
ADD COLUMN `accreditation` VARCHAR(2) NULL AFTER `course_credits`;

