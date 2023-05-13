/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS `days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NULL,
  `nama` varchar(15) NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);

--
-- Dumping data untuk tabel `app_hari`
--

INSERT INTO `days` (`id`, `name`, `nama`) VALUES
(1, 'not set', ''),
(2, 'monday', 'senin'),
(3, 'tuesday', 'selasa'),
(4, 'wednesday', 'rabu'),
(5, 'thursday', 'kamis'),
(6, 'friday', 'jumat'),
(7, 'saturday', 'sabtu'),
(8, 'monday', 'minggu');


CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NULL,
  `capacity` int(11) NULL,
  `description` varchar(100) NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL,
   PRIMARY KEY (`id`)
);

INSERT INTO `rooms` (`id`, `name`, `capacity`, `description`) VALUES
(1, 'not set', 0, ''),
(2, 'L1.R06',  25, ''),
(3, 'L1.R05', 25, ''),
(4, 'L1.R02', 60, ''),
(5, 'L1.R07', 25, ''),
(6, 'L1.R08', 50, ''),
(7, 'L1.R09', 25, '');

