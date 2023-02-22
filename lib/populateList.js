const mysql2 = require("mysql2");

const db = mysql2.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "company_db"
    }
);

const deptChoices = () => {
    const departments = [];
    db.promise().query(`SELECT * FROM departments;`)
        .then(([results]) => {
            departments.push([results]);
            // console.log(departments[0]);
            return departments[0];
        });
    return departments[0];
}
console.log(deptChoices())

const roleChoices = () => {
    const roles = [];
    db.promise().query(`SELECT id, title FROM roles;`)
        .then(([results]) => {
            for (let i = 0; i < results.length; i++) {
                let role = {
                    name: `${results[i].title}`,
                    value: results[i].id
                }
                roles.push(role);
            }
            // console.log(roles)
            return roles;
        })
    return roles;
}
// roleChoices()

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
            // console.log(managers)
            return managers;
        })
    return managers;
}
// console.log(managerChoices())

module.exports = { deptChoices, roleChoices, managerChoices };