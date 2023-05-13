CREATE TABLE `master_course_types` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_identity_types` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_study_types` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_course_groups` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_class_types` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_teacher_status` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `master_student_status` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL ,
	`description` varchar(1000) NOT NULL ,
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
	PRIMARY KEY (`id`)
);
