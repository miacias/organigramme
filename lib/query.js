const mysql2 = require("mysql2");
const cTable = require('console.table');


class Query {
    constructor(db) {
        this.db = db;
    }

    viewDepts() { // query database for departments table
        return this.db.promise().query(`SELECT id AS "Dept ID", dept_name AS Name FROM departments;`);
    }
    viewRoles() { // query database for roles table
        return this.db.promise().query(`SELECT id AS "Role ID", title AS Title, salary AS Salary, dept_id AS "Dept." FROM roles;`);
    }
    viewEmployees() { // query database for employees table
        return this.db.promise().query(`SELECT id AS "Empl. ID", first_name AS First, last_name AS Last, role_id AS Role, manager_id AS Manager FROM employees;`);
    }
    viewManagers() {
        return this.db.promise().query(`SELECT id AS "Mgmt ID", first_name AS First, last_name AS Last, role_id AS Role FROM employees WHERE manager_id IS NULL;`);
    }
    viewEmplByMgmt() {
        return this.db.promise().query(`SELECT employees.id, employees.first_name, employees.last_name, CONCAT (mgmt.first_name, " ", mgmt.last_name) AS Manager FROM employees INNER JOIN employees mgmt ON mgmt.id = employees.manager_id ORDER BY employees.manager_id ASC;`);
    }
    addDept(deptName) {
        return this.db.promise().query(`INSERT INTO departments (dept_name) VALUES ("${deptName}");`)
    }

    addRole(roleTitle, salary, deptId) {
        return this.db.promise().query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${roleTitle}", ${salary}, ${deptId});`)
    }

    addEmployee(firstName, lastName, roleId) {
        return this.db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId});`)
    }
}

module.exports = Query;