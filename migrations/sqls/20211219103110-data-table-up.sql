CREATE TABLE IF NOT EXISTS `users` (
	`id` CHAR(36) BINARY , 
	`name` VARCHAR(100), 
	`email` VARCHAR(100) UNIQUE, 
	`email_verified` DATETIME, 
	`image` VARCHAR(255), 
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `accounts` (`id` CHAR(36) BINARY , `type` VARCHAR(255) NOT NULL, `provider` VARCHAR(255) NOT NULL, `provider_account_id` VARCHAR(255) NOT NULL, `refresh_token` VARCHAR(255), `access_token` VARCHAR(255), `expires_at` INTEGER, `token_type` VARCHAR(255), `scope` VARCHAR(255), `id_token` VARCHAR(255), `session_state` VARCHAR(255), `user_id` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `sessions` (`id` CHAR(36) BINARY , `expires` DATETIME NOT NULL, `session_token` VARCHAR(255) NOT NULL UNIQUE, `user_id` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `verification_tokens` (`token` VARCHAR(255) , `identifier` VARCHAR(255) NOT NULL, `expires` DATETIME NOT NULL, PRIMARY KEY (`token`));

CREATE TABLE `user_info` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`user_id` CHAR(36) BINARY , 
	`first_name` varchar(60) NOT NULL,
	`last_name` varchar(40) NOT NULL,
	`middle_name` varchar(40),
	`place_of_birth` varchar(80) NOT NULL,
	`date_of_birth` DATE NOT NULL,
	`gender` enum('MAN','WOMAN') NOT NULL DEFAULT 'MAN',
	`identity_id` int NOT NULL,
	`identity_type_id` int NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `students` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` CHAR(36) BINARY , 
	`student_number` varchar(255) NOT NULL,
	`teacher_id` int NULL,
	`entry_year` year NOT NULL,
	`entry_semester` enum('1','2') NOT NULL DEFAULT '1',
	`entry_status` enum('NEW','TRANSFER') NOT NULL DEFAULT 'NEW',
	`departement_id` int NOT NULL,
	`status` int NOT NULL DEFAULT 1,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `teachers` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` CHAR(36) BINARY , 
	`ein` varchar(255) NOT NULL,
	`nidn_code` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`departement_id` int NOT NULL,
	`status` int NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user_secrets` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` CHAR(36) BINARY , 
	`pass` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_token` varchar(255) NOT NULL,
	`email_token_expired` DATETIME NOT NULL,
	`reset_pass_token` varchar(255) NOT NULL,
	`reset_pass_expired` DATETIME NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `departements` (
	`id` int NOT NULL AUTO_INCREMENT,
	`faculty_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`code` varchar(255) NOT NULL,
	`label` varchar(255) NOT NULL,
	`study_type_id` int NOT NULL,
	`status` enum('ACTIVE','NON ACTIVE') NOT NULL DEFAULT 'ACTIVE',
	`course_credits` int NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `faculties` (
	`id` int NOT NULL AUTO_INCREMENT,
	`college_id` int NOT NULL ,
	`name` varchar(255) NOT NULL,
	`code` varchar(255) NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `college` (
	`id` int NOT NULL AUTO_INCREMENT,
	`pt_code` int NOT NULL,
	`code` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`address_1` varchar(10000) NOT NULL,
	`address_2` varchar(10000),
	`city` varchar(255) NOT NULL,
	`post_code` int NOT NULL,
	`phone` varchar(255) NOT NULL,
	`fax` varchar(255) NOT NULL,
	`decision_letter` varchar(255) NOT NULL,
	`since` DATE NOT NULL,
	`email` varchar(255) NOT NULL,
	`site` varchar(255) NOT NULL,
	`pt_start_date` DATE NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `curriculums` (
	`id` int NOT NULL AUTO_INCREMENT,
	`departement_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`year` year NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `courses` (
	`id` int NOT NULL AUTO_INCREMENT,
	`departement_id` int NOT NULL,
	`curriculum_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`code` varchar(225) NOT NULL,
	`credits` int NOT NULL,
	`theory_credits` int NOT NULL,
	`practice_credits` int NOT NULL,
	`practice_field_credits` int NOT NULL,
	`semester` int NOT NULL,
	`course_type_id` int NOT NULL,
	`course_group_id` int NOT NULL,
	`syllabus` enum('AVAILABLE', 'NOT AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
	`event_unit` enum('AVAILABLE', 'NOT AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
	`materials` enum('AVAILABLE', 'NOT AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
	`books` enum('AVAILABLE', 'NOT AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `course_selections` (
	`id` int NOT NULL AUTO_INCREMENT,
	`departement_id` int NOT NULL,
	`student_id` int NOT NULL,
	`course_id` int NOT NULL,
	`grade` varchar(255) NOT NULL,
	`grade_number` int NOT NULL,
	`class_type_id` int NOT NULL,
	`teacher_id` int NOT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `user_info` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`identity_type_id`) REFERENCES `master_identity_types`(`id`);

ALTER TABLE `students` ADD CONSTRAINT `students_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `students` ADD CONSTRAINT `students_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);

ALTER TABLE `students` ADD CONSTRAINT `students_fk2` FOREIGN KEY (`departement_id`) REFERENCES `departements`(`id`);

ALTER TABLE `students` ADD CONSTRAINT `students_fk3` FOREIGN KEY (`status`) REFERENCES `master_student_status`(`id`);

ALTER TABLE `teachers` ADD CONSTRAINT `teachers_fk0` FOREIGN KEY (`departement_id`) REFERENCES `departements`(`id`);

ALTER TABLE `teachers` ADD CONSTRAINT `teachers_fk1` FOREIGN KEY (`status`) REFERENCES `master_teacher_status`(`id`);

ALTER TABLE `user_secrets` ADD CONSTRAINT `user_secrets_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `departements` ADD CONSTRAINT `departements_fk0` FOREIGN KEY (`faculty_id`) REFERENCES `faculties`(`id`);

ALTER TABLE `departements` ADD CONSTRAINT `departements_fk1` FOREIGN KEY (`study_type_id`) REFERENCES `master_study_types`(`id`);

ALTER TABLE `faculties` ADD CONSTRAINT `faculties_fk0` FOREIGN KEY (`college_id`) REFERENCES `college`(`id`);

ALTER TABLE `curriculums` ADD CONSTRAINT `curriculums_fk0` FOREIGN KEY (`departement_id`) REFERENCES `departements`(`id`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`departement_id`) REFERENCES `departements`(`id`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculums`(`id`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk2` FOREIGN KEY (`semester`) REFERENCES `curriculums`(`id`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk3` FOREIGN KEY (`course_type_id`) REFERENCES `master_course_types`(`id`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk4` FOREIGN KEY (`course_group_id`) REFERENCES `master_course_groups`(`id`);

ALTER TABLE `course_selections` ADD CONSTRAINT `course_selections_fk0` FOREIGN KEY (`departement_id`) REFERENCES `departements`(`id`);

ALTER TABLE `course_selections` ADD CONSTRAINT `course_selections_fk1` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`);

ALTER TABLE `course_selections` ADD CONSTRAINT `course_selections_fk2` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`);

ALTER TABLE `course_selections` ADD CONSTRAINT `course_selections_fk3` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);