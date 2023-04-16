-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mfee35
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `adminId` bigint unsigned NOT NULL,
  `adminname` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `adminId_UNIQUE` (`adminId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,3450349941,'Uikdiiioek','$2a$10$fXFZncA9bAE4JlxnaAr5sOOWfWx7hztOVjEhAfgL4Mkyb2Uj0aiKu','sssssss@glkajl.com','2023-04-10 06:18:00'),(2,1606116619,'Uikdiiioek','$2a$10$OtcEZSpSyeziXNf3TXgxYers74E74dhex.sbHWBod5FgKdYqFaJya','sssss545ss@glkajl.com','2023-04-10 06:18:26'),(3,7606591757,'CommonUse','$2a$10$U6iYfrrmnLbAQXg0Pjxyre9d1Zn5svaLssspNHfGdtR9pBnVNorqa','banana0583@fruitz.com','2023-04-10 07:26:33'),(4,4500310002,'CommonUse','$2a$10$AuGNxUbFN6Bi2Ra5lCOd5eBYdxLYURu6OaKQoJjZOQNo1pCzFD83K','banana058343@fruitz.com','2023-04-10 07:43:25');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tdee`
--

DROP TABLE IF EXISTS `tdee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tdee` (
  `sid` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(10) NOT NULL,
  `height` decimal(4,1) DEFAULT NULL,
  `weight` decimal(4,1) DEFAULT NULL,
  `activity_level` decimal(2,1) DEFAULT NULL,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tdee`
--

LOCK TABLES `tdee` WRITE;
/*!40000 ALTER TABLE `tdee` DISABLE KEYS */;
/*!40000 ALTER TABLE `tdee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `userId` bigint unsigned NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL COMMENT '0:女生, 1:男生',
  `birthday` date DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,5590613616,'lskfsl@lkfjl','lsdkfj2313',NULL,0,NULL,NULL,NULL,'2023-04-01 13:11:54'),(2,5624963453,'lskfsdsfsl@lkfjl','lsdkfj2313',NULL,0,NULL,NULL,NULL,'2023-04-01 13:13:33'),(3,3162557974,'lskfsdddsfsl@lkfjl','lsdkfj2313',NULL,0,NULL,NULL,NULL,'2023-04-01 13:14:26'),(4,3262222356,'noraisin@toko.com','Ab123456',NULL,0,NULL,NULL,NULL,'2023-04-01 16:25:59'),(5,9960669470,'banana0583@fruitz.com','$2a$10$nm9ukuCK87l/lTfThxjZwO6dc5N6qMr2zMOEFX4mQEDzrecEYNE.m',NULL,0,NULL,NULL,NULL,'2023-04-06 03:32:16'),(6,7400633609,'watermelon3325@furuz.com','$2a$10$5uErJ8X7mDAj6kgkDQMCPOq8n/9e/MNICg3eijyeLLXVvONARMHHK',NULL,0,NULL,NULL,NULL,'2023-04-06 03:52:28'),(7,5453336177,'Alon1131@guik.com','$2a$10$ydNBGUsdd6xgT4w8o7WiFeUzls2fTXExtBxNXyX6juJGo.yvAf0Y.',NULL,0,NULL,NULL,NULL,'2023-04-10 06:20:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-17  0:54:14
