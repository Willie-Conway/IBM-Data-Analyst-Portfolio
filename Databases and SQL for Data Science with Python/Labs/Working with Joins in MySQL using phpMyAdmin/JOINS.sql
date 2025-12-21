-- Example 1: INNER JOIN
-- Retrieve first and last names of employees and their job start dates for department number 5

SELECT E.F_NAME, E.L_NAME, JH.START_DATE 
FROM EMPLOYEES AS E 
INNER JOIN JOB_HISTORY AS JH 
    ON E.EMP_ID = JH.EMPL_ID 
WHERE E.DEP_ID = '5';


-- Example 2: LEFT OUTER JOIN
-- Retrieve employee ID, last name, department ID, and department name for all employees
-- This includes employees even if they are not assigned to any department

SELECT E.EMP_ID, E.L_NAME, E.DEP_ID, D.DEP_NAME
FROM EMPLOYEES AS E 
LEFT OUTER JOIN DEPARTMENTS AS D 
    ON E.DEP_ID = D.DEPT_ID_DEP;


-- Example 3: FULL OUTER JOIN (using UNION of LEFT and RIGHT JOINS in MySQL)
-- Retrieve first name, last name, and department name for all employees and departments
-- Shows all employees and departments even if there is no match

-- First half: Employees with or without departments
SELECT E.F_NAME, E.L_NAME, D.DEP_NAME
FROM EMPLOYEES AS E
LEFT OUTER JOIN DEPARTMENTS AS D
    ON E.DEP_ID = D.DEPT_ID_DEP

UNION

-- Second half: Departments with or without employees
SELECT E.F_NAME, E.L_NAME, D.DEP_NAME
FROM EMPLOYEES AS E
RIGHT OUTER JOIN DEPARTMENTS AS D
    ON E.DEP_ID = D.DEPT_ID_DEP;
