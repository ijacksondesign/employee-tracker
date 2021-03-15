DROP DATABASE IF EXISTS `employees_db`;
CREATE DATABASE `employees_db`;
USE `employees_db`;

DROP TABLE IF EXISTS `departments`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `employees`;

CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_department_idx` (`department_id`),
  CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
);

CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `role_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_role_idx` (`role_id`),
  KEY `fk_manager_idx` (`manager_id`),
  CONSTRAINT `fk_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_manager` FOREIGN KEY (`manager_id`) REFERENCES `roles` (`id`)
);
