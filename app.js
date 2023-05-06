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
// function viewDepartments() {
//     db.query('SELECT * FROM department', (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Departments');
//         console.table(results);
//     });
// };
// viewDepartments();

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// function viewRoles() {
//     db.query('SELECT * FROM employee_role', (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Employee roles')
//         console.table(results);
//     });
// }
// viewRoles();


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// function viewEmployees() {
//     db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS name, employee_role.title, department.name AS department, employee_role.salary, employee.manager_id AS manager FROM employee JOIN employee_role ON employee_role.id = employee.role_id JOIN department ON department.id = employee_role.department_id', (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('Employees');
//         console.table(results);
//     });
// }
// viewEmployees();



// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// function addDepartment(input) {
//     db.query('USE employee_db', (err, results) => {
//         if (err) {
//             console.log(err);
//         } return results;
//     });
//     db.query(`SELECT name FROM department WHERE name = "${input}"`, (err, results) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             if (results.length > 0) {
//                 console.log("Department already exists.");
//             }
//             else {
//                 db.query(`INSERT INTO department (name) VALUES ("${input}")`, (err, results) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                     console.log("Department successfully added!");
//                     return results;
//                 });
//             }
//         }
//     });
// };





// get department names from department table, set variable = to result, array.push into empty array, inquire prompt ask user for info, use created array for department list, compare user response to array and for loop through table where response = table.value, .then response return department.id and insert into employee_roll table
const input = {
    title: "CEO",
    salary: "479000",
    department_id: "3"
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    db.query('USE employee_db', (err, results) => {
        if (err) {
            console.log(err);
        } return results;
    });
    db.query(`SELECT title FROM employee_role WHERE title = "${input.title}"`, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                console.log("Role already exists.");
            }
            else {
                db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES ("${input.title}", ${input.salary}, ${input.department_id})`, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Role successfully added!");
                    return results;
                });
            }
        }
    })
}

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