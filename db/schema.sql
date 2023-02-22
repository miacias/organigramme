-- create database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- activate database
USE company_db;

CREATE TABLE departments (
    dept_name VARCHAR(100) NOT NULL,
    dept_id INT NOT NULL
);

CREATE TABLE roles (
    job_title VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    dept_name VARCHAR(100) NOT NULL,
    salary INT NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    dept_name VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    reporting_manager VARCHAR(80) NOT NULL
);