SET DATEFORMAT ymd;

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