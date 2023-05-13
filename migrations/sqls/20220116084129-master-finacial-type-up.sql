/* Replace with your SQL commands */
CREATE TABLE `financial_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `users` 
ADD COLUMN `role_id` INT(11) NULL AFTER `image`;

ALTER TABLE `students` 
ADD COLUMN `financial_type_id` INT(11) NULL AFTER `teacher_id`;

ALTER TABLE `faculties` 
ADD COLUMN `head` VARCHAR(2) NULL AFTER `code`;

ALTER TABLE `departements` 
ADD COLUMN `head` VARCHAR(2) NULL AFTER `course_credits`;

