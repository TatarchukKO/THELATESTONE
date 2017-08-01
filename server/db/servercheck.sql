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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,NULL,NULL,'Konstantsin','Tatarchuk','kostya_777','zver_666','37529413218',4,'2016-02-17 00:00:00',NULL,3,'2017-07-28 04:55:49',4,4,9),(2,'Владислав','Зинчук','Vladyslav','Zynchuk','zinaTheBeast','rapGod','+375291488322',4,'2017-01-15 00:00:00',NULL,3,'2017-07-28 04:59:56',12,2,1),(3,'Илья','Шавель','Ylia','Shavel','shavelTheSlayer','shavelTheGreatest','+37529142897',5,'2017-07-09 00:00:00',NULL,1,'2017-07-28 05:03:09',1,3,1),(4,'Максим','Адериха','Maksym','Aderykha','link_534','sobaken_534','372797257',10,'2011-02-15 00:00:00',NULL,4,'2017-07-28 05:24:47',1,4,1),(5,NULL,NULL,'Ivan','Pupkin','sdfg','loshik','3891596198',11,'2017-07-02 00:00:00',NULL,5,'2017-07-28 05:41:48',4,3,1),(6,NULL,NULL,'Maria','Gender','mas','masha_42','23753787',13,'2017-07-07 00:00:00',NULL,5,'2017-07-28 05:43:02',16,3,1),(7,NULL,NULL,'someone','isbehind','someidurl','61132165ddsfd','+375222554928',1,'2017-07-07 03:00:00',NULL,2,'2017-07-28 08:13:44',1,2,1),(8,NULL,NULL,'Vasya','Sobakov','linkedin string','vasyok_777','+37529142897',13,'2017-07-28 00:00:00',NULL,5,'2017-07-28 08:23:36',3,3,1),(9,NULL,NULL,'Misha ','Chirich','linked/misha','misha_666','3755194187',4,'2015-02-11 00:00:00',NULL,5,'2017-07-28 08:51:23',4,1,1),(10,NULL,NULL,'Andrew','Belous','https://www.linkedin.com/',NULL,'+375298883355',4,'2017-09-27 12:51:50',500,2,'2017-07-29 10:25:50',4,4,1),(11,NULL,NULL,'Artem','Belous','https://www.linkedin.com/',NULL,'+375298883355',4,'2017-09-27 12:51:50',500,2,'2017-07-29 10:26:34',4,4,1),(12,NULL,NULL,'Kevin','Wise','https://www.linkedin.com/',NULL,'+385298883355',4,'2017-09-27 12:51:50',500,2,'2017-07-29 10:27:21',4,4,1),(13,NULL,NULL,'Maxim','Aderiha','max_linkedIn','max986','+375248441216',4,'2015-01-01 00:00:00',NULL,2,'2017-07-29 10:31:11',4,5,1),(14,NULL,NULL,'Helen','Lisok','lalalla_999','helen_97','+37523154812',4,'2017-07-25 00:00:00',NULL,5,'2017-07-30 11:48:36',1,5,1);
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
  CONSTRAINT `fk_emails_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_emails`
--

