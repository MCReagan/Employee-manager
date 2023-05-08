const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

function viewDepartments() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('\nDepartments');
                console.table(results);
                resolve();
            }
        });
    });
}

function viewRoles() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee_role', (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('\nEmployee roles');
                console.table(results);
                resolve();
            }
        });
    });
}

function viewEmployees() {
    return new Promise((resolve, reject) => {
        db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS name, employee_role.title, department.name AS department, employee_role.salary, employee.manager_id AS manager FROM employee JOIN employee_role ON employee_role.id = employee.role_id JOIN department ON department.id = employee_role.department_id', (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('\nEmployees');
                console.table(results);
                resolve();
            }
        });
    });
}

function addDepartment(input) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT name FROM department WHERE name = "${input}"`, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (results.length > 0) {
                    console.log("Department already exists.");
                    resolve();
                } else {
                    db.query(`INSERT INTO department (name) VALUES ("${input}")`, (err, results) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log("\nDepartment successfully added!\n");
                        resolve();
                    });
                }
            }
        });
    });
};

function getDepartments() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM department`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function addRole(input) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT title FROM employee_role WHERE title = "${input.name}"`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    console.log("\nEmployee role already exists.\n");
                    resolve();
                } else {
                    db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES ("${input.name}", ${input.salary}, ${input.department_id})`, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log('\nEmployee role successfully added to the database!\n');
                            resolve();
                            return results
                        }
                    });
                }
            }
        });
    });
}

function getManagers() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from employee WHERE manager_id IS NULL`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
}

function getRoles() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from employee_role`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
}

function addEmployee(input) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${input.first_name}", "${input.last_name}", ${input.role_id}, ${input.manager_id})`, (err, results) => {
            if (manager_id !== null) {
                if (err) {
                    reject(err);
                } else {
                    console.log('\nEmployee successfully added!\n');
                    resolve(results);
                }
            } else {
                if (err) {
                    reject(err);
                } else {
                    console.log('\nManager successfully added!\n');
                    resolve(results);
                }
            }
        });
    });
}

function getEmployees() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM employee`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results)
            }
        })
    });
}

function updateEmployee(input) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE employee SET role_id = ${input.role_id} WHERE id = ${input.id}`, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('\nEmployee successfully updated!\n');
                resolve();
            }
        });
    });
}

module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee, getDepartments, getManagers, getRoles, getEmployees };