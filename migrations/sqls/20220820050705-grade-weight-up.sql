/* Replace with your SQL commands */

CREATE TABLE `master_grade_aspect` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `percentage` INT(11) NOT NULL,
  `position` INT(11) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

CREATE TABLE `course_grade_aspect` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `academic_schedule_id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `percentage` INT(11) NOT NULL DEFAULT 0,
  `position` INT(11) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_course_grade_aspect_1_idx` (`academic_schedule_id` ASC),
  CONSTRAINT `fk_course_grade_aspect_1`
    FOREIGN KEY (`academic_schedule_id`)
    REFERENCES `academic_schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `student_grade_per_aspect` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `academic_krs_id` INT(11) NOT NULL,
  `course_grade_aspect_id` INT(11) UNSIGNED NOT NULL,
  `grade` INT(11) NOT NULL,
  `grade_by_percentage` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_grade_per_aspect_1_idx` (`academic_krs_id` ASC),
  INDEX `fk_student_grade_per_aspect_2_idx` (`course_grade_aspect_id` ASC),
  CONSTRAINT `fk_student_grade_per_aspect_1`
    FOREIGN KEY (`academic_krs_id`)
    REFERENCES `academic_krs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_grade_per_aspect_2`
    FOREIGN KEY (`course_grade_aspect_id`)
    REFERENCES `course_grade_aspect` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
