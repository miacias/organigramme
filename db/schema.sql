-- create database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- activate database
USE company_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    dept_id INT
    -- import dept_id from departments
    FOREIGN KEY (dept_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT
    -- import role_id from roles table
    FOREIGN KEY (id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT
    FOREIGN KEY employees(manager_id)
    REFERENCES (id)
    ON DELETE SET NULL
);