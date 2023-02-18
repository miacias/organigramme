const mysql2 = require("mysql2");
const cTable = require('console.table');
// const schema = require("../db/schema.sql");

class Query {
    constructor(host, user, password, database) {
        this.host = host || "127.0.0.1" || "localhost";
        this.user = user || "root";
        this.password = password || "";
        this.database = database || "company_db";
        this.db;
    }

    connect() {
        this.db = mysql2.createConnection(
            {
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database
            },
            console.log(`Connected to the ${this.database} database.`)
        );
    }
    viewDepts() { // query database for departments table
        // db.query(`SELECT id AS "Dept ID", dept_name AS Name FROM departments;`, function (err, results) {
            this.db.query(`SELECT * FROM departments;`, function (err, results) {
            console.table(results);
        });
    }
    viewRoles() { // query database for roles table
        this.db.query(`SELECT id AS "Role ID", title AS Title, salary AS Salary, dept_id AS "Dept." FROM roles;`, (err, results) => {
            console.table(results);
        });
    }
    viewEmployees() { // query database for employees table
        this.db.query(`SELECT id AS "Empl. ID", first_name AS First, last_name AS Last, role_id AS Role, manager_id AS Manager FROM employees;`, (err, results) => {
            console.table(results);
        });
    }
    addDept(deptName) {
        this.db.query(`INSERT INTO departments (dept_name) VALUES ("${deptName}");`, (err, results) => {
            console.log(`Department added: ${deptName}.`)
        })
    }

    addRole(roleTitle, salary, deptId) {
        this.db.query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${roleTitle}", ${salary}, ${deptId});`, (err, results) => {
            console.log(`Role added: ${roleTitle} in department ${deptId} with a salary of ${salary}.`)
        })
    }

    addEmployee(firstName, lastName, roleId) {
        this.db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId});`, (err, results) => {
            console.log(`Employee registered: ${firstName} ${lastName} in department ${deptId} with role ID of ${roleId}.`)
            if (err) console.error(err);
        })
    }
}

module.exports = Query;