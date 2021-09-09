-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2021 at 08:36 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `login` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `login`, `createdAt`, `updatedAt`) VALUES
(1, 'sample', 'sample@gmail.com', 'sample', 1, '2021-09-05 22:38:53', '2021-09-08 18:06:03');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `email` varchar(255) NOT NULL,
  `productid` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`email`, `productid`, `createdAt`, `updatedAt`) VALUES
('sample7@gmail.com', 4, '2021-09-08 17:16:07', '2021-09-08 17:16:07'),
('sample@gmail.com', 4, '2021-09-08 17:54:53', '2021-09-08 17:54:53');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `product_ids` varchar(255) NOT NULL,
  `product_quantities` varchar(255) NOT NULL,
  `total` int(11) NOT NULL,
  `fulladdress` varchar(255) NOT NULL,
  `nameoncard` varchar(255) NOT NULL,
  `cardno` varchar(255) NOT NULL,
  `expiry_month` int(11) NOT NULL,
  `expiry_year` int(11) NOT NULL,
  `cvv` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userid`, `product_ids`, `product_quantities`, `total`, `fulladdress`, `nameoncard`, `cardno`, `expiry_month`, `expiry_year`, `cvv`, `createdAt`, `updatedAt`) VALUES
(1, 'sample@gmail.com', '5#8#', '1#1#', 75, 'Masid Street\r\n7/140', 'Peter Parker', '123112311231', 8, 2841, 841, '2021-09-08 06:06:18', '2021-09-08 06:06:18');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` text NOT NULL,
  `product_desc` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_image`, `product_desc`, `category`, `price`, `createdAt`, `updatedAt`) VALUES
(3, 'Ibuprofen 200mg capsules x16', './assets/images/products/product7-fetaured.jpg', 'Medication', 'Medication', '15', '2021-09-06 05:19:51', '2021-09-06 05:19:51'),
(4, 'Sunscreen® Stick 250ml 50+ Protection', './assets/images/products/product14-fetaured.jpg', 'Medication', 'Medication', '15', '2021-09-06 05:20:43', '2021-09-06 05:20:43'),
(5, 'Amoxicillin Pills Single 100 mg', './assets/images/products/product13-fetaured.jpg', 'Medication', 'Medication', '15', '2021-09-06 05:21:26', '2021-09-06 05:21:26'),
(6, 'Sunscreen Care 200ml Lotion', './assets/images/products/product12-fetaured.jpg', 'Medication', 'Medication', '28', '2021-09-06 05:22:03', '2021-09-06 05:22:03'),
(7, 'Amoxicillin 500mg Capsule', './assets/images/products/product11-fetaured.jpg', 'Medication', 'Medication', '25', '2021-09-06 05:22:42', '2021-09-06 05:22:42'),
(8, 'Natural Face Lotions & Creams', './assets/images/products/h1-product2-featured.jpg', 'Allergies', 'Allergies', '45', '2021-09-06 05:27:52', '2021-09-06 05:27:52'),
(9, 'Body Cream supreme 25ML', './assets/images/products/Product-featured-img-24.jpg', 'Allergies', 'Allergies', '17', '2021-09-06 05:28:37', '2021-09-06 05:28:37'),
(10, 'Ibuprofen 350mg Capsule', './assets/images/products/Product-featured-img-26.jpg', 'Allergies', 'Allergies', '35', '2021-09-06 05:29:18', '2021-09-06 05:29:18'),
(11, 'Alvedon® Film-coated tablet 250 mg', './assets/images/products/product10-fetaured.jpg', 'Allergies', 'Allergies', '27', '2021-09-06 05:29:52', '2021-09-06 05:29:52'),
(12, 'Health Benefits of Taking Probiotics', './assets/images/products/product3-fetaured.jpg', 'Allergies', 'Allergies', '49', '2021-09-06 05:30:24', '2021-09-06 05:30:24'),
(13, 'Alvedon Forte® Bottle tablets 500 mg 25 pieces', './assets/images/products/h1-product1-featured.jpg', 'Cosmetics', 'Cosmetics', '17', '2021-09-06 05:33:36', '2021-09-06 05:33:36'),
(14, 'Face Snail Serum 200ml Tube', './assets/images/products/product15-fetaured.jpg', 'Cosmetics', 'Cosmetics', '40', '2021-09-06 05:35:01', '2021-09-06 05:35:01'),
(15, 'Skin Care Body Lotion', './assets/images/products/product9-fetaured.jpg', 'Cosmetics', 'Cosmetics', '20', '2021-09-06 05:36:08', '2021-09-06 05:36:08'),
(16, 'Strenght Natural Shampoo 30ml', './assets/images/products/product18-fetaured.jpg', 'Cosmetics', 'Cosmetics', '25', '2021-09-06 05:36:41', '2021-09-06 05:36:41'),
(17, 'Face Cream 250ml Bottle', './assets/images/products/product9-fetaured.jpg', 'Cosmetics', 'Cosmetics', '38', '2021-09-06 05:37:09', '2021-09-06 05:37:09'),
(23, 'sampl6', 'abc.jpg', 'Medication', 'Medication', '2', '2021-09-08 04:18:39', '2021-09-08 05:30:06'),
(28, 'sampl2', 'abc.jpg', 'Cosmetics', 'Cosmetics', '5', '2021-09-08 05:45:48', '2021-09-08 05:45:48'),
(32, 'sampleProd1', 'sampleProd1.jpg', 'Medication', 'Medication', '45', '2021-09-08 06:58:28', '2021-09-08 06:58:28'),
(34, 'sampleProd1', 'sampleProd1.jpg', 'Medication', 'Medication', '45', '2021-09-08 07:01:31', '2021-09-08 07:01:31'),
(35, 'sampleProd1', 'sampleProd225.jpg', 'Medication', 'Cosmetics', '45', '2021-09-08 07:04:39', '2021-09-08 18:04:49');

-- --------------------------------------------------------

--
-- Table structure for table `subscribes`
--

CREATE TABLE `subscribes` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscribes`
--

