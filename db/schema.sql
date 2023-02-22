-- create database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- activate database
USE company_db;

-- define departments
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id) -- set primary
);

-- define roles
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    dept_id INT, -- import dept_id from departments
    FOREIGN KEY (dept_id)
    REFERENCES departments(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id) -- set primary
);

-- define employees
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT, -- import role_id from roles table
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT, -- import manager_id from employees table
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id) -- set primary
);