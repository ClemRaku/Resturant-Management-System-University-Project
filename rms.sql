-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2025 at 03:25 PM
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
-- Database: `rms`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `description`, `created_at`) VALUES
(1, 'Pizza', NULL, '2025-11-13 13:31:10'),
(2, 'Seafood', NULL, '2025-11-13 13:31:10'),
(3, 'Salad', NULL, '2025-11-13 13:31:10'),
(4, 'Burgers', NULL, '2025-11-13 13:31:10'),
(5, 'Pasta', NULL, '2025-11-13 13:31:10');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `ingredient_name` varchar(200) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `minimum_stock_level` decimal(10,2) DEFAULT 0.00,
  `last_restocked` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
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
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `description`, `price`, `category_id`, `image_url`, `is_available`, `ingredients`, `preparation_time`, `created_at`, `updated_at`) VALUES
(1, 'Margherita Pizza', 'Classic tomato, mozzarella, and fresh basil', 12.99, 1, './imageM/margherita-pizza.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(2, 'Pepperoni Pizza', 'Loaded with pepperoni and mozzarella', 14.99, 1, './imageM/pizza2.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(3, 'Grilled Salmon', 'Fresh Atlantic salmon with herbs', 19.99, 2, './imageM/grilled-salmon.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(4, 'Caesar Salad', 'Crisp romaine, croutons, and parmesan', 9.99, 3, './imageM/caesar-salad.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(5, 'Beef Burger', 'Juicy beef patty with cheese and lettuce', 11.99, 4, './imageM/beef-burger.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51'),
(6, 'Shrimp Pasta', 'Creamy garlic sauce with shrimp', 16.99, 5, './imageM/pasta.jpg', 1, NULL, NULL, '2025-11-13 13:31:51', '2025-11-13 13:31:51');

-- --------------------------------------------------------

--
-- Table structure for table `menu_item_ingredients`
--

CREATE TABLE `menu_item_ingredients` (
  `id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `inventory_id` int(11) NOT NULL,
  `quantity_required` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `menu_item_sales`
-- (See below for the actual view)
--
CREATE TABLE `menu_item_sales` (
);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','preparing','ready','delivered','cancelled') DEFAULT 'pending',
  `delivery_address` text NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `special_instructions` text DEFAULT NULL,
  `delivery_fee` decimal(6,2) DEFAULT 5.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_number`, `total_amount`, `status`, `delivery_address`, `customer_name`, `customer_phone`, `special_instructions`, `delivery_fee`, `created_at`, `updated_at`) VALUES
(1, 2, 'ORD-1001', 45.97, '', '456 MIRPUR, Dhaka', '', '', NULL, 5.00, '2025-11-13 14:03:09', '2025-11-13 14:03:09'),
(2, 3, 'ORD-1002', 28.98, 'pending', '789 GULSHAN, Dhaka', '', '', NULL, 5.00, '2025-11-13 14:03:09', '2025-11-13 14:03:09'),
(3, 2, 'ORD-1003', 35.97, '', '456 MIRPUR, Dhaka', '', '', NULL, 5.00, '2025-11-13 14:03:09', '2025-11-13 14:03:09'),
(4, 3, 'ORD-1004', 19.99, 'preparing', '789 GULSHAN, Dhaka', '', '', NULL, 5.00, '2025-11-13 14:03:09', '2025-11-13 14:03:09');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `item_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `menu_item_id`, `quantity`, `unit_price`, `item_name`, `item_description`, `created_at`) VALUES
(1, 1, 1, 2, 12.99, '', NULL, '2025-11-13 14:06:40'),
(2, 1, 4, 1, 9.99, '', NULL, '2025-11-13 14:06:40'),
(3, 2, 5, 1, 11.99, '', NULL, '2025-11-13 14:06:40'),
(4, 2, 6, 1, 16.99, '', NULL, '2025-11-13 14:06:40'),
(5, 3, 2, 2, 14.99, '', NULL, '2025-11-13 14:06:40'),
(6, 3, 4, 1, 5.99, '', NULL, '2025-11-13 14:06:40'),
(7, 4, 3, 1, 19.99, '', NULL, '2025-11-13 14:06:40');

-- --------------------------------------------------------

--
-- Stand-in structure for view `order_summary`
-- (See below for the actual view)
--
CREATE TABLE `order_summary` (
);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_method` enum('credit_card','debit_card','cash','online') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `transaction_id` varchar(100) DEFAULT NULL,
  `payment_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reservation_number` varchar(50) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `reservation_date` date NOT NULL,
  `reservation_time` time NOT NULL,
  `number_of_guests` int(11) NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled','no_show') DEFAULT 'pending',
  `special_requests` text DEFAULT NULL,
  `table_number` varchar(20) DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT 120,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `reservation_details`
-- (See below for the actual view)
--
CREATE TABLE `reservation_details` (
`id` int(11)
,`reservation_number` varchar(50)
,`customer_name` varchar(100)
,`customer_email` varchar(255)
,`reservation_date` date
,`reservation_time` time
,`number_of_guests` int(11)
,`status` enum('pending','confirmed','completed','cancelled','no_show')
,`assigned_tables` mediumtext
);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_tables`
--

CREATE TABLE `restaurant_tables` (
  `id` int(11) NOT NULL,
  `table_number` varchar(20) NOT NULL,
  `capacity` int(11) NOT NULL,
  `location_description` varchar(200) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `menu_item_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `table_reservations`
--

CREATE TABLE `table_reservations` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `is_admin`, `phone`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@dhakaiyabites.com', '123', 1, '+880123456789', '123 UTTARA, Dhaka', '2025-11-13 13:51:33', '2025-11-13 13:51:33'),
(2, 'Peony Ray', 'peony.ray@example.com', '456', 0, '+880987654321', '456 MIRPUR, Dhaka', '2025-11-13 13:51:33', '2025-11-13 13:51:33'),
(3, 'Maria Ahmed', 'maria.ahmed@example.com', '789', 0, '+880112233445', '789 GULSHAN , Dhaka', '2025-11-13 13:51:33', '2025-11-13 13:51:33');

-- --------------------------------------------------------

--
-- Structure for view `menu_item_sales`
--
DROP TABLE IF EXISTS `menu_item_sales`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `menu_item_sales`  AS SELECT `mi`.`id` AS `id`, `mi`.`name` AS `name`, `mi`.`price` AS `price`, `c`.`name` AS `category`, sum(`oi`.`quantity`) AS `total_sold`, sum(`oi`.`quantity` * `oi`.`unit_price`) AS `total_revenue` FROM ((`menu_items` `mi` join `categories` `c` on(`mi`.`category_id` = `c`.`id`)) left join `order_items` `oi` on(`mi`.`id` = `oi`.`menu_item_id`)) GROUP BY `mi`.`id`, `mi`.`name`, `mi`.`price`, `c`.`name` ;

-- --------------------------------------------------------

--
-- Structure for view `order_summary`
--
DROP TABLE IF EXISTS `order_summary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `order_summary`  AS SELECT `o`.`id` AS `id`, `o`.`order_number` AS `order_number`, `u`.`name` AS `customer_name`, `o`.`total_amount` AS `total_amount`, `o`.`status` AS `status`, `o`.`created_at` AS `created_at`, count(`oi`.`id`) AS `item_count` FROM ((`orders` `o` join `users` `u` on(`o`.`user_id` = `u`.`id`)) left join `order_items` `oi` on(`o`.`id` = `oi`.`order_id`)) GROUP BY `o`.`id`, `o`.`order_number`, `u`.`name`, `o`.`total_amount`, `o`.`status`, `o`.`created_at` ;

-- --------------------------------------------------------

--
-- Structure for view `reservation_details`
--
DROP TABLE IF EXISTS `reservation_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `reservation_details`  AS SELECT `r`.`id` AS `id`, `r`.`reservation_number` AS `reservation_number`, `r`.`customer_name` AS `customer_name`, `r`.`customer_email` AS `customer_email`, `r`.`reservation_date` AS `reservation_date`, `r`.`reservation_time` AS `reservation_time`, `r`.`number_of_guests` AS `number_of_guests`, `r`.`status` AS `status`, group_concat(`rt`.`table_number` separator ',') AS `assigned_tables` FROM ((`reservations` `r` left join `table_reservations` `tr` on(`r`.`id` = `tr`.`reservation_id`)) left join `restaurant_tables` `rt` on(`tr`.`table_id` = `rt`.`id`)) GROUP BY `r`.`id`, `r`.`reservation_number`, `r`.`customer_name`, `r`.`customer_email`, `r`.`reservation_date`, `r`.`reservation_time`, `r`.`number_of_guests`, `r`.`status` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`category_name`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_menu_items_category_id` (`category_id`),
  ADD KEY `idx_menu_items_price` (`price`);

--
-- Indexes for table `menu_item_ingredients`
--
ALTER TABLE `menu_item_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_item_id` (`menu_item_id`),
  ADD KEY `inventory_id` (`inventory_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `idx_orders_user_id` (`user_id`),
  ADD KEY `idx_orders_status` (`status`),
  ADD KEY `idx_orders_created_at` (`created_at`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_items_order_id` (`order_id`),
  ADD KEY `idx_order_items_menu_item_id` (`menu_item_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_payments_order_id` (`order_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reservation_number` (`reservation_number`),
  ADD KEY `idx_reservations_user_id` (`user_id`),
  ADD KEY `idx_reservations_date_time` (`reservation_date`,`reservation_time`),
  ADD KEY `idx_reservations_status` (`status`);

--
-- Indexes for table `restaurant_tables`
--
ALTER TABLE `restaurant_tables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `table_number` (`table_number`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `menu_item_id` (`menu_item_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `table_reservations`
--
ALTER TABLE `table_reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_id` (`reservation_id`),
  ADD KEY `table_id` (`table_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `menu_item_ingredients`
--
ALTER TABLE `menu_item_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurant_tables`
--
ALTER TABLE `restaurant_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `table_reservations`
--
ALTER TABLE `table_reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Constraints for table `menu_item_ingredients`
--
ALTER TABLE `menu_item_ingredients`
  ADD CONSTRAINT `menu_item_ingredients_ibfk_1` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `menu_item_ingredients_ibfk_2` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE SET NULL;

--
-- Constraints for table `table_reservations`
--
ALTER TABLE `table_reservations`
  ADD CONSTRAINT `table_reservations_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `table_reservations_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `restaurant_tables` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
