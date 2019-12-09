SET DATEFORMAT ymd;

SELECT *
FROM Invoice
WHERE InvoiceDate LIKE '_______2013________'


ALTER TABLE dbo.InvoiceLine
DROP CONSTRAINT FK_InvoiceLineInvoiceId
DELETE FROM Invoice
WHERE InvoiceDate LIKE '%2010%'



SELECT *
FROM Invoice
WHERE CONVERT(VARCHAR(10), InvoiceDate, 120) BETWEEN '2011%' AND '2014%' AND BillingCountry LIKE 'Germany'

SELECT *
FROM Invoice
WHERE BillingCountry LIKE 'Germany'

SELECT Customer.FirstName, COUNT(Invoice.InvoiceId)
FROM Customer
JOIN Invoice
	ON Customer.CustomerId = Invoice.CustomerId
WHERE Country LIKE 'France' AND COUNT(Invoice.InvoiceId) >= (SELECT 

GROUP BY Customer.FirstName



UPDATE Invoice
SET CustomerId = (
    SELECT TOP 1 Customer.CustomerId
    FROM Customer
    JOIN Invoice
    ON Customer.CustomerId = Invoice.CustomerId
    WHERE Customer.Country = 'France'
    GROUP BY Customer.CustomerId
    HAVING COUNT(InvoiceId) = (SELECT max(test.oui) as jsp
                         FROM 
                         (SELECT c.CustomerId, COUNT(c.CustomerId) as 'oui'
                         FROM Customer c
                         JOIN Invoice i
                         ON c.CustomerId = i.CustomerId
                         WHERE c.Country = 'France'
                         GROUP BY c.CustomerId
                         ) test)
)
WHERE BillingCountry = 'Germany' AND CONVERT(VARCHAR(10), InvoiceDate, 120) BETWEEN '%2011%' AND '%2014%'

UPDATE Invoice
SET Invoice.BillingCountry = Customer.Country
FROM Invoice
JOIN Customer
ON Customer.CustomerId = Invoice.InvoiceId
WHERE Invoice.BillingCountry != Customer.Country

ALTER TABLE dbo.Invoice
DROP COLUMN BillingPostalCode


UPDATE Invoice
SET Invoice.BillingCountry = Customer.Country
FROM Invoice
JOIN Customer
ON Customer.CustomerId = Invoice.InvoiceId
WHERE Invoice.BillingCountry != Customer.Country



ALTER TABLE Employee
ADD Salary INT



UPDATE Employee
SET Salary = (RAND(CHECKSUM(NEWID())) * 70000 + 30000)



ALTER TABLE dbo.Invoice
DROP COLUMN BillingPostalCode