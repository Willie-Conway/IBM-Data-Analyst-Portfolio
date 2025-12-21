-- 1. Find the average salary of the five least-earning employees
SELECT AVG(SALARY) 
FROM (
    SELECT SALARY 
    FROM EMPLOYEES 
    ORDER BY SALARY 
    LIMIT 5
) AS SALARY_TABLE;


-- 2. Find records of employees older than the average age of all employees
SELECT * 
FROM EMPLOYEES 
WHERE YEAR(FROM_DAYS(DATEDIFF(CURRENT_DATE, B_DATE))) > 
    (
        SELECT AVG(YEAR(FROM_DAYS(DATEDIFF(CURRENT_DATE, B_DATE)))) 
        FROM EMPLOYEES
    );


-- 3. From Job_History, display EMPL_ID, years of service, and the average years of service
SELECT EMPL_ID, 
       YEAR(FROM_DAYS(DATEDIFF(CURRENT_DATE, START_DATE))) AS YEARS_OF_SERVICE,
       (
           SELECT AVG(YEAR(FROM_DAYS(DATEDIFF(CURRENT_DATE, START_DATE)))) 
           FROM JOB_HISTORY
       ) AS AVG_YEARS_OF_SERVICE
FROM JOB_HISTORY;
