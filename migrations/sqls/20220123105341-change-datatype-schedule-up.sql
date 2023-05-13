/* Replace with your SQL commands */
ALTER TABLE `academic_schedule` 
CHANGE COLUMN `start_time` `start_time` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `end_time` `end_time` DATETIME NULL DEFAULT NULL ;
