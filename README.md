# Employee Tracker

## Table of Contents
* [Description](#description)
* [The Challenge](#challenge)
* [The Criteria](#criteria)
* [Installation](#install)
* [Usage](#usage)

## Description <a name="description"></a>
A command-line application created using Node.js and MySQL to manage employees.

![Employee Tracker](./screenshot/employee-tracker.gif)
[Click here to watch video](https://drive.google.com/file/d/1fLbPpjeI-4dBS4COKeMprFOuVcVPwUYf/view?usp=sharing)

## The Challenge <a name="challenge"></a>
AS A business owner I WANT to be able to view and manage the departments, roles, and employees in my company SO THAT I can organize and plan my business

## The Criteria <a name="criteria"></a>
1. Create a command-line application that accepts user input
1. On start up ou are presented with the options to: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role 
1. When you choose to view all departments, you are presented with a formatted table showing department names and department ids
1. When you choose to view all roles, you are presented with the job title, role id, the department that role belongs to, and the salary for that role
1. When you choose to view all employees, you presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
1. When you choose to add a department, you are prompted to enter the name of the department and that department is added to the database
1. When you choose to add a role, you are prompted to enter the name, salary, and department for the role and that role is added to the database
1. When you choose to add an employee, you are prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
1. When you choose to update an employee role, you are prompted to select an employee to update and their new role and this information is updated in the data

## Installation <a name="install"></a>
After cloning the code, use npm install to install dependecies. Open the server.js file and add for MySQL database password to the connection on LINE 11. After your password is added, type npm run start into your command line.

This application comes pre-seeded, to start fresh type npm migrate to create an empty employee database.

## Usage <a name="usage"></a>
MIT License

Copyright (c) 2021 Ian Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 