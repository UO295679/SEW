CREATE DATABASE IF NOT EXISTS records;

USE records;

CREATE TABLE registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    nivel DOUBLE NOT NULL,
    tiempo FLOAT NOT NULL
);