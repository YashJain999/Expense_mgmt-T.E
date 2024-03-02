CREATE DATABASE  IF NOT EXISTS `lab` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lab`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: lab
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add app user',7,'add_appuser'),(26,'Can change app user',7,'change_appuser'),(27,'Can delete app user',7,'delete_appuser'),(28,'Can view app user',7,'view_appuser'),(29,'Can add budget',8,'add_budget'),(30,'Can change budget',8,'change_budget'),(31,'Can delete budget',8,'delete_budget'),(32,'Can view budget',8,'view_budget'),(33,'Can add financialyear',9,'add_financialyear'),(34,'Can change financialyear',9,'change_financialyear'),(35,'Can delete financialyear',9,'delete_financialyear'),(36,'Can view financialyear',9,'view_financialyear'),(37,'Can add itemmaster',10,'add_itemmaster'),(38,'Can change itemmaster',10,'change_itemmaster'),(39,'Can delete itemmaster',10,'delete_itemmaster'),(40,'Can view itemmaster',10,'view_itemmaster'),(41,'Can add pdf',11,'add_pdf'),(42,'Can change pdf',11,'change_pdf'),(43,'Can delete pdf',11,'delete_pdf'),(44,'Can view pdf',11,'view_pdf'),(45,'Can add user',12,'add_user'),(46,'Can change user',12,'change_user'),(47,'Can delete user',12,'delete_user'),(48,'Can view user',12,'view_user'),(49,'Can add deptmaster',13,'add_deptmaster'),(50,'Can change deptmaster',13,'change_deptmaster'),(51,'Can delete deptmaster',13,'delete_deptmaster'),(52,'Can view deptmaster',13,'view_deptmaster');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_appuser`
--

DROP TABLE IF EXISTS `budget_appuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_appuser` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_appuser`
--

LOCK TABLES `budget_appuser` WRITE;
/*!40000 ALTER TABLE `budget_appuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `budget_appuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_appuser_groups`
--

DROP TABLE IF EXISTS `budget_appuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_appuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appuser_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `budget_appuser_groups_appuser_id_group_id_41a2407c_uniq` (`appuser_id`,`group_id`),
  KEY `budget_appuser_groups_group_id_3e85e4b1_fk_auth_group_id` (`group_id`),
  CONSTRAINT `budget_appuser_group_appuser_id_cc66cb7c_fk_budget_ap` FOREIGN KEY (`appuser_id`) REFERENCES `budget_appuser` (`user_id`),
  CONSTRAINT `budget_appuser_groups_group_id_3e85e4b1_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_appuser_groups`
--

LOCK TABLES `budget_appuser_groups` WRITE;
/*!40000 ALTER TABLE `budget_appuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `budget_appuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_appuser_user_permissions`
--

DROP TABLE IF EXISTS `budget_appuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_appuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appuser_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `budget_appuser_user_perm_appuser_id_permission_id_70ef92c6_uniq` (`appuser_id`,`permission_id`),
  KEY `budget_appuser_user__permission_id_2f741c93_fk_auth_perm` (`permission_id`),
  CONSTRAINT `budget_appuser_user__appuser_id_1f4fed6d_fk_budget_ap` FOREIGN KEY (`appuser_id`) REFERENCES `budget_appuser` (`user_id`),
  CONSTRAINT `budget_appuser_user__permission_id_2f741c93_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_appuser_user_permissions`
--

LOCK TABLES `budget_appuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `budget_appuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `budget_appuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_budget`
--

DROP TABLE IF EXISTS `budget_budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_budget` (
  `dept` varchar(50) NOT NULL,
  `f_year` int NOT NULL,
  `item` varchar(50) NOT NULL,
  `budgeted_amt` float NOT NULL DEFAULT '0',
  `actual_exp` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`dept`,`f_year`,`item`),
  KEY `f_year_idx` (`f_year`),
  KEY `item_idx` (`item`),
  CONSTRAINT `dept` FOREIGN KEY (`dept`) REFERENCES `budget_deptmaster` (`dept`),
  CONSTRAINT `f_year` FOREIGN KEY (`f_year`) REFERENCES `budget_financialyear` (`F_year`),
  CONSTRAINT `item` FOREIGN KEY (`item`) REFERENCES `budget_itemmaster` (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_budget`
--

