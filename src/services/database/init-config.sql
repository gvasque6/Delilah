-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2020 at 12:13 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: delilah-resto
--
DROP DATABASE IF EXISTS `delilah-resto`;
CREATE DATABASE IF NOT EXISTS `delilah-resto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `delilah-resto`;

-- --------------------------------------------------------

--
-- Tabla para la lista de platos
--

CREATE TABLE disheslists (
  id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  name_short varchar(255) NOT NULL,
  price float NOT NULL,
  img_path varchar(255) DEFAULT NULL,
  is_available tinyint(1) NOT NULL DEFAULT 1,
  description text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Insertando registros en la tabla de lista platos
--

INSERT INTO disheslists (id, `name`, name_short, price, img_path, is_available, description) VALUES
(1, 'Chiken Hamburger', 'ChHm', 25.25, './src/img/chickenham.png', 1, 'A very tasty hamburger!'),
(2, 'Hotdog', 'Hd', 11.77, './src/img/carne.png', 1, 'A hotdog with tons of mustard!');

-- --------------------------------------------------------

--
-- Estructura tabla de ordenes y platos
--

CREATE TABLE orderdishes (
  quantity int(11) NOT NULL,
  unitary_price float NOT NULL,
  sub_total float NOT NULL,
  DishesListId int(11) NOT NULL,
  OrderId int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Creando tabla de ordenes
--

CREATE TABLE orders (
  id int(11) NOT NULL,
  payment_total float NOT NULL,
  order_number int(11) NOT NULL DEFAULT 0,
  address varchar(255) NOT NULL,
  description text DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) DEFAULT NULL,
  PaymentTypeId int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para estados de la ordenes
--

CREATE TABLE orderstatuses (
  createdAt datetime NOT NULL,
  StatusTypeId int(11) NOT NULL,
  OrderId int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para tipo de pago
--

CREATE TABLE paymenttypes (
  id int(11) NOT NULL,
  type varchar(255) NOT NULL,
  description text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Insertando tipos de pago
--

INSERT INTO paymenttypes (id, `type`, description) VALUES
(1, 'cash', NULL),
(2, 'credit', NULL),
(3, 'debit', NULL),
(4, 'crypto', NULL);

-- --------------------------------------------------------

--
-- Estructura tabla de seguridad
--

CREATE TABLE securitytypes (
  id int(11) NOT NULL,
  type varchar(255) NOT NULL,
  description text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Inserta registros en la tabla de seguridad
--

INSERT INTO securitytypes (id, `type`, description) VALUES
(1, 'admin', 'Main admin'),
(2, 'user', 'regular user');

-- --------------------------------------------------------

--
-- Tabla tipo de estado de orden
--

CREATE TABLE statustypes (
  id int(11) NOT NULL,
  type varchar(255) NOT NULL,
  description text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Insertando registros de estados de orden
--

INSERT INTO statustypes (id, `type`, description) VALUES
(1, 'New', 'Nueva orden'),
(2, 'Confirmed', 'Orden Confirmada'),
(3, 'In Progress', 'Cocinando Orden'),
(4, 'Sent', 'Enviando la orden'),
(5, 'Received', 'Orden recibida'),
(6, 'Cancelled', 'Orden cancelada');

-- --------------------------------------------------------

--
-- Tabla usuarios
--

CREATE TABLE users (
  id int(11) NOT NULL,
  full_name varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  SecurityTypeId int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Insertando usuarios en la tabla
--

INSERT INTO users (id, full_name, username, email, `password`, phone, address, SecurityTypeId) VALUES
(1, 'Andres Monsalve', 'admin', 'andres.felipe.monsalve@hotmail.com', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', '+5493455559542', 'Ocampo 918', 1),
(2, 'Andrea Vasquez', 'adln', 'avasquez@gmail.com', '42024e4f52ebc7b8f24b1aba3aab1c149504b13d76610d5f27e0fe47ed834a29a2ba54935b425ee44a8c9c359d82c3fe95a7e91d95267e83bb2a34d59d433b9b', '+5493455559333', 'Riobamba 918', 2);

--

--
-- Adicionando clave primaria y ordenando tablas
--

ALTER TABLE disheslists
  ADD PRIMARY KEY (id);


ALTER TABLE orderdishes
  ADD PRIMARY KEY (DishesListId,OrderId),
  ADD KEY OrderId (OrderId);


ALTER TABLE orders
  ADD PRIMARY KEY (id),
  ADD KEY UserId (UserId),
  ADD KEY PaymentTypeId (PaymentTypeId);

ALTER TABLE orderstatuses
  ADD PRIMARY KEY (StatusTypeId,OrderId),
  ADD KEY OrderId (OrderId);


ALTER TABLE paymenttypes
  ADD PRIMARY KEY (id);


ALTER TABLE securitytypes
  ADD PRIMARY KEY (id);


ALTER TABLE statustypes
  ADD PRIMARY KEY (id);


ALTER TABLE users
  ADD PRIMARY KEY (id),
  ADD KEY SecurityTypeId (SecurityTypeId);

--
-- Autoincrementando tablas
--

ALTER TABLE disheslists
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE orders
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE paymenttypes
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE securitytypes
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE statustypes
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE users
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Asociando llaves foraneas a las tablas
--

ALTER TABLE orderdishes
  ADD CONSTRAINT orderdishes_ibfk_1 FOREIGN KEY (DishesListId) REFERENCES disheslists (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT orderdishes_ibfk_2 FOREIGN KEY (OrderId) REFERENCES `orders` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders
  ADD CONSTRAINT orders_ibfk_1 FOREIGN KEY (UserId) REFERENCES `users` (id) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT orders_ibfk_2 FOREIGN KEY (PaymentTypeId) REFERENCES paymenttypes (id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE orderstatuses
  ADD CONSTRAINT orderstatuses_ibfk_1 FOREIGN KEY (StatusTypeId) REFERENCES statustypes (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT orderstatuses_ibfk_2 FOREIGN KEY (OrderId) REFERENCES `orders` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE users
  ADD CONSTRAINT users_ibfk_1 FOREIGN KEY (SecurityTypeId) REFERENCES securitytypes (id) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
