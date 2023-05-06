USE employee_db;

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Customer Service'),
    ('Marketing'),
    ('Manager');

INSERT INTO employee_role (title, salary, department_id)
VALUES
    ('Sales Representative', 40000, 1),
    ('Manager', 55000, 4),
    ('Marketing Coordinator', 80000, 3),
    ('CS Representative', 35000, 2);
 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1247, 'John', 'Porter', 1, NULL),
    (0683, 'Crystal', 'Sutherland', 2, NULL),
    (2649, 'Pasqual', 'Bianchi', 3, NULL),
    (1456, 'Chantelle', 'King', 4, NULL);

UPDATE employee SET manager_id = 0683 WHERE id = 1247;
UPDATE employee SET manager_id = 0683 WHERE id = 2649;
UPDATE employee SET manager_id = 0683 WHERE id = 1456;