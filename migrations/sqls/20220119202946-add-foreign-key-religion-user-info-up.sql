/* Replace with your SQL commands */
ALTER TABLE `user_info` 
CHANGE COLUMN `religion` `religion` INT(11) NULL DEFAULT NULL ,
ADD INDEX `users_fk1` (`religion` ASC);

ALTER TABLE `user_info` 
ADD CONSTRAINT `users_fk1`
  FOREIGN KEY (`religion`)
  REFERENCES `religion` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
