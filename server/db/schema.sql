-- RxTrack schema (MySQL 8 / MariaDB 10.4+)

CREATE DATABASE IF NOT EXISTS rxtrack CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rxtrack;

CREATE TABLE `user` (
  user_id  INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20)  NOT NULL UNIQUE,
  -- bcrypt hash, never the plain password
  password VARCHAR(255) NOT NULL,
  name     VARCHAR(30)  NOT NULL,
  isAdmin  TINYINT(1)   NOT NULL DEFAULT 0,
  email    VARCHAR(30)  NOT NULL,
  tel      VARCHAR(10)  NOT NULL
);

CREATE TABLE medtype (
  type_id       INT AUTO_INCREMENT PRIMARY KEY,
  medType       VARCHAR(20) NOT NULL,
  medTypeDetail VARCHAR(50) DEFAULT NULL,
  `Date`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medunit (
  unit_id INT AUTO_INCREMENT PRIMARY KEY,
  medUnit VARCHAR(20) NOT NULL,
  `Date`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medlocation (
  location_id   INT AUTO_INCREMENT PRIMARY KEY,
  location_name VARCHAR(10) NOT NULL,
  rack          VARCHAR(10) NOT NULL,
  room          VARCHAR(10) NOT NULL,
  quantity      INT NOT NULL DEFAULT 0
);

CREATE TABLE medicine (
  med_id      INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(20) NOT NULL,
  status      VARCHAR(20) NOT NULL,
  description VARCHAR(50) NOT NULL,
  medQuantity INT NOT NULL DEFAULT 0,
  unit_id     INT DEFAULT NULL,
  type_id     INT NOT NULL,
  location_id INT DEFAULT NULL,
  CONSTRAINT fk_medicine_unit     FOREIGN KEY (unit_id)     REFERENCES medunit (unit_id)         ON DELETE CASCADE,
  CONSTRAINT fk_medicine_type     FOREIGN KEY (type_id)     REFERENCES medtype (type_id)         ON DELETE CASCADE,
  CONSTRAINT fk_medicine_location FOREIGN KEY (location_id) REFERENCES medlocation (location_id) ON DELETE CASCADE
);

CREATE TABLE patient (
  patient_id   VARCHAR(11) PRIMARY KEY,
  patient_name VARCHAR(30) NOT NULL
);

CREATE TABLE inputstock (
  input_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id  INT NOT NULL,
  `date`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inputstock_user FOREIGN KEY (user_id) REFERENCES `user` (user_id)
) AUTO_INCREMENT = 66001;

CREATE TABLE outputstock (
  output_id  VARCHAR(11) PRIMARY KEY,
  user_id    INT NOT NULL,
  patient_id VARCHAR(11) NOT NULL,
  `date`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_outputstock_user    FOREIGN KEY (user_id)    REFERENCES `user` (user_id),
  CONSTRAINT fk_outputstock_patient FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
);
