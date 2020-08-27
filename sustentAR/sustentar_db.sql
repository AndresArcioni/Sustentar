-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: sustentar_db
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('001-carritos.js'),('002-sustentabilidad.js'),('003-categorias.js'),('004-colores.js'),('007-productos.js'),('008-imagen_productos.js'),('009-productos_colores.js'),('010-productos_sustentabilidad.js'),('011-carrito_productos.js'),('013-usuarios.js'),('015-historial_compras.js'),('016-historial_productos.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_productos`
--

DROP TABLE IF EXISTS `carrito_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito_productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned DEFAULT NULL,
  `cantidad_productos` int(30) unsigned DEFAULT NULL,
  `id_carrito` int(10) unsigned DEFAULT NULL,
  `id_colores` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_carrito` (`id_carrito`),
  KEY `id_colores` (`id_colores`),
  CONSTRAINT `carrito_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `carrito_productos_ibfk_2` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`),
  CONSTRAINT `carrito_productos_ibfk_3` FOREIGN KEY (`id_colores`) REFERENCES `colores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_productos`
--

LOCK TABLES `carrito_productos` WRITE;
/*!40000 ALTER TABLE `carrito_productos` DISABLE KEYS */;
INSERT INTO `carrito_productos` VALUES (2,2,1,3,1);
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
  `cantidad_productos` int(30) unsigned DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
INSERT INTO `carritos` VALUES (1,0,0.00),(2,0,0.00),(3,0,0.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
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
  `usuario_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_carrito` (`id_carrito`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `historial_compras_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`),
  CONSTRAINT `historial_compras_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_compras`
--

LOCK TABLES `historial_compras` WRITE;
/*!40000 ALTER TABLE `historial_compras` DISABLE KEYS */;
INSERT INTO `historial_compras` VALUES (1,1,1),(2,2,2),(3,3,3);
/*!40000 ALTER TABLE `historial_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_productos`
--

DROP TABLE IF EXISTS `historial_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_producto` int(10) unsigned DEFAULT NULL,
  `cantidad_productos` int(30) unsigned DEFAULT NULL,
  `id_historial_compras` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_historial_compras` (`id_historial_compras`),
  CONSTRAINT `historial_productos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `historial_productos_ibfk_2` FOREIGN KEY (`id_historial_compras`) REFERENCES `historial_compras` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_productos`
--

LOCK TABLES `historial_productos` WRITE;
/*!40000 ALTER TABLE `historial_productos` DISABLE KEYS */;
INSERT INTO `historial_productos` VALUES (1,5,1,3);
/*!40000 ALTER TABLE `historial_productos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen_productos`
--

LOCK TABLES `imagen_productos` WRITE;
/*!40000 ALTER TABLE `imagen_productos` DISABLE KEYS */;
INSERT INTO `imagen_productos` VALUES (1,'producto-1598493654088.JPG',1),(2,'producto-1598493654095.JPG',1),(3,'producto-1598493654101.JPG',1),(4,'producto-1598493704626.JPG',2),(5,'producto-1598493704631.JPG',2),(6,'producto-1598493704636.JPG',2),(7,'producto-1598493763194.JPG',3),(8,'producto-1598493763198.JPG',3),(9,'producto-1598493763209.JPG',3),(10,'producto-1598493831234.JPG',4),(11,'producto-1598493831237.JPG',4),(12,'producto-1598493831246.JPG',4),(13,'producto-1598493917992.JPG',5),(14,'producto-1598493917997.JPG',5),(15,'producto-1598493918001.JPG',5),(16,'producto-1598494042438.JPG',6),(17,'producto-1598494042441.JPG',6),(18,'producto-1598494042445.JPG',6),(19,'producto-1598494235516.JPG',7),(20,'producto-1598494235518.JPG',7),(21,'producto-1598494235523.JPG',7),(22,'producto-1598494366317.JPG',8),(23,'producto-1598494366320.JPG',8),(24,'producto-1598494366328.JPG',8),(25,'producto-1598494523644.JPG',9),(26,'producto-1598494523648.JPG',9),(27,'producto-1598494523651.JPG',9),(28,'producto-1598494617445.JPG',10),(29,'producto-1598494617448.JPG',10),(30,'producto-1598494617450.JPG',10);
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
  `precio` decimal(6,2) NOT NULL,
  `stock` int(10) NOT NULL,
  `descuento` int(10) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `id_categoria` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Crema Humectante',200.00,20,20,'Crema humectante hecha a base de productos 100% naturales.',1,'2020-08-27 02:00:54','2020-08-27 02:00:54'),(2,'Desinfectante Natural',170.00,20,0,'Desinfectante de mesadas efectivo y natural.',2,'2020-08-27 02:01:44','2020-08-27 02:01:44'),(3,'Juguetes Vintage',500.00,3,10,'Set de juguetes vintage para decorar tu casa responsablemente.',3,'2020-08-27 02:02:43','2020-08-27 02:02:43'),(4,'Frascos de Baño',200.00,20,20,'Set de frascos para reemplazar el plástico en los productos de higiene.',1,'2020-08-27 02:03:51','2020-08-27 02:03:51'),(5,'Frascos de Cocina',200.00,19,0,'Set de frascos de cocina para reducir el uso de plásticos. ',2,'2020-08-27 02:05:18','2020-08-27 02:25:49'),(6,'Jabon Natural',120.00,20,20,'Jabón natural sin sulfatos ni químicos.',1,'2020-08-27 02:07:22','2020-08-27 02:07:22'),(7,'Maceta',300.00,20,15,'Maceta artesanal con forma de coronavirus :)',3,'2020-08-27 02:10:35','2020-08-27 02:10:35'),(8,'Pasta de Dientes',220.00,10,0,'Pasta de dientes orgánica hecha a base de arcilla natural.',1,'2020-08-27 02:12:46','2020-08-27 02:12:46'),(9,'Pinceles de Maquillaje',250.00,20,15,'Set de pinceles de maquillaje hechos con fibras vegetales.',1,'2020-08-27 02:15:23','2020-08-27 02:15:23'),(10,'Velas',100.00,20,15,'Set de velas por si se te corta la luz como a Uri el otro día :)',3,'2020-08-27 02:16:57','2020-08-27 02:16:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_colores`
--

LOCK TABLES `productos_colores` WRITE;
/*!40000 ALTER TABLE `productos_colores` DISABLE KEYS */;
INSERT INTO `productos_colores` VALUES (1,1,6),(2,1,9),(3,2,1),(4,3,2),(5,3,6),(6,3,8),(7,4,4),(8,5,3),(9,6,2),(10,6,3),(11,7,3),(12,8,9),(13,9,4),(14,9,5),(15,10,1),(16,10,2),(17,10,3),(18,10,6),(19,10,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_sustentabilidad`
--

LOCK TABLES `productos_sustentabilidad` WRITE;
/*!40000 ALTER TABLE `productos_sustentabilidad` DISABLE KEYS */;
INSERT INTO `productos_sustentabilidad` VALUES (1,1,1),(2,1,4),(3,2,1),(4,2,2),(5,2,4),(6,3,3),(7,4,2),(8,4,3),(9,5,2),(10,5,3),(11,6,1),(12,6,4),(13,7,3),(14,8,1),(15,8,2),(16,8,4),(17,9,1),(18,9,4),(19,10,1),(20,10,3);
/*!40000 ALTER TABLE `productos_sustentabilidad` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
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
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `carrito_id` (`carrito_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,0,'admin','admin','admin@gmail.com','$2a$10$HzAxRUButzsAH7KC5YRfCuOlQjD/SIso8sOPafSLFI5b8fLSI4bRO',NULL,' ',NULL,' ',' ',' ',NULL,'admin@gmail.com-1598493495011.jpg',1,'2020-08-27 01:58:15','2020-08-27 01:58:15'),(2,1,'julia','cordero','julia@gmail.com','$2a$10$qcCXkqgD5fL.deWIPiF3seREr2SBND.xQ1EyG92Ce./v5ptyvHQA.',NULL,' ',NULL,' ',' ',' ',NULL,'julia@gmail.com-1598494845396.png',2,'2020-08-27 02:20:45','2020-08-27 02:20:45'),(3,1,'julia','cordero','j@gmail.com','$2a$10$gfcaw6s.kxQRxFqod9Snquri3Agc87wfmjj6HL2mDlQvXcRBmwyC2',NULL,' ',NULL,' ',' ',' ',NULL,'j@gmail.com-1598494916323.png',3,'2020-08-27 02:21:56','2020-08-27 02:21:56');
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

-- Dump completed on 2020-08-26 23:47:52
