/* Replace with your SQL commands */
CREATE TABLE `student_temp` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL,
  `faculty` INT(11) NULL,
  `departement` INT(11) NULL,
  `financial_type_id` INT(11) NULL,
  `nationality` ENUM('WNI', 'WNA') NOT NULL DEFAULT 'WNI',
  `entry_year` YEAR(4) NULL,
  `email` VARCHAR(150) NULL,
  `generate` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT NOW(),
  `updatedAt` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));
