/* Replace with your SQL commands */
CREATE TABLE `student_exchange` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL,
  `student_number` VARCHAR(45) NULL,
  `faculty_id` INT(11) NULL,
  `exchange_with_university` VARCHAR(150) NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT NOW(),
  `updatedAt` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));

CREATE TABLE `student_leave` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL,
  `student_number` VARCHAR(45) NULL,
  `faculty_id` INT(11) NULL,
  `date` DATETIME NULL,
  `reason` VARCHAR(250) NULL,
  `approved` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT NOW(),
  `updatedAt` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));