LOCK TABLES `budget_budget` WRITE;
/*!40000 ALTER TABLE `budget_budget` DISABLE KEYS */;
INSERT INTO `budget_budget` VALUES ('AIML',2015,'LAB-CONSUME',10000,9500),('AIML',2015,'LAB-EQ',15000,14000),('AIML',2015,'MAINT-SPARE',8000,7800),('AIML',2015,'MISC',5000,4800),('AIML',2015,'RND',12000,11800),('AIML',2015,'SOFT',10000,9800),('AIML',2015,'T&T',7000,6800),('AIML',2016,'LAB-CONSUME',11000,10500),('AIML',2016,'LAB-EQ',16000,15000),('AIML',2016,'MAINT-SPARE',8500,8200),('AIML',2016,'MISC',5500,5200),('AIML',2016,'RND',12500,12200),('AIML',2016,'SOFT',10500,10000),('AIML',2016,'T&T',7200,7000),('AIML',2017,'LAB-CONSUME',12000,11500),('AIML',2017,'LAB-EQ',17000,16000),('AIML',2017,'MAINT-SPARE',9000,8700),('AIML',2017,'MISC',6000,5800),('AIML',2017,'RND',13000,12600),('AIML',2017,'SOFT',11000,10500),('AIML',2017,'T&T',7300,7100),('AIML',2018,'LAB-CONSUME',13000,12500),('AIML',2018,'LAB-EQ',18000,17000),('AIML',2018,'MAINT-SPARE',9500,9200),('AIML',2018,'MISC',6500,6200),('AIML',2018,'RND',13500,13000),('AIML',2018,'SOFT',11500,11000),('AIML',2018,'T&T',7400,7200),('AIML',2019,'LAB-CONSUME',13500,13000),('AIML',2019,'LAB-EQ',18500,17500),('AIML',2019,'MAINT-SPARE',9700,9500),('AIML',2019,'MISC',6700,6500),('AIML',2019,'RND',14000,13500),('AIML',2019,'SOFT',12000,11500),('AIML',2019,'T&T',7500,7300),('AIML',2020,'LAB-CONSUME',14000,13500),('AIML',2020,'LAB-EQ',19000,18000),('AIML',2020,'MAINT-SPARE',10000,9700),('AIML',2020,'MISC',7000,6800),('AIML',2020,'RND',14500,14000),('AIML',2020,'SOFT',12500,12000),('AIML',2020,'T&T',7600,7400),('AIML',2021,'LAB-CONSUME',14500,14000),('AIML',2021,'LAB-EQ',19500,18500),('AIML',2021,'MAINT-SPARE',10500,10200),('AIML',2021,'MISC',7300,7100),('AIML',2021,'RND',15000,14500),('AIML',2021,'SOFT',13000,12500),('AIML',2021,'T&T',7700,7500),('AIML',2022,'LAB-CONSUME',15000,14500),('AIML',2022,'LAB-EQ',20000,19000),('AIML',2022,'MAINT-SPARE',11000,10500),('AIML',2022,'MISC',7600,7400),('AIML',2022,'RND',15500,15000),('AIML',2022,'SOFT',13500,13000),('AIML',2022,'T&T',7800,7600),('AIML',2023,'LAB-CONSUME',15500,15000),('AIML',2023,'LAB-EQ',20500,19500),('AIML',2023,'MAINT-SPARE',11500,11000),('AIML',2023,'MISC',7900,7700),('AIML',2023,'RND',15700,15500),('AIML',2023,'SOFT',13700,13400),('AIML',2023,'T&T',7900,7700),('AIML',2024,'LAB-CONSUME',16000,15500),('AIML',2024,'LAB-EQ',21000,20000),('AIML',2024,'MAINT-SPARE',12000,11500),('AIML',2024,'MISC',8200,8000),('AIML',2024,'RND',16200,16000),('AIML',2024,'SOFT',14200,13900),('AIML',2024,'T&T',8000,7800),('CIVIL',2015,'LAB-CONSUME',10500,10000),('CIVIL',2015,'LAB-EQ',15500,14500),('CIVIL',2015,'MAINT-SPARE',8500,8300),('CIVIL',2015,'MISC',5200,5000),('CIVIL',2015,'RND',12200,12000),('CIVIL',2015,'SOFT',10200,9900),('CIVIL',2015,'T&T',7200,7000),('CIVIL',2016,'LAB-CONSUME',11500,11000),('CIVIL',2016,'LAB-EQ',16500,15500),('CIVIL',2016,'MAINT-SPARE',9000,8800),('CIVIL',2016,'MISC',5700,5500),('CIVIL',2016,'RND',12700,12500),('CIVIL',2016,'SOFT',10700,10400),('CIVIL',2016,'T&T',7300,7100),('CIVIL',2017,'LAB-CONSUME',12500,12000),('CIVIL',2017,'LAB-EQ',17500,16500),('CIVIL',2017,'MAINT-SPARE',9500,9300),('CIVIL',2017,'MISC',6200,6000),('CIVIL',2017,'RND',13200,13000),('CIVIL',2017,'SOFT',11200,10900),('CIVIL',2017,'T&T',7400,7200),('CIVIL',2018,'LAB-CONSUME',13500,13000),('CIVIL',2018,'LAB-EQ',18500,17500),('CIVIL',2018,'MAINT-SPARE',9700,9500),('CIVIL',2018,'MISC',6700,6500),('CIVIL',2018,'RND',13700,13500),('CIVIL',2018,'SOFT',11700,11400),('CIVIL',2018,'T&T',7500,7300),('CIVIL',2019,'LAB-CONSUME',14000,13500),('CIVIL',2019,'LAB-EQ',19000,18000),('CIVIL',2019,'MAINT-SPARE',10000,9700),('CIVIL',2019,'MISC',7000,6800),('CIVIL',2019,'RND',14200,14000),('CIVIL',2019,'SOFT',12200,11900),('CIVIL',2019,'T&T',7600,7400),('CIVIL',2020,'LAB-CONSUME',14500,14000),('CIVIL',2020,'LAB-EQ',19500,18500),('CIVIL',2020,'MAINT-SPARE',10500,10200),('CIVIL',2020,'MISC',7300,7100),('CIVIL',2020,'RND',14700,14500),('CIVIL',2020,'SOFT',12700,12400),('CIVIL',2020,'T&T',7700,7500),('CIVIL',2021,'LAB-CONSUME',15000,14500),('CIVIL',2021,'LAB-EQ',20000,19000),('CIVIL',2021,'MAINT-SPARE',11000,10500),('CIVIL',2021,'MISC',7600,7400),('CIVIL',2021,'RND',15200,15000),('CIVIL',2021,'SOFT',13200,12900),('CIVIL',2021,'T&T',7800,7600),('CIVIL',2022,'LAB-CONSUME',15500,15000),('CIVIL',2022,'LAB-EQ',20500,19500),('CIVIL',2022,'MAINT-SPARE',11500,11000),('CIVIL',2022,'MISC',7900,7700),('CIVIL',2022,'RND',15700,15500),('CIVIL',2022,'SOFT',13700,13400),('CIVIL',2022,'T&T',7900,7700),('CIVIL',2023,'LAB-CONSUME',15500,15000),('CIVIL',2023,'LAB-EQ',20500,19500),('CIVIL',2023,'MAINT-SPARE',11500,11000),('CIVIL',2023,'MISC',7900,7700),('CIVIL',2023,'RND',15700,15500),('CIVIL',2023,'SOFT',13700,13400),('CIVIL',2023,'T&T',7900,7700),('CIVIL',2024,'LAB-CONSUME',16000,15500),('CIVIL',2024,'LAB-EQ',21000,20000),('CIVIL',2024,'MAINT-SPARE',12000,11500),('CIVIL',2024,'MISC',8200,8000),('CIVIL',2024,'RND',16200,16000),('CIVIL',2024,'SOFT',14200,13900),('CIVIL',2024,'T&T',8000,7800),('CS',2015,'LAB-CONSUME',9500,9000),('CS',2015,'LAB-EQ',14500,13500),('CS',2015,'MAINT-SPARE',7800,7600),('CS',2015,'MISC',4800,4600),('CS',2015,'RND',11800,11500),('CS',2015,'SOFT',9800,9500),('CS',2015,'T&T',6800,6600),('CS',2016,'LAB-CONSUME',10500,10000),('CS',2016,'LAB-EQ',15500,14500),('CS',2016,'MAINT-SPARE',8200,8000),('CS',2016,'MISC',5200,5000),('CS',2016,'RND',12200,12000),('CS',2016,'SOFT',10000,9700),('CS',2016,'T&T',7000,6800),('CS',2017,'LAB-CONSUME',11500,11000),('CS',2017,'LAB-EQ',16500,15500),('CS',2017,'MAINT-SPARE',8700,8500),('CS',2017,'MISC',5800,5600),('CS',2017,'RND',12500,12200),('CS',2017,'SOFT',10500,10200),('CS',2017,'T&T',7100,6900),('CS',2018,'LAB-CONSUME',12500,12000),('CS',2018,'LAB-EQ',17500,16500),('CS',2018,'MAINT-SPARE',9200,9000),('CS',2018,'MISC',6200,6000),('CS',2018,'RND',13000,12700),('CS',2018,'SOFT',11000,10700),('CS',2018,'T&T',7200,7000),('CS',2019,'LAB-CONSUME',13000,12500),('CS',2019,'LAB-EQ',18000,17000),('CS',2019,'MAINT-SPARE',9500,9200),('CS',2019,'MISC',6500,6200),('CS',2019,'RND',13500,13000),('CS',2019,'SOFT',11500,11000),('CS',2019,'T&T',7400,7200),('CS',2020,'LAB-CONSUME',13500,13000),('CS',2020,'LAB-EQ',18500,17500),('CS',2020,'MAINT-SPARE',9700,9500),('CS',2020,'MISC',6700,6500),('CS',2020,'RND',14000,13500),('CS',2020,'SOFT',12000,11500),('CS',2020,'T&T',7500,7300),('CS',2021,'LAB-CONSUME',14000,13500),('CS',2021,'LAB-EQ',19000,18000),('CS',2021,'MAINT-SPARE',10000,9700),('CS',2021,'MISC',7000,6800),('CS',2021,'RND',14500,14000),('CS',2021,'SOFT',12500,12000),('CS',2021,'T&T',7600,7400),('CS',2022,'LAB-CONSUME',14500,14000),('CS',2022,'LAB-EQ',19500,18500),('CS',2022,'MAINT-SPARE',10500,10200),('CS',2022,'MISC',7300,7100),('CS',2022,'RND',15000,14500),('CS',2022,'SOFT',13000,12500),('CS',2022,'T&T',7700,7500),('CS',2023,'LAB-CONSUME',15000,14500),('CS',2023,'LAB-EQ',20000,19000),('CS',2023,'MAINT-SPARE',11000,10500),('CS',2023,'MISC',7600,7400),('CS',2023,'RND',15200,15000),('CS',2023,'SOFT',13200,12900),('CS',2023,'T&T',7800,7600),('CS',2024,'LAB-CONSUME',15500,15000),('CS',2024,'LAB-EQ',20500,19500),('CS',2024,'MAINT-SPARE',11500,11000),('CS',2024,'MISC',7900,7700),('CS',2024,'RND',15700,15500),('CS',2024,'SOFT',13700,13400),('CS',2024,'T&T',7900,7700),('DS',2015,'LAB-CONSUME',10000,9500),('DS',2015,'LAB-EQ',15000,14000),('DS',2015,'MAINT-SPARE',8000,7800),('DS',2015,'MISC',5000,4800),('DS',2015,'RND',12000,11800),('DS',2015,'SOFT',10000,9800),('DS',2015,'T&T',7000,6800),('DS',2016,'LAB-CONSUME',11000,10500),('DS',2016,'LAB-EQ',16000,15000),('DS',2016,'MAINT-SPARE',8500,8200),('DS',2016,'MISC',5500,5200),('DS',2016,'RND',12500,12200),('DS',2016,'SOFT',10500,10000),('DS',2016,'T&T',7200,7000),('DS',2017,'LAB-CONSUME',12000,11500),('DS',2017,'LAB-EQ',17000,16000),('DS',2017,'MAINT-SPARE',9000,8700),('DS',2017,'MISC',6000,5800),('DS',2017,'RND',13000,12600),('DS',2017,'SOFT',11000,10500),('DS',2017,'T&T',7300,7100),('DS',2018,'LAB-CONSUME',13000,12500),('DS',2018,'LAB-EQ',18000,17000),('DS',2018,'MAINT-SPARE',9500,9200),('DS',2018,'MISC',6500,6200),('DS',2018,'RND',13500,13000),('DS',2018,'SOFT',11500,11000),('DS',2018,'T&T',7400,7200),('DS',2019,'LAB-CONSUME',13500,13000),('DS',2019,'LAB-EQ',18500,17500),('DS',2019,'MAINT-SPARE',9700,9500),('DS',2019,'MISC',6700,6500),('DS',2019,'RND',14000,13500),('DS',2019,'SOFT',12000,11500),('DS',2019,'T&T',7500,7300),('DS',2020,'LAB-CONSUME',14000,13500),('DS',2020,'LAB-EQ',19000,18000),('DS',2020,'MAINT-SPARE',10000,9700),('DS',2020,'MISC',7000,6800),('DS',2020,'RND',14500,14000),('DS',2020,'SOFT',12500,12000),('DS',2020,'T&T',7600,7400),('DS',2021,'LAB-CONSUME',14500,14000),('DS',2021,'LAB-EQ',19500,18500),('DS',2021,'MAINT-SPARE',10500,10200),('DS',2021,'MISC',7300,7100),('DS',2021,'RND',15000,14500),('DS',2021,'SOFT',13000,12500),('DS',2021,'T&T',7700,7500),('DS',2022,'LAB-CONSUME',15000,14500),('DS',2022,'LAB-EQ',20000,19000),('DS',2022,'MAINT-SPARE',11000,10500),('DS',2022,'MISC',7600,7400),('DS',2022,'RND',15500,15000),('DS',2022,'SOFT',13500,13000),('DS',2022,'T&T',7800,7600),('DS',2023,'LAB-CONSUME',14500,14000),('DS',2023,'LAB-EQ',19500,18500),('DS',2023,'MAINT-SPARE',10500,10200),('DS',2023,'MISC',7300,7100),('DS',2023,'RND',15000,14500),('DS',2023,'SOFT',13000,12500),('DS',2023,'T&T',7700,7500),('DS',2024,'LAB-CONSUME',15000,14500),('DS',2024,'LAB-EQ',20000,19000),('DS',2024,'MAINT-SPARE',11000,10500),('DS',2024,'MISC',7600,7400),('DS',2024,'RND',15200,15000),('DS',2024,'SOFT',13200,12900),('DS',2024,'T&T',7800,7600),('DS',2025,'LAB-CONSUME',15500,15000),('DS',2025,'LAB-EQ',20500,19500),('DS',2025,'MAINT-SPARE',11500,11000),('DS',2025,'MISC',7900,7700),('DS',2025,'RND',15700,15500),('DS',2025,'SOFT',13700,13400),('DS',2025,'T&T',7900,7700),('DS',2026,'LAB-CONSUME',16000,15500),('DS',2026,'LAB-EQ',21000,20000),('DS',2026,'MAINT-SPARE',12000,11500),('DS',2026,'MISC',8200,8000),('DS',2026,'RND',16200,16000),('DS',2026,'SOFT',14200,13900),('DS',2026,'T&T',8000,7800),('IT',2015,'LAB-CONSUME',9000,8500),('IT',2015,'LAB-EQ',14000,13000),('IT',2015,'MAINT-SPARE',7500,7300),('IT',2015,'MISC',4600,4400),('IT',2015,'RND',11500,11200),('IT',2015,'SOFT',9500,9200),('IT',2015,'T&T',6600,6400),('IT',2016,'LAB-CONSUME',10000,9500),('IT',2016,'LAB-EQ',15000,14000),('IT',2016,'MAINT-SPARE',8000,7800),('IT',2016,'MISC',5000,4800),('IT',2016,'RND',12000,11800),('IT',2016,'SOFT',10000,9800),('IT',2016,'T&T',7000,6800),('IT',2017,'LAB-CONSUME',11000,10500),('IT',2017,'LAB-EQ',16000,15000),('IT',2017,'MAINT-SPARE',8500,8200),('IT',2017,'MISC',5500,5200),('IT',2017,'RND',12500,12200),('IT',2017,'SOFT',10500,10000),('IT',2017,'T&T',7200,7000),('IT',2018,'LAB-CONSUME',12000,11500),('IT',2018,'LAB-EQ',17000,16000),('IT',2018,'MAINT-SPARE',9000,8700),('IT',2018,'MISC',6000,5800),('IT',2018,'RND',13000,12600),('IT',2018,'SOFT',11000,10500),('IT',2018,'T&T',7300,7100),('IT',2019,'LAB-CONSUME',12500,12000),('IT',2019,'LAB-EQ',17500,16500),('IT',2019,'MAINT-SPARE',9200,9000),('IT',2019,'MISC',6200,6000),('IT',2019,'RND',13500,13000),('IT',2019,'SOFT',11500,11000),('IT',2019,'T&T',7400,7200),('IT',2020,'LAB-CONSUME',13000,12500),('IT',2020,'LAB-EQ',18000,17000),('IT',2020,'MAINT-SPARE',9500,9200),('IT',2020,'MISC',6500,6200),('IT',2020,'RND',14000,13500),('IT',2020,'SOFT',12000,11500),('IT',2020,'T&T',7500,7300),('IT',2021,'LAB-CONSUME',13500,13000),('IT',2021,'LAB-EQ',18500,17500),('IT',2021,'MAINT-SPARE',9700,9500),('IT',2021,'MISC',6700,6500),('IT',2021,'RND',14500,14000),('IT',2021,'SOFT',12500,12000),('IT',2021,'T&T',7600,7400),('IT',2022,'LAB-CONSUME',14000,13500),('IT',2022,'LAB-EQ',19000,18000),('IT',2022,'MAINT-SPARE',10000,9700),('IT',2022,'MISC',7000,6800),('IT',2022,'RND',15000,14500),('IT',2022,'SOFT',13000,12500),('IT',2022,'T&T',7700,7500),('IT',2023,'LAB-CONSUME',14000,13500),('IT',2023,'LAB-EQ',19000,18000),('IT',2023,'MAINT-SPARE',10000,9700),('IT',2023,'MISC',7000,6800),('IT',2023,'RND',14500,14000),('IT',2023,'SOFT',12500,12000),('IT',2023,'T&T',7700,7500),('IT',2024,'LAB-CONSUME',14500,14000),('IT',2024,'LAB-EQ',19500,18500),('IT',2024,'MAINT-SPARE',10500,10200),('IT',2024,'MISC',7300,7100),('IT',2024,'RND',15000,14500),('IT',2024,'SOFT',13000,12500),('IT',2024,'T&T',7700,7500),('MECH',2015,'LAB-CONSUME',9500,9000),('MECH',2015,'LAB-EQ',14500,13500),('MECH',2015,'MAINT-SPARE',7800,7600),('MECH',2015,'MISC',4800,4600),('MECH',2015,'RND',11800,11500),('MECH',2015,'SOFT',9800,9500),('MECH',2015,'T&T',6800,6600),('MECH',2016,'LAB-CONSUME',10500,10000),('MECH',2016,'LAB-EQ',15500,14500),('MECH',2016,'MAINT-SPARE',8200,8000),('MECH',2016,'MISC',5200,5000),('MECH',2016,'RND',12200,12000),('MECH',2016,'SOFT',10000,9700),('MECH',2016,'T&T',7000,6800),('MECH',2017,'LAB-CONSUME',11500,11000),('MECH',2017,'LAB-EQ',16500,15500),('MECH',2017,'MAINT-SPARE',8700,8500),('MECH',2017,'MISC',5800,5600),('MECH',2017,'RND',12500,12200),('MECH',2017,'SOFT',10500,10200),('MECH',2017,'T&T',7100,6900),('MECH',2018,'LAB-CONSUME',12500,12000),('MECH',2018,'LAB-EQ',17500,16500),('MECH',2018,'MAINT-SPARE',9200,9000),('MECH',2018,'MISC',6200,6000),('MECH',2018,'RND',13000,12700),('MECH',2018,'SOFT',11000,10700),('MECH',2018,'T&T',7200,7000),('MECH',2019,'LAB-CONSUME',13000,12500),('MECH',2019,'LAB-EQ',18000,17000),('MECH',2019,'MAINT-SPARE',9500,9200),('MECH',2019,'MISC',6500,6200),('MECH',2019,'RND',13500,13000),('MECH',2019,'SOFT',11500,11000),('MECH',2019,'T&T',7400,7200),('MECH',2020,'LAB-CONSUME',13500,13000),('MECH',2020,'LAB-EQ',18500,17500),('MECH',2020,'MAINT-SPARE',9700,9500),('MECH',2020,'MISC',6700,6500),('MECH',2020,'RND',14000,13500),('MECH',2020,'SOFT',12000,11500),('MECH',2020,'T&T',7500,7300),('MECH',2021,'LAB-CONSUME',14000,13500),('MECH',2021,'LAB-EQ',19000,18000),('MECH',2021,'MAINT-SPARE',10000,9700),('MECH',2021,'MISC',7000,6800),('MECH',2021,'RND',14500,14000),('MECH',2021,'SOFT',12500,12000),('MECH',2021,'T&T',7600,7400),('MECH',2022,'LAB-CONSUME',14500,14000),('MECH',2022,'LAB-EQ',19500,18500),('MECH',2022,'MAINT-SPARE',10500,10200),('MECH',2022,'MISC',7300,7100),('MECH',2022,'RND',15000,14500),('MECH',2022,'SOFT',13000,12500),('MECH',2022,'T&T',7700,7500),('MECH',2023,'LAB-CONSUME',13500,13000),('MECH',2023,'LAB-EQ',18500,17500),('MECH',2023,'MAINT-SPARE',9500,9200),('MECH',2023,'MISC',6500,6200),('MECH',2023,'RND',14000,13500),('MECH',2023,'SOFT',12000,11500),('MECH',2023,'T&T',7500,7300),('MECH',2024,'LAB-CONSUME',14000,13500),('MECH',2024,'LAB-EQ',19000,18000),('MECH',2024,'MAINT-SPARE',10000,9700),('MECH',2024,'MISC',7000,6800),('MECH',2024,'RND',14500,14000),('MECH',2024,'SOFT',12500,12000),('MECH',2024,'T&T',7700,7500);
/*!40000 ALTER TABLE `budget_budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_deptmaster`
--

DROP TABLE IF EXISTS `budget_deptmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_deptmaster` (
  `dept` varchar(50) NOT NULL,
  `desc` varchar(60) NOT NULL,
  PRIMARY KEY (`dept`),
  UNIQUE KEY `dept_UNIQUE` (`dept`),
  UNIQUE KEY `desc_UNIQUE` (`desc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_deptmaster`
--

LOCK TABLES `budget_deptmaster` WRITE;
/*!40000 ALTER TABLE `budget_deptmaster` DISABLE KEYS */;
INSERT INTO `budget_deptmaster` VALUES ('AIML','Artificial Intelligence and Machine Learning'),('CIVIL','Civil'),('CS','Computer Science'),('DS','Data Science'),('IT','Information Technology'),('MECH','Mechanical');
/*!40000 ALTER TABLE `budget_deptmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_financialyear`
--

DROP TABLE IF EXISTS `budget_financialyear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_financialyear` (
  `F_year` int NOT NULL,
  `Desc` varchar(60) NOT NULL,
  PRIMARY KEY (`F_year`),
  UNIQUE KEY `FY_UNIQUE` (`F_year`),
  UNIQUE KEY `Desc_UNIQUE` (`Desc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_financialyear`
--

LOCK TABLES `budget_financialyear` WRITE;
/*!40000 ALTER TABLE `budget_financialyear` DISABLE KEYS */;
INSERT INTO `budget_financialyear` VALUES (2015,'2014-2015'),(2016,'2015-2016'),(2017,'2016-2017'),(2018,'2017-2018'),(2019,'2018-2019'),(2020,'2019-2020'),(2021,'2020-2021'),(2022,'2021-2022'),(2023,'2022-2023'),(2024,'2023-2024'),(2025,'2024-2025'),(2026,'2025-2026');
/*!40000 ALTER TABLE `budget_financialyear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_itemmaster`
--

DROP TABLE IF EXISTS `budget_itemmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_itemmaster` (
  `item` varchar(50) NOT NULL,
  `item_desc` varchar(100) NOT NULL,
  PRIMARY KEY (`item`),
  UNIQUE KEY `item_UNIQUE` (`item`),
  UNIQUE KEY `item_desc_UNIQUE` (`item_desc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_itemmaster`
--

LOCK TABLES `budget_itemmaster` WRITE;
/*!40000 ALTER TABLE `budget_itemmaster` DISABLE KEYS */;
INSERT INTO `budget_itemmaster` VALUES ('LAB-CONSUME','Laboratory Consumables'),('LAB-EQ','Laboratory Equipment'),('MAINT-SPARE','Maintenance and Spares'),('MISC','Miscellaneous expenses'),('RND','Research and Development'),('SOFT','Software'),('T&T','Training and Travel');
/*!40000 ALTER TABLE `budget_itemmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_pdf`
--

DROP TABLE IF EXISTS `budget_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_pdf` (
  `dept` varchar(50) NOT NULL,
  `f_year` int NOT NULL,
  `pdf` blob NOT NULL,
  `description` varchar(500) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `pdf_id` varchar(255) NOT NULL,
  `pdf_name` varchar(255) NOT NULL,
  PRIMARY KEY (`dept`,`f_year`),
  UNIQUE KEY `pdf_id_UNIQUE` (`pdf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_pdf`
--

LOCK TABLES `budget_pdf` WRITE;
/*!40000 ALTER TABLE `budget_pdf` DISABLE KEYS */;
INSERT INTO `budget_pdf` VALUES ('AIML',2025,_binary 'pdfs/20240223080705_cc2768bb16.pdf','yashvi','','','e62b657459034440bab909ba5bff4469','Data Science_1523a5a01ab74c8381f2202ad735d6e7.pdf'),('DS',2023,_binary 'pdfs/20240223102938_c36a6dc7a8.pdf','ok','Accept','','572fd2d8d26c46e6b83b4c76ac01a8a4','cumulative_budget_report_of_year_2019-2020.pdf'),('DS',2025,_binary 'pdfs/20240223073433_c51f29ac46.pdf','test','Accept','','1523a5a01ab74c8381f2202ad735d6e7','cumulative_budget_report_of_year_2015-2016 (6).pdf'),('IT',2024,_binary 'pdfs/20240222194749_c6bbc7a73f.pdf','okys','','','ec256a65d03b4279aebeee224e088902','Final IA1-Question_Paper format.pdf'),('IT',2025,_binary 'pdfs/20240222193922_209568bc81.pdf','okys','Accept','','51318e556b464d1d8290fa4d89cfc15c','EHF University paper solution _May-June 2023_with cover page.pdf');
/*!40000 ALTER TABLE `budget_pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_user`
--

DROP TABLE IF EXISTS `budget_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;	
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget_user` (
  `u_email` varchar(50) NOT NULL,
  `u_pass` varchar(50) NOT NULL,
  `u_desig` varchar(30) DEFAULT NULL,
  `u_dep` varchar(50) NOT NULL,
  PRIMARY KEY (`u_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_user`
--

LOCK TABLES `budget_user` WRITE;
/*!40000 ALTER TABLE `budget_user` DISABLE KEYS */;
INSERT INTO `budget_user` VALUES ('karan@apsit.edu.in','Karan@123','HOD','DS'),('swapnil@apsit.edu.in','Swapnil@123','HOD','IT'),('urvi@apsit.edu.in','Urvi@123','Principal',''),('yash@apsit.edu.in','Yash@123','HOD','AIML');
/*!40000 ALTER TABLE `budget_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'budget','appuser'),(8,'budget','budget'),(13,'budget','deptmaster'),(9,'budget','financialyear'),(10,'budget','itemmaster'),(11,'budget','pdf'),(12,'budget','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-10-06 19:15:30.971791'),(2,'auth','0001_initial','2023-10-06 19:15:31.495442'),(3,'admin','0001_initial','2023-10-06 19:15:31.651141'),(4,'admin','0002_logentry_remove_auto_add','2023-10-06 19:15:31.662452'),(5,'admin','0003_logentry_add_action_flag_choices','2023-10-06 19:15:31.690634'),(6,'contenttypes','0002_remove_content_type_name','2023-10-06 19:15:31.780160'),(7,'auth','0002_alter_permission_name_max_length','2023-10-06 19:15:31.851810'),(8,'auth','0003_alter_user_email_max_length','2023-10-06 19:15:31.883675'),(9,'auth','0004_alter_user_username_opts','2023-10-06 19:15:31.892074'),(10,'auth','0005_alter_user_last_login_null','2023-10-06 19:15:31.946585'),(11,'auth','0006_require_contenttypes_0002','2023-10-06 19:15:31.950546'),(12,'auth','0007_alter_validators_add_error_messages','2023-10-06 19:15:31.961644'),(13,'auth','0008_alter_user_username_max_length','2023-10-06 19:15:32.018853'),(14,'auth','0009_alter_user_last_name_max_length','2023-10-06 19:15:32.077170'),(15,'auth','0010_alter_group_name_max_length','2023-10-06 19:15:32.116917'),(16,'auth','0011_update_proxy_permissions','2023-10-06 19:15:32.130707'),(17,'auth','0012_alter_user_first_name_max_length','2023-10-06 19:15:32.189898'),(18,'budget','0001_initial','2023-10-06 19:15:32.462407'),(19,'sessions','0001_initial','2023-10-06 19:15:32.499930');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 18:17:30
