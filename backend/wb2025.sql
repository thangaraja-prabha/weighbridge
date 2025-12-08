-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2025 at 01:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wb2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `cname` varchar(30) DEFAULT NULL,
  `cadd` text DEFAULT NULL,
  `cnum` varchar(30) DEFAULT NULL,
  `crem` text DEFAULT NULL,
  `apikey` varchar(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `cname`, `cadd`, `cnum`, `crem`, `apikey`, `uid`, `udt`) VALUES
(1, 'Customer 01', 'Address 1, Industrial Area', '+919800100001', 'Regular', 'WESOPC01', 1, '2025-01-02 08:10:00'),
(2, 'Customer 02', 'Address 2, Industrial Area', '+919800100002', 'Regular', 'WESOPC01', 1, '2025-01-04 09:15:00'),
(3, 'Customer 03', 'Address 3, Industrial Area', '+919800100003', 'Regular', 'WESOPC01', 1, '2025-01-06 10:20:00'),
(4, 'Customer 04', 'Address 4, Industrial Area', '+919800100004', 'Regular', 'WESOPC01', 1, '2025-01-08 11:25:00'),
(5, 'Customer 05', 'Address 5, Industrial Area', '+919800100005', 'Regular', 'WESOPC01', 1, '2025-01-10 12:30:00'),
(6, 'Customer 06', 'Address 6, Industrial Area', '+919800100006', 'Regular', 'WESOPC01', 1, '2025-02-02 08:05:00'),
(7, 'Customer 07', 'Address 7, Industrial Area', '+919800100007', 'Regular', 'WESOPC01', 1, '2025-02-04 09:10:00'),
(8, 'Customer 08', 'Address 8, Industrial Area', '+919800100008', 'Regular', 'WESOPC01', 1, '2025-02-06 10:15:00'),
(9, 'Customer 09', 'Address 9, Industrial Area', '+919800100009', 'Regular', 'WESOPC01', 1, '2025-02-08 11:20:00'),
(10, 'Customer 10', 'Address 10, Industrial Area', '+919800100010', 'Regular', 'WESOPC01', 1, '2025-02-10 12:25:00'),
(11, 'Customer 11', 'Address 11, Industrial Area', '+919800100011', 'Regular', 'CMP00111', 1, '2025-03-01 08:12:00'),
(12, 'Customer 12', 'Address 12, Industrial Area', '+919800100012', 'Regular', 'CMP00112', 1, '2025-03-03 09:17:00'),
(13, 'Customer 13', 'Address 13, Industrial Area', '+919800100013', 'Regular', 'CMP00113', 1, '2025-03-05 10:22:00'),
(14, 'Customer 14', 'Address 14, Industrial Area', '+919800100014', 'Regular', 'CMP00114', 1, '2025-03-07 11:27:00'),
(15, 'Customer 15', 'Address 15, Industrial Area', '+919800100015', 'Regular', 'CMP00115', 1, '2025-03-09 12:32:00'),
(16, 'Customer 16', 'Address 16, Industrial Area', '+919800100016', 'Regular', 'CMP00116', 1, '2025-04-02 08:08:00'),
(17, 'Customer 17', 'Address 17, Industrial Area', '+919800100017', 'Regular', 'CMP00117', 1, '2025-04-04 09:13:00'),
(18, 'Customer 18', 'Address 18, Industrial Area', '+919800100018', 'Regular', 'CMP00118', 1, '2025-04-06 10:18:00'),
(19, 'Customer 19', 'Address 19, Industrial Area', '+919800100019', 'Regular', 'CMP00119', 1, '2025-04-08 11:23:00'),
(20, 'Customer 20', 'Address 20, Industrial Area', '+919800100020', 'Regular', 'CMP00120', 1, '2025-04-10 12:28:00'),
(21, 'Customer 21', 'Address 21, Industrial Area', '+919800100021', 'Regular', 'CMP00121', 1, '2025-05-02 08:02:00'),
(22, 'Customer 22', 'Address 22, Industrial Area', '+919800100022', 'Regular', 'CMP00122', 1, '2025-05-04 09:07:00'),
(23, 'Customer 23', 'Address 23, Industrial Area', '+919800100023', 'Regular', 'CMP00123', 1, '2025-05-06 10:12:00'),
(24, 'Customer 24', 'Address 24, Industrial Area', '+919800100024', 'Regular', 'CMP00124', 1, '2025-05-08 11:17:00'),
(25, 'Customer 25', 'Address 25, Industrial Area', '+919800100025', 'Regular', 'CMP00125', 1, '2025-05-10 12:22:00'),
(26, 'Customer 26', 'Address 26, Industrial Area', '+919800100026', 'Regular', 'CMP00126', 1, '2025-06-02 08:05:00'),
(27, 'Customer 27', 'Address 27, Industrial Area', '+919800100027', 'Regular', 'CMP00127', 1, '2025-06-04 09:10:00'),
(28, 'Customer 28', 'Address 28, Industrial Area', '+919800100028', 'Regular', 'CMP00128', 1, '2025-06-06 10:15:00'),
(29, 'Customer 29', 'Address 29, Industrial Area', '+919800100029', 'Regular', 'CMP00129', 1, '2025-06-08 11:20:00'),
(30, 'Customer 30', 'Address 30, Industrial Area', '+919800100030', 'Regular', 'CMP00130', 1, '2025-06-10 12:25:00'),
(31, 'Customer 31', 'Address 31, Industrial Area', '+919800100031', 'Regular', 'CMP00131', 1, '2025-07-02 08:00:00'),
(32, 'Customer 32', 'Address 32, Industrial Area', '+919800100032', 'Regular', 'CMP00132', 1, '2025-07-04 09:05:00'),
(33, 'Customer 33', 'Address 33, Industrial Area', '+919800100033', 'Regular', 'CMP00133', 1, '2025-07-06 10:10:00'),
(34, 'Customer 34', 'Address 34, Industrial Area', '+919800100034', 'Regular', 'CMP00134', 1, '2025-07-08 11:15:00'),
(35, 'Customer 35', 'Address 35, Industrial Area', '+919800100035', 'Regular', 'CMP00135', 1, '2025-07-10 12:20:00'),
(36, 'Customer 36', 'Address 36, Industrial Area', '+919800100036', 'Regular', 'CMP00136', 1, '2025-08-02 08:03:00'),
(37, 'Customer 37', 'Address 37, Industrial Area', '+919800100037', 'Regular', 'CMP00137', 1, '2025-08-04 09:08:00'),
(38, 'Customer 38', 'Address 38, Industrial Area', '+919800100038', 'Regular', 'CMP00138', 1, '2025-08-06 10:13:00'),
(39, 'Customer 39', 'Address 39, Industrial Area', '+919800100039', 'Regular', 'CMP00139', 1, '2025-08-08 11:18:00'),
(40, 'Customer 40', 'Address 40, Industrial Area', '+919800100040', 'Regular', 'CMP00140', 1, '2025-08-10 12:23:00'),
(41, 'Customer 41', 'Address 41, Industrial Area', '+919800100041', 'Regular', 'CMP00141', 1, '2025-09-02 08:06:00'),
(42, 'Customer 42', 'Address 42, Industrial Area', '+919800100042', 'Regular', 'CMP00142', 1, '2025-09-04 09:11:00'),
(43, 'Customer 43', 'Address 43, Industrial Area', '+919800100043', 'Regular', 'CMP00143', 1, '2025-09-06 10:16:00'),
(44, 'Customer 44', 'Address 44, Industrial Area', '+919800100044', 'Regular', 'CMP00144', 1, '2025-09-08 11:21:00'),
(45, 'Customer 45', 'Address 45, Industrial Area', '+919800100045', 'Regular', 'CMP00145', 1, '2025-09-10 12:26:00'),
(46, 'Customer 46', 'Address 46, Industrial Area', '+919800100046', 'Regular', 'CMP00146', 1, '2025-10-02 08:09:00'),
(47, 'Customer 47', 'Address 47, Industrial Area', '+919800100047', 'Regular', 'CMP00147', 1, '2025-10-04 09:14:00'),
(48, 'Customer 48', 'Address 48, Industrial Area', '+919800100048', 'Regular', 'CMP00148', 1, '2025-10-06 10:19:00'),
(49, 'Customer 49', 'Address 49, Industrial Area', '+919800100049', 'Regular', 'CMP00149', 1, '2025-10-08 11:24:00'),
(50, 'Customer 50', 'Address 50, Industrial Area', '+919800100050', 'Regular', 'CMP00150', 1, '2025-10-10 12:29:00'),
(51, 'dfadsa', 'fdsafasd', 'fdsafdas', NULL, 'WESOPC01', 1, '2025-12-08 13:04:01');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `mname` varchar(30) DEFAULT NULL,
  `mdetail` text DEFAULT NULL,
  `apikey` varchar(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `mname`, `mdetail`, `apikey`, `uid`, `udt`) VALUES
