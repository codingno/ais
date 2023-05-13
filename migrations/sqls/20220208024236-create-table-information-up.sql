/* Replace with your SQL commands */
CREATE TABLE `info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NULL,
  `description` VARCHAR(1000) NULL,
  `position` ENUM('Calendar', 'Guides', 'News') NOT NULL DEFAULT 'News',
  `start_date` DATETIME NOT NULL DEFAULT NOW(),
  `end_date` DATETIME NOT NULL DEFAULT (NOW()+1),
  `status` TINYINT(1) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT NOW(),
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));
