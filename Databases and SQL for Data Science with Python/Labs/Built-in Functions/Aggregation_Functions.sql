-- Query 15: Total cost of all animal rescues
SELECT SUM(COST)
FROM PETRESCUE;

-- Query 16: Total cost of all animal rescues with label
SELECT SUM(COST) AS SUM_OF_COST
FROM PETRESCUE;

-- Query 17: Maximum quantity of animals rescued
SELECT MAX(QUANTITY)
FROM PETRESCUE;

-- Query 18: Minimum quantity of animals rescued
SELECT MIN(QUANTITY)
FROM PETRESCUE;

-- Query 19: Average cost of animals rescued
SELECT AVG(COST)
FROM PETRESCUE;
