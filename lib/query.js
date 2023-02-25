// ----- NECESSARY IMPORTS -----

const mysql2 = require("mysql2");

// ----- MYSQL QUERY CLASS -----

class Query {
    constructor(db) {
        this.db = db;
    }

    // ----- VIEW -----

    viewDepts() { // query database for departments table
        return this.db.promise().query(`SELECT id AS "Dept ID", dept_name AS Name FROM departments;`);
    }
    viewRoles() { // query database for roles table
        return this.db.promise().query(`SELECT roles.id AS "Role ID", roles.title AS Title, departments.dept_name AS Dept, roles.salary AS Salary FROM roles JOIN departments ON roles.dept_id = departments.id ORDER BY roles.id ASC;`);
    }
    viewEmployees() { // query database for employees table
        return this.db.promise().query(`SELECT employees.id AS "Empl ID", employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, departments.dept_name AS Department, roles.salary AS Salary, CONCAT (mgmt.first_name, " ", mgmt.last_name) AS Manager FROM employees LEFT OUTER JOIN employees mgmt ON mgmt.id = employees.manager_id JOIN roles ON employees.role_id = roles.id JOIN departments ON employees.dept_id = departments.id ORDER BY employees.id ASC;`);
    }
    viewManagers() {
        return this.db.promise().query(`SELECT employees.id AS "Mgmt ID", employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, departments.dept_name AS Department, roles.salary AS Salary FROM employees JOIN departments ON departments.id = employees.dept_id JOIN roles ON roles.id = employees.role_id WHERE manager_id IS NULL;`);
    }
    viewTeams() {
        return this.db.promise().query(`SELECT employees.id AS "Empl ID", employees.first_name AS First, employees.last_name AS Last, CONCAT (mgmt.first_name, " ", mgmt.last_name) AS Manager FROM employees INNER JOIN employees mgmt ON mgmt.id = employees.manager_id ORDER BY employees.manager_id ASC;`);
    }
    viewEmplByDpt() {
        return this.db.promise().query(`SELECT employees.id AS "Empl ID", employees.first_name AS First, employees.last_name AS Last, departments.dept_name AS Department FROM employees INNER JOIN departments ON employees.dept_id = departments.id ORDER BY departments.id ASC;`);
    }
    viewDeptBgt() {
        return this.db.promise().query(`SELECT departments.dept_name AS Department, SUM(salary) AS "Total Budget of Talent" FROM employees JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = employees.dept_id GROUP BY departments.dept_name;`);
    }

    // ----- GET NAME/VALUE INQUIRER LIST -----

    getDeptIds(role) { // gets names and IDs only
        return this.db.promise().query(`SELECT roles.id AS role_id, departments.id AS dept_id FROM roles JOIN departments ON roles.dept_id = departments.id WHERE roles.id = ${role};`);
    }
    getAllDeptIds() { // gets names and IDs only
        return this.db.promise().query(`SELECT dept_name AS name, id AS value FROM departments;`);
    }
    getRoleIds() { // gets names and IDs only
        return this.db.promise().query(`SELECT title AS name, id AS value FROM roles;`);
    }
    getManagerIds() { // gets names and IDs only
        return this.db.promise().query(`SELECT CONCAT(employees.first_name, " ",employees.last_name) AS name, employees.id AS value FROM employees WHERE manager_id IS NULL;`);
    }
    getEmplIds() { // gets names and IDs only
        return this.db.promise().query(`SELECT CONCAT(employees.first_name, " ",employees.last_name) AS name, employees.id AS value FROM employees;`);
    }

    // ----- ADD -----

    addDept(deptName) {
        return this.db.promise().query(`INSERT INTO departments (dept_name) VALUES ("${deptName}");`)
    }
    addRole(roleTitle, salary, deptId) {
        return this.db.promise().query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${roleTitle}", ${salary}, ${deptId});`)
    }
    addEmployee(firstName, lastName, deptId, role, manager) {
        return this.db.promise().query(`INSERT INTO employees (first_name, last_name, dept_id, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${deptId}, ${role}, ${manager});`)
    }

    // ----- UPDATE -----

    updateRole(roleId, emplId, manager) {
        return this.db.promise().query(`UPDATE employees SET role_id = ${roleId}, manager_id = ${manager} WHERE id = ${emplId};`);
    }
    updateMgmt(emplId, manager) {
        return this.db.promise().query(`UPDATE employees SET manager_id = ${manager} WHERE id = ${emplId};`);
    }

    // ----- DELETE -----

    deleteDept(deptId) {
        return this.db.promise().query(`DELETE FROM departments WHERE id = ${deptId};`);
    }
    deleteRole(roleId) {
        return this.db.promise().query(`DELETE FROM roles WHERE id = ${roleId};`);
    }
    deleteEmpl(emplId) {
        return this.db.promise().query(`DELETE FROM employees WHERE id = ${emplId};`);
    }

}

module.exports = Query;