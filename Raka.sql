-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2025 at 08:49 PM
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
-- Database: `resturant`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone_no` int(11) DEFAULT NULL,
  `visit_no` int(11) DEFAULT NULL,
  `loyalty_points` int(11) DEFAULT NULL,
  `preferred_dish_id` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `phone_no` int(11) DEFAULT NULL,
  `tenure` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `job_position` varchar(55) DEFAULT NULL,
  `employement_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_categories`
--

CREATE TABLE `food_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_categories`
--

INSERT INTO `food_categories` (`category_id`, `category_name`, `description`, `created_at`) VALUES
(1, 'Pizza', NULL, '2025-11-13 13:31:10'),
(2, 'Seafood', NULL, '2025-11-13 13:31:10'),
(3, 'Salad', NULL, '2025-11-13 13:31:10'),
(4, 'Burgers', NULL, '2025-11-13 13:31:10'),
(5, 'Pasta', NULL, '2025-11-13 13:31:10');

-- --------------------------------------------------------

--
-- Table structure for table `food_order`
--

CREATE TABLE `food_order` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `sale_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `ingredient_name` varchar(200) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `minimum_stock_level` decimal(10,2) DEFAULT 0.00,
  `last_restocked` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `ingredients` text DEFAULT NULL,
  `preparation_time` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menu_id`, `name`, `description`, `price`, `category_id`, `image_url`, `is_available`, `ingredients`, `preparation_time`, `created_at`, `updated_at`) VALUES
(1, 'Margherita Pizza', 'Classic tomato, mozzarella, and fresh basil', 12.99, 1, './imageM/margherita-pizza.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(2, 'Pepperoni Pizza', 'Loaded with pepperoni and mozzarella', 14.99, 1, './imageM/pizza2.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(3, 'Grilled Salmon', 'Fresh Atlantic salmon with herbs', 19.99, 2, './imageM/grilled-salmon.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(4, 'Caesar Salad', 'Crisp romaine, croutons, and parmesan', 9.99, 3, './imageM/caesar-salad.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(5, 'Beef Burger', 'Juicy beef patty with cheese and lettuce', 11.99, 4, './imageM/beef-burger.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(6, 'Shrimp Pasta', 'Creamy garlic sauce with shrimp', 16.99, 5, './imageM/pasta.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_item`
--

CREATE TABLE `recipe_item` (
  `recipe_item_ID` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `quantity_required` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `reservation_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone_no` int(11) DEFAULT NULL,
  `no_of_customer` int(11) DEFAULT NULL,
  `special_resquests` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_transaction`
--

CREATE TABLE `sale_transaction` (
  `sale_id` int(11) NOT NULL,
  `Amount` decimal(8,2) DEFAULT NULL,
  `Payment_Method` varchar(50) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `table_no` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `sale_time` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `food_categories`
--
ALTER TABLE `food_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `food_order`
--
ALTER TABLE `food_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `menu_id` (`menu_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `recipe_item`
--
ALTER TABLE `recipe_item`
  ADD PRIMARY KEY (`recipe_item_ID`),
  ADD KEY `menu_id` (`menu_id`),
  ADD KEY `inventory_id` (`inventory_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `sale_transaction`
--
ALTER TABLE `sale_transaction`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `food_categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
