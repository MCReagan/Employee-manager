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

function addDepartmentPrompt() {
    console.log('\nbing\n')
}

function addRolePrompt() {
    console.log('\nbing\n')
}

function addEmployeePrompt() {
    console.log('\nbing\n')
}

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
