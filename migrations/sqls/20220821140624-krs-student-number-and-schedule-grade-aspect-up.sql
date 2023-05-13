/* Replace with your SQL commands */
ALTER TABLE `students` 
ADD INDEX `student_number` (`student_number` ASC);

ALTER TABLE `academic_krs` 
ADD INDEX `fk_academic_krs_1_idx` (`student_number` ASC);

ALTER TABLE `academic_krs` 
ADD CONSTRAINT `fk_academic_krs_1`
  FOREIGN KEY (`student_number`)
  REFERENCES `students` (`student_number`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
