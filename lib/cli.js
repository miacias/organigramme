// ----- NECESSARY IMPORTS -----
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const Query = require("./query.js");
const cTable = require('console.table');


const db = mysql2.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "company_db"
    },
    console.log(`Connected to the database.`)
);

class CLI {
    constructor() {

    }

    run() {
        return inquirer
            .prompt([
                {
                    type: "list",
                    name: "action",
                    message: "Main Menu",
                    choices: [
                        "View Departments",
                        "View Roles",
                        "View Managers", // bonus
                        "View All Employee Teams", // bonus
                        "View All Employees by Dept.", // bonus
                        "View All Employees",
                        "View Budget of Talent by Dept.", // bonus
                        new inquirer.Separator(),
                        "Add Department",
                        "Add Role",
                        "Add Employee",
                        new inquirer.Separator(),
                        "Change Employee Role",
                        // "Migrate Employee to Manager", // bonus
                        // "Disband Department", // bonus
                        // "Remove Role", // bonus
                        // "Off-board employee", // bonus
                        "Exit"
                    ]
                }
            ])
            .then((answer) => {
                let query = new Query(db);
                switch (answer.action) {
                    case "View Departments":
                        query.viewDepts()
                            .then(([results]) => {
                                console.table(`\nDepartments`, results);
                                this.run();
                            });
                        break;
                    case "View Roles":
                        query.viewRoles()
                            .then(([results]) => {
                                console.table(`\nRoles`, results);
                                this.run();
                            });
                        break;
                    case "View Managers":
                        query.viewManagers()
                            .then(([results]) => {
                                console.table(`\nManagers`, results);
                                this.run();
                            });
                        break;
                    case "View All Employee Teams":
                        query.viewTeams()
                            .then(([results]) => {
                                console.log(results)
                                console.table(`\nEmployee Teams by Manager`, results);
                                this.run();
                            });
                        break;
                    case "View All Employees by Dept.":
                        query.viewEmplByDpt()
                            .then(([results]) => {
                                console.table(`\nEmployees by Department`, results);
                                this.run();
                            })
                        break;
                    case "View All Employees":
                        query.viewEmployees()
                            .then(([results]) => {
                                console.table(`\nEmployees`, results);
                                this.run();
                            });
                        break;
                    case "View Budget of Talent by Dept.":
                        query.viewDeptBgt()
                            .then(([results]) => {
                                console.table(`\nBudget by Department`, results);
                                this.run();
                            })
                        break;
                    case "Add Department":
                        this.addDept();
                        break;
                    case "Add Role":
                        this.addRole();
                        break;
                    case "Add Employee":
                        this.addEmployee();
                        break;
                    case "Change Employee Role":
                        this.changeRole();
                        break;
                    case "Exit":
                        this.exit();
                        break;
                }
            })
            // .then(function (questions) { setTimeout(questions.run(), 5000)})
            // .then((answer) => {
            //     const cli = new CLI().run()
            // })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
            })
    }

    addDept() {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "deptName",
                    message: "Assign an appropriate name to the new department.",
                    validate(value) {
                        if (value.length <= 100) {
                            return true;
                        }
                        return "Must be 100 characters or fewer.";
                    }
                }
            ])
            .then((answer) => {
                console.log(answer);
                const { deptName } = answer;
                let query = new Query(db);
                query.addDept(deptName)
                    .then(() => {
                        console.log(`Department added: ${deptName}.`)
                        this.run();
                    });
            })
    };

    addRole() {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "roleTitle",
                    message: "Assign an appropriate title to the new role.",
                    validate(value) {
                        if (value.length <= 100) {
                            return true;
                        }
                        return "Must be 100 characters or fewer.";
                    }
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Specify current approved salary.",
                    // https://stackoverflow.com/questions/354044/what-is-the-best-u-s-currency-regex
                    validate(value) {
                        const pass = value.match(/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/
                        );
                        if (pass) {
                            return true;
                        }
                        return "Please enter valid US-style (123,456.78) or EU-style (123.456,78) currency notation WITHOUT currency symbols. Optional: cents and thousandths separators.";
                    }
                },
                {
                    type: "input",
                    name: "deptId",
                    message: "Denote department ID for this role.",
                    validate(value) {
                        const pass = value.match(/^[0-9]/); // must be a number
                        if (pass) {
                            return true;
                        }
                        return "Enter department ID (number only)."
                    }
                }
            ])
            .then((answers) => {
                const { roleTitle, salary, deptId } = answers;
                let query = new Query(db);
                query.addDept(roleTitle, salary, deptId)
                    .then(() => {
                        console.log(`Role added: ${roleTitle} in department ${deptId} with a salary of ${salary}.`)
                        this.run();
                    });
            })
    };

    addEmployee() {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Carefully enter this employee's FIRST name.",
                    validate(value) {
                        if (value.length <= 40) {
                            return true;
                        }
                        return "Max character limit reached. Please only include first 40 characters.";
                    }
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Carefully enter this employee's LAST name.",
                    validate(value) {
                        if (value.length <= 40) {
                            return true;
                        }
                        return "Max character limit reached. Please only include first 40 characters.";
                    }
                },
                {
                    type: "input",
                    name: "roleId",
                    message: "Designate a role by ID.",
                    validate(value) {
                        const pass = value.match(/^[0-9]/); // must be a number
                        if (pass) {
                            return true;
                        }
                        return "Enter role ID (number only)."
                    }
                },
                {
                    type: "input",
                    name: "mgmtId",
                    message: "Optional: Assign to a manager by ID. Hit Enter to skip.",
                    validate(value) {
                        const pass = value.match(/^[0-9]/); // must be a number
                        if (pass) {
                            return true;
                        }
                        return "Enter manager ID (number only) or hit Enter to skip."
                    }
                }
            ])
            .then((answers) => {
                const { firstName, lastName, roleId } = answers;
                let query = new Query(db);
                query.addEmployee(firstName, lastName, roleId)
                    .then(() => {
                        console.log(`Employee registered: ${firstName} ${lastName} in department ${deptId} with role ID of ${roleId}.`);
                        this.run();
                    });
            })
    }

    changeRole() {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "emplId",
                    message: "Enter the ID of the employee changing roles.",
                    validate(value) {
                        const pass = value.match(/^[0-9]/); // must be a number
                        if (pass) {
                            return true;
                        }
                        return "Enter employee ID (number only)."
                    }
                },
                {
                    type: "input",
                    name: "newRole",
                    message: "Enter the ID of the new role.",
                    validate(value) {
                        const pass = value.match(/^[0-9]/); // must be a number
                        if (pass) {
                            return true;
                        }
                        return "Enter role ID (number only)."
                    }
                }
            ])
            .then((answers) => {
                console.log(answers);
            })
    }

    exit() {
        console.log(`Thank you!\nSigning off. ♥`);
        return process.exit(0);
    }
}

module.exports = CLI;