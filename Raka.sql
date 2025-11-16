-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: resturant
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_no` int DEFAULT NULL,
  `visit_no` int DEFAULT NULL,
  `loyalty_points` int DEFAULT NULL,
  `preferred_dish_id` int DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_no` int DEFAULT NULL,
  `tenure` int DEFAULT NULL,
  `address` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `job_position` varchar(55) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `employement_date` date DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `availability` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_categories`
--

DROP TABLE IF EXISTS `food_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_categories` (
  `category_id` int NOT NULL,
  `category_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_categories`
--

LOCK TABLES `food_categories` WRITE;
/*!40000 ALTER TABLE `food_categories` DISABLE KEYS */;
INSERT INTO `food_categories` VALUES (1,'Pizza',NULL,'2025-11-13 13:31:10'),(2,'Seafood',NULL,'2025-11-13 13:31:10'),(3,'Salad',NULL,'2025-11-13 13:31:10'),(4,'Burgers',NULL,'2025-11-13 13:31:10'),(5,'Pasta',NULL,'2025-11-13 13:31:10');
/*!40000 ALTER TABLE `food_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_order`
--

DROP TABLE IF EXISTS `food_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_order` (
  `order_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `menu_id` int DEFAULT NULL,
  `sale_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `menu_id` (`menu_id`),
  KEY `sale_id` (`sale_id`),
  CONSTRAINT `fk_menu_id` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`),
  CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `fk_sale` FOREIGN KEY (`sale_id`) REFERENCES `sale_transaction` (`sale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_order`
--

LOCK TABLES `food_order` WRITE;
/*!40000 ALTER TABLE `food_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventory_id` int NOT NULL,
  `ingredient_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `minimum_stock_level` decimal(10,2) DEFAULT '0.00',
  `last_restocked` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `supplier` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `availability` int DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  PRIMARY KEY (`inventory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` int NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `ingredients` text COLLATE utf8mb4_general_ci,
  `preparation_time` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`menu_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `food_categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Margherita Pizza','Classic tomato, mozzarella, and fresh basil',12.99,1,'./imageM/margherita-pizza.jpg',1,NULL,NULL,'2025-11-13 13:31:51','2025-11-13 13:31:51'),(2,'Pepperoni Pizza','Loaded with pepperoni and mozzarella',14.99,1,'./imageM/pizza2.jpg',1,NULL,NULL,'2025-11-13 13:31:51','2025-11-13 13:31:51'),(3,'Grilled Salmon','Fresh Atlantic salmon with herbs',19.99,2,'./imageM/grilled-salmon.jpg',1,NULL,NULL,'2025-11-13 13:31:51','2025-11-13 13:31:51'),(4,'Caesar Salad','Crisp romaine, croutons, and parmesan',9.99,3,'./imageM/caesar-salad.jpg',1,NULL,NULL,'2025-11-13 13:31:51','2025-11-13 13:31:51'),(5,'Beef Burger','Juicy beef patty with cheese and lettuce',11.99,4,'./imageM/beef-burger.jpg',1,NULL,NULL,'2025-11-13 13:31:51','2025-11-13 13:31:51'),(6,'Shrimp Pasta','Creamy garlic sauce with shrimp',16.99,5,'./imageM/pasta.jpg',1,NULL,NULL,'2025-11-13 13:31:51','2025-11-13 13:31:51');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_item`
--

DROP TABLE IF EXISTS `recipe_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_item` (
  `recipe_item_ID` int NOT NULL,
  `menu_id` int NOT NULL,
  `inventory_id` int NOT NULL,
  `quantity_required` decimal(10,2) NOT NULL,
  PRIMARY KEY (`recipe_item_ID`),
  KEY `menu_id` (`menu_id`),
  KEY `inventory_id` (`inventory_id`),
  CONSTRAINT `fk_inventory_recipe` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`),
  CONSTRAINT `fk_recipe_menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_item`
--

LOCK TABLES `recipe_item` WRITE;
/*!40000 ALTER TABLE `recipe_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipe_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_no` int DEFAULT NULL,
  `no_of_customer` int DEFAULT NULL,
  `special_resquests` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reserve_date` datetime DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `fk_customer_reserve` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_transaction`
--

DROP TABLE IF EXISTS `sale_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_transaction` (
  `sale_id` int NOT NULL,
  `Amount` decimal(8,2) DEFAULT NULL,
  `Payment_Method` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `table_no` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `sale_time` date DEFAULT NULL,
  PRIMARY KEY (`sale_id`),
  KEY `employee_id` (`employee_id`),
  KEY `fk_customer_sale` (`customer_id`),
  CONSTRAINT `fk_customer_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `fk_customer_sale` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_transaction`
--

LOCK TABLES `sale_transaction` WRITE;
/*!40000 ALTER TABLE `sale_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17  2:56:47
