-- Step 1: Create the initial EMP_DEPT view
CREATE VIEW IF NOT EXISTS EMP_DEPT AS
SELECT EMP_ID, F_NAME, L_NAME, DEP_ID
FROM EMPLOYEES;

-- Step 2: Modify the EMP_DEPT view to include department name (replaces DEP_ID)
DROP VIEW IF EXISTS EMP_DEPT;

CREATE VIEW EMP_DEPT AS
SELECT E.EMP_ID, E.F_NAME, E.L_NAME, D.DEP_NAME
FROM EMPLOYEES E, DEPARTMENTS D
WHERE E.DEP_ID = D.DEPT_ID_DEP;

-- Step 3: Drop the EMP_DEPT view
DROP VIEW IF EXISTS EMP_DEPT;



-- Extra:

-- -- Step 1: Drop the view if it already exists
-- DROP VIEW IF EXISTS EMP_DEPT;

-- -- Step 2: Create the EMP_DEPT view (basic version)
-- CREATE VIEW EMP_DEPT AS
-- SELECT EMP_ID, F_NAME, L_NAME, DEP_ID
-- FROM EMPLOYEES;

-- -- Step 3: Update the view to replace DEP_ID with department name
-- -- (Drop the view first)
-- DROP VIEW IF EXISTS EMP_DEPT;

-- -- Step 4: Create new version of the view using implicit join
-- CREATE VIEW EMP_DEPT AS
-- SELECT E.EMP_ID, E.F_NAME, E.L_NAME, D.DEP_NAME
-- FROM EMPLOYEES E, DEPARTMENTS D
-- WHERE E.DEP_ID = D.DEPT_ID_DEP;

-- -- Step 5: Query the view
-- SELECT * FROM EMP_DEPT;

-- -- Step 6: Final cleanup (optional)
-- -- DROP VIEW IF EXISTS EMP_DEPT;
