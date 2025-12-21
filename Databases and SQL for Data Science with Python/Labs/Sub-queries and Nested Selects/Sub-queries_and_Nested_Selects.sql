-- 1. Retrieve all employee records whose salary is lower than the average salary
SELECT * 
FROM EMPLOYEES 
WHERE SALARY < (SELECT AVG(SALARY) FROM EMPLOYEES);


-- 2. Retrieve all employee records with EMP_ID, SALARY, and the maximum salary as MAX_SALARY in each row
SELECT EMP_ID, SALARY, 
       (SELECT MAX(SALARY) FROM EMPLOYEES) AS MAX_SALARY 
FROM EMPLOYEES;


-- 3. Extract the first and last names of the oldest employee
SELECT F_NAME, L_NAME
FROM EMPLOYEES
WHERE B_DATE = (SELECT MIN(B_DATE) FROM EMPLOYEES);


-- 4. Retrieve the average salary of the top 5 highest-earning employees using a derived table
SELECT AVG(SALARY) 
FROM (
    SELECT SALARY 
    FROM EMPLOYEES 
    ORDER BY SALARY DESC 
    LIMIT 5
) AS SALARY_TABLE;
