const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee } = require("./helpers/queries");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}\n`);
});

// WHEN I node app.js
// THEN I am presented with the following inquirer list items: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function mainPrompt() {
    inquirer.prompt([
        {
            name: "do",
            type: "list",
            message: "\nWhat do you want to do?",
            choices: ["View departments", "View roles", "View employees", "Add Department", "Add Role", "Add Employee", "Update Employee"]
        }
    ]).then((answers) => {
        switch (answers.do) {
            case "View departments":
                return viewDepartments();
            case "View roles":
                return viewRoles();
            case "View employees":
                return viewEmployees();
            case "Add Department":
                return addDepartmentPrompt();
            case "Add Role":
                return addRolePrompt();
            case "Add Employee":
                return addEmployeePrompt();
            case "Update Employee":
                return updateEmployeePrompt();
        }
    }).catch((error) => {
        console.error(error);
    }).finally(() => {
        return mainPrompt();
    });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartmentPrompt() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter the new department name."
        }
    ]).then((answers) => {
        const newDepartment = answers.department;
        if (answers.department.length > 0) {
            return addDepartment(newDepartment);
        } else {
            return console.log('\nError, you must not enter a blank field.\n')
        }
    }).catch((error) => {
        console.error(error);
    });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// function addRolePrompt() {
//     inquirer.prompt([
//         {
//             name: "name",
//             type: "input",
//             message: "Enter the name of the new role."
//         },
//         {
//             name: "firstName",
//             type: "input",
//             message: "Enter the new role's yearly salary. Use only whole numbers.",
//             validate: function (value) {
//                 var valid = !isNaN(parseFloat(value));
//                 return valid || "Please enter a whole number without commas.";
//             },
//             filter: Number
//         }
//     ])
// }

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployeePrompt() {
    console.log('\nbing\n')
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployeePrompt() {
    console.log('\nbing\n')
}

mainPrompt();




