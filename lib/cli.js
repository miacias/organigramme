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
                        "View Managers", // bonus
                        "View All Employees by Manager", // bonus
                        "View All Employees by Dept.", // bonus
                        "View All Employees",
                        "View Talent Budget by Dept.", // bonus
                        new inquirer.Separator(),
                        "Add Department",
                        "Add Role",
                        "Add Employee",
                        new inquirer.Separator(),
                        "Change Employee Role",
                        "Migrate Employee to Manager", // bonus
                        "Disband Department", // bonus
                        "Remove Role", // bonus
                        "Off-board employee", // bonus
                        "Exit"
                    ]
                }
            ])
            .then((actions) => {
                let query;
                switch (actions) {
                    case "View Departments":
                        query = new Query.viewDepts();
                        break;
                    case "View Roles":
                        query = new Query.viewRoles();
                        break;
                    case "View All Employees":
                        query = new Query.viewEmployees();
                        break;
                }
            })
    }

}
// // add dept
// .prompt([
//     {
//         type: "input",
//         message: "Please assign an appropriate name to the new department."
//     }
// ])
// // add role
// .prompt([
//     {
//         type: "input",
//         message: "Please assign an appropriate title to the new role."
//     },
//     {
//         type: "input",
//         message: "Please specify current approved salary."
//     },
//     {
//         type: "input",
//         message: "Denote department ID for this role."
//     }
// ])
// // add employee
// .prompt([
//     {
//         type: "input",
//         message: "Please carefully enter this employee's FIRST name."
//     },
//     {
//         type: "input",
//         message: "Please carefully enter this employee's LAST name."
//     },
//     {
//         type: "list",
//         message: "Designate a role."
//     }
// ])

module.exports = CLI;