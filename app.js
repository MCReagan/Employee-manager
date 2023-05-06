const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

// wrap db.queries into functions so they can be called at will

// use inquirer
// WHEN I node index.js
// THEN I am presented with the following inquirer list items: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

function viewDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table(results);
    });
};
viewDepartments();

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// function viewRoles() {
//     db.query('SELECT * FROM employee_role', (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.table(results);
//     });
// }
// viewRoles();


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// function viewEmployees() {
//     db.query('SELECT * FROM employee', (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.table(results);
//     });
// }
// viewEmployees();

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});