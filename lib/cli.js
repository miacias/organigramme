// ----- NECESSARY IMPORTS -----
const inquirer = require("inquirer");
const Query = require("./query.js");

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
                        // "View Managers", // bonus
                        // "View All Employees by Manager", // bonus
                        // "View All Employees by Dept.", // bonus
                        "View All Employees",
                        // "View Talent Budget by Dept.", // bonus
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
                let query = new Query();
                let questions = new CLI();
                switch (answer.action) {
                    case "View Departments":
                        query.connect();
                        query.viewDepts();
                        break;
                    case "View Roles":
                        query.connect();
                        query.viewRoles();
                        break;
                    case "View All Employees":
                        query.connect();
                        query.viewEmployees();
                        break;
                    case "Add Department":
                        questions.addDept();
                        break;
                    case "Add Role":
                        questions.addRole();
                        break;
                    case "Add Employee":
                        questions.addEmployee();
                        break;
                    case "Change Employee Role":
                        questions.changeRole();
                        break;
                    case "Exit":
                        questions.exit();
                        break;
                }
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
                let query = new Query();
                // query.connect();
                // query.
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
                        if (typeof value === Number) {
                            return true;
                        }
                        return "Enter department ID (number only)."
                    }
                }
            ])
            .then((answers) => {
                console.log(answers);
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
                    name: "role",
                    message: "Designate a role by ID.",
                    validate(value) {
                        if (typeof value === Number) {
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

    changeRole() {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "emplId",
                    message: "Enter the ID of the employee changing roles.",
                    validate(value) {
                        if (typeof value === Number) {
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
                        if (typeof value === Number) {
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
        return console.log(`Thank you!\nSigning off.`);
    }
}

module.exports = CLI;