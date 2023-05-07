const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

function viewDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\nDepartments');
        console.table(results);
    });
};

function viewRoles() {
    db.query('SELECT * FROM employee_role', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\nEmployee roles')
        console.table(results);
        return results;
    });
}

function viewEmployees() {
    db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS name, employee_role.title, department.name AS department, employee_role.salary, employee.manager_id AS manager FROM employee JOIN employee_role ON employee_role.id = employee.role_id JOIN department ON department.id = employee_role.department_id', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\nEmployees');
        console.table(results);
        return results;
    });
}

function addDepartment(input) {
    db.query(`SELECT name FROM department WHERE name = "${input}"`, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                console.log("Department already exists.");
            }
            else {
                db.query(`INSERT INTO department (name) VALUES ("${input}")`, (err, results) => {
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

function addRole(input) {
    db.query(`SELECT title FROM employee_role WHERE title = "${input.title}"`, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            if (results.length > 0) {
                console.log("Employee role already exists.");
            }
            else {
                db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES ("${input.title}", ${input.salary}, ${input.department_id})`, (err, results) => {
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

function addEmployee(input) {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${input.firstName}", "${input.lastName}", ${input.roleID}, ${input.manager})`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('Employee successfully added!')
        return results;
    });
};

function updateEmployee(input) {
    db.query(`UPDATE employee SET role_id = ${input.role_id} WHERE id = ${input.id}`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('Employee successfully updated!')
        return results;
    });
}

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee };