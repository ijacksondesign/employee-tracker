INSERT INTO departments (department) 
VALUES 
    ('Marketing'),
    ('Art'),
    ('Sales'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Analyst', 60000, 1),
    ('Social Media', 50000, 1),
    ('Coordinator', 56000, 1),
    ('Designer', 60000, 2),
    ('Manager', 100000, 4),
    ('Copy Writer', 58000, 2),   
    ('UX/UI', 85000, 2),
    ('Accountant', 55000, 4),
    ('Intern', 25000, 4),
    ('Recruiter', 45000, 3),
    ('Representative', 42000, 3),
    ('Assistant', 35000, 4);

INSERT INTO employees (first_name, last_name, role_id) 
VALUES 
    ('James', 'Fraser', 1),
    ('Jack', 'London', 2),
    ('Robert', 'Bruce', 3),
    ('Peter', 'Greenaway', 4),
    ('Derek', 'Jarman', 5),
    ('Paolo', 'Pasolini', 6),
    ('Heathcote', 'Williams', 7),
    ('Sandy', 'Powell', 8),
    ('Emil', 'Zola', 9),
    ('Sissy', 'Coalpits', 10),
    ('Antoinette', 'Capet', 11),
    ('Samuel', 'Delany', 12),
    ('Tony', 'Duvert', 1),
    ('Dennis', 'Cooper', 2),
    ('Monica', 'Bellucci', 3),
    ('Samuel', 'Johnson', 4),
    ('John', 'Dryden', 5),
    ('Alexander', 'Pope', 6),
    ('Lionel', 'Johnson', 7),
    ('Aubrey', 'Beardsley',8),
    ('Tulse', 'Luper', 9),
    ('William', 'Morris', 10),
    ('George', 'Shaw', 11);
       