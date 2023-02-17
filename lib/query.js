const mysql2 = require("mysql2");
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
            this.db.execute(`SELECT * FROM departments;`, function (err, results) {
            console.log(results);
            if (err) console.error(err);
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