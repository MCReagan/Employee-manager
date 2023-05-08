const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee, getDepartments, getManagers, getRoles } = require("./helpers/queries");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    // console.log(`\nServer running on port ${PORT}\n`);
});

function mainPrompt() {
    inquirer.prompt([
        {
            name: "do",
            type: "list",
            message: "What do you want to do?",
            choices: ["View departments", "View roles", "View employees", "Add Department", "Add Role", "Add Employee", "Update Employee"]
        }
    ]).then(async (answers) => {
        switch (answers.do) {
            case "View departments":
                await viewDepartments();
                break;
            case "View roles":
                await viewRoles();
                break;
            case "View employees":
                await viewEmployees();
                break;
            case "Add Department":
                await addDepartmentPrompt();
                break;
            case "Add Role":
                await addRolePrompt();
                break;
            case "Add Employee":
                await addEmployeePrompt();
                break;
            case "Update Employee":
                await updateEmployeePrompt();
                break;
        }
        return;
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        return mainPrompt();
    });
}

function addDepartmentPrompt() {
    return inquirer.prompt([
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
            console.log('\nError, you must not enter a blank field.\n');
            return;
        }
    }).catch((error) => {
        console.error(error);
    });
}

function addRolePrompt() {
    return new Promise((resolve, reject) => {
        getDepartments()
            .then((results) => {
                console.log('\n')
                const choices = results.map((department) => {
                    return {
                        value: department.id,
                        name: department.name
                    };
                })
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter the name of the new role."
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "Enter the new role's yearly salary. Use only whole numbers.",
                        validate: function (value) {
                            var valid = !isNaN(parseFloat(value));
                            return valid || "Please enter a whole number without commas.";
                        },
                        filter: Number
                    },
                    {
                        name: "department_id",
                        type: "list",
                        message: "Choose a department to add the new role too.",
                        choices: choices
                    }
                ]).then((answers) => {
                    addRole(answers)
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
                reject();
            });
    });
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployeePrompt() {
    return new Promise((resolve, reject) => {
        getRoles()
            .then((results) => {
                console.log('\n');
                const choices = results.map((item) => item.title);
                inquirer.prompt([
                    {
                        name: "first_name",
                        type: "input",
                        message: "Enter the first name of the new employee."
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "Enter the last name of the new employee."
                    },
                    {
                        name: "title",
                        type: "list",
                        message: "Select the new employee's role.",
                        choices: choices
                    }
                ]).then((answers) => {
                    if (!answers.title.toLowerCase().includes('manager')) {
                        getManagers()
                            .then((managers1) => {
                                let managers = managers1.map((employee) => `${employee.first_name} ${employee.last_name}`);
                                inquirer.prompt([
                                    {
                                        name: "manager_name",
                                        type: "list",
                                        message: "Select the new employee's manager.",
                                        choices: managers
                                    }
                                ]).then(() => {
                                    let managers2 = managers1.map((result) => {
                                        return { manager_id: result.id };
                                    });
                                    let employee = {
                                        ...answers,
                                        ...managers2[0]
                                    };
                                    // console.log(employee)
                                    // console.log(results)
                                    let checkFormat = results.map((role) => {
                                        if (employee.title === role.title) {
                                        return { ...employee, role_id: role.id }
                                        }
                                    })
                                    checkFormat = checkFormat.filter((elem) => elem !== undefined);
                                    let final = {
                                        first_name,
                                        last_name,
                                        role_id,
                                        manager_id
                                    } = checkFormat[0];
                                    delete final.title;
                                    resolve(addEmployee(final))
                                })
                            })
                    } else {
                        answers["manager_id"] = null;
                        let checkFormat = results.map((role) => {
                            if (answers.title === role.title) {
                                return { ...answers, role_id: role.id }
                            }
                        })
                        checkFormat = checkFormat.filter((elem) => elem !== undefined);
                        let final = {
                            first_name,
                            last_name,
                            role_id,
                            manager_id
                        } = checkFormat[0];
                        delete final.title;
                        resolve(addEmployee(final));
                    }
                })
            })
    })

}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployeePrompt() {
    console.log('\nbing\n')
}

mainPrompt();