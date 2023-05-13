/* Replace with your SQL commands */
CREATE TABLE `data_portfolio` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NULL,
  `portfolio_id` INT(11) NULL,
  `description` VARCHAR(1000) NULL,
  `url` VARCHAR(225) NULL,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));
