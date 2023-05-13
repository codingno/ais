/* Replace with your SQL commands */
ALTER TABLE `students` 
ADD INDEX `students_fk4_idx` (`financial_type_id` ASC);

ALTER TABLE `students` 
ADD CONSTRAINT `students_fk4`
  FOREIGN KEY (`financial_type_id`)
  REFERENCES `financial_type` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
