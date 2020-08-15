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
-- Table structure for table `carrito_productos`
--

DROP TABLE IF EXISTS `carrito_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito_productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned DEFAULT NULL,
  `id_carrito` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_carrito` (`id_carrito`),
  CONSTRAINT `carrito_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `carrito_productos_ibfk_2` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_productos`
--

LOCK TABLES `carrito_productos` WRITE;
/*!40000 ALTER TABLE `carrito_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carritos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `total` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
INSERT INTO `carritos` VALUES (1,0.00);
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Baño'),(2,'Cocina'),(3,'Decoracion'),(4,'Otros');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colores`
--

DROP TABLE IF EXISTS `colores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colores`
--

LOCK TABLES `colores` WRITE;
/*!40000 ALTER TABLE `colores` DISABLE KEYS */;
INSERT INTO `colores` VALUES (1,'Amarillo'),(2,'Azul'),(3,'Blanco'),(4,'Marron'),(5,'Negro'),(6,'Rojo'),(7,'Rosa'),(8,'Verde'),(9,'Otro');
/*!40000 ALTER TABLE `colores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_compras`
--

DROP TABLE IF EXISTS `historial_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_compras` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_carrito` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_carrito` (`id_carrito`),
  CONSTRAINT `historial_compras_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_compras`
--

LOCK TABLES `historial_compras` WRITE;
/*!40000 ALTER TABLE `historial_compras` DISABLE KEYS */;
INSERT INTO `historial_compras` VALUES (1,1);
/*!40000 ALTER TABLE `historial_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen_productos`
--

DROP TABLE IF EXISTS `imagen_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagen_productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(225) DEFAULT NULL,
  `id_producto` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `imagen_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen_productos`
--

LOCK TABLES `imagen_productos` WRITE;
/*!40000 ALTER TABLE `imagen_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagen_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(6,3) NOT NULL,
  `stock` int(10) NOT NULL,
  `descuento` int(10) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `id_categoria` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `id_colores` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_colores` (`id_colores`),
  CONSTRAINT `productos_colores_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `productos_colores_ibfk_2` FOREIGN KEY (`id_colores`) REFERENCES `colores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned NOT NULL,
  `id_sustentabilidad` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_sustentabilidad` (`id_sustentabilidad`),
  CONSTRAINT `productos_sustentabilidad_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `productos_sustentabilidad_ibfk_2` FOREIGN KEY (`id_sustentabilidad`) REFERENCES `sustentabilidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_sustentabilidad`
--

LOCK TABLES `productos_sustentabilidad` WRITE;
/*!40000 ALTER TABLE `productos_sustentabilidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_sustentabilidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('001-carritos.js'),('002-sustentabilidad.js'),('003-categorias.js'),('004-colores.js'),('005-historial_compras.js'),('006-usuarios.js'),('007-productos.js'),('008-imagen_productos.js'),('009-productos_colores.js'),('010-productos_sustentabilidad.js'),('011-carrito_productos.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sustentabilidad`
--

DROP TABLE IF EXISTS `sustentabilidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sustentabilidad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sustentabilidad`
--

LOCK TABLES `sustentabilidad` WRITE;
/*!40000 ALTER TABLE `sustentabilidad` DISABLE KEYS */;
INSERT INTO `sustentabilidad` VALUES (1,'Cruelty Free'),(2,'Envoltorio Sustentable'),(3,'Fair Trade'),(4,'Vegano');
/*!40000 ALTER TABLE `sustentabilidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rol` int(10) unsigned NOT NULL,
  `nombre` varchar(225) NOT NULL,
  `apellido` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `contrasenia` varchar(225) NOT NULL,
  `dni` int(10) unsigned DEFAULT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `codigo_postal` int(10) unsigned DEFAULT NULL,
  `entre_calles` varchar(225) DEFAULT NULL,
  `departamento` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `telefono` int(10) DEFAULT NULL,
  `imagen_usuario` varchar(225) DEFAULT NULL,
  `carrito_id` int(10) unsigned NOT NULL,
  `historial_compras_id` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `carrito_id` (`carrito_id`),
  KEY `historial_compras_id` (`historial_compras_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`historial_compras_id`) REFERENCES `historial_compras` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,0,'Admin','admin ','admin@gmail.com','$2a$10$RXUVA7gOH1AQ3UqZjRBj9ez8Aicl219ir4sf.ei7zdoq7/kEzVguC',0,' ',0,' 123',' ',' ',0,'admin@gmail.com-1597461064407.JPG',1,1,'2020-08-15 03:10:36','2020-08-15 03:11:04');
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

-- Dump completed on 2020-08-15  0:26:39
