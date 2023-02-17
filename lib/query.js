const mysql2 = require("mysql2");

class Query {
    constructor(host, user, password, database) {
        this.db = mysql2.createConnection(
            {
                host: host || "127.0.0.1" || "localhost",
                user: "root",
                password: password,
                database: "company_db"
            },
            console.log(`Connected to the company_db database.`)
        );
    }
    connect(host, user, password, database) {

    }
    viewDepts() { // query database for departments table
        db.query(`SELECT id AS "Dept ID", dept_name AS Name FROM departments;`, function (err, results) {
            console.log(results);
        });
    }
    viewRoles() { // query database for roles table
        db.query(`SELECT id AS "Role ID", title AS Title, salary AS Salary, dept_id AS "Dept." FROM roles;`, function (err, results) {
            console.log(results);
        });
    }
    viewEmployees() { // query database for employees table
        db.query(`SELECT id AS "Empl. ID", first_name AS First, last_name AS Last, role_id AS Role, manager_id AS Manager FROM employees;`, function (err, results) {
            console.log(results);
        });
    }
    put() {

    }
    post() {

    }
    delete() {

    }
}

module.exports = Query;