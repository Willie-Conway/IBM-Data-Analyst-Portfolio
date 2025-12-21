-- Query 20: Rounded integral cost of each rescue
SELECT ROUND(COST)
FROM PETRESCUE;

-- Query 21: Rounded cost with 0 decimal places
SELECT ROUND(COST, 0)
FROM PETRESCUE;

-- Query 22: Rounded cost with 2 decimal places
SELECT ROUND(COST, 2)
FROM PETRESCUE;

-- Query 23: Length of each animal name
SELECT LENGTH(ANIMAL)
FROM PETRESCUE;

-- Query 24: Animal names in uppercase
SELECT UCASE(ANIMAL)
FROM PETRESCUE;

-- Query 25: Animal names in lowercase
SELECT LCASE(ANIMAL)
FROM PETRESCUE;
