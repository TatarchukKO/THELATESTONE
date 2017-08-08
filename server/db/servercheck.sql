CREATE DATABASE  IF NOT EXISTS `pickbrainsdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pickbrainsdb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: mysql5.gear.host    Database: pickbrainsdb
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
  `ru_first_name` varchar(45) DEFAULT NULL,
  `ru_second_name` varchar(45) DEFAULT NULL,
  `eng_first_name` varchar(45) NOT NULL,
  `eng_second_name` varchar(45) NOT NULL,
  `linkedin` varchar(45) DEFAULT NULL,
  `skype` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `city` int(11) NOT NULL,
  `exp_year` datetime NOT NULL,
  `salary_wish` int(11) DEFAULT NULL,
  `english_lvl` int(11) NOT NULL,
  `contact_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `primary_skill` int(11) NOT NULL,
  `primary_skill_lvl` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_location_id_idx` (`city`),
  KEY `fk_english_lvl_id_idx` (`english_lvl`),
  KEY `fk_primary_skill_id_idx` (`primary_skill`),
  KEY `fk_condidate_con_status_idx` (`status`),
  KEY `fk_skype_idx` (`skype`),
  FULLTEXT KEY `ft_index` (`eng_first_name`,`eng_second_name`),
  CONSTRAINT `fk_condidate_con_status` FOREIGN KEY (`status`) REFERENCES `candidate_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_condidate_english_lvl` FOREIGN KEY (`english_lvl`) REFERENCES `english_lvl` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_condidate_location` FOREIGN KEY (`city`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_condidate_primary_skill` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,NULL,NULL,'Konstantsin','Tatarchuk','kostya_777','zver_666','37529413218',4,'2016-02-17 00:00:00',NULL,3,'2017-07-28 04:55:49',4,4,9),(3,'Илья','Шавель','Ylia','Shavel','shavelTheSlayer','shavelTheGreatest','+37529142897',5,'2017-07-09 00:00:00',NULL,1,'2017-07-28 05:03:09',1,3,1),(4,'Максим','Адериха','Maksym','Aderykha','link_534','sobaken_534','372797257',10,'2011-02-15 00:00:00',NULL,4,'2017-07-28 05:24:47',1,4,1),(5,NULL,NULL,'Ivan','Pupkin','sdfg','loshik','3891596198',11,'2017-07-02 00:00:00',NULL,5,'2017-07-28 05:41:48',4,3,1),(6,NULL,NULL,'Maria','Gender','mas','masha_42','23753787',13,'2017-07-07 00:00:00',NULL,5,'2017-07-28 05:43:02',16,3,1),(7,NULL,NULL,'someone','isbehind','someidurl','61132165ddsfd','+375222554928',1,'2017-07-07 03:00:00',NULL,2,'2017-07-28 08:13:44',1,2,1),(8,NULL,NULL,'Vasya','Sobakov','linkedin string','vasyok_777','+37529142897',13,'2017-07-28 00:00:00',NULL,5,'2017-07-28 08:23:36',3,3,1),(9,NULL,NULL,'Misha ','Chirich','linked/misha','misha_666','3755194187',4,'2015-02-11 00:00:00',NULL,5,'2017-07-28 08:51:23',4,1,1),(10,NULL,NULL,'Andrew','Belous','https://www.linkedin.com/',NULL,'+375298583539',4,'2017-09-27 12:51:50',500,2,'2017-07-29 10:25:50',4,10,1),(11,NULL,NULL,'Artem','Belous','https://www.linkedin.com/',NULL,'+375298883355',4,'2017-09-27 12:51:50',500,2,'2017-07-29 10:26:34',4,4,1),(12,NULL,NULL,'Kevin','Wise','https://www.linkedin.com/',NULL,'+385298883355',4,'2012-09-12 12:51:50',500,2,'2017-07-29 10:27:21',4,4,1),(13,NULL,NULL,'Maxim','Aderiha','max_linkedIn','max986','+375248441216',4,'2015-01-01 00:00:00',NULL,2,'2017-07-29 10:31:11',4,5,1),(14,NULL,NULL,'Helen','Lisok','lalalla_999','helen_97','+37523154812',4,'2017-07-25 00:00:00',NULL,5,'2017-07-30 11:48:36',1,5,1),(15,NULL,NULL,'Test2','Test2','test','test','+375331111111',2,'2017-05-02 00:00:00',NULL,1,'2017-07-31 07:17:41',4,3,3),(16,NULL,NULL,'iosjcnsoia','aosichnao','lkzxcna','salkcn','54566',1,'2017-07-04 00:00:00',NULL,2,'2017-07-31 07:19:33',1,5,1),(17,NULL,NULL,'Kristy','kostukevich','link_02','dkdjk','+37529656523',4,'2017-07-05 00:00:00',NULL,4,'2017-07-31 08:15:31',2,3,1),(18,NULL,NULL,'Petya','Fedorov','petya','petyaTest','375296518515',5,'2017-01-02 00:00:00',NULL,3,'2017-08-07 03:25:44',4,3,1);
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
  `change_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ru_first_name` tinyint(4) DEFAULT NULL,
  `ru_second_name` tinyint(4) DEFAULT NULL,
  `eng_first_name` tinyint(4) DEFAULT NULL,
  `eng_second_name` tinyint(4) DEFAULT NULL,
  `emails` tinyint(4) DEFAULT NULL,
  `linkedin` tinyint(4) DEFAULT NULL,
  `skype` tinyint(4) DEFAULT NULL,
  `phone` tinyint(4) DEFAULT NULL,
  `city` tinyint(4) DEFAULT NULL,
  `primary_skill` tinyint(4) DEFAULT NULL,
  `other_skills` tinyint(4) DEFAULT NULL,
  `exp_year` tinyint(4) DEFAULT NULL,
  `salary_wish` tinyint(4) DEFAULT NULL,
  `english_lvl` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `sec_skills` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidate_id_idx` (`candidate_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_candidate_change_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidate_change_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_changes`
--

LOCK TABLES `candidate_changes` WRITE;
/*!40000 ALTER TABLE `candidate_changes` DISABLE KEYS */;
INSERT INTO `candidate_changes` VALUES (1,10,1,'2017-08-03 08:20:59',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(2,10,1,'2017-08-03 08:21:06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(3,10,1,'2017-08-03 08:21:22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(4,10,1,'2017-08-03 08:29:12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,15,1,'2017-08-06 10:47:31',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,15,1,'2017-08-06 11:24:05',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,15,1,'2017-08-06 11:24:15',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,15,1,'2017-08-06 11:24:38',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,15,1,'2017-08-06 11:24:50',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,15,1,'2017-08-06 11:30:26',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,15,1,'2017-08-06 11:35:26',NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,15,1,'2017-08-06 11:51:39',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL),(17,15,1,'2017-08-06 12:02:53',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL),(18,15,1,'2017-08-06 12:04:15',NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,15,1,'2017-08-06 12:42:04',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,15,1,'2017-08-06 13:04:35',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,1),(21,15,1,'2017-08-06 13:05:33',NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,1),(22,15,1,'2017-08-06 13:16:39',NULL,NULL,1,1,NULL,1,1,1,1,1,1,1,NULL,1,1,1),(23,15,1,'2017-08-06 13:22:37',NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,1,1,NULL,NULL,NULL,1,1);
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
  CONSTRAINT `fk_emails_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_emails`
--

LOCK TABLES `candidate_emails` WRITE;
/*!40000 ALTER TABLE `candidate_emails` DISABLE KEYS */;
INSERT INTO `candidate_emails` VALUES (98,1,'titivuk@gmail.com'),(100,3,'shavel.ilya@gmail.com'),(101,4,'max@gmail.com'),(102,5,'git@gmial.com'),(103,6,'masha@yandex.com'),(104,7,'secTHATMAILmail@gmail.com'),(105,8,'sobaca@gmail.com'),(106,9,'chira_sobaka@mail.ru'),(107,10,'andy.belous77@gmail.com'),(108,11,'andy.belous77@gmail.com'),(109,12,'kevin.wise77@gmail.com'),(110,13,'maxaderiha@gmail.com'),(111,14,'kot@gmail.com'),(112,15,'vasya@gmail.com'),(113,16,'adress@gmail.com'),(114,17,'dkjd@yandex.by'),(115,18,'petya@gmail.com');
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
  CONSTRAINT `fk_can_skills_candidate_` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_can_skils_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_secondary_skills`
--

LOCK TABLES `candidate_secondary_skills` WRITE;
/*!40000 ALTER TABLE `candidate_secondary_skills` DISABLE KEYS */;
INSERT INTO `candidate_secondary_skills` VALUES (220,1,4,22),(221,1,3,13),(224,3,3,4),(225,4,3,10),(226,4,1,15),(227,5,3,15),(228,5,4,19),(229,6,2,8),(230,6,4,21),(231,7,2,3),(232,7,3,15),(233,8,4,7),(234,9,3,6),(235,9,4,10),(236,10,7,9),(237,10,9,4),(238,11,8,9),(239,11,9,4),(240,12,8,9),(241,13,3,2),(242,13,2,8),(243,14,3,4),(244,14,2,2),(245,14,9,3),(248,16,1,1),(249,17,1,1),(254,15,4,2),(255,15,3,3),(256,18,3,13),(257,18,5,12);
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
INSERT INTO `candidate_status` VALUES (1,'Pool'),(2,'In progress'),(3,'On hold'),(4,'Rejected'),(5,'Interview'),(6,'Job offer'),(7,'Job offer rejected'),(8,'Job offer accepted'),(9,'Hired'),(10,'Attention');
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
  `ts_feedback_id` int(11) DEFAULT NULL,
  `interview_id` int(11) DEFAULT NULL,
  `change_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_vacancy_change_id_idx` (`vacancy_change_id`),
  KEY `fk_candidate_change_id_idx` (`candidate_change_id`),
  KEY `fk_ts_feedback_id_idx` (`ts_feedback_id`),
  KEY `fk_hrm_feedback_id_idx` (`hrm_feedback_id`),
  KEY `fk_history_interview_idx` (`interview_id`),
  CONSTRAINT `fk_history_candidate_change` FOREIGN KEY (`candidate_change_id`) REFERENCES `candidate_changes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_hrm_feedback` FOREIGN KEY (`hrm_feedback_id`) REFERENCES `hrm_feedback` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_interview` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_ts_feedback` FOREIGN KEY (`ts_feedback_id`) REFERENCES `ts_feedback` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_history_vacancy_change` FOREIGN KEY (`vacancy_change_id`) REFERENCES `vacancy_changes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_history`
--

LOCK TABLES `general_history` WRITE;
/*!40000 ALTER TABLE `general_history` DISABLE KEYS */;
INSERT INTO `general_history` VALUES (152,6,NULL,NULL,NULL,NULL,'2017-06-29 19:47:47'),(153,13,NULL,NULL,NULL,NULL,'2017-07-31 04:00:35'),(154,14,NULL,NULL,NULL,NULL,'2017-07-31 04:01:31'),(155,15,NULL,NULL,NULL,NULL,'2017-07-31 04:08:34'),(156,16,NULL,NULL,NULL,NULL,'2017-07-31 04:16:57'),(157,17,NULL,NULL,NULL,NULL,'2017-07-31 04:27:46'),(158,18,NULL,NULL,NULL,NULL,'2017-07-31 04:34:31'),(159,NULL,NULL,NULL,NULL,2,'2017-07-31 11:59:34'),(160,NULL,NULL,NULL,NULL,3,'2017-07-31 12:04:01'),(161,NULL,NULL,NULL,NULL,4,'2017-07-31 12:04:44'),(162,NULL,NULL,NULL,2,NULL,'2017-07-31 12:07:06'),(163,NULL,NULL,3,NULL,NULL,'2017-07-31 12:07:25'),(164,NULL,NULL,NULL,NULL,5,'2017-08-01 03:59:23'),(165,NULL,NULL,NULL,NULL,6,'2017-08-01 04:00:08'),(166,NULL,NULL,NULL,NULL,7,'2017-08-01 04:00:12'),(167,NULL,NULL,NULL,NULL,8,'2017-08-01 11:10:34'),(168,NULL,NULL,NULL,NULL,9,'2017-08-01 11:29:38'),(169,NULL,NULL,NULL,NULL,10,'2017-08-01 11:55:03'),(170,NULL,NULL,NULL,NULL,11,'2017-08-01 12:17:47'),(171,NULL,NULL,NULL,NULL,12,'2017-08-01 12:25:28'),(172,NULL,NULL,NULL,NULL,13,'2017-08-01 12:28:15'),(173,NULL,NULL,NULL,NULL,14,'2017-08-01 17:00:48'),(174,NULL,NULL,NULL,NULL,15,'2017-08-01 17:01:52'),(175,NULL,NULL,NULL,NULL,16,'2017-08-01 17:02:39'),(176,NULL,NULL,NULL,NULL,17,'2017-08-02 03:14:42'),(177,NULL,NULL,NULL,NULL,18,'2017-08-02 03:31:25'),(178,NULL,NULL,NULL,NULL,19,'2017-08-02 03:38:13'),(179,NULL,NULL,NULL,NULL,20,'2017-08-02 03:40:16'),(180,NULL,NULL,NULL,NULL,21,'2017-08-02 03:47:22'),(181,NULL,NULL,NULL,NULL,22,'2017-08-02 03:53:33'),(182,NULL,NULL,NULL,NULL,23,'2017-08-02 03:54:51'),(183,NULL,NULL,NULL,NULL,24,'2017-08-02 03:57:36'),(184,NULL,NULL,NULL,NULL,25,'2017-08-02 04:01:13'),(185,NULL,NULL,NULL,NULL,26,'2017-08-02 04:36:36'),(186,NULL,NULL,NULL,NULL,27,'2017-08-02 05:00:27'),(187,NULL,NULL,NULL,NULL,28,'2017-08-02 06:40:43'),(188,NULL,NULL,NULL,NULL,29,'2017-08-02 06:41:44'),(189,NULL,NULL,NULL,NULL,30,'2017-08-02 06:42:53'),(190,NULL,NULL,NULL,NULL,31,'2017-08-02 07:53:17'),(191,NULL,NULL,NULL,NULL,32,'2017-08-02 08:00:37'),(192,NULL,NULL,NULL,NULL,33,'2017-08-02 09:50:27'),(193,NULL,NULL,NULL,NULL,34,'2017-08-02 09:52:27'),(194,NULL,NULL,NULL,NULL,35,'2017-08-02 10:04:23'),(195,NULL,NULL,NULL,NULL,36,'2017-08-02 10:51:31'),(196,NULL,NULL,NULL,NULL,37,'2017-08-02 10:52:55'),(197,NULL,NULL,NULL,NULL,38,'2017-08-02 12:22:46'),(198,NULL,NULL,NULL,NULL,39,'2017-08-03 00:48:34'),(199,NULL,NULL,NULL,NULL,40,'2017-08-03 00:49:52'),(200,NULL,NULL,NULL,NULL,41,'2017-08-03 00:51:34'),(201,NULL,NULL,NULL,NULL,42,'2017-08-03 00:54:19'),(202,NULL,NULL,NULL,NULL,43,'2017-08-03 00:58:38'),(203,NULL,NULL,NULL,NULL,44,'2017-08-03 01:08:04'),(204,NULL,NULL,NULL,NULL,45,'2017-08-03 01:11:35'),(205,NULL,NULL,6,NULL,NULL,'2017-08-03 05:19:23'),(206,NULL,NULL,NULL,3,NULL,'2017-08-03 05:23:14'),(207,NULL,1,NULL,NULL,NULL,'2017-08-03 08:20:59'),(208,NULL,2,NULL,NULL,NULL,'2017-08-03 08:21:06'),(209,NULL,3,NULL,NULL,NULL,'2017-08-03 08:21:23'),(210,NULL,4,NULL,NULL,NULL,'2017-08-03 08:29:13'),(211,NULL,NULL,NULL,NULL,46,'2017-08-03 10:20:21'),(212,NULL,NULL,NULL,NULL,47,'2017-08-03 11:41:45'),(213,NULL,NULL,7,NULL,NULL,'2017-08-03 13:59:13'),(214,NULL,NULL,8,NULL,NULL,'2017-08-03 13:59:42'),(215,NULL,NULL,NULL,4,NULL,'2017-08-03 14:01:11'),(216,NULL,NULL,NULL,5,NULL,'2017-08-03 14:01:47'),(217,NULL,NULL,NULL,NULL,48,'2017-08-04 02:06:43'),(218,NULL,NULL,NULL,NULL,49,'2017-08-04 02:30:40'),(220,NULL,NULL,10,NULL,NULL,'2017-08-04 03:38:53'),(221,NULL,NULL,11,NULL,NULL,'2017-08-04 04:04:25'),(222,NULL,NULL,12,NULL,NULL,'2017-08-04 04:04:33'),(223,NULL,NULL,13,NULL,NULL,'2017-08-04 04:04:40'),(224,NULL,NULL,14,NULL,NULL,'2017-08-04 04:07:27'),(225,NULL,NULL,15,NULL,NULL,'2017-08-04 05:12:33'),(226,NULL,NULL,16,NULL,NULL,'2017-08-04 05:50:11'),(227,NULL,NULL,17,NULL,NULL,'2017-08-04 05:50:42'),(228,NULL,NULL,18,NULL,NULL,'2017-08-04 05:51:34'),(229,NULL,NULL,19,NULL,NULL,'2017-08-04 07:03:36'),(230,NULL,NULL,NULL,NULL,50,'2017-08-04 10:25:31'),(231,NULL,NULL,20,NULL,NULL,'2017-08-04 10:35:34'),(232,NULL,NULL,21,NULL,NULL,'2017-08-04 10:59:34'),(233,NULL,NULL,NULL,NULL,51,'2017-08-04 12:55:18'),(234,NULL,NULL,22,NULL,NULL,'2017-08-04 12:57:19'),(235,NULL,NULL,23,NULL,NULL,'2017-08-04 13:08:22'),(236,NULL,NULL,24,NULL,NULL,'2017-08-04 13:10:27'),(237,NULL,NULL,25,NULL,NULL,'2017-08-04 14:19:36'),(238,NULL,NULL,NULL,NULL,52,'2017-08-04 15:06:27'),(239,NULL,NULL,26,NULL,NULL,'2017-08-04 15:08:01'),(240,NULL,NULL,NULL,NULL,53,'2017-08-05 14:19:37'),(241,NULL,NULL,NULL,NULL,54,'2017-08-05 14:33:34'),(242,NULL,NULL,27,NULL,NULL,'2017-08-05 14:35:01'),(243,NULL,NULL,NULL,NULL,55,'2017-08-05 14:50:23'),(244,NULL,NULL,28,NULL,NULL,'2017-08-05 14:51:24'),(245,NULL,NULL,29,NULL,NULL,'2017-08-06 07:39:41'),(250,NULL,9,NULL,NULL,NULL,'2017-08-06 10:47:31'),(251,NULL,10,NULL,NULL,NULL,'2017-08-06 11:24:06'),(252,NULL,11,NULL,NULL,NULL,'2017-08-06 11:24:20'),(253,NULL,12,NULL,NULL,NULL,'2017-08-06 11:25:03'),(254,NULL,13,NULL,NULL,NULL,'2017-08-06 11:25:15'),(255,NULL,14,NULL,NULL,NULL,'2017-08-06 11:30:27'),(256,NULL,15,NULL,NULL,NULL,'2017-08-06 11:35:30'),(257,NULL,16,NULL,NULL,NULL,'2017-08-06 11:51:40'),(258,NULL,17,NULL,NULL,NULL,'2017-08-06 12:02:53'),(259,NULL,18,NULL,NULL,NULL,'2017-08-06 12:04:17'),(260,NULL,19,NULL,NULL,NULL,'2017-08-06 12:42:14'),(261,NULL,20,NULL,NULL,NULL,'2017-08-06 13:04:40'),(262,NULL,21,NULL,NULL,NULL,'2017-08-06 13:05:39'),(263,NULL,22,NULL,NULL,NULL,'2017-08-06 13:16:40'),(264,NULL,23,NULL,NULL,NULL,'2017-08-06 13:22:38'),(265,NULL,NULL,NULL,NULL,56,'2017-08-06 15:45:37'),(266,NULL,NULL,NULL,6,NULL,'2017-08-06 16:15:03'),(267,NULL,NULL,NULL,7,NULL,'2017-08-06 18:05:51'),(268,NULL,NULL,NULL,NULL,57,'2017-08-06 18:21:19'),(269,NULL,NULL,NULL,8,NULL,'2017-08-06 18:23:23'),(270,NULL,NULL,NULL,NULL,58,'2017-08-07 01:52:02'),(271,NULL,NULL,NULL,NULL,59,'2017-08-07 02:16:52'),(272,NULL,NULL,NULL,NULL,60,'2017-08-07 02:38:31'),(273,NULL,NULL,NULL,NULL,61,'2017-08-07 02:51:14'),(274,NULL,NULL,NULL,NULL,62,'2017-08-07 02:55:44'),(275,NULL,NULL,NULL,NULL,63,'2017-08-07 02:58:46'),(276,NULL,NULL,NULL,NULL,64,'2017-08-07 03:03:05'),(277,NULL,NULL,NULL,NULL,65,'2017-08-07 03:04:19'),(278,NULL,NULL,NULL,NULL,66,'2017-08-07 03:11:46'),(279,NULL,NULL,NULL,NULL,67,'2017-08-07 03:15:17'),(280,NULL,NULL,NULL,NULL,68,'2017-08-07 03:16:39'),(281,NULL,NULL,NULL,NULL,69,'2017-08-07 03:21:21'),(282,NULL,NULL,NULL,NULL,70,'2017-08-07 03:23:43'),(283,NULL,NULL,NULL,NULL,71,'2017-08-07 03:25:24'),(284,NULL,NULL,NULL,NULL,72,'2017-08-07 03:39:01'),(285,19,NULL,NULL,NULL,NULL,'2017-08-07 08:30:27'),(286,20,NULL,NULL,NULL,NULL,'2017-08-07 08:31:27'),(287,21,NULL,NULL,NULL,NULL,'2017-08-07 08:31:43'),(288,22,NULL,NULL,NULL,NULL,'2017-08-07 08:33:19'),(289,23,NULL,NULL,NULL,NULL,'2017-08-07 08:43:49'),(290,24,NULL,NULL,NULL,NULL,'2017-08-07 08:45:12'),(291,25,NULL,NULL,NULL,NULL,'2017-08-07 08:48:05'),(292,26,NULL,NULL,NULL,NULL,'2017-08-07 08:48:05'),(294,28,NULL,NULL,NULL,NULL,'2017-08-07 08:54:20');
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
  `ready_to_travel` varchar(45) NOT NULL,
  `motivation` text NOT NULL,
  `english_lvl` int(11) NOT NULL,
  `salary_wish` int(11) NOT NULL,
  `other` text,
  `interview_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hrm_feedback`
--

LOCK TABLES `hrm_feedback` WRITE;
/*!40000 ALTER TABLE `hrm_feedback` DISABLE KEYS */;
INSERT INTO `hrm_feedback` VALUES (3,'now','we','can','add',3,3000,'feedback',2),(6,'now','we','can','add',3,3000,'feedback',10),(7,'now','we','can','add',3,3000,'feedback',3),(8,'now','we','can','add',3,3000,'feedback',8),(10,'wanna change','ready','notready','JUST DO IT',4,150000,NULL,34),(11,'wanna change','ready','notready','JUST DO IT',4,150000,'',34),(12,'wanna change','ready','notready','JUST DO IT',4,150000,'  ',34),(13,'wanna change','ready','notready','JUST DO IT',4,150000,' dsdasdasd ',34),(14,'wanna change','ready','notready','JUST DO IT',4,150000,NULL,34),(15,'siachiosachnsa','Ready','Ready','slicnjscnospacnasp',1,5000,'ocnposdcnsdpoc',48),(16,'asfcasodvjdsoiv','Ready','Ready','dscjwpdsocnscndsc',1,5005,NULL,48),(17,'wanna change','ready','notready','JUST DO IT',4,150000,NULL,34),(18,'asfcasodvjdsoiv','Ready','Ready','dscjwpdsocnscndsc',1,5005,NULL,48),(19,'sdjvhbodbvo','Ready','Not ready','dklsn dskl ',5,2500,'pes vesenniy',48),(20,'wanna change','ready','notready','JUST DO IT',4,150000,NULL,34),(21,'wanna change','ready','notready','JUST DO IT',4,150000,NULL,50),(22,'kjhnvipocasn','Ready','Ready','dsvcds',3,1500,NULL,51),(23,'scsdsjcksn','Ready','Ready','opcsmdcom',2,2000,NULL,50),(24,'dpmvcpdwo','Ready','Ready','clksdm',4,2000,NULL,50),(25,'SDONVCOASNDV','Ready','Ready','QDKCNWQDC',4,2000,NULL,48),(26,'dskmlcsdcodw','Ready','Not ready','lknmopnlk',3,500,'lalal',52),(27,'dscsad','Ready','Ready','dsvsavd',4,500,'',54),(28,'knbkjxnaskjc','Ready','Ready','clknsdklc s',1,2000,'',55),(29,'Pes','Not ready','Not ready','Pes',5,1,'Pes',55);
/*!40000 ALTER TABLE `hrm_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview`
--

DROP TABLE IF EXISTS `interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) NOT NULL,
  `vacancy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `assigner_id` int(11) NOT NULL,
  `done` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `done_idx` (`done`),
  KEY `fk_candidate_id_candidate_idx` (`candidate_id`),
  KEY `fk_vacancy_id_vacancy_idx` (`vacancy_id`),
  KEY `fk_user_id_user_idx` (`user_id`),
  KEY `fk_interview_users_assigner_idx` (`assigner_id`),
  CONSTRAINT `fk_interview_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_interview_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (1,10,28,1,'2017-06-02 00:00:00',1,1),(2,4,23,6,'2017-07-26 20:51:14',1,1),(3,4,23,6,'2017-07-26 20:51:14',1,1),(4,4,23,6,'2017-07-26 20:51:14',1,0),(5,4,23,6,'2017-07-26 20:51:14',6,0),(6,4,23,6,'2017-07-26 20:50:14',6,0),(7,4,23,6,'2017-08-07 10:36:54',6,0),(8,13,28,6,'2017-08-02 15:00:00',1,1),(9,10,28,4,'2017-08-17 11:00:00',1,0),(10,12,28,2,'2017-08-16 12:30:00',1,1),(11,11,28,3,'2017-09-03 16:45:00',1,0),(12,4,23,6,'2017-07-26 20:51:14',6,0),(13,4,23,6,'2017-08-08 14:24:34',6,0),(14,1,28,8,'2017-08-17 11:00:00',1,0),(15,13,28,7,'2017-08-23 12:00:00',1,1),(16,1,28,8,'2017-08-23 11:00:00',1,0),(17,13,28,6,'2017-08-03 15:00:00',1,0),(18,13,28,6,'2017-08-02 15:00:00',1,0),(19,13,28,6,'2017-08-02 15:00:00',1,0),(20,4,23,6,'2017-08-08 14:24:34',6,0),(21,13,28,6,'2017-08-02 15:00:00',1,0),(22,13,28,6,'2017-08-02 15:00:00',1,0),(23,11,28,6,'2017-08-02 15:00:00',1,0),(24,4,23,6,'2017-08-02 21:17:06',6,0),(25,12,28,6,'2017-08-02 15:00:00',1,0),(26,13,28,6,'2017-08-03 07:00:00',1,0),(27,12,28,6,'2017-08-29 08:00:00',1,0),(28,4,23,6,'2017-08-02 21:17:06',6,0),(29,4,23,6,'2017-08-02 21:17:06',6,0),(30,4,23,6,'2017-08-02 21:50:26',6,0),(31,4,23,6,'2017-08-02 21:17:06',6,0),(32,4,23,6,'2017-08-14 11:03:46',6,0),(33,17,29,4,'2017-08-03 15:00:00',1,0),(34,17,29,1,'2017-08-17 15:00:00',1,1),(35,17,29,2,'2017-08-03 15:00:00',1,0),(36,3,27,6,'2017-08-03 11:00:00',1,0),(37,15,26,4,'2017-08-03 11:00:00',1,0),(38,17,26,3,'2017-08-04 15:00:00',1,0),(39,4,23,6,'2017-08-03 10:55:23',6,0),(40,4,23,6,'2017-08-03 10:55:23',6,0),(41,4,23,6,'2017-08-03 10:55:23',6,0),(42,4,23,6,'2017-08-03 10:55:23',6,0),(43,4,23,6,'2017-08-03 11:05:23',6,0),(44,4,23,6,'2017-08-03 11:08:43',6,0),(45,4,23,6,'2017-08-03 11:13:13',6,0),(46,16,27,7,'2017-08-04 15:00:00',1,1),(47,17,29,4,'2017-08-04 15:00:00',1,0),(48,15,26,1,'2017-08-04 15:45:00',1,1),(49,17,29,1,'2017-08-05 12:50:00',1,0),(50,17,29,1,'2017-08-05 04:20:00',1,1),(51,4,27,1,'2017-08-05 18:00:00',1,1),(52,8,24,1,'2017-08-29 15:00:00',1,1),(53,15,26,2,'2017-08-05 23:49:00',1,0),(54,16,27,1,'2017-08-12 23:00:00',1,1),(55,3,27,1,'2017-08-29 09:00:00',1,1),(56,4,23,6,'2017-08-07 09:04:41',6,0),(57,7,23,1,'2017-08-29 15:59:00',1,1),(58,16,27,1,'2017-08-08 11:25:00',1,0),(59,3,23,1,'2017-08-10 11:00:00',1,0),(60,9,28,5,'2017-08-08 05:00:00',1,0),(61,4,23,6,'2017-08-08 16:10:26',2,0),(62,4,23,6,'2017-08-08 16:10:26',2,0),(63,4,23,6,'2017-08-08 16:10:26',2,0),(64,4,23,6,'2017-08-08 16:10:26',2,0),(65,4,23,6,'2017-08-08 16:10:26',2,0),(66,4,23,6,'2017-08-08 16:10:26',2,0),(67,4,23,6,'2017-08-08 16:10:26',2,0),(68,4,23,6,'2017-08-08 16:10:26',2,0),(69,4,23,6,'2017-08-08 16:10:26',2,0),(70,4,23,6,'2017-08-08 16:10:26',2,0),(71,4,23,6,'2017-08-08 16:10:26',2,0),(72,4,23,6,'2017-08-08 16:10:26',2,0);
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
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
-- Table structure for table `metaphone`
--

DROP TABLE IF EXISTS `metaphone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metaphone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidate_id` int(11) NOT NULL,
  `first` varchar(45) NOT NULL,
  `second` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidate_id_candidate_idx` (`candidate_id`),
  CONSTRAINT `fk_metaphone_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metaphone`
--

LOCK TABLES `metaphone` WRITE;
/*!40000 ALTER TABLE `metaphone` DISABLE KEYS */;
INSERT INTO `metaphone` VALUES (68,1,'KNSTNTSN','TTRXK'),(70,3,'L','XFL'),(71,4,'MKSM','ATRKH'),(72,5,'IFN','PPKN'),(73,6,'MR','JNTR'),(74,7,'SMN','ISBHNT'),(75,8,'FSY','SBKF'),(76,9,'MX','XRX'),(78,11,'ARTM','BLS'),(79,12,'KFN','WS'),(80,13,'MKSM','ATRH'),(81,14,'HLN','LSK'),(83,16,'ISJKNS','ASXN'),(84,17,'KRST','KSTKFX'),(88,10,'',''),(107,15,'TST','TST'),(108,18,'PTY','FTRF');
/*!40000 ALTER TABLE `metaphone` ENABLE KEYS */;
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
  CONSTRAINT `fk_other_skills_has_candidate_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_other_skills_has_candidate_other_skills1` FOREIGN KEY (`other_skills_id`) REFERENCES `other_skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_skills_has_candidate`
--

LOCK TABLES `other_skills_has_candidate` WRITE;
/*!40000 ALTER TABLE `other_skills_has_candidate` DISABLE KEYS */;
INSERT INTO `other_skills_has_candidate` VALUES (3,1),(6,1),(1,3),(4,4),(5,4),(4,5),(5,5),(2,6),(6,6),(1,7),(2,7),(2,8),(4,9),(5,9),(1,10),(2,10),(1,11),(2,11),(1,12),(2,12),(3,13),(4,13),(2,14),(1,15),(4,15),(1,16),(4,17),(3,18),(6,18);
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
  CONSTRAINT `fk_other_skills_has_vacansy_vacansy1` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_skills_has_vacancy`
--

LOCK TABLES `other_skills_has_vacancy` WRITE;
/*!40000 ALTER TABLE `other_skills_has_vacancy` DISABLE KEYS */;
INSERT INTO `other_skills_has_vacancy` VALUES (3,18),(4,18),(2,19),(6,19),(3,23),(4,23),(5,23),(3,24),(4,24),(5,24),(3,25),(4,25),(1,26),(3,26);
/*!40000 ALTER TABLE `other_skills_has_vacancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-lDn_02deMiUyDExGfTtXMOjzZZUmQtW',1502199074,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:13.830Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('4F49JjKH3QEgTRmLKxQVTYl4pMWLyydo',1502199064,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:04.160Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('6PmJjA0GgvX1Xq8WtyvTmJlumy43q8kc',1502198762,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:26:02.430Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('8FoLLxEHF33kpbmn-q7SuXBnf3bbdx7X',1502199065,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:04.796Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('91-tQELnbQvcyQukYhX_mqo24Wi1O_2q',1502199062,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:01.904Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('BPndtYZp5eYVBRau13aOP4YEwcvXA-ss',1502199100,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:39.751Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('BWitpb2RAgaqJTsdegeBzuJAoUNhI6mi',1502199050,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:30:49.518Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('FSxK0NBGRtXWJisKqsGVns22WhZFh6F-',1502199066,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:05.830Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('FuDSCcF2bANsKSeyiRHoJHh5n4AeUW-y',1502199030,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:30:29.979Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('Hv6Xpnzq-D2T06sc5JOx4Iqe4GjvISiW',1502199064,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:03.591Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('I72009PkwB_BRAjgc2WVnn_pHtyZIwYR',1502220971,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T08:27:34.596Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('KZQnfPoOOKbBTY9LFTQNoW2fR1MlsA67',1502197994,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-07T14:03:18.912Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('SMi_zV-sVzRFvUyJ0ru939w_w--mzsJA',1502270525,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T09:15:10.043Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('Uj2Q9T1pvXJ1m978LHdI8HymDkB3Ujxf',1502198820,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:26:59.753Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('_Ltb21RrPvwjQU6P21POawmOpk0SV1RQ',1502199065,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:05.030Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('a0xKNloeBBOiVIzaWU2nM5UA590LkmMR',1502199029,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T12:24:05.597Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('btn1Yet3Yo6CfU_COi8YsyvAUHCqWSKv',1502199063,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:03.131Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('e3zWCvL1AJLQyef9yz7JmxzSIXzZZL4c',1502199034,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:30:33.832Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('g7OMOMnO4TR8XdYSf0kfc07hejKF0k6k',1502184653,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T09:30:52.656Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":7}}'),('henYQDxNVA-ljV5r4pJVtt2uKxPcyebx',1502198799,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:26:38.519Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('i2EjpJTB7QMnVo9YVjDzg3jAamsLwbaX',1502180426,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T08:20:25.929Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('l7ewOdPjDUcutmziUiSVtN0cJB6A8hku',1502199064,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:03.919Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('m8zc-jL5mFKlDMm5k-0Q1DEUEphp-Qgm',1502199453,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:32:32.218Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('oNuP9Cu2gqWLW0u1UYCjQeZzCTDCW2Mm',1502205048,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T09:16:13.629Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('qiSLjHKR0ykbkmXVzTJ3DL3rKoKyB2XI',1502185143,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T07:54:17.004Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2}}'),('rdW5zuOABEf2RM6T-XrdVg-E4rA19WPp',1502199064,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:04.368Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('vgb2M9Ly0m1WcZjC6GWtVL885eVMIUs5',1502199027,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:30:27.430Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('ykhAywCjDvZACsL9SPVtj2nGjghkH5DU',1502199065,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:31:04.577Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('zePzRsgCbbDo0O2bM8Enah75NZqF2jfb',1502198789,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-08T13:26:29.353Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
  `primary_skill_id` int(11) NOT NULL,
  `primary_skill_lvl` int(11) NOT NULL,
  `interview_id` int(11) NOT NULL,
  `other` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_primary_skill_id_idx` (`primary_skill_id`),
  CONSTRAINT `fk_ts_feedback_primary_skill` FOREIGN KEY (`primary_skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ts_feedback`
--

LOCK TABLES `ts_feedback` WRITE;
/*!40000 ALTER TABLE `ts_feedback` DISABLE KEYS */;
INSERT INTO `ts_feedback` VALUES (2,1,10,1,NULL),(3,1,10,1,NULL),(4,1,10,15,NULL),(5,1,10,46,NULL),(6,1,10,1,'DONT PUCK WITH ME< NOGGA'),(7,1,5,34,'Good PES!'),(8,2,5,57,'good');
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
  CONSTRAINT `fk_ts_skill_ts_feedback` FOREIGN KEY (`ts_feedback_id`) REFERENCES `ts_feedback` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ts_secondary_skills`
--

LOCK TABLES `ts_secondary_skills` WRITE;
/*!40000 ALTER TABLE `ts_secondary_skills` DISABLE KEYS */;
INSERT INTO `ts_secondary_skills` VALUES (1,2,9,21),(2,2,9,22),(3,3,9,21),(4,3,9,22),(5,4,9,21),(6,4,9,22),(7,5,9,21),(8,5,9,22),(9,6,9,21),(10,6,9,22),(11,7,3,12),(12,8,3,4),(13,8,3,11);
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
  `first_name` varchar(45) NOT NULL,
  `second_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin','Vasya','Pupkin'),(2,'shavel.llya@gmail.com','1488','admin','Ilya','Shavel'),(3,'the9thr@gmail.com','9','HRM','Leonid','Shutov'),(4,'andy.belous77@gmail.com','andy','TECH','Andrey','Belous'),(5,'pablodecortes@gmail.com','123456','TECH','pes','hooliganskiy'),(6,'titivuk@gmail.com','123789','HRM','Kanstantsin','Tatarchuk'),(7,'tech','TECH','TECH','Valodya','Shustrii'),(8,'hrm','HRM','HRM','Dimon','Dimonchik');
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
  `request_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_date` datetime NOT NULL,
  `primary_skill` int(11) NOT NULL,
  `primary_skill_lvl` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `linkedin` text,
  `exp_year` datetime NOT NULL,
  `english_lvl` int(11) NOT NULL,
  `salary_wish` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_location_id_idx` (`city`),
  KEY `fk_primaryskill_id_idx` (`primary_skill`),
  KEY `fk_vacancy_vac_status_idx` (`status`),
  CONSTRAINT `fk_vacancy_location` FOREIGN KEY (`city`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_primary_skill` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_vac_status` FOREIGN KEY (`status`) REFERENCES `vacancy_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy`
--

LOCK TABLES `vacancy` WRITE;
/*!40000 ALTER TABLE `vacancy` DISABLE KEYS */;
INSERT INTO `vacancy` VALUES (18,'HR system','2017-06-28 00:48:28','2017-06-28 00:00:00',9,5,4,2,'0','2017-06-02 00:00:00',3,500,NULL),(19,'Test Project','2017-06-28 02:17:39','2017-06-28 00:00:00',2,5,11,3,'0','2012-01-15 00:00:00',5,1000,NULL),(23,'BitCoin Project','2017-06-28 15:08:58','2017-06-28 00:00:00',1,5,2,2,'0','2013-02-11 00:00:00',4,4999,NULL),(24,'Medical system','2017-06-28 15:11:11','2017-06-28 00:00:00',3,4,10,4,'0','2017-06-02 00:00:00',2,1500,NULL),(25,'Defence system for bank','2017-06-28 15:15:02','2017-06-28 00:00:00',6,5,8,3,'0','2017-06-04 00:00:00',5,3500,NULL),(26,'Android application for shop \"Evroopt\"','2017-06-28 15:17:53','2017-06-28 00:00:00',2,5,4,4,'0','2017-05-12 00:00:00',4,2999,NULL),(27,'VCS','2017-06-28 17:20:27','2017-06-28 00:00:00',1,5,2,2,'0','2017-06-02 00:00:00',4,1500,NULL),(28,'Onliner.by','2017-06-29 18:54:02','2017-06-27 12:51:50',4,9,5,1,'https://www.linkedin.com/','2017-08-27 12:54:50',2,600,'we nee u'),(29,'TestName','2017-07-02 18:35:52','2017-07-02 00:00:00',2,5,5,1,'0','2015-06-07 00:00:00',1,1000,'We need u, bro');
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
  `vacancy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `change_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` tinyint(4) DEFAULT '0',
  `request_date` tinyint(4) DEFAULT '0',
  `start_date` tinyint(4) DEFAULT '0',
  `status` tinyint(4) DEFAULT '0',
  `primary_skill` tinyint(4) DEFAULT '0',
  `other_skills` tinyint(4) DEFAULT '0',
  `city` tinyint(4) DEFAULT '0',
  `secondary_skills` tinyint(4) DEFAULT '0',
  `exp_year` tinyint(4) DEFAULT '0',
  `english_lvl` tinyint(4) DEFAULT '0',
  `linkedin` tinyint(4) DEFAULT '0',
  `salary_wish` tinyint(4) DEFAULT '0',
  `description` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_vacansy_id_idx` (`vacancy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_vacancy_change_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_change_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_changes`
--

LOCK TABLES `vacancy_changes` WRITE;
/*!40000 ALTER TABLE `vacancy_changes` DISABLE KEYS */;
INSERT INTO `vacancy_changes` VALUES (6,28,1,'2017-06-29 19:47:47',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0,0,0),(8,28,1,'2017-07-31 03:51:29',NULL,NULL,NULL,NULL,1,NULL,NULL,0,0,0,0,0,0),(13,28,1,'2017-07-31 04:00:35',0,0,0,0,1,0,0,0,0,0,0,0,0),(14,28,1,'2017-07-31 04:01:31',0,0,0,0,1,0,0,0,0,0,0,0,0),(15,28,1,'2017-07-31 04:08:34',0,0,0,0,1,0,1,0,0,0,0,0,0),(16,28,1,'2017-07-31 04:16:56',0,0,1,0,0,0,0,0,0,0,0,0,0),(17,28,1,'2017-07-31 04:27:46',0,0,0,0,0,0,0,0,1,0,0,0,0),(18,28,1,'2017-07-31 04:34:30',0,0,1,0,0,0,0,0,1,0,0,0,0),(19,29,1,'2017-08-07 08:30:27',1,0,0,0,0,0,0,0,0,0,0,0,0),(20,29,1,'2017-08-07 08:31:26',0,0,0,0,0,0,1,0,0,0,0,0,0),(21,29,1,'2017-08-07 08:31:43',0,0,0,0,0,0,1,0,0,0,0,0,0),(22,29,1,'2017-08-07 08:33:17',0,0,1,0,0,0,0,0,0,0,0,0,0),(23,28,1,'2017-08-07 08:43:48',0,0,0,0,0,0,0,0,0,0,0,0,1),(24,29,1,'2017-08-07 08:45:07',0,0,1,0,0,0,0,0,0,0,0,0,0),(25,28,1,'2017-08-07 08:48:05',0,0,0,0,0,0,0,0,0,0,0,1,0),(26,29,1,'2017-08-07 08:48:05',0,0,0,1,0,0,0,0,0,0,0,0,0),(28,28,1,'2017-08-07 08:54:20',0,0,1,0,0,0,0,0,0,0,0,0,0);
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
  `skill_id` int(11) NOT NULL,
  `lvl` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vacancy_id_idx` (`vacancy_id`),
  KEY `skill_id_idx` (`skill_id`),
  CONSTRAINT `fk_vac_skills_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vac_skills_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_secondary_skills`
--

LOCK TABLES `vacancy_secondary_skills` WRITE;
/*!40000 ALTER TABLE `vacancy_secondary_skills` DISABLE KEYS */;
INSERT INTO `vacancy_secondary_skills` VALUES (37,18,22,4),(38,18,21,2),(39,19,12,2),(40,19,28,4),(51,23,21,4),(52,23,9,2),(53,23,15,3),(54,23,10,4),(55,24,19,4),(56,24,11,2),(57,25,7,4),(58,25,9,2),(59,25,4,3),(60,26,10,3),(61,26,10,2),(62,26,12,5);
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

-- Dump completed on 2017-08-08 12:24:15