LOCK TABLES `candidate_emails` WRITE;
/*!40000 ALTER TABLE `candidate_emails` DISABLE KEYS */;
INSERT INTO `candidate_emails` VALUES (98,1,'titivuk@gmail.com'),(99,2,'zima_04@gmail.com'),(100,3,'shavel.ilya@gmail.com'),(101,4,'max@gmail.com'),(102,5,'git@gmial.com'),(103,6,'masha@yandex.com'),(104,7,'secTHATMAILmail@gmail.com'),(105,8,'sobaca@gmail.com'),(106,9,'chira_sobaka@mail.ru'),(107,10,'andy.belous77@gmail.com'),(108,11,'andy.belous77@gmail.com'),(109,12,'kevin.wise77@gmail.com'),(110,13,'maxaderiha@gmail.com'),(111,14,'kot@gmail.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_secondary_skills`
--

LOCK TABLES `candidate_secondary_skills` WRITE;
/*!40000 ALTER TABLE `candidate_secondary_skills` DISABLE KEYS */;
INSERT INTO `candidate_secondary_skills` VALUES (220,1,4,22),(221,1,3,13),(222,2,3,9),(223,2,9,20),(224,3,3,4),(225,4,3,10),(226,4,1,15),(227,5,3,15),(228,5,4,19),(229,6,2,8),(230,6,4,21),(231,7,2,3),(232,7,3,15),(233,8,4,7),(234,9,3,6),(235,9,4,10),(236,10,7,9),(237,10,9,4),(238,11,8,9),(239,11,9,4),(240,12,8,9),(241,13,3,2),(242,13,2,8),(243,14,3,4),(244,14,2,2),(245,14,9,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_history`
--

LOCK TABLES `general_history` WRITE;
/*!40000 ALTER TABLE `general_history` DISABLE KEYS */;
INSERT INTO `general_history` VALUES (152,6,NULL,NULL,NULL,NULL,'2017-06-29 19:47:47'),(153,13,NULL,NULL,NULL,NULL,'2017-07-31 04:00:35'),(154,14,NULL,NULL,NULL,NULL,'2017-07-31 04:01:31'),(155,15,NULL,NULL,NULL,NULL,'2017-07-31 04:08:34'),(156,16,NULL,NULL,NULL,NULL,'2017-07-31 04:16:57'),(157,17,NULL,NULL,NULL,NULL,'2017-07-31 04:27:46'),(158,18,NULL,NULL,NULL,NULL,'2017-07-31 04:34:31');
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
  `vacancy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `interview_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vacncy_id_idx` (`vacancy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_candidate_id_idx` (`candidate_id`),
  CONSTRAINT `fk_hrm_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_hrm_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hrm_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hrm_feedback`
--

LOCK TABLES `hrm_feedback` WRITE;
/*!40000 ALTER TABLE `hrm_feedback` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (1,10,28,1,'2017-06-02 00:00:00',1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metaphone`
--

LOCK TABLES `metaphone` WRITE;
/*!40000 ALTER TABLE `metaphone` DISABLE KEYS */;
INSERT INTO `metaphone` VALUES (68,1,'KNSTNTSN','TTRXK'),(69,2,'FLTSLF','SNXK'),(70,3,'L','XFL'),(71,4,'MKSM','ATRKH'),(72,5,'IFN','PPKN'),(73,6,'MR','JNTR'),(74,7,'SMN','ISBHNT'),(75,8,'FSY','SBKF'),(76,9,'MX','XRX'),(77,10,'ANTR','BLS'),(78,11,'ARTM','BLS'),(79,12,'KFN','WS'),(80,13,'MKSM','ATRH'),(81,14,'HLN','LSK');
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
INSERT INTO `other_skills_has_candidate` VALUES (3,1),(6,1),(2,2),(1,3),(4,4),(5,4),(4,5),(5,5),(2,6),(6,6),(1,7),(2,7),(2,8),(4,9),(5,9),(1,10),(2,10),(1,11),(2,11),(1,12),(2,12),(3,13),(4,13),(2,14);
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
INSERT INTO `sessions` VALUES ('9yLf-kZBea1_b0jRUGwhdjQiDT2Wv5ME',1501586541,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-01T08:43:23.298Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('Azx8s0GRom89XhvpJGOsNZn8RXv6fHH1',1501586600,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-01T11:21:05.073Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('LM8AfSbXKM-Pdn2E-r3UlOcJn-mvC7oP',1501585342,'{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2017-08-01T10:05:53.464Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('Ma-QPQ2lk3PStke4lvHew0-4ONAsCBrU',1501577681,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-01T08:54:40.632Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('X8nTiEA5ak4JR1R_Yz0bg0M1KjmvMwT0',1501585717,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-01T09:49:35.302Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('XHhBM9KbE4HSLW1nNeh8Rq04OtIlo80B',1501586419,'{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2017-08-01T10:16:53.954Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('hWdOTQIILOx6F3h9Y3gsI9CutcxrTR_-',1501585460,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-08-01T09:42:08.127Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}'),('mZIf3qYxwyV8ro6SsTphHoXvQLJl8YRa',1501509481,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2017-07-28T17:39:25.028Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}');
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
  `candidate_id` int(11) NOT NULL,
  `vacancy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `interview_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_candidate_id_idx` (`candidate_id`),
  KEY `fk_primary_skill_id_idx` (`primary_skill_id`),
  KEY `fk_vacancy_id_idx` (`vacancy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_ts_feedback_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_feedback_primary_skill` FOREIGN KEY (`primary_skill_id`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_feedback_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ts_feedback_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
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
  CONSTRAINT `fk_ts_skill_ts_feedback` FOREIGN KEY (`ts_feedback_id`) REFERENCES `ts_feedback` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
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
  `first_name` varchar(45) NOT NULL,
  `second_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin','jesus','jesus'),(2,'Ilya','1488','HRM','MNE','PLS'),(3,'the9thr@gmail.com','9','HRM','Leonid','Shutov'),(4,'andy.belous77@gmail.com','andy','TECH','Andrey','Belous'),(5,'pablodecortes@gmail.com','123456','TECH','pes','hooliganskiy'),(6,'titivuk@gmail.com','123789','TECH','Kanstantsin','Tatarchuk');
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
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_location_id_idx` (`city`),
  KEY `fk_primaryskill_id_idx` (`primary_skill`),
  KEY `fk_vacancy_vac_status_idx` (`status`),
  CONSTRAINT `fk_vacancy_location` FOREIGN KEY (`city`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_primary_skill` FOREIGN KEY (`primary_skill`) REFERENCES `skills` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_vac_status` FOREIGN KEY (`status`) REFERENCES `vacancy_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy`
--

LOCK TABLES `vacancy` WRITE;
/*!40000 ALTER TABLE `vacancy` DISABLE KEYS */;
INSERT INTO `vacancy` VALUES (18,'HR system','2017-06-28 00:48:28','2017-06-28 00:00:00',9,5,4,2,'0','2017-06-02 00:00:00',3,500,NULL),(19,'Test Project','2017-06-28 02:17:39','2017-06-28 00:00:00',2,5,11,3,'0','2012-01-15 00:00:00',5,1000,NULL),(23,'BitCoin Project','2017-06-28 15:08:58','2017-06-28 00:00:00',1,5,2,2,'0','2013-02-11 00:00:00',4,4999,NULL),(24,'Medical system','2017-06-28 15:11:11','2017-06-28 00:00:00',3,4,10,4,'0','2017-06-02 00:00:00',2,1500,NULL),(25,'Defence system for bank','2017-06-28 15:15:02','2017-06-28 00:00:00',6,5,8,3,'0','2017-06-04 00:00:00',5,3500,NULL),(26,'Android application for shop \"Evroopt\"','2017-06-28 15:17:53','2017-06-28 00:00:00',2,5,4,4,'0','2017-05-12 00:00:00',4,2999,NULL),(27,'VCS','2017-06-28 17:20:27','2017-06-28 00:00:00',1,5,2,2,'0','2017-06-02 00:00:00',4,1500,NULL),(28,'Onliner.by','2017-06-29 18:54:02','2017-06-27 12:52:50',4,9,5,1,'https://www.linkedin.com/','2017-08-27 12:54:50',2,600,'We need u, bro');
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
  PRIMARY KEY (`id`),
  KEY `fk_vacansy_id_idx` (`vacancy_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_vacancy_change_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vacancy_change_vacancy` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacancy_changes`
--

LOCK TABLES `vacancy_changes` WRITE;
/*!40000 ALTER TABLE `vacancy_changes` DISABLE KEYS */;
INSERT INTO `vacancy_changes` VALUES (6,28,1,'2017-06-29 19:47:47',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0),(8,28,1,'2017-07-31 03:51:29',NULL,NULL,NULL,NULL,1,NULL,NULL,0,0),(13,28,1,'2017-07-31 04:00:35',0,0,0,0,1,0,0,0,0),(14,28,1,'2017-07-31 04:01:31',0,0,0,0,1,0,0,0,0),(15,28,1,'2017-07-31 04:08:34',0,0,0,0,1,0,1,0,0),(16,28,1,'2017-07-31 04:16:56',0,0,1,0,0,0,0,0,0),(17,28,1,'2017-07-31 04:27:46',0,0,0,0,0,0,0,0,1),(18,28,1,'2017-07-31 04:34:30',0,0,1,0,0,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
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

-- Dump completed on 2017-07-31 14:24:13
