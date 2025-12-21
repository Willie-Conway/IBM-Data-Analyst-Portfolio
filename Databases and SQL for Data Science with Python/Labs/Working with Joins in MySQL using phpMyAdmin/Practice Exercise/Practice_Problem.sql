-- Problem 1:
-- Retrieve names, job start dates, and job titles of all employees in department 5

SELECT 
    E.F_NAME, 
    E.L_NAME, 
    JH.START_DATE, 
    J.JOB_TITLE 
FROM EMPLOYEES AS E 
INNER JOIN JOB_HISTORY AS JH 
    ON E.EMP_ID = JH.EMPL_ID 
INNER JOIN JOBS AS J 
    ON E.JOB_ID = J.JOB_IDENT
WHERE E.DEP_ID = '5';


-- Problem 2:
-- Retrieve employee ID, last name, department ID for all employees,
-- but only show department names for employees born before 1980

SELECT 
    E.EMP_ID, 
    E.L_NAME, 
    E.DEP_ID, 
    D.DEP_NAME
FROM EMPLOYEES AS E
LEFT OUTER JOIN DEPARTMENTS AS D
    ON E.DEP_ID = D.DEPT_ID_DEP 
   AND YEAR(E.B_DATE) < 1980;


-- Problem 3:
-- Retrieve first and last names of all employees,
-- and show department ID and name only for male employees

SELECT 
    E.F_NAME, 
    E.L_NAME, 
    D.DEPT_ID_DEP, 
    D.DEP_NAME
FROM EMPLOYEES AS E
LEFT OUTER JOIN DEPARTMENTS AS D
    ON E.DEP_ID = D.DEPT_ID_DEP 
   AND E.SEX = 'M'

UNION

SELECT 
    E.F_NAME, 
    E.L_NAME, 
    D.DEPT_ID_DEP, 
    D.DEP_NAME
FROM EMPLOYEES AS E
RIGHT OUTER JOIN DEPARTMENTS AS D
    ON E.DEP_ID = D.DEPT_ID_DEP 
   AND E.SEX = 'M';
