-- Step 1: Drop the procedure if it exists (to avoid errors on creation)
DROP PROCEDURE IF EXISTS RETRIEVE_ALL;

-- Step 2: Create the stored procedure
DELIMITER //
CREATE PROCEDURE RETRIEVE_ALL()
BEGIN
    SELECT * FROM PETSALE;
END //
DELIMITER ;

-- Step 3: Call the stored procedure to get all records from PETSALE
CALL RETRIEVE_ALL();

-- Optional Step 4: Drop the stored procedure if you want to remove it
-- DROP PROCEDURE IF EXISTS RETRIEVE_ALL;