(1, 'Cement 01', 'OPC 53 grade 50kg bag', 'WESOPC01', 1, '2025-01-04 08:30:00'),
(2, 'Cement 02', 'OPC 43 grade 50kg bag', 'WESOPC01', 1, '2025-01-06 09:35:00'),
(3, 'Steel 01', 'TMT 8 mm', 'WESOPC01', 1, '2025-01-08 10:40:00'),
(4, 'Steel 02', 'TMT 10 mm', 'WESOPC01', 1, '2025-01-10 11:45:00'),
(5, 'Sand 01', 'River sand fine', 'WESOPC01', 1, '2025-01-12 12:50:00'),
(6, 'Gravel 01', 'Coarse aggregate 20mm', 'CMP00306', 1, '2025-02-06 08:27:00'),
(7, 'Gravel 02', 'Coarse aggregate 10mm', 'CMP00307', 1, '2025-02-08 09:32:00'),
(8, 'Stone 01', 'Crushed stone', 'CMP00308', 1, '2025-02-10 10:37:00'),
(9, 'Stone 02', 'Crushed stone large', 'CMP00309', 1, '2025-02-12 11:42:00'),
(10, 'Cement 03', 'Portland Pozzolana Cement', 'CMP00310', 1, '2025-02-14 12:47:00'),
(11, 'Steel 03', 'TMT 12 mm', 'CMP00311', 1, '2025-03-06 08:28:00'),
(12, 'Steel 04', 'TMT 16 mm', 'CMP00312', 1, '2025-03-08 09:33:00'),
(13, 'Sand 02', 'Washed sand', 'CMP00313', 1, '2025-03-10 10:38:00'),
(14, 'Gravel 03', 'Fine aggregate', 'CMP00314', 1, '2025-03-12 11:43:00'),
(15, 'Stone 03', 'Granite chips', 'CMP00315', 1, '2025-03-14 12:48:00'),
(16, 'Cement 04', 'Sulfate resistant cement', 'CMP00316', 1, '2025-04-06 08:29:00'),
(17, 'Cement 05', 'Blended cement', 'CMP00317', 1, '2025-04-08 09:34:00'),
(18, 'Steel 05', 'MS plates', 'CMP00318', 1, '2025-04-10 10:39:00'),
(19, 'Sand 03', 'M-sand', 'CMP00319', 1, '2025-04-12 11:44:00'),
(20, 'Gravel 04', 'Pea gravel', 'CMP00320', 1, '2025-04-14 12:49:00'),
(21, 'Cement 06', 'White cement', 'CMP00321', 1, '2025-05-06 08:31:00'),
(22, 'Steel 06', 'Cold rolled steel', 'CMP00322', 1, '2025-05-08 09:36:00'),
(23, 'Cement 07', 'Aluminium cement', 'CMP00323', 1, '2025-05-10 10:41:00'),
(24, 'Sand 04', 'Manufactured sand', 'CMP00324', 1, '2025-05-12 11:46:00'),
(25, 'Stone 04', 'Basalt chips', 'CMP00325', 1, '2025-05-14 12:51:00'),
(26, 'Cement 08', 'Hydraulic cement', 'CMP00326', 1, '2025-06-06 08:33:00'),
(27, 'Steel 07', 'Rebar 20 mm', 'CMP00327', 1, '2025-06-08 09:38:00'),
(28, 'Sand 05', 'Concrete sand', 'CMP00328', 1, '2025-06-10 10:43:00'),
(29, 'Gravel 05', 'Washed gravel', 'CMP00329', 1, '2025-06-12 11:48:00'),
(30, 'Stone 05', 'Limestone chips', 'CMP00330', 1, '2025-06-14 12:53:00'),
(31, 'Cement 09', 'Low heat cement', 'CMP00331', 1, '2025-07-06 08:35:00'),
(32, 'Steel 08', 'Galvanized steel', 'CMP00332', 1, '2025-07-08 09:40:00'),
(33, 'Sand 06', 'Beach sand', 'CMP00333', 1, '2025-07-10 10:45:00'),
(34, 'Gravel 06', 'Mixed aggregate', 'CMP00334', 1, '2025-07-12 11:50:00'),
(35, 'Stone 06', 'Marble chips', 'CMP00335', 1, '2025-07-14 12:55:00'),
(36, 'Cement 10', 'Oil well cement', 'CMP00336', 1, '2025-08-06 08:37:00'),
(37, 'Steel 09', 'Tapered steel', 'CMP00337', 1, '2025-08-08 09:42:00'),
(38, 'Sand 07', 'Pit sand', 'CMP00338', 1, '2025-08-10 10:47:00'),
(39, 'Gravel 07', 'Crushed aggregate', 'CMP00339', 1, '2025-08-12 11:52:00'),
(40, 'Stone 07', 'Granite dust', 'CMP00340', 1, '2025-08-14 12:57:00'),
(41, 'Cement 11', 'Expansive cement', 'CMP00341', 1, '2025-09-06 08:39:00'),
(42, 'Steel 10', 'Cold drawn steel', 'CMP00342', 1, '2025-09-08 09:44:00'),
(43, 'Sand 08', 'Pit washed sand', 'CMP00343', 1, '2025-09-10 10:49:00'),
(44, 'Gravel 08', 'Rounded gravel', 'CMP00344', 1, '2025-09-12 11:54:00'),
(45, 'Stone 08', 'Pebbles', 'CMP00345', 1, '2025-09-14 12:59:00'),
(46, 'Cement 12', 'High alumina cement', 'CMP00346', 1, '2025-10-06 08:41:00'),
(47, 'Steel 11', 'Alloy steel', 'CMP00347', 1, '2025-10-08 09:46:00'),
(48, 'Sand 09', 'Dredged sand', 'CMP00348', 1, '2025-10-10 10:51:00'),
(49, 'Gravel 09', 'Fine gravel', 'CMP00349', 1, '2025-10-12 11:56:00'),
(50, 'Stone 09', 'Quartz chips', 'CMP00350', 1, '2025-10-14 13:01:00'),
(51, '', '', 'WESOPC01', 1, '2025-12-08 12:56:06'),
(52, 'Gypsom', 'Chemical components', 'WESOPC01', 1, '2025-12-08 13:03:31'),
(53, 'Gypsom', 'Chemical components', 'WESOPC01', 1, '2025-12-08 13:03:33'),
(54, 'Gypsom', 'Chemical components', 'WESOPC01', 1, '2025-12-08 13:03:33'),
(55, 'Gypsom', 'Chemical components', 'WESOPC01', 1, '2025-12-08 13:03:33'),
(56, 'Gypsom', 'Chemical components', 'WESOPC01', 1, '2025-12-08 13:03:34'),
(57, 'Gypsom', 'Chemical components', 'WESOPC01', 1, '2025-12-08 13:03:37'),
(58, 'dsafdsa', 'asdfasd', 'WESOPC01', 1, '2025-12-08 13:03:42');

-- --------------------------------------------------------

--
-- Table structure for table `modes`
--

CREATE TABLE `modes` (
  `id` int(11) NOT NULL,
  `mode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modes`
--

INSERT INTO `modes` (`id`, `mode`) VALUES
(1, 'Internal'),
(2, 'External');

-- --------------------------------------------------------

--
-- Table structure for table `privillages`
--

CREATE TABLE `privillages` (
  `id` int(11) NOT NULL,
  `privil` varchar(20) NOT NULL,
  `apikey` varchar(10) NOT NULL,
  `uid` int(11) NOT NULL,
  `udt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privillages`
--

INSERT INTO `privillages` (`id`, `privil`, `apikey`, `uid`, `udt`) VALUES
(1, 'Read', '', 1, ''),
(2, 'Write', '', 1, ''),
(3, 'Print', '', 1, ''),
(4, 'Backup', '', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `apikey` varchar(10) NOT NULL,
  `uid` int(11) NOT NULL,
  `udt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role`, `apikey`, `uid`, `udt`) VALUES
(1, 'Administrator', '', 1, ''),
(2, 'Admin', '', 1, ''),
(3, 'Manager', '', 1, ''),
(4, 'Executive', '', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `sname` varchar(30) DEFAULT NULL,
  `sadd` text DEFAULT NULL,
  `snum` varchar(30) DEFAULT NULL,
  `srem` text DEFAULT NULL,
  `apikey` varchar(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `sname`, `sadd`, `snum`, `srem`, `apikey`, `uid`, `udt`) VALUES
(1, 'Supplier 01', 'Quarry Road 1', '+919900200001', 'Stone supply', 'WESOPC01', 1, '2025-01-03 08:20:00'),
(2, 'Supplier 02', 'Quarry Road 2', '+919900200002', 'Cement supply', 'WESOPC01', 1, '2025-01-05 09:25:00'),
(3, 'Supplier 03', 'Quarry Road 3', '+919900200003', 'Steel supply', 'WESOPC01', 1, '2025-01-07 10:30:00'),
(4, 'Supplier 04', 'Quarry Road 4', '+919900200004', 'Sand supply', 'WESOPC01', 1, '2025-01-09 11:35:00'),
(5, 'Supplier 05', 'Quarry Road 5', '+919900200005', 'Aggregate', 'WESOPC01', 1, '2025-01-11 12:40:00'),
(6, 'Supplier 06', 'Quarry Road 6', '+919900200006', 'Stone supply', 'CMP00206', 1, '2025-02-03 08:22:00'),
(7, 'Supplier 07', 'Quarry Road 7', '+919900200007', 'Cement supply', 'CMP00207', 1, '2025-02-05 09:27:00'),
(8, 'Supplier 08', 'Quarry Road 8', '+919900200008', 'Steel supply', 'CMP00208', 1, '2025-02-07 10:32:00'),
(9, 'Supplier 09', 'Quarry Road 9', '+919900200009', 'Sand supply', 'CMP00209', 1, '2025-02-09 11:37:00'),
(10, 'Supplier 10', 'Quarry Road 10', '+919900200010', 'Aggregate', 'CMP00210', 1, '2025-02-11 12:42:00'),
(11, 'Supplier 11', 'Quarry Road 11', '+919900200011', 'Stone supply', 'CMP00211', 1, '2025-03-02 08:18:00'),
(12, 'Supplier 12', 'Quarry Road 12', '+919900200012', 'Cement supply', 'CMP00212', 1, '2025-03-04 09:23:00'),
(13, 'Supplier 13', 'Quarry Road 13', '+919900200013', 'Steel supply', 'CMP00213', 1, '2025-03-06 10:28:00'),
(14, 'Supplier 14', 'Quarry Road 14', '+919900200014', 'Sand supply', 'CMP00214', 1, '2025-03-08 11:33:00'),
(15, 'Supplier 15', 'Quarry Road 15', '+919900200015', 'Aggregate', 'CMP00215', 1, '2025-03-10 12:38:00'),
(16, 'Supplier 16', 'Quarry Road 16', '+919900200016', 'Stone supply', 'CMP00216', 1, '2025-04-03 08:24:00'),
(17, 'Supplier 17', 'Quarry Road 17', '+919900200017', 'Cement supply', 'CMP00217', 1, '2025-04-05 09:29:00'),
(18, 'Supplier 18', 'Quarry Road 18', '+919900200018', 'Steel supply', 'CMP00218', 1, '2025-04-07 10:34:00'),
(19, 'Supplier 19', 'Quarry Road 19', '+919900200019', 'Sand supply', 'CMP00219', 1, '2025-04-09 11:39:00'),
(20, 'Supplier 20', 'Quarry Road 20', '+919900200020', 'Aggregate', 'CMP00220', 1, '2025-04-11 12:44:00'),
(21, 'Supplier 21', 'Quarry Road 21', '+919900200021', 'Stone supply', 'CMP00221', 1, '2025-05-03 08:16:00'),
(22, 'Supplier 22', 'Quarry Road 22', '+919900200022', 'Cement supply', 'CMP00222', 1, '2025-05-05 09:21:00'),
(23, 'Supplier 23', 'Quarry Road 23', '+919900200023', 'Steel supply', 'CMP00223', 1, '2025-05-07 10:26:00'),
(24, 'Supplier 24', 'Quarry Road 24', '+919900200024', 'Sand supply', 'CMP00224', 1, '2025-05-09 11:31:00'),
(25, 'Supplier 25', 'Quarry Road 25', '+919900200025', 'Aggregate', 'CMP00225', 1, '2025-05-11 12:36:00'),
(26, 'Supplier 26', 'Quarry Road 26', '+919900200026', 'Stone supply', 'CMP00226', 1, '2025-06-03 08:26:00'),
(27, 'Supplier 27', 'Quarry Road 27', '+919900200027', 'Cement supply', 'CMP00227', 1, '2025-06-05 09:31:00'),
(28, 'Supplier 28', 'Quarry Road 28', '+919900200028', 'Steel supply', 'CMP00228', 1, '2025-06-07 10:36:00'),
(29, 'Supplier 29', 'Quarry Road 29', '+919900200029', 'Sand supply', 'CMP00229', 1, '2025-06-09 11:41:00'),
(30, 'Supplier 30', 'Quarry Road 30', '+919900200030', 'Aggregate', 'CMP00230', 1, '2025-06-11 12:46:00'),
(31, 'Supplier 31', 'Quarry Road 31', '+919900200031', 'Stone supply', 'CMP00231', 1, '2025-07-03 08:28:00'),
(32, 'Supplier 32', 'Quarry Road 32', '+919900200032', 'Cement supply', 'CMP00232', 1, '2025-07-05 09:33:00'),
(33, 'Supplier 33', 'Quarry Road 33', '+919900200033', 'Steel supply', 'CMP00233', 1, '2025-07-07 10:38:00'),
(34, 'Supplier 34', 'Quarry Road 34', '+919900200034', 'Sand supply', 'CMP00234', 1, '2025-07-09 11:43:00'),
(35, 'Supplier 35', 'Quarry Road 35', '+919900200035', 'Aggregate', 'CMP00235', 1, '2025-07-11 12:48:00'),
(36, 'Supplier 36', 'Quarry Road 36', '+919900200036', 'Stone supply', 'CMP00236', 1, '2025-08-03 08:30:00'),
(37, 'Supplier 37', 'Quarry Road 37', '+919900200037', 'Cement supply', 'CMP00237', 1, '2025-08-05 09:35:00'),
(38, 'Supplier 38', 'Quarry Road 38', '+919900200038', 'Steel supply', 'CMP00238', 1, '2025-08-07 10:40:00'),
(39, 'Supplier 39', 'Quarry Road 39', '+919900200039', 'Sand supply', 'CMP00239', 1, '2025-08-09 11:45:00'),
(40, 'Supplier 40', 'Quarry Road 40', '+919900200040', 'Aggregate', 'CMP00240', 1, '2025-08-11 12:50:00'),
(41, 'Supplier 41', 'Quarry Road 41', '+919900200041', 'Stone supply', 'CMP00241', 1, '2025-09-03 08:32:00'),
(42, 'Supplier 42', 'Quarry Road 42', '+919900200042', 'Cement supply', 'CMP00242', 1, '2025-09-05 09:37:00'),
(43, 'Supplier 43', 'Quarry Road 43', '+919900200043', 'Steel supply', 'CMP00243', 1, '2025-09-07 10:42:00'),
(44, 'Supplier 44', 'Quarry Road 44', '+919900200044', 'Sand supply', 'CMP00244', 1, '2025-09-09 11:47:00'),
(45, 'Supplier 45', 'Quarry Road 45', '+919900200045', 'Aggregate', 'CMP00245', 1, '2025-09-11 12:52:00'),
(46, 'Supplier 46', 'Quarry Road 46', '+919900200046', 'Stone supply', 'CMP00246', 1, '2025-10-03 08:34:00'),
(47, 'Supplier 47', 'Quarry Road 47', '+919900200047', 'Cement supply', 'CMP00247', 1, '2025-10-05 09:39:00'),
(48, 'Supplier 48', 'Quarry Road 48', '+919900200048', 'Steel supply', 'CMP00248', 1, '2025-10-07 10:44:00'),
(49, 'Supplier 49', 'Quarry Road 49', '+919900200049', 'Sand supply', 'CMP00249', 1, '2025-10-09 11:49:00'),
(50, 'Supplier 50', 'Quarry Road 50', '+919900200050', 'Aggregate', 'CMP00250', 1, '2025-10-11 12:54:00'),
(51, 'dsafdsa', 'fdsafdsa', 'fdsa', NULL, 'WESOPC01', 1, '2025-12-08 13:03:48'),
(52, 'dsafdsa', 'fdsafdsa', 'fdsa', NULL, 'WESOPC01', 1, '2025-12-08 13:03:48'),
(53, 'dsafdsa', 'fdsafdsa', 'fdsa', NULL, 'WESOPC01', 1, '2025-12-08 13:03:49'),
(54, 'dsafdsa', 'fdsafdsa', 'fdsa', NULL, 'WESOPC01', 1, '2025-12-08 13:03:49');

-- --------------------------------------------------------

--
-- Table structure for table `tdetails`
--

CREATE TABLE `tdetails` (
  `id` int(11) NOT NULL,
  `tnum` varchar(10) DEFAULT NULL,
  `tname` varchar(30) DEFAULT NULL,
  `tadd` text DEFAULT NULL,
  `tmob` varchar(30) DEFAULT NULL,
  `trem` text DEFAULT NULL,
  `apikey` varchar(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tdetails`
--

INSERT INTO `tdetails` (`id`, `tnum`, `tname`, `tadd`, `tmob`, `trem`, `apikey`, `uid`, `udt`) VALUES
(1, 'TN01AA0001', 'Trans 01', 'Depot Area 1', '+919700300001', 'On time', 'WESOPC01', 1, '2025-01-05 08:40:00'),
(2, 'TN01AA0002', 'Trans 02', 'Depot Area 2', '+919700300002', 'On time', 'WESOPC01', 1, '2025-01-07 09:45:00'),
(3, 'TN01AA0003', 'Trans 03', 'Depot Area 3', '+919700300003', 'On time', 'WESOPC01', 1, '2025-01-09 10:50:00'),
(4, 'TN01AA0004', 'Trans 04', 'Depot Area 4', '+919700300004', 'On time', 'WESOPC01', 1, '2025-01-11 11:55:00'),
(5, 'TN01AA0005', 'Trans 05', 'Depot Area 5', '+919700300005', 'On time', 'WESOPC01', 1, '2025-01-13 12:00:00'),
(6, 'TN01AA0006', 'Trans 06', 'Depot Area 6', '+919700300006', 'On time', 'CMP00406', 1, '2025-02-07 08:42:00'),
(7, 'TN01AA0007', 'Trans 07', 'Depot Area 7', '+919700300007', 'On time', 'CMP00407', 1, '2025-02-09 09:47:00'),
(8, 'TN01AA0008', 'Trans 08', 'Depot Area 8', '+919700300008', 'On time', 'CMP00408', 1, '2025-02-11 10:52:00'),
(9, 'TN01AA0009', 'Trans 09', 'Depot Area 9', '+919700300009', 'On time', 'CMP00409', 1, '2025-02-13 11:57:00'),
(10, 'TN01AA0010', 'Trans 10', 'Depot Area 10', '+919700300010', 'On time', 'CMP00410', 1, '2025-02-15 12:02:00'),
(11, 'TN01AA0011', 'Trans 11', 'Depot Area 11', '+919700300011', 'On time', 'CMP00411', 1, '2025-03-07 08:44:00'),
(12, 'TN01AA0012', 'Trans 12', 'Depot Area 12', '+919700300012', 'On time', 'CMP00412', 1, '2025-03-09 09:49:00'),
(13, 'TN01AA0013', 'Trans 13', 'Depot Area 13', '+919700300013', 'On time', 'CMP00413', 1, '2025-03-11 10:54:00'),
(14, 'TN01AA0014', 'Trans 14', 'Depot Area 14', '+919700300014', 'On time', 'CMP00414', 1, '2025-03-13 11:59:00'),
(15, 'TN01AA0015', 'Trans 15', 'Depot Area 15', '+919700300015', 'On time', 'CMP00415', 1, '2025-03-15 12:04:00'),
(16, 'TN01AA0016', 'Trans 16', 'Depot Area 16', '+919700300016', 'On time', 'CMP00416', 1, '2025-04-07 08:46:00'),
(17, 'TN01AA0017', 'Trans 17', 'Depot Area 17', '+919700300017', 'On time', 'CMP00417', 1, '2025-04-09 09:51:00'),
(18, 'TN01AA0018', 'Trans 18', 'Depot Area 18', '+919700300018', 'On time', 'CMP00418', 1, '2025-04-11 10:56:00'),
(19, 'TN01AA0019', 'Trans 19', 'Depot Area 19', '+919700300019', 'On time', 'CMP00419', 1, '2025-04-13 12:01:00'),
(20, 'TN01AA0020', 'Trans 20', 'Depot Area 20', '+919700300020', 'On time', 'CMP00420', 1, '2025-04-15 12:06:00'),
(21, 'TN01AA0021', 'Trans 21', 'Depot Area 21', '+919700300021', 'On time', 'CMP00421', 1, '2025-05-07 08:48:00'),
(22, 'TN01AA0022', 'Trans 22', 'Depot Area 22', '+919700300022', 'On time', 'CMP00422', 1, '2025-05-09 09:53:00'),
(23, 'TN01AA0023', 'Trans 23', 'Depot Area 23', '+919700300023', 'On time', 'CMP00423', 1, '2025-05-11 10:58:00'),
(24, 'TN01AA0024', 'Trans 24', 'Depot Area 24', '+919700300024', 'On time', 'CMP00424', 1, '2025-05-13 12:03:00'),
(25, 'TN01AA0025', 'Trans 25', 'Depot Area 25', '+919700300025', 'On time', 'CMP00425', 1, '2025-05-15 12:08:00'),
(26, 'TN01AA0026', 'Trans 26', 'Depot Area 26', '+919700300026', 'On time', 'CMP00426', 1, '2025-06-07 08:50:00'),
(27, 'TN01AA0027', 'Trans 27', 'Depot Area 27', '+919700300027', 'On time', 'CMP00427', 1, '2025-06-09 09:55:00'),
(28, 'TN01AA0028', 'Trans 28', 'Depot Area 28', '+919700300028', 'On time', 'CMP00428', 1, '2025-06-11 11:00:00'),
(29, 'TN01AA0029', 'Trans 29', 'Depot Area 29', '+919700300029', 'On time', 'CMP00429', 1, '2025-06-13 12:05:00'),
(30, 'TN01AA0030', 'Trans 30', 'Depot Area 30', '+919700300030', 'On time', 'CMP00430', 1, '2025-06-15 12:10:00'),
(31, 'TN01AA0031', 'Trans 31', 'Depot Area 31', '+919700300031', 'On time', 'CMP00431', 1, '2025-07-07 08:52:00'),
(32, 'TN01AA0032', 'Trans 32', 'Depot Area 32', '+919700300032', 'On time', 'CMP00432', 1, '2025-07-09 09:57:00'),
(33, 'TN01AA0033', 'Trans 33', 'Depot Area 33', '+919700300033', 'On time', 'CMP00433', 1, '2025-07-11 11:02:00'),
(34, 'TN01AA0034', 'Trans 34', 'Depot Area 34', '+919700300034', 'On time', 'CMP00434', 1, '2025-07-13 12:07:00'),
(35, 'TN01AA0035', 'Trans 35', 'Depot Area 35', '+919700300035', 'On time', 'CMP00435', 1, '2025-07-15 12:12:00'),
(36, 'TN01AA0036', 'Trans 36', 'Depot Area 36', '+919700300036', 'On time', 'CMP00436', 1, '2025-08-07 08:54:00'),
(37, 'TN01AA0037', 'Trans 37', 'Depot Area 37', '+919700300037', 'On time', 'CMP00437', 1, '2025-08-09 09:59:00'),
(38, 'TN01AA0038', 'Trans 38', 'Depot Area 38', '+919700300038', 'On time', 'CMP00438', 1, '2025-08-11 11:04:00'),
(39, 'TN01AA0039', 'Trans 39', 'Depot Area 39', '+919700300039', 'On time', 'CMP00439', 1, '2025-08-13 12:09:00'),
(40, 'TN01AA0040', 'Trans 40', 'Depot Area 40', '+919700300040', 'On time', 'CMP00440', 1, '2025-08-15 12:14:00'),
(41, 'TN01AA0041', 'Trans 41', 'Depot Area 41', '+919700300041', 'On time', 'CMP00441', 1, '2025-09-07 08:56:00'),
(42, 'TN01AA0042', 'Trans 42', 'Depot Area 42', '+919700300042', 'On time', 'CMP00442', 1, '2025-09-09 10:01:00'),
(43, 'TN01AA0043', 'Trans 43', 'Depot Area 43', '+919700300043', 'On time', 'CMP00443', 1, '2025-09-11 11:06:00'),
(44, 'TN01AA0044', 'Trans 44', 'Depot Area 44', '+919700300044', 'On time', 'CMP00444', 1, '2025-09-13 12:11:00'),
(45, 'TN01AA0045', 'Trans 45', 'Depot Area 45', '+919700300045', 'On time', 'CMP00445', 1, '2025-09-15 12:16:00'),
(46, 'TN01AA0046', 'Trans 46', 'Depot Area 46', '+919700300046', 'On time', 'CMP00446', 1, '2025-10-07 08:58:00'),
(47, 'TN01AA0047', 'Trans 47', 'Depot Area 47', '+919700300047', 'On time', 'CMP00447', 1, '2025-10-09 10:03:00'),
(48, 'TN01AA0048', 'Trans 48', 'Depot Area 48', '+919700300048', 'On time', 'CMP00448', 1, '2025-10-11 11:08:00'),
(49, 'TN01AA0049', 'Trans 49', 'Depot Area 49', '+919700300049', 'On time', 'CMP00449', 1, '2025-10-13 12:13:00'),
(50, 'TN01AA0050', 'Trans 50', 'Depot Area 50', '+919700300050', 'On time', 'CMP00450', 1, '2025-10-15 12:18:00'),
(51, 'fdsafdsa', 'dasfdsa', NULL, 'asdfdsa', NULL, 'WESOPC01', 1, '2025-12-08 13:03:55');

-- --------------------------------------------------------

--
-- Table structure for table `ulog`
--

CREATE TABLE `ulog` (
  `id` int(11) NOT NULL,
  `login_dt` varchar(20) DEFAULT NULL,
  `logout_dt` varchar(20) DEFAULT NULL,
  `apikey` varchar(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ulog`
--

INSERT INTO `ulog` (`id`, `login_dt`, `logout_dt`, `apikey`, `uid`, `udt`) VALUES
(1, '2025-01-02 07:55:00', '2025-01-02 17:05:00', 'WESOPC01', 1, '2025-01-02 17:05:00'),
(2, '2025-01-03 07:58:00', '2025-01-03 17:02:00', 'WESOPC01', 1, '2025-01-03 17:02:00'),
(3, '2025-01-04 08:00:00', '2025-01-04 16:50:00', 'WESOPC01', 1, '2025-01-04 16:50:00'),
(4, '2025-01-05 08:05:00', '2025-01-05 17:10:00', 'WESOPC01', 1, '2025-01-05 17:10:00'),
(5, '2025-01-06 08:10:00', '2025-01-06 17:15:00', 'WESOPC01', 1, '2025-01-06 17:15:00'),
(6, '2025-02-02 08:00:00', '2025-02-02 17:00:00', 'CMP00201', 1, '2025-02-02 17:00:00'),
(7, '2025-02-03 08:05:00', '2025-02-03 16:55:00', 'CMP00202', 1, '2025-02-03 16:55:00'),
(8, '2025-02-04 08:10:00', '2025-02-04 17:10:00', 'CMP00203', 1, '2025-02-04 17:10:00'),
(9, '2025-02-05 08:15:00', '2025-02-05 17:05:00', 'CMP00204', 1, '2025-02-05 17:05:00'),
(10, '2025-02-06 08:20:00', '2025-02-06 17:20:00', 'CMP00205', 1, '2025-02-06 17:20:00'),
(11, '2025-03-01 08:00:00', '2025-03-01 17:00:00', 'CMP00301', 1, '2025-03-01 17:00:00'),
(12, '2025-03-02 08:05:00', '2025-03-02 16:55:00', 'CMP00302', 1, '2025-03-02 16:55:00'),
(13, '2025-03-03 08:10:00', '2025-03-03 17:10:00', 'CMP00303', 1, '2025-03-03 17:10:00'),
(14, '2025-03-04 08:15:00', '2025-03-04 17:05:00', 'CMP00304', 1, '2025-03-04 17:05:00'),
(15, '2025-03-05 08:20:00', '2025-03-05 17:20:00', 'CMP00305', 1, '2025-03-05 17:20:00'),
(16, '2025-04-02 08:00:00', '2025-04-02 17:00:00', 'CMP00401', 1, '2025-04-02 17:00:00'),
(17, '2025-04-03 08:05:00', '2025-04-03 16:55:00', 'CMP00402', 1, '2025-04-03 16:55:00'),
(18, '2025-04-04 08:10:00', '2025-04-04 17:10:00', 'CMP00403', 1, '2025-04-04 17:10:00'),
(19, '2025-04-05 08:15:00', '2025-04-05 17:05:00', 'CMP00404', 1, '2025-04-05 17:05:00'),
(20, '2025-04-06 08:20:00', '2025-04-06 17:20:00', 'CMP00405', 1, '2025-04-06 17:20:00'),
(21, '2025-05-01 08:00:00', '2025-05-01 17:00:00', 'CMP00501', 1, '2025-05-01 17:00:00'),
(22, '2025-05-02 08:05:00', '2025-05-02 16:55:00', 'CMP00502', 1, '2025-05-02 16:55:00'),
(23, '2025-05-03 08:10:00', '2025-05-03 17:10:00', 'CMP00503', 1, '2025-05-03 17:10:00'),
(24, '2025-05-04 08:15:00', '2025-05-04 17:05:00', 'CMP00504', 1, '2025-05-04 17:05:00'),
(25, '2025-05-05 08:20:00', '2025-05-05 17:20:00', 'CMP00505', 1, '2025-05-05 17:20:00'),
(26, '2025-06-02 08:00:00', '2025-06-02 17:00:00', 'CMP00601', 1, '2025-06-02 17:00:00'),
(27, '2025-06-03 08:05:00', '2025-06-03 16:55:00', 'CMP00602', 1, '2025-06-03 16:55:00'),
(28, '2025-06-04 08:10:00', '2025-06-04 17:10:00', 'CMP00603', 1, '2025-06-04 17:10:00'),
(29, '2025-06-05 08:15:00', '2025-06-05 17:05:00', 'CMP00604', 1, '2025-06-05 17:05:00'),
(30, '2025-06-06 08:20:00', '2025-06-06 17:20:00', 'CMP00605', 1, '2025-06-06 17:20:00'),
(31, '2025-07-01 08:00:00', '2025-07-01 17:00:00', 'CMP00701', 1, '2025-07-01 17:00:00'),
(32, '2025-07-02 08:05:00', '2025-07-02 16:55:00', 'CMP00702', 1, '2025-07-02 16:55:00'),
(33, '2025-07-03 08:10:00', '2025-07-03 17:10:00', 'CMP00703', 1, '2025-07-03 17:10:00'),
(34, '2025-07-04 08:15:00', '2025-07-04 17:05:00', 'CMP00704', 1, '2025-07-04 17:05:00'),
(35, '2025-07-05 08:20:00', '2025-07-05 17:20:00', 'CMP00705', 1, '2025-07-05 17:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uname` varchar(30) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` varchar(30) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `comname` varchar(50) DEFAULT NULL,
  `comadd` text DEFAULT NULL,
  `comnum` varchar(20) NOT NULL,
  `comail` varchar(30) NOT NULL,
  `apikey` varchar(8) NOT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uname`, `pass`, `fname`, `email`, `mobile`, `rid`, `pid`, `comname`, `comadd`, `comnum`, `comail`, `apikey`, `udt`) VALUES
(1, 'wesopc', '9300b5feb221178583f80105f8e7b17a', 'Thangaraja', 'info.wesopc@gmail.com', '9884555105', 1, 1, 'Weigh Embeded Solutions OPC Private Limited', 'Thiruninravur', '', '', 'WESOPC01', NULL),
(2, 'thangaraja', '$2y$10$aIshmnWovKy2PVmKqWtNDOarIu36cz6.Oq2WQSwCfnhFK/NUWS7Ba', 'Thangaraja P', '', '', 0, 1, '', '', '', '', '20F1BEC8', '2025-12-08 12:55:44');

-- --------------------------------------------------------

--
-- Table structure for table `wlog`
--

CREATE TABLE `wlog` (
  `id` int(11) NOT NULL,
  `fwt` int(11) DEFAULT NULL,
  `lwt` int(11) DEFAULT NULL,
  `swt` int(11) DEFAULT NULL,
  `mode` int(11) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `apikey` varchar(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `udt` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wlog`
--

INSERT INTO `wlog` (`id`, `fwt`, `lwt`, `swt`, `mode`, `mid`, `vid`, `sid`, `cid`, `apikey`, `uid`, `udt`) VALUES
(1, 15000, 14950, 50, 1, 1, 1, 1, 1, 'WESOPC01', 1, '2025-01-03 08:12:00'),
(2, 15250, 15200, 50, 2, 2, 2, 2, 2, 'WESOPC01', 1, '2025-01-05 09:22:00'),
(3, 9800, 9750, 50, 1, 3, 3, 3, 3, 'WESOPC01', 1, '2025-01-07 10:30:00'),
(4, 20300, 20250, 50, 2, 4, 4, 4, 4, 'WESOPC01', 1, '2025-01-09 11:40:00'),
(5, 5000, 4950, 50, 1, 5, 5, 5, 5, 'WESOPC01', 1, '2025-01-11 12:50:00'),
(6, 16000, 15950, 50, 2, 6, 6, 6, 6, 'CMP00206', 1, '2025-02-02 08:05:00'),
(7, 13250, 13200, 50, 1, 7, 7, 7, 7, 'CMP00207', 1, '2025-02-04 09:15:00'),
(8, 10800, 10750, 50, 2, 8, 8, 8, 8, 'CMP00208', 1, '2025-02-06 10:25:00'),
(9, 22000, 21950, 50, 1, 9, 9, 9, 9, 'CMP00209', 1, '2025-02-08 11:35:00'),
(10, 7600, 7550, 50, 2, 10, 10, 10, 10, 'CMP00210', 1, '2025-02-10 12:45:00'),
(11, 14700, 14650, 50, 1, 11, 11, 11, 11, 'CMP00311', 1, '2025-03-02 08:10:00'),
(12, 15350, 15300, 50, 2, 12, 12, 12, 12, 'CMP00312', 1, '2025-03-04 09:20:00'),
(13, 9950, 9900, 50, 1, 13, 13, 13, 13, 'CMP00313', 1, '2025-03-06 10:30:00'),
(14, 20500, 20450, 50, 2, 14, 14, 14, 14, 'CMP00314', 1, '2025-03-08 11:40:00'),
(15, 5100, 5050, 50, 1, 15, 15, 15, 15, 'CMP00315', 1, '2025-03-10 12:50:00'),
(16, 16200, 16150, 50, 2, 16, 16, 16, 16, 'CMP00316', 1, '2025-04-02 08:05:00'),
(17, 13400, 13350, 50, 1, 17, 17, 17, 17, 'CMP00317', 1, '2025-04-04 09:15:00'),
(18, 11050, 11000, 50, 2, 18, 18, 18, 18, 'CMP00318', 1, '2025-04-06 10:25:00'),
(19, 22300, 22250, 50, 1, 19, 19, 19, 19, 'CMP00319', 1, '2025-04-08 11:35:00'),
(20, 7800, 7750, 50, 2, 20, 20, 20, 20, 'CMP00320', 1, '2025-04-10 12:45:00'),
(21, 15050, 15000, 50, 1, 21, 21, 21, 21, 'CMP00321', 1, '2025-05-02 08:10:00'),
(22, 15550, 15500, 50, 2, 22, 22, 22, 22, 'CMP00322', 1, '2025-05-04 09:20:00'),
(23, 10100, 10050, 50, 1, 23, 23, 23, 23, 'CMP00323', 1, '2025-05-06 10:30:00'),
(24, 20800, 20750, 50, 2, 24, 24, 24, 24, 'CMP00324', 1, '2025-05-08 11:40:00'),
(25, 5250, 5200, 50, 1, 25, 25, 25, 25, 'CMP00325', 1, '2025-05-10 12:50:00'),
(26, 16500, 16450, 50, 2, 26, 26, 26, 26, 'CMP00326', 1, '2025-06-02 08:05:00'),
(27, 13650, 13600, 50, 1, 27, 27, 27, 27, 'CMP00327', 1, '2025-06-04 09:15:00'),
(28, 11200, 11150, 50, 2, 28, 28, 28, 28, 'CMP00328', 1, '2025-06-06 10:25:00'),
(29, 22500, 22450, 50, 1, 29, 29, 29, 29, 'CMP00329', 1, '2025-06-08 11:35:00'),
(30, 8000, 7950, 50, 2, 30, 30, 30, 30, 'CMP00330', 1, '2025-06-10 12:45:00'),
(31, 14850, 14800, 50, 1, 31, 31, 31, 31, 'CMP00331', 1, '2025-07-02 08:10:00'),
(32, 15650, 15600, 50, 2, 32, 32, 32, 32, 'CMP00332', 1, '2025-07-04 09:20:00'),
(33, 10350, 10300, 50, 1, 33, 33, 33, 33, 'CMP00333', 1, '2025-07-06 10:30:00'),
(34, 21050, 21000, 50, 2, 34, 34, 34, 34, 'CMP00334', 1, '2025-07-08 11:40:00'),
(35, 5400, 5350, 50, 1, 35, 35, 35, 35, 'CMP00335', 1, '2025-07-10 12:50:00'),
(36, 16800, 16750, 50, 2, 36, 36, 36, 36, 'CMP00336', 1, '2025-08-02 08:05:00'),
(37, 13950, 13900, 50, 1, 37, 37, 37, 37, 'CMP00337', 1, '2025-08-04 09:15:00'),
(38, 11450, 11400, 50, 2, 38, 38, 38, 38, 'CMP00338', 1, '2025-08-06 10:25:00'),
(39, 22750, 22700, 50, 1, 39, 39, 39, 39, 'CMP00339', 1, '2025-08-08 11:35:00'),
(40, 8200, 8150, 50, 2, 40, 40, 40, 40, 'CMP00340', 1, '2025-08-10 12:45:00'),
(41, 14950, 14900, 50, 1, 41, 41, 41, 41, 'CMP00341', 1, '2025-09-02 08:10:00'),
(42, 15800, 15750, 50, 2, 42, 42, 42, 42, 'CMP00342', 1, '2025-09-04 09:20:00'),
(43, 10500, 10450, 50, 1, 43, 43, 43, 43, 'CMP00343', 1, '2025-09-06 10:30:00'),
(44, 21300, 21250, 50, 2, 44, 44, 44, 44, 'CMP00344', 1, '2025-09-08 11:40:00'),
(45, 5500, 5450, 50, 1, 45, 45, 45, 45, 'CMP00345', 1, '2025-09-10 12:50:00'),
(46, 17050, 17000, 50, 2, 46, 46, 46, 46, 'CMP00346', 1, '2025-10-02 08:05:00'),
(47, 14100, 14050, 50, 1, 47, 47, 47, 47, 'CMP00347', 1, '2025-10-04 09:15:00'),
(48, 11600, 11550, 50, 2, 48, 48, 48, 48, 'CMP00348', 1, '2025-10-06 10:25:00'),
(49, 23000, 22950, 50, 1, 49, 49, 49, 49, 'CMP00349', 1, '2025-10-08 11:35:00'),
(50, 8400, 8350, 50, 2, 50, 50, 50, 50, 'CMP00350', 1, '2025-10-10 12:45:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modes`
--
ALTER TABLE `modes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privillages`
--
ALTER TABLE `privillages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tdetails`
--
ALTER TABLE `tdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ulog`
--
ALTER TABLE `ulog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uname` (`uname`),
  ADD UNIQUE KEY `apikey` (`apikey`);

--
-- Indexes for table `wlog`
--
ALTER TABLE `wlog`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `modes`
--
ALTER TABLE `modes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `privillages`
--
ALTER TABLE `privillages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `tdetails`
--
ALTER TABLE `tdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `ulog`
--
ALTER TABLE `ulog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wlog`
--
ALTER TABLE `wlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
