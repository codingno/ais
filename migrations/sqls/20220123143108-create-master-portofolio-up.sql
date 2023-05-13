/* Replace with your SQL commands */
CREATE TABLE `master_portfolio` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(225) NULL,
  `description` VARCHAR(1000) NULL,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

INSERT INTO `master_portfolio` (`name`) VALUES ('Profesional Development');
INSERT INTO `master_portfolio` (`name`) VALUES ('Degree Candidacy');
INSERT INTO `master_portfolio` (`name`) VALUES ('Academic Advising');
INSERT INTO `master_portfolio` (`name`) VALUES ('Thesis/Disertation');
