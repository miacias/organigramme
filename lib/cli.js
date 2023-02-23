// ----- NECESSARY IMPORTS -----
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const cTable = require('console.table');
const { hello } = require("./figlet.js");
const Query = require("./query.js");

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

    start() {
        hello();
        this.run();
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
                        new inquirer.Separator(),
                        // "Migrate Employee to Manager", // bonus
                        // "Disband Department", // bonus
                        // "Remove Role", // bonus
                        // "Off-board employee", // bonus
                        "Exit",
                        new inquirer.Separator()

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
        const query = new Query(db);
        // asks naming and salary questions
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
                }
            ])
            .then(answers => {
                let { roleTitle, salary } = answers;
                // queries DB to populate department ID question with list items
                query.getAllDeptIds(db)
                    .then(results => {
                        const departments = results[0];
                        return inquirer
                            .prompt([
                                {
                                    type: "list",
                                    name: "deptId",
                                    message: "Assign this role to a department.",
                                    choices: departments
                                }
                            ])
                            .then((answers) => {
                                let { deptId } = answers;
                                // queries DB to INSERT values into new roles table row
                                query.addRole(roleTitle, salary, deptId)
                                    .then(() => {
                                        console.log(`Role added: ${roleTitle} with a salary of ${salary}.`)
                                        this.run();
                                    });
                            })
                    })
            })
    };

    addEmployee() {
        const query = new Query(db);
        // asks naming questions
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Carefully enter this employee's FIRST name.",
                    validate(value) {
                        if (value.length <= 40 && value.length > 2) {
                            return true;
                        }
                        return "Invalid character limit: Please only include maximum first 40 characters or at least 2.";
                    }
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Carefully enter this employee's LAST name.",
                    validate(value) {
                        if (value.length <= 40 && value.length > 2) {
                            return true;
                        }
                        return "Invalid character limit: Please only include maximum first 40 characters or at least 2.";
                    }
                }
            ])
            .then(answers => {
                let { firstName, lastName } = answers;
                // queries DB to populate role ID question with list items
                query.getRoleIds()
                    .then(results => {
                        const roles = results[0];
                        return inquirer
                            .prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Designate a role.",
                                    choices: roles
                                }
                            ])
                            .then(chosenRole => {
                                let role = chosenRole.roleId;
                                // queries DB to populate department IDs into future DB INSERT
                                query.getDeptIds(role)
                                    .then(results => {
                                        let deptId = results[0][0].dept_id;
                                        // queries DB to populate manager ID question with list items
                                        query.getManagerIds()
                                            .then(results => {
                                                const managers = results[0];
                                                managers.unshift({ name: "NONE", value: null });
                                                return inquirer
                                                    .prompt([
                                                        {
                                                            type: "list",
                                                            name: "mgmtId",
                                                            message: "Optional: Assign to a manager. Select NONE to skip.",
                                                            choices: managers
                                                        }
                                                    ])
                                                    .then(chosenMgmt => {
                                                        let manager = chosenMgmt.mgmtId;
                                                        // let query = new Query(db);
                                                        // queries DB to INSERT values into new employees table row
                                                        query.addEmployee(firstName, lastName, deptId, role, manager)
                                                            .then(() => {
                                                                console.log(`Employee registered. Welcome, ${firstName} ${lastName}!`);
                                                                this.run();
                                                            })
                                                    })
                                            })
                                    })
                            });
                    })
            })
    }

    changeRole() {
        const query = new Query(db);
        return query.getEmplIds()
            .then(([results]) => {
                const employees = results;
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "emplId",
                            message: "Select employee who is changing to a new role.",
                            choices: employees
                        }
                    ])
                    .then(employee => {
                        const emplId = employee.emplId;
                        query.getRoleIds()
                            .then(([results]) => {
                                const roles = results;
                                return inquirer
                                    .prompt([
                                        {
                                            type: "list",
                                            name: "newRole",
                                            message: "Select new role.",
                                            choices: roles
                                        }
                                    ])
                                    .then(role => {
                                        const roleId = role.newRole;
                                        query.getManagerIds()
                                            .then(results => {
                                                const managers = results[0];
                                                managers.unshift({ name: "NONE", value: null });
                                                return inquirer
                                                    .prompt([
                                                        {
                                                            type: "list",
                                                            name: "mgmtId",
                                                            message: "Optional: Assign to a manager. Select NONE to skip.",
                                                            choices: managers
                                                        }
                                                    ])
                                                    .then(chosenMgmt => {
                                                        const manager = chosenMgmt.mgmtId;
                                                        query.updateRole(roleId, emplId, manager)
                                                            .then(() => {
                                                                console.log(`Employee reassignment registered!\n`);
                                                                this.run();
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    exit() {
        console.log(`Thank you!\nSigning off. ♥`);
        return process.exit(0);
    }
}

module.exports = CLI;