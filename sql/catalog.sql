SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `magazin`
--
CREATE DATABASE `catalog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `catalog`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--


--INSERT INTO specs  (memory,HDD, weight, CPU,autonomy) VALUES ('8GB RAM','SDD','1.3 kg', 'Intel 5 generatia 7','8h');
--INSERT INTO products  (name,company,price,warranty, spec_id) VALUES ('Macbook air 2015','Apple','4200','da',1);

CREATE TABLE IF NOT EXISTS `specs` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `memory` varchar(100) DEFAULT NULL,
  `HDD` varchar(100) DEFAULT NULL,
  `weight` varchar(100) DEFAULT NULL,
  `CPU` varchar(100) DEFAULT NULL,
  `autonomy` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `product_id` smallint(5) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `score` smallint(5) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `spec_id` smallint(5) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `warranty` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_products` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



