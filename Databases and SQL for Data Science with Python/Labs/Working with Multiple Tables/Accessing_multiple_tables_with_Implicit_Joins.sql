-- 1. Retrieve all EMPLOYEES records corresponding to jobs listed in the JOBS table (Implicit Join)
SELECT * 
FROM EMPLOYEES, JOBS 
WHERE EMPLOYEES.JOB_ID = JOBS.JOB_IDENT;


-- 2. Same query using shorter aliases for table names
SELECT * 
FROM EMPLOYEES E, JOBS J 
WHERE E.JOB_ID = J.JOB_IDENT;


-- 3. Retrieve only Employee ID, First Name, Last Name, and Job Title
SELECT EMP_ID, F_NAME, L_NAME, JOB_TITLE
FROM EMPLOYEES E, JOBS J 
WHERE E.JOB_ID = J.JOB_IDENT;


-- 4. Same as above, but fully qualify each column using table aliases
SELECT E.EMP_ID, E.F_NAME, E.L_NAME, J.JOB_TITLE
FROM EMPLOYEES E, JOBS J 
WHERE E.JOB_ID = J.JOB_IDENT;
