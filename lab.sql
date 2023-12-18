-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: lab
-- ------------------------------------------------------
-- Server version	8.0.30

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add app user',7,'add_appuser'),(26,'Can change app user',7,'change_appuser'),(27,'Can delete app user',7,'delete_appuser'),(28,'Can view app user',7,'view_appuser');
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
  CONSTRAINT `dept` FOREIGN KEY (`dept`) REFERENCES `dept_master` (`dept`),
  CONSTRAINT `f_year` FOREIGN KEY (`f_year`) REFERENCES `budget_financialyear` (`F_year`),
  CONSTRAINT `item` FOREIGN KEY (`item`) REFERENCES `budget_itemmaster` (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_budget`
--

LOCK TABLES `budget_budget` WRITE;
/*!40000 ALTER TABLE `budget_budget` DISABLE KEYS */;
INSERT INTO `budget_budget` VALUES ('IT',2019,'LAB-CONSUME',1363,3323),('IT',2019,'LAB-EQ',2324,5344),('IT',2019,'MAINT-SPARE',43434,414),('IT',2019,'MISC',3434,1424),('IT',2019,'RND',4434,4435350),('IT',2019,'SOFT',43435,354),('IT',2019,'T&T',55,34325),('IT',2020,'LAB-CONSUME',802,575),('IT',2020,'LAB-EQ',470,625),('IT',2020,'MAINT-SPARE',716,707),('IT',2020,'MISC',386,812),('IT',2020,'RND',899,60),('IT',2020,'SOFT',606,849),('IT',2020,'T&T',428,591),('IT',2021,'LAB-CONSUME',674,598),('IT',2021,'LAB-EQ',968,44),('IT',2021,'MAINT-SPARE',319,462),('IT',2021,'MISC',354,384),('IT',2021,'RND',857,135),('IT',2021,'SOFT',105,119),('IT',2021,'T&T',280,46),('IT',2022,'LAB-CONSUME',391,815),('IT',2022,'LAB-EQ',905,78),('IT',2022,'MAINT-SPARE',677,153),('IT',2022,'MISC',734,210),('IT',2022,'RND',851,624),('IT',2022,'SOFT',566,960),('IT',2022,'T&T',103,636),('IT',2023,'LAB-CONSUME',871,449),('IT',2023,'LAB-EQ',632,813),('IT',2023,'MAINT-SPARE',171,416),('IT',2023,'MISC',567,588),('IT',2023,'RND',238,427),('IT',2023,'SOFT',422,828),('IT',2023,'T&T',874,889),('IT',2024,'LAB-CONSUME',825,455),('IT',2024,'LAB-EQ',801,641),('IT',2024,'MAINT-SPARE',803,92),('IT',2024,'MISC',50,977),('IT',2024,'RND',735,745),('IT',2024,'SOFT',521,372),('IT',2024,'T&T',295,358);
/*!40000 ALTER TABLE `budget_budget` ENABLE KEYS */;
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
INSERT INTO `budget_itemmaster` VALUES ('LAB-CONSUME','Laboratory Consumables'),('LAB-EQ','Laboratory Equipments'),('MAINT-SPARE','Maintenance and spares'),('MISC','Miscellaneous'),('RND','Research and Development'),('SOFT','Software'),('T&T','Training and travel');
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
  `pdf` longblob NOT NULL,
  `description` varchar(300) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`dept`,`f_year`),
  UNIQUE KEY `pdf_dept_UNIQUE` (`dept`),
  UNIQUE KEY `f_year_UNIQUE` (`f_year`),
  CONSTRAINT `fk_dept` FOREIGN KEY (`dept`) REFERENCES `dept_master` (`dept`),
  CONSTRAINT `fk_f_year` FOREIGN KEY (`f_year`) REFERENCES `budget_financialyear` (`F_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_pdf`
--

LOCK TABLES `budget_pdf` WRITE;
/*!40000 ALTER TABLE `budget_pdf` DISABLE KEYS */;
INSERT INTO `budget_pdf` VALUES ('IT',2023,_binary 'cumulative_budget_report_of_year_2022-2023_2.pdf','idhfe','pending','null');
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
  `u_desig` varchar(30) NOT NULL,
  `u_dep` varchar(50) NOT NULL,
  PRIMARY KEY (`u_email`),
  UNIQUE KEY `u_email_UNIQUE` (`u_email`),
  KEY `u_dep_idx` (`u_dep`),
  CONSTRAINT `u_dep` FOREIGN KEY (`u_dep`) REFERENCES `dept_master` (`dept`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_user`
--

LOCK TABLES `budget_user` WRITE;
/*!40000 ALTER TABLE `budget_user` DISABLE KEYS */;
INSERT INTO `budget_user` VALUES ('3123236@gmail.com','121324','Principal','DS'),('harshparikh1993@gmail.com','123456','HOD','CS'),('karanjain217@apsit.edu.in','123456','HOD','IT'),('rajkumarcj@gmail.com','Rajkumar','Principal','AIML'),('swapnil@gmail.com','654321','HOD','DS'),('yashjain248@apsit.edu.in','Yash01!','HOD','CS');
/*!40000 ALTER TABLE `budget_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept_master`
--

DROP TABLE IF EXISTS `dept_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dept_master` (
  `dept` varchar(50) NOT NULL,
  `desc` varchar(60) NOT NULL,
  PRIMARY KEY (`dept`),
  UNIQUE KEY `dept_UNIQUE` (`dept`),
  UNIQUE KEY `desc_UNIQUE` (`desc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept_master`
--

LOCK TABLES `dept_master` WRITE;
/*!40000 ALTER TABLE `dept_master` DISABLE KEYS */;
INSERT INTO `dept_master` VALUES ('AIML','Artificial Intelligence and Machine Learning'),('CIVIL','Civil'),('CS','Computer Science'),('DS','Data Science'),('IT','Information Technology'),('MECH','Mechanical');
/*!40000 ALTER TABLE `dept_master` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'budget','appuser'),(5,'contenttypes','contenttype'),(6,'sessions','session');
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

-- Dump completed on 2023-12-18 20:11:56
