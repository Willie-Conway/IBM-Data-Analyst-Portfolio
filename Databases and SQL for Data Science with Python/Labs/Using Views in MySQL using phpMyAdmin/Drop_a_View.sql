-- 1. Drop the view named EMPSALARY
DROP VIEW IF EXISTS EMPSALARY;

-- 2. Attempt to select from the view (should result in an error if drop was successful)
SELECT * FROM EMPSALARY;
