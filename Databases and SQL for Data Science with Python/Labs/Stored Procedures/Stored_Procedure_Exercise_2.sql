-- Drop procedure if it already exists
DROP PROCEDURE IF EXISTS UPDATE_SALEPRICE;

-- Create the stored procedure with two input parameters: Animal_ID and Animal_Health
DELIMITER @
CREATE PROCEDURE UPDATE_SALEPRICE (IN Animal_ID INT, IN Animal_Health VARCHAR(5))
BEGIN
    IF Animal_Health = 'BAD' THEN
        UPDATE PETSALE
        SET SALEPRICE = SALEPRICE - (SALEPRICE * 0.25)
        WHERE ID = Animal_ID;
    ELSEIF Animal_Health = 'WORSE' THEN
        UPDATE PETSALE
        SET SALEPRICE = SALEPRICE - (SALEPRICE * 0.5)
        WHERE ID = Animal_ID;
    ELSE
        -- No change in SALEPRICE for other health conditions
        UPDATE PETSALE
        SET SALEPRICE = SALEPRICE
        WHERE ID = Animal_ID;
    END IF;
END @
DELIMITER ;

-- Example calls to test the procedure:
-- 1. Check all records
CALL RETRIEVE_ALL();

-- 2. Update animal with ID 1 and health condition 'BAD'
CALL UPDATE_SALEPRICE(1, 'BAD');

-- 3. Check all records after update
CALL RETRIEVE_ALL();

-- 4. Update animal with ID 3 and health condition 'WORSE'
CALL UPDATE_SALEPRICE(3, 'WORSE');

-- 5. Check all records after update
CALL RETRIEVE_ALL();

-- Drop the procedure when no longer needed
-- DROP PROCEDURE IF EXISTS UPDATE_SALEPRICE;
