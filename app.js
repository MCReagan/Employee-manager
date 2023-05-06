const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee } = require("./helpers/queries");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// wrap db.queries into functions so they can be called at will

// use inquirer
// WHEN I node index.js
// THEN I am presented with the following inquirer list items: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role



app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});