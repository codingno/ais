/* Replace with your SQL commands */
CREATE TABLE `master_grade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `grade` VARCHAR(2) NULL,
  `point` FLOAT NULL,
  `createdAt` DATETIME NULL DEFAULT NOW(),
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`));

INSERT INTO `master_grade` (`grade`, `point`) VALUES ('A', 4.0);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('A-', 3.7);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('B+', 3.3);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('B', 3.0);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('B-', 2.7);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('C+', 2.3);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('C', 2.0);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('D', 1.0);
INSERT INTO `master_grade` (`grade`, `point`) VALUES ('E', 0.0);