/* Replace with your SQL commands */
ALTER TABLE `user_info` 
ADD COLUMN `region` VARCHAR(255) NULL AFTER `nationality`,
ADD COLUMN `home_address` TEXT NULL DEFAULT NULL AFTER `region`;

ALTER TABLE students ADD mobile_number varchar(50) DEFAULT NULL NULL;
ALTER TABLE students ADD emergency_contact varchar(50) DEFAULT NULL NULL;
ALTER TABLE students ADD marriage_status ENUM('Married','Single','Single Parent') DEFAULT 'Single' NULL;
ALTER TABLE students ADD edu_background_degree varchar(100) DEFAULT NULL NULL;
ALTER TABLE students ADD edu_background_name varchar(255) DEFAULT NULL NULL;
ALTER TABLE students ADD edu_background_faculty varchar(255) DEFAULT NULL NULL;
ALTER TABLE students ADD edu_background_departement varchar(255) DEFAULT NULL NULL;
ALTER TABLE students ADD edu_background_major varchar(255) DEFAULT NULL NULL;

ALTER TABLE academic_schedule ADD teacher_3_id int(11) NULL AFTER teacher_2_id;
ALTER TABLE academic_schedule ADD teacher_4_id int(11) NULL AFTER teacher_3_id;
