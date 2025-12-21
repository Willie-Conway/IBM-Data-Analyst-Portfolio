-- Query 26: Day of rescue date
SELECT DAY(RESCUEDATE)
FROM PETRESCUE;

-- Query 27: Month of rescue date
SELECT MONTH(RESCUEDATE)
FROM PETRESCUE;

-- Query 28: Year of rescue date
SELECT YEAR(RESCUEDATE)
FROM PETRESCUE;

-- Query 29: Date three days after rescue date
SELECT DATE_ADD(RESCUEDATE, INTERVAL 3 DAY)
FROM PETRESCUE;

-- Query 30: Date two months after rescue date
SELECT DATE_ADD(RESCUEDATE, INTERVAL 2 MONTH)
FROM PETRESCUE;

-- Query 31: Date three days before rescue date
SELECT DATE_SUB(RESCUEDATE, INTERVAL 3 DAY)
FROM PETRESCUE;

-- Query 32: Number of days since rescue date
SELECT DATEDIFF(CURRENT_DATE, RESCUEDATE)
FROM PETRESCUE;

-- Query 33: Rescue duration in YYYY-MM-DD format based on days difference
SELECT FROM_DAYS(DATEDIFF(CURRENT_DATE, RESCUEDATE))
FROM PETRESCUE;
