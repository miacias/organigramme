const mysql2 = require("mysql2");
const db = mysql2.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "company_db"
    },
    console.log(`Connected to the database.`)
);

const managerChoices = () => {
    const managers = [];
    db.promise().query(`SELECT employees.id AS mgmt_id, employees.first_name AS first, employees.last_name AS last, roles.title AS Title, departments.dept_name AS Department, roles.salary AS SALARY FROM employees JOIN departments ON departments.id = employees.dept_id JOIN roles ON roles.id = employees.role_id WHERE manager_id IS NULL;`)
        .then(([results]) => {
            for (let i = 0; i < results.length; i++) {
                let manager = {
                    name: `${results[i].first} ${results[i].last}`,
                    value: results[i].mgmt_id
                }
                managers.push(manager);
            }
            return managers;
        })
    return managers;
}

module.exports = managerChoices;