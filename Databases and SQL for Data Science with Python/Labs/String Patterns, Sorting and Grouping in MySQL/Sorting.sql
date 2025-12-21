-- Query 4: Employees ordered by department ID (ascending)
SELECT F_NAME, L_NAME, DEP_ID 
FROM EMPLOYEES
ORDER BY DEP_ID;

-- Query 5: Employees ordered by department ID (descending), and by last name (descending) within each department
SELECT F_NAME, L_NAME, DEP_ID 
FROM EMPLOYEES
ORDER BY DEP_ID DESC, L_NAME DESC;
