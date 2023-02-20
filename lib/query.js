const mysql2 = require("mysql2");
const cTable = require('console.table');
// const schema = require("../db/schema.sql");



class Query {
    // constructor(host, user, password, database, db) {
    //     this.host = host || "127.0.0.1" || "localhost";
    //     this.user = user || "root";
    //     this.password = password || "";
    //     this.database = database || "company_db";
    //     this.db = db;
    // }
    constructor(db) {
        // this.host = host || "127.0.0.1" || "localhost";
        // this.user = user || "root";
        // this.password = password || "";
        // this.database = database || "company_db";
        this.db = db;
    }

    // connect() { // async connection
    //     this.db = mysql2.createConnection(
    //         {
    //             host: this.host,
    //             user: this.user,
    //             password: this.password,
    //             database: this.database
    //         },
    //         console.log(`Connected to the ${this.database} database.`)
    //     );
    // }
    viewDepts() { // query database for departments table
        this.db.query(`SELECT id AS "Dept ID", dept_name AS Name FROM departments;`, (err, results) => {
            // this.db.query(`SELECT * FROM departments;`, (err, results) => {
             console.table(results);
        });
    }
    viewRoles() { // query database for roles table
        this.db.query(`SELECT id AS "Role ID", title AS Title, salary AS Salary, dept_id AS "Dept." FROM roles;`, (err, results) => {
            return console.table(results);
        });
    }
    viewEmployees() { // query database for employees table
        this.db.query(`SELECT id AS "Empl. ID", first_name AS First, last_name AS Last, role_id AS Role, manager_id AS Manager FROM employees;`, (err, results) => {
            return console.table(results);
        });
    }
    viewManagers() {
        this.db.query(`SELECT id AS "Mgmt ID", first_name AS First, last_name AS Last, role_id AS Role FROM employees WHERE manager_id IS NULL;`, (err, results) => {
            return console.table(results);
        });
    }
    viewEmplByMgmt() {
        this.db.query(`SELECT employees.id, employees.first_name, employees.last_name, m.first_name, m.last_name FROM employees INNER JOIN employees m ON m.id = employees.manager_id ORDER BY employees.manager_id ASC;`, (err, results) => {
            return console.table(results);
        });
    }
    addDept(deptName) {
        return this.db.promise().query(`INSERT INTO departments (dept_name) VALUES ("${deptName}");`)
    }

    addRole(roleTitle, salary, deptId) {
        this.db.query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${roleTitle}", ${salary}, ${deptId});`, (err, results) => {
            return console.log(`Role added: ${roleTitle} in department ${deptId} with a salary of ${salary}.`)
        })
    }

    addEmployee(firstName, lastName, roleId) {
        this.db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId});`, (err, results) => {
            if (err) console.error(err);
            return console.log(`Employee registered: ${firstName} ${lastName} in department ${deptId} with role ID of ${roleId}.`)
        })
    }
}

module.exports = Query;