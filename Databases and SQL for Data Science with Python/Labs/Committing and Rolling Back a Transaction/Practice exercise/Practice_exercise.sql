-- Drop the procedure if it already exists
DROP PROCEDURE IF EXISTS TRANSACTION_JAMES;

-- Change the delimiter so MySQL can recognize the procedure block
DELIMITER //

CREATE PROCEDURE TRANSACTION_JAMES()
BEGIN
    -- Declare a handler to rollback on any SQL exception
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Deduct the cost of 4 pairs of Trainers ($1200)
    UPDATE BankAccounts
    SET Balance = Balance - 1200
    WHERE AccountName = 'James';

    -- Add $1200 to Shoe Shop's account
    UPDATE BankAccounts
    SET Balance = Balance + 1200
    WHERE AccountName = 'Shoe Shop';

    -- Reduce the Trainers stock by 4
    UPDATE ShoeShop
    SET Stock = Stock - 4
    WHERE Product = 'Trainers';

    -- Deduct $150 for Brogues from James
    UPDATE BankAccounts
    SET Balance = Balance - 150
    WHERE AccountName = 'James';

    -- Commit if everything succeeded
    COMMIT;
END;
//

-- Reset the delimiter
DELIMITER ;

-- ✅ Now run the procedure
CALL TRANSACTION_JAMES();

-- ✅ Then check the results
SELECT * FROM BankAccounts;
SELECT * FROM ShoeShop;
