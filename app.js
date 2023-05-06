const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee } = require("./helpers/queries");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function mainPrompt() {
    inquirer.prompt([
        {
            name: "do",
            type: "list",
            message: "\nWhat do you want to do?",
            choices: ["View departments", "View roles", "View employees", "Add Department", "Add Role", "Add Employee", "Update Employee"]
        }
    ]).then((answer) => {
        switch (answer.do) {
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
    }).then(() => {
        mainPrompt();
    });

}
// WHEN I node index.js
// THEN I am presented with the following inquirer list items: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role


// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartmentPrompt() {
    console.log('\nbing\n')
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRolePrompt() {
    console.log('\nbing\n')
}

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






app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}\n`);
    mainPrompt();
})
