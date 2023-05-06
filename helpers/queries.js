const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\nDepartments');
        console.table(results);
        console.log('\n\n\n');
    });
};
// viewDepartments();

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    db.query('SELECT * FROM employee_role', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\nEmployee roles')
        console.table(results);
        console.log('\n\n\n');
    });
}
// viewRoles();

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
    db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS name, employee_role.title, department.name AS department, employee_role.salary, employee.manager_id AS manager FROM employee JOIN employee_role ON employee_role.id = employee.role_id JOIN department ON department.id = employee_role.department_id', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\nEmployees');
        console.table(results);
        console.log('\n\n\n');
    });
}
// viewEmployees();

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
    db.query(`SELECT name FROM department WHERE name = "${departmentInput}"`, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                console.log("Department already exists.");
            }
            else {
                db.query(`INSERT INTO department (name) VALUES ("${departmentInput}")`, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Department successfully added!");
                    return results;
                });
            }
        }
    });
};
// const departmentInput = "Warehouse";
// addDepartment(departmentInput);



// get department names from department table, set variable = to result, array.push into empty array, inquire prompt ask user for info, use created array for department list, compare user response to array and for loop through table where response = table.value, .then response return department.id and insert into employee_roll table
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    db.query(`SELECT title FROM employee_role WHERE title = "${roleInput.title}"`, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                console.log("Employee role already exists.");
            }
            else {
                db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES ("${roleInput.title}", ${roleInput.salary}, ${roleInput.department_id})`, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Employee role successfully added to database!`);
                    return results;
                });
            }
        }
    });
};
// const roleInput = {
//     title: "CEO",
//     salary: "479000",
//     department_id: "5"
// };
// addRole(roleInput);

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${employeeInput.firstName}", "${employeeInput.lastName}", ${employeeInput.roleID}, ${employeeInput.manager})`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('Employee successfully added!')
        return results;
    });
};
// const employeeInput = {
//     firstName: "Craig",
//     lastName: "Ferguson",
//     roleID: "3",
//     manager: "2"
// };
// addEmployee(employeeInput);

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployee() {
    db.query(`UPDATE employee SET role_id = ${updateInput.role_id} WHERE id = ${updateInput.id}`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('Employee successfully updated!')
        return results;
    });
}
// const updateInput = {
//     role_id: '3',
//     id: '1'
// };
// updateEmployee(updateInput);

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee };