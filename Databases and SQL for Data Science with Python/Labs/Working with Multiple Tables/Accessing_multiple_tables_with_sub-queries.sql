-- 1. Retrieve only the EMPLOYEES records corresponding to jobs listed in the JOBS table
SELECT * 
FROM EMPLOYEES 
WHERE JOB_ID IN (
    SELECT JOB_IDENT 
    FROM JOBS
);


-- 2. Retrieve JOB information for employees earning over $70,000
SELECT JOB_TITLE, MIN_SALARY, MAX_SALARY, JOB_IDENT
FROM JOBS
WHERE JOB_IDENT IN (
    SELECT JOB_ID 
    FROM EMPLOYEES 
    WHERE SALARY > 70000
);
