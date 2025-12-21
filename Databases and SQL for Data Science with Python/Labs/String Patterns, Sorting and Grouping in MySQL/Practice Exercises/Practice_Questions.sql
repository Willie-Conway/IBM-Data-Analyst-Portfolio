-- Query 11: Employees whose first names start with ‘S’
SELECT F_NAME, L_NAME
FROM EMPLOYEES
WHERE F_NAME LIKE 'S%';

-- Query 12: All employee records ordered by date of birth (ascending)
SELECT *
FROM EMPLOYEES
ORDER BY B_DATE;

-- Query 13: Departments with average salary >= 60000
SELECT DEP_ID, AVG(SALARY)
FROM EMPLOYEES
GROUP BY DEP_ID
HAVING AVG(SALARY) >= 60000;

-- Query 14: Departments with average salary >= 60000, ordered by average salary descending
SELECT DEP_ID, AVG(SALARY)
FROM EMPLOYEES
GROUP BY DEP_ID
HAVING AVG(SALARY) >= 60000
ORDER BY AVG(SALARY) DESC;
