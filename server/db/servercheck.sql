CREATE DATABASE  IF NOT EXISTS `pick_brains_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pick_brains_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: pick_brains_db
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ru_first_name` varchar(45) NOT NULL,
  `ru_second_name` varchar(45) NOT NULL,
  `eng_first_name` varchar(45) NOT NULL,
  `eng_second_name` varchar(45) NOT NULL,
  `linkedin` varchar(45) DEFAULT NULL,
  `skype` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `city` int(11) NOT NULL,
  `exp_year` datetime NOT NULL,
  `salary_wish` int(11) DEFAULT NULL,
  `english_lvl` int(11) NOT NULL,
  `contact_date` datetime DEFAULT NULL,
  `primary_skill` int(11) NOT NULL,
  `primary_skill_lvl` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_location_id_idx` (`city`),
  KEY `fk_english_lvl_id_idx` (`english_lvl`),
  KEY `fk_primary_skill_id_idx` (`primary_skill`),
  KEY `fk_condidate_con_status_idx` (`status`),
  CONSTRAINT `fk_condidate_con_status` FOREIGN KEY (`status`) REFERENCES `candidate_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_condidate_english_lvl` FOREIGN KEY (`english_lvl`) REFERENCES `english_lvl` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_condidate_location` FOREIGN KEY (`city`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_condidate_primary_skill` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,'Илья','Шавель','Ilya','Shavel','someidurl','thatOMGSKYPE','+375228',4,'2016-09-01 00:00:00',500,4,'2017-07-11 15:49:00',12,7,1),(2,'Илья','ЫЫЫы','Ilya','blblblb','surl','thatYPE','+375269558',4,'2016-09-01 00:00:00',500,4,'2017-07-11 15:53:38',1,1,1),(3,'Андрей','322','Andrew','322','someurl','KYPE','+375322',8,'2017-06-01 00:00:00',100,1,'2017-07-11 15:53:38',12,4,1),(4,'Что','Я','TYT','DELAU','POMOGITE','PLES','SPASEBA',1,'2076-09-01 00:00:00',0,5,'2017-07-11 15:53:38',5,9,1);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_changes`
--

DROP TABLE IF EXISTS `candidate_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_changes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `change_date` datetime NOT NULL,
  `ru_first_name` tinyint(4) DEFAULT NULL,
  `ru_second_name` tinyint(4) DEFAULT NULL,
  `eng_first_name` tinyint(4) DEFAULT NULL,
  `eng_second_name` tinyint(4) DEFAULT NULL,
  `email_id` tinyint(4) DEFAULT NULL,
  `linkedin` tinyint(4) DEFAULT NULL,
  `skype` tinyint(4) DEFAULT NULL,
  `phone` tinyint(4) DEFAULT NULL,
  `city` tinyint(4) DEFAULT NULL,
  `primary_skill` tinyint(4) DEFAULT NULL,
  `other_skills` tinyint(4) DEFAULT NULL,
  `exp_year` tinyint(4) DEFAULT NULL,
  `salary_wish` tinyint(4) DEFAULT NULL,
  `english_lvl` tinyint(4) DEFAULT NULL,
  `contact_date` tinyint(4) DEFAULT NULL,
  `hrm_name` tinyint(4) DEFAULT NULL,
  `candidate_status` tinyint(4) DEFAULT NULL,
  `vacansy` tinyint(4) DEFAULT NULL,
  `interview_date` tinyint(4) DEFAULT NULL,
  `hrm_feedback` tinyint(4) DEFAULT NULL,
  `ts_feedback` tinyint(4) DEFAULT NULL,
  `resume` tinyint(4) DEFAULT NULL,
  `notify_date` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidate_id_idx` (`candidate_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_candidate_change_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_change_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_changes`
--

LOCK TABLES `candidate_changes` WRITE;
/*!40000 ALTER TABLE `candidate_changes` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_changes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_emails`
--

DROP TABLE IF EXISTS `candidate_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidate_id_idx` (`candidate_id`),
  CONSTRAINT `fk_emails_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_emails`
--

LOCK TABLES `candidate_emails` WRITE;
/*!40000 ALTER TABLE `candidate_emails` DISABLE KEYS */;
INSERT INTO `candidate_emails` VALUES (1,1,'THATMAIL@MAIL.WOW'),(2,1,'HMMMM@dog.dot'),(3,2,'secmail@gmail.com'),(4,3,'dunno@g.m'),(5,4,'m@k.c');
/*!40000 ALTER TABLE `candidate_emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_secondary_skills`
--

DROP TABLE IF EXISTS `candidate_secondary_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_secondary_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) NOT NULL,
  `lvl` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_id_idx` (`candidate_id`),
  KEY `skill_is_idx` (`skill_id`),
  CONSTRAINT `fk_can_skills_candidate_` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_can_skils_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_secondary_skills`
--

LOCK TABLES `candidate_secondary_skills` WRITE;
/*!40000 ALTER TABLE `candidate_secondary_skills` DISABLE KEYS */;
INSERT INTO `candidate_secondary_skills` VALUES (1,1,5,5),(2,1,6,4),(3,1,3,15),(4,2,2,3),(5,2,3,9),(6,3,5,5),(7,3,6,4),(8,3,3,15),(9,4,5,5),(10,4,6,4);
/*!40000 ALTER TABLE `candidate_secondary_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_status`
--

DROP TABLE IF EXISTS `candidate_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_status` (
  `id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_status`
--

LOCK TABLES `candidate_status` WRITE;
/*!40000 ALTER TABLE `candidate_status` DISABLE KEYS */;
INSERT INTO `candidate_status` VALUES (1,'Pool'),(2,'In progress'),(3,'On hold'),(4,'Rejected'),(5,'Interview'),(6,'Job offer'),(7,'Job offer rejected'),(8,'Job offer accepted'),(9,'Hired');
/*!40000 ALTER TABLE `candidate_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `english_lvl`
--

DROP TABLE IF EXISTS `english_lvl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `english_lvl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lvl` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `english_lvl`
--

LOCK TABLES `english_lvl` WRITE;
/*!40000 ALTER TABLE `english_lvl` DISABLE KEYS */;
INSERT INTO `english_lvl` VALUES (1,'Elementary (A1)'),(2,'Pre-Intermediate (A2)'),(3,'Intermediate (B1)'),(4,'Upper-Intermediate (B2)'),(5,'Advanced (С1)');
/*!40000 ALTER TABLE `english_lvl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_history`
--

DROP TABLE IF EXISTS `general_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `general_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vacancy_change_id` int(11) DEFAULT NULL,
  `candidate_change_id` int(11) DEFAULT NULL,
  `hrm_feedback_id` int(11) DEFAULT NULL,
  `change_date` datetime NOT NULL,
  `ts_feedback_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vacancy_change_id_idx` (`vacancy_change_id`),
  KEY `fk_candidate_change_id_idx` (`candidate_change_id`),
  KEY `fk_ts_feedback_id_idx` (`ts_feedback_id`),
  KEY `fk_hrm_feedback_id_idx` (`hrm_feedback_id`),
  CONSTRAINT `fk_history_candidate_change` FOREIGN KEY (`candidate_change_id`) REFERENCES `candidate_changes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_hrm_feedback` FOREIGN KEY (`hrm_feedback_id`) REFERENCES `hrm_feedback` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_ts_feedback` FOREIGN KEY (`ts_feedback_id`) REFERENCES `ts_feedback` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_vacancy_change` FOREIGN KEY (`vacancy_change_id`) REFERENCES `vacancy_changes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_history`
--

LOCK TABLES `general_history` WRITE;
/*!40000 ALTER TABLE `general_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `general_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hrm_feedback`
--

DROP TABLE IF EXISTS `hrm_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hrm_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `change_reason` text NOT NULL,
  `ready_to_work` varchar(45) NOT NULL,
  `ready_to_travell` varchar(45) NOT NULL,
  `motivation` text NOT NULL,
  `english_lvl` int(11) NOT NULL,
  `salary_expectation` varchar(45) NOT NULL,
  `other` text,
  `vacancy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vacncy_id_idx` (`vacancy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_candidate_id_idx` (`candidate_id`),
  CONSTRAINT `fk_candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_id` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hrm_feedback`
--

LOCK TABLES `hrm_feedback` WRITE;
/*!40000 ALTER TABLE `hrm_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `hrm_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'USA, Walnut Creek'),(2,'USA, Boulder'),(3,'Belarus, Gomel'),(4,'Belarus, Minsk'),(5,'Belarus, Vitebsk'),(6,'Lithuania, Klaipėda'),(7,'Lithuania, Vilnius'),(8,'Poland, Bialystock'),(9,'Poland, Szczecin'),(10,'Poland, Warsaw'),(11,'Russia, Chelyabinsk'),(12,'Russia, Yekaterinburg'),(13,'Ukraine, Kharkov'),(14,'Ukraine, Vinnytsia');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_skills`
--

DROP TABLE IF EXISTS `other_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_skills`
--

LOCK TABLES `other_skills` WRITE;
/*!40000 ALTER TABLE `other_skills` DISABLE KEYS */;
INSERT INTO `other_skills` VALUES (1,'Programming basics'),(2,'Networking'),(3,'Database'),(4,'Desing Patterns'),(5,'Testing'),(6,'Design abd Architecture');
/*!40000 ALTER TABLE `other_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_skills_has_candidate`
--

DROP TABLE IF EXISTS `other_skills_has_candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_skills_has_candidate` (
  `other_skills_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  PRIMARY KEY (`other_skills_id`,`candidate_id`),
  KEY `fk_other_skills_has_candidate_candidate1_idx` (`candidate_id`),
  KEY `fk_other_skills_has_candidate_other_skills1_idx` (`other_skills_id`),
  CONSTRAINT `fk_other_skills_has_candidate_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_other_skills_has_candidate_other_skills1` FOREIGN KEY (`other_skills_id`) REFERENCES `other_skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_skills_has_candidate`
--

LOCK TABLES `other_skills_has_candidate` WRITE;
/*!40000 ALTER TABLE `other_skills_has_candidate` DISABLE KEYS */;
INSERT INTO `other_skills_has_candidate` VALUES (2,1),(3,1);
/*!40000 ALTER TABLE `other_skills_has_candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_skills_has_vacancy`
--

DROP TABLE IF EXISTS `other_skills_has_vacancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_skills_has_vacancy` (
  `other_skills_id` int(11) NOT NULL,
  `vacancy_id` int(11) NOT NULL,
  PRIMARY KEY (`other_skills_id`,`vacancy_id`),
  KEY `fk_other_skills_has_vacansy_vacansy1_idx` (`vacancy_id`),
  KEY `fk_other_skills_has_vacansy_other_skills1_idx` (`other_skills_id`),
  CONSTRAINT `fk_other_skills_has_vacansy_other_skills1` FOREIGN KEY (`other_skills_id`) REFERENCES `other_skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_other_skills_has_vacansy_vacansy1` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_skills_has_vacancy`
--

LOCK TABLES `other_skills_has_vacancy` WRITE;
/*!40000 ALTER TABLE `other_skills_has_vacancy` DISABLE KEYS */;
INSERT INTO `other_skills_has_vacancy` VALUES (2,1),(3,1),(4,3);
/*!40000 ALTER TABLE `other_skills_has_vacancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'.NET'),(2,'Android'),(3,'BI'),(4,'C++'),(5,'DBE'),(6,'Data Science'),(7,'DWH'),(8,'ETL'),(9,'HTML/CSS'),(10,'IOS'),(11,'Java'),(12,'JavaScript'),(13,'PHP'),(14,'Python'),(15,'Ruby on Rails'),(16,'QA'),(17,'BA'),(18,'DevOps'),(19,'SysAdmin'),(20,'HRM'),(21,'Angular'),(22,'ReactJS'),(23,'NodeJS'),(24,'MongoDB'),(25,'Hadoop'),(26,'PosgreSQL'),(27,'Linux'),(28,'Spring'),(29,'Django'),(30,'Bootstrap'),(31,'Scrum');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ts_feedback`
--

DROP TABLE IF EXISTS `ts_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ts_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pirmary_skill_id` int(11) NOT NULL,
  `primary_skill_lvl` int(11) NOT NULL,
  `candidat_id` int(11) NOT NULL,
  `vacancy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidate_id_idx` (`candidat_id`),
  KEY `fk_primary_skill_id_idx` (`pirmary_skill_id`),
  KEY `fk_vacancy_id_idx` (`vacancy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_ts_feedback_candidate` FOREIGN KEY (`candidat_id`) REFERENCES `candidate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_feedback_primary_skill` FOREIGN KEY (`pirmary_skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_feedback_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_feedback_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ts_feedback`
--

LOCK TABLES `ts_feedback` WRITE;
/*!40000 ALTER TABLE `ts_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `ts_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ts_secondary_skills`
--

DROP TABLE IF EXISTS `ts_secondary_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ts_secondary_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ts_feedback_id` int(11) NOT NULL,
  `skill_lvl` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_skill_id_idx` (`skill_id`),
  KEY `fk_ts_feedback_id_idx` (`ts_feedback_id`),
  CONSTRAINT `fk_ts_skill_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_skill_ts_feedback` FOREIGN KEY (`ts_feedback_id`) REFERENCES `ts_feedback` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ts_secondary_skills`
--

LOCK TABLES `ts_secondary_skills` WRITE;
/*!40000 ALTER TABLE `ts_secondary_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `ts_secondary_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin'),(2,'Ilya','1488','HRM'),(3,'Kostya','228','HRM'),(4,'Andrey','1','TECH');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy`
--

DROP TABLE IF EXISTS `vacancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `request_date` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `primary_skill` int(11) NOT NULL,
  `primary_skill_lvl` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_location_id_idx` (`city`),
  KEY `fk_primaryskill_id_idx` (`primary_skill`),
  KEY `fk_vacancy_vac_status_idx` (`status`),
  CONSTRAINT `fk_vacancy_location` FOREIGN KEY (`city`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_primary_skill` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_vac_status` FOREIGN KEY (`status`) REFERENCES `vacancy_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy`
--

LOCK TABLES `vacancy` WRITE;
/*!40000 ALTER TABLE `vacancy` DISABLE KEYS */;
INSERT INTO `vacancy` VALUES (1,'WOWSUCHVAC','2017-07-11 16:20:35','2018-09-03 00:00:00',1,3,4,1),(2,'Foooo','2017-07-11 16:20:35','2018-02-03 00:00:00',3,9,5,1),(3,'hmmmmmmmmmm','2017-07-11 16:20:35','2045-09-03 00:00:00',5,9,2,1),(4,'LOL&KEK','2017-07-11 16:20:35','2099-12-31 00:00:00',6,6,6,1);
/*!40000 ALTER TABLE `vacancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy_changes`
--

DROP TABLE IF EXISTS `vacancy_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy_changes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vacansy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `change_date` datetime NOT NULL,
  `name` tinyint(4) DEFAULT NULL,
  `request_date` tinyint(4) DEFAULT NULL,
  `start_date` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `primary_skill` tinyint(4) DEFAULT NULL,
  `other_skills` tinyint(4) DEFAULT NULL,
  `city` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vacansy_id_idx` (`vacansy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_vacancy_change_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_change_vacancy` FOREIGN KEY (`vacansy_id`) REFERENCES `vacancy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_changes`
--

LOCK TABLES `vacancy_changes` WRITE;
/*!40000 ALTER TABLE `vacancy_changes` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacancy_changes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy_secondary_skills`
--

DROP TABLE IF EXISTS `vacancy_secondary_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy_secondary_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vacancy_id` int(11) NOT NULL,
  `skill_id` int(11) DEFAULT NULL,
  `lvl` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vacancy_id_idx` (`vacancy_id`),
  KEY `skill_id_idx` (`skill_id`),
  CONSTRAINT `fk_vac_skills_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vac_skills_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_secondary_skills`
--

LOCK TABLES `vacancy_secondary_skills` WRITE;
/*!40000 ALTER TABLE `vacancy_secondary_skills` DISABLE KEYS */;
INSERT INTO `vacancy_secondary_skills` VALUES (1,1,13,2),(2,1,9,6),(3,3,1,2),(4,4,20,1);
/*!40000 ALTER TABLE `vacancy_secondary_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacancy_status`
--

DROP TABLE IF EXISTS `vacancy_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacancy_status` (
  `id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_status`
--

LOCK TABLES `vacancy_status` WRITE;
/*!40000 ALTER TABLE `vacancy_status` DISABLE KEYS */;
INSERT INTO `vacancy_status` VALUES (1,'On hold'),(2,'Active'),(3,'CV provided'),(4,'Waiting for interwiew with customer'),(5,'Interview with customer'),(6,'Candidate declined'),(7,'Candidate approved'),(8,'Closed'),(9,'Cancelled');
/*!40000 ALTER TABLE `vacancy_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-11 16:28:33