INSERT INTO `subscribes` (`name`, `email`, `message`, `createdAt`, `updatedAt`) VALUES
('demo', 'demo@gmail.com', 'demo demo', '2021-09-06 13:59:23', '2021-09-06 13:59:23'),
('ilakata', 'vaathhi@coming.com', 'ilakata Mafilia', '2021-09-06 13:13:28', '2021-09-06 13:13:28'),
('wakanda', 'wa@wa.wakanada', 'wakanda forever', '2021-09-06 13:52:12', '2021-09-06 13:52:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'sample', 'sample@gmail.com', 'sample', '2021-09-05 18:51:11', '2021-09-08 14:21:18'),
(2, 'sample1', 'sample1@gmail.com', 'sample', '2021-09-05 19:08:15', '2021-09-05 20:28:02'),
(3, 'sample2', 'sample2@gmail.com', 'sample2', '2021-09-05 19:09:00', '2021-09-05 19:09:00'),
(4, 'sample3', 'samplee@gmail.com', 'sample3', '2021-09-05 19:09:34', '2021-09-05 19:09:34'),
(5, 'sample4', 'sample4@gmail.com', 'samplee', '2021-09-05 19:23:54', '2021-09-05 19:23:54'),
(6, 'sample5', 'sample5@gmail.com', 'sample5555', '2021-09-07 03:45:07', '2021-09-08 07:04:27'),
(8, 'sample6', 'sample6@gmail.com', 'sample66', '2021-09-08 06:49:20', '2021-09-08 06:49:20'),
(13, 'sample7@gmail.com', 'sample7@gmail.com', 'sample7', '2021-09-08 17:02:59', '2021-09-08 17:15:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`email`,`productid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribes`
--
ALTER TABLE `subscribes`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
