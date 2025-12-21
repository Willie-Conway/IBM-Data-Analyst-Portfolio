-- Drop if it exists
DROP PROCEDURE IF EXISTS TRANSACTION_JAMES;

-- Change delimiter
DELIMITER //

CREATE PROCEDURE TRANSACTION_JAMES()
BEGIN
    DECLARE current_balance DECIMAL(10, 2);

    -- Exit handler to rollback on error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    -- Deduct 1200 for 4 Trainers
    UPDATE BankAccounts
    SET Balance = Balance - 1200
    WHERE AccountName = 'James';

    -- Add 1200 to Shoe Shop
    UPDATE BankAccounts
    SET Balance = Balance + 1200
    WHERE AccountName = 'Shoe Shop';

    -- Reduce Trainers stock by 4
    UPDATE ShoeShop
    SET Stock = Stock - 4
    WHERE Product = 'Trainers';

    -- Check balance before buying Brogues
    SELECT Balance INTO current_balance
    FROM BankAccounts
    WHERE AccountName = 'James';

    IF current_balance >= 150 THEN
        UPDATE BankAccounts
        SET Balance = Balance - 150
        WHERE AccountName = 'James';
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient funds for Brogues';
    END IF;

    COMMIT;
END;
//

DELIMITER ;

CALL TRANSACTION_JAMES;

SELECT * FROM BankAccounts;
SELECT * FROM ShoeShop;
