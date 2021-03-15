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
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Close Program']
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
            if (answer.todo === 'Update Employee Role') {
                updateEmployee();
            }
            if (answer.todo === 'Close Program') {
                console.log('Good bye!');
                connection.end();
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
            name: 'firstName',
            message: "Enter employee's first name.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('You must enter a first name.')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter employee's last name.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('You must enter a last name.')
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their role?',
            choices: ['1: Analyst', '2: Social Media', '3: Coordinator', '4: Designer', '5: Manager', '6: Copy Writer', '7: UX/UI', '8: Accountant', '9: Inter', '10: Recruiter', '11: Representative', '12: Assistant']
        },
        {
            type: 'confirm',
            name: 'confirmManager',
            message: 'Do they have manager?',
            default: true
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is their manager?',
            choices: ['Peter Greenaway', 'Samuel Johnson'],
            when: ({ confirmManager }) => {
                if (confirmManager) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ])
        .then(results => {
            let role = results.role.split(':');
            connection.query('INSERT INTO employees SET ?', { first_name: results.firstName, last_name: results.lastName, role_id: role[0] }, function (err, res) {
                if (err) throw err;
                console.log(results.firstName + ' ' + results.lastName + ' was added to employees!\n');
                getTasks();
            })
        })
};

updateEmployee = () => {
    connection.query('SELECT id, first_name, last_name FROM employees', function (err, res) {
        if (err) throw err;
        let employees = JSON.parse(JSON.stringify(res))
        employees = employees.map(employee => employee.id + ': ' + employee.first_name + ' ' + employee.last_name);

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee do you want to update?",
                choices: employees
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is their role?',
                choices: ['1: Analyst', '2: Social Media', '3: Coordinator', '4: Designer', '5: Manager', '6: Copy Writer', '7: UX/UI', '8: Accountant', '9: Inter', '10: Recruiter', '11: Representative', '12: Assistant']
            }
        ])
            .then(results => {
                let employee = results.employee.split(':');
                let role = results.role.split(':');
                connection.query('UPDATE employees SET ? WHERE ?', [{ role_id: role[0] }, { id: employee[0] }], function (err, res) {
                    if (err) throw err;
                    console.log(employee[1] + "'s role was updated to " + role[1] + '\n');
                    getTasks();
                })
            })
    })
};