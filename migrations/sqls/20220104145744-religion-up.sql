/* Replace with your SQL commands */
-- Struktur dari tabel `religion`
--

CREATE TABLE IF NOT EXISTS `religion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) COLLATE utf8_bin DEFAULT NULL,
	`createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);

--
-- Dumping data untuk tabel `religion`
--

INSERT INTO `religion` (`id`, `name`) VALUES
(1, 'Islam'),
(2, 'Kristen'),
(3, 'Katolik'),
(4, 'Budha'),
(5, 'Hindu'),
(6, 'Kepercayaan');
--
-- Struktur dari tabel `akademik_jadwal_kuliah`
--

CREATE TABLE IF NOT EXISTS `academic_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `academic_year_id` int(11) NULL,
  `departement_id` int(11) NULL,
  `course_id` int(11) NULL,
  `day_id` int(11) NULL,
  `room_id` int(11) NULL,
  `teacher_id` int(11) NULL,
  `semester` int(11) NULL,
  `start_time` varchar(9) NULL,
  `end_time` varchar(9) NULL,
	`createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);
-- add column religion
ALTER TABLE `user_info` 
ADD COLUMN `religion` VARCHAR(15) NULL AFTER `gender`;

CREATE TABLE IF NOT EXISTS `academic_krs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_number` varchar(10) NULL,
  `schedule_id` int(11) NULL,
  `semester` int(11) NULL COMMENT 'semester mahasiswa waktu pengambilan krs',
	`createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);

-- students table
ALTER TABLE `students` 
ADD COLUMN `mother_name` VARCHAR(100) NULL AFTER `updatedAt`,
ADD COLUMN `father_name` VARCHAR(100) NULL AFTER `mother_name`,
ADD COLUMN `father_income` INT(11) NULL AFTER `father_name`,
ADD COLUMN `mother_income` INT(11) NULL AFTER `father_income`,
ADD COLUMN `school_name` VARCHAR(50) NULL AFTER `mother_income`,
ADD COLUMN `school_telp` VARCHAR(12) NULL AFTER `school_name`,
ADD COLUMN `school_address` VARCHAR(45) NULL AFTER `school_telp`,
ADD COLUMN `school_departement` VARCHAR(80) NULL AFTER `school_address`,
ADD COLUMN `school_end` INT(4) NULL AFTER `school_departement`,
ADD COLUMN `campus_name` VARCHAR(50) NULL AFTER `school_end`,
ADD COLUMN `campus_telp` VARCHAR(12) NULL AFTER `campus_name`,
ADD COLUMN `campus_address` VARCHAR(45) NULL AFTER `campus_telp`,
ADD COLUMN `campus_departement` VARCHAR(80) NULL AFTER `campus_address`,
ADD COLUMN `campus_end` INT(4) NULL AFTER `campus_departement`,
ADD COLUMN `institution_name` VARCHAR(50) NULL AFTER `school_end`,
ADD COLUMN `institution_telp` VARCHAR(12) NULL AFTER `institution_name`,
ADD COLUMN `institution_address` VARCHAR(45) NULL AFTER `institution_telp`,
ADD COLUMN `institution_start` INT(4) NULL AFTER `institution_address`,
ADD COLUMN `institution_end` INT(4) NULL AFTER `institution_start`,
ADD COLUMN `semester_active` INT(11) NULL AFTER `institution_end`;

-- teacher marriage_status
ALTER TABLE `teachers` 
ADD COLUMN `marriage_status` ENUM('MARRY', 'SINGLE') NULL AFTER `departement_id`;