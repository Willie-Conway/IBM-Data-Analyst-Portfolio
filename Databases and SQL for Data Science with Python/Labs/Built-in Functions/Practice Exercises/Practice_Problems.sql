-- Query 34: Average cost of rescuing a single dog
SELECT AVG(COST/QUANTITY)
FROM PETRESCUE
WHERE ANIMAL = 'Dog';

-- Query 35: Distinct animal names in uppercase
SELECT DISTINCT UCASE(ANIMAL)
FROM PETRESCUE;

-- Query 36: All columns for rescues where animal is 'cat' (case insensitive)
SELECT *
FROM PETRESCUE
WHERE LCASE(ANIMAL) = "cat";

-- Query 37: Number of rescues in the 5th month
SELECT SUM(QUANTITY)
FROM PETRESCUE
WHERE MONTH(RESCUEDATE) = "05";

-- Query 38: Rescue ID and target date one year after rescue
SELECT ID, DATE_ADD(RESCUEDATE, INTERVAL 1 YEAR)
FROM PETRESCUE;
