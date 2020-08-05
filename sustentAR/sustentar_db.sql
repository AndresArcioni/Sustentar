CREATE DATABASE  IF NOT EXISTS `sustentar_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sustentar_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sustentar_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_productos`
--

DROP TABLE IF EXISTS `carrito_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito_productos` (
  `carrito_id` int(11) NOT NULL,
  `productos_id` int(11) NOT NULL,
  PRIMARY KEY (`carrito_id`,`productos_id`),
  KEY `fk_carrito_has_productos_productos1_idx` (`productos_id`),
  KEY `fk_carrito_has_productos_carrito1_idx` (`carrito_id`),
  CONSTRAINT `fk_carrito_has_productos_carrito1` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_has_productos_productos1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_productos`
--

LOCK TABLES `carrito_productos` WRITE;
/*!40000 ALTER TABLE `carrito_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colores`
--

DROP TABLE IF EXISTS `colores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colores`
--

LOCK TABLES `colores` WRITE;
/*!40000 ALTER TABLE `colores` DISABLE KEYS */;
/*!40000 ALTER TABLE `colores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_de_compras`
--

DROP TABLE IF EXISTS `historial_de_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_de_compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_de_compras`
--

LOCK TABLES `historial_de_compras` WRITE;
/*!40000 ALTER TABLE `historial_de_compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_de_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_productos`
--

DROP TABLE IF EXISTS `imagenes_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenes_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(105) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_productos`
--

LOCK TABLES `imagenes_productos` WRITE;
/*!40000 ALTER TABLE `imagenes_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_usuarios`
--

DROP TABLE IF EXISTS `imagenes_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenes_usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(105) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_usuarios`
--

LOCK TABLES `imagenes_usuarios` WRITE;
/*!40000 ALTER TABLE `imagenes_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(6,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `descuento` int(11) DEFAULT NULL,
  `descripcion` varchar(500) NOT NULL,
  `imagenes_productos_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`imagenes_productos_id`),
  KEY `fk_productos_imagenes_productos1_idx` (`imagenes_productos_id`),
  CONSTRAINT `fk_productos_imagenes_productos1` FOREIGN KEY (`imagenes_productos_id`) REFERENCES `imagenes_productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_colores`
--

DROP TABLE IF EXISTS `productos_colores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_colores` (
  `productos_id` int(11) NOT NULL,
  `colores_id` int(11) NOT NULL,
  PRIMARY KEY (`productos_id`,`colores_id`),
  KEY `fk_productos_has_colores_colores1_idx` (`colores_id`),
  KEY `fk_productos_has_colores_productos1_idx` (`productos_id`),
  CONSTRAINT `fk_productos_has_colores_colores1` FOREIGN KEY (`colores_id`) REFERENCES `colores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_has_colores_productos1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_colores`
--

LOCK TABLES `productos_colores` WRITE;
/*!40000 ALTER TABLE `productos_colores` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_colores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_sustentabilidad`
--

DROP TABLE IF EXISTS `productos_sustentabilidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_sustentabilidad` (
  `productos_id` int(11) NOT NULL,
  `sustentabilidad_id` int(11) NOT NULL,
  PRIMARY KEY (`productos_id`,`sustentabilidad_id`),
  KEY `fk_productos_has_sustentabilidad_sustentabilidad1_idx` (`sustentabilidad_id`),
  KEY `fk_productos_has_sustentabilidad_productos1_idx` (`productos_id`),
  CONSTRAINT `fk_productos_has_sustentabilidad_productos1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_has_sustentabilidad_sustentabilidad1` FOREIGN KEY (`sustentabilidad_id`) REFERENCES `sustentabilidad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_sustentabilidad`
--

LOCK TABLES `productos_sustentabilidad` WRITE;
/*!40000 ALTER TABLE `productos_sustentabilidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_sustentabilidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustentabilidad`
--

DROP TABLE IF EXISTS `sustentabilidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sustentabilidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustentabilidad`
--

LOCK TABLES `sustentabilidad` WRITE;
/*!40000 ALTER TABLE `sustentabilidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `sustentabilidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(225) NOT NULL,
  `apellido` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `contrasenia` varchar(225) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `codigo_postal` int(11) DEFAULT NULL,
  `entre_calles` varchar(225) DEFAULT NULL,
  `departamento` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `historial_de_compras_id` int(11) NOT NULL,
  `carrito_id` int(11) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `imagenes_usuarios_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`historial_de_compras_id`,`carrito_id`,`imagenes_usuarios_id`),
  KEY `fk_usuarios_historial_de_compras1_idx` (`historial_de_compras_id`),
  KEY `fk_usuarios_carrito1_idx` (`carrito_id`),
  KEY `fk_usuarios_imagenes_usuarios1_idx` (`imagenes_usuarios_id`),
  CONSTRAINT `fk_usuarios_carrito1` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_historial_de_compras1` FOREIGN KEY (`historial_de_compras_id`) REFERENCES `historial_de_compras` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_imagenes_usuarios1` FOREIGN KEY (`imagenes_usuarios_id`) REFERENCES `imagenes_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-05 17:19:28
