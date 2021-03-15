const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hunter19171916',
    database: 'employees_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log('Welcome to Team Manager!');
    getTasks();
});

getTasks = () => {
    inquirer.prompt({
        type: 'list',
        name: 'todo',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
    })
        .then(answer => {
            if (answer.todo === 'View all Departments') {
                viewDept();
            }
            if (answer.todo === 'View all Roles') {
                viewRoles();
            }
            if (answer.todo === 'View all Employees') {
                viewEmployees();
            }
            if (answer.todo === 'Add Department') {
                addDept();
            }
            if (answer.todo === 'Add Role') {
                addRole();
            }
            if (answer.todo === 'Add Employee') {
                addEmployee();
            }
        })
};

viewDept = () => {
    console.log('Grabbing Departments...\n');
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        getTasks();
    })
};

addDept = () => {
    inquirer.prompt({
        type: 'input',
        name: 'newDept',
        message: 'Enter name of the new department.',
        validate: deptInput => {
            if (deptInput) {
                return true;
            }
            else {
                console.log('You must enter a department name.')
                return false;
            }
        }
    })
        .then(({ newDept }) => {
            connection.query('INSERT INTO departments SET ?', { department: newDept }, function (err, res) {
                if (err) throw err;
                console.log(newDept + ' department added!\n');
                getTasks();
            })
        })
};

viewRoles = () => {
    console.log('Grabbing Roles...\n');
    connection.query('SELECT roles.id, roles.title, departments.department, roles.salary FROM roles INNER JOIN departments ON department_id = departments.id ORDER BY roles.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        getTasks();
    })
};

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter name of the new role.',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                }
                else {
                    console.log('You must enter a name for the new role.')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newRoleSal',
            message: 'Enter salary for the new role.',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                }
                else {
                    console.log('You must enter a salary amount.')
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: 'Which department will this role work in?',
            choices: ['1: Marketing', '2: Art', '3: Sales', '4: Human Resources']
        }
    ])
        .then(results => {
            let roleDept = results.newRoleDept.split(':');
            connection.query('INSERT INTO roles SET ?', { title: results.newRole, salary: results.newRoleSal, department_id: roleDept[0] }, function (err, res) {
                if (err) throw err;
                console.log(results.newRole + ' added to roles!\n');
                getTasks();
            })
        })
};

viewEmployees = () => {
    console.log('Grabbing Employees...\n');
    connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary FROM employees INNER JOIN roles ON role_id = roles.id INNER JOIN departments ON department_id = departments.id  ORDER BY employees.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        getTasks();
    })
};

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter name of the new role.',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                }
                else {
                    console.log('You must enter a name for the new role.')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newRoleSal',
            message: 'Enter salary for the new role.',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                }
                else {
                    console.log('You must enter a salary amount.')
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'newRoleDept',
            message: 'Which department will this role work in?',
            choices: ['1: Marketing', '2: Art', '3: Sales', '4: Human Resources']
        }
    ])
        .then(results => {
            let roleDept = results.newRoleDept.split(':');
            connection.query('INSERT INTO roles SET ?', { title: results.newRole, salary: results.newRoleSal, department_id: roleDept[0] }, function (err, res) {
                if (err) throw err;
                console.log(results.newRole + ' added to roles!\n');
                getTasks();
            })
        })
};