const name = "antoine-durand"
const promo = "B2A"

const q1 = `SELECT Name
            FROM Track
            WHERE Milliseconds < (SELECT Milliseconds
                        FROM Track
                        WHERE TrackId = 3457);`
const q2 = `SELECT Name
            FROM Track
            WHERE MediaTypeId = (SELECT MediaTypeId
                      FROM Track
                      WHERE Name = 'Rehab');`
const q3 = `SELECT Playlist.PlaylistId, Playlist.Name, COUNT(PlaylistTrack.TrackId) "Nombre de track", SUM(Track.Milliseconds) "Durée total playlist", SUM(Track.Milliseconds)/COUNT(PlaylistTrack.TrackId) "Durée moyenne track"
            FROM Playlist
            JOIN PlaylistTrack
              ON PlaylistTrack.PlaylistId = Playlist.PlaylistId
            JOIN Track
              ON PlaylistTrack.TrackId = Track.TrackId
            GROUP BY Playlist.PlaylistId, Playlist.Name`
const q4 = `SELECT DISTINCT(Playlist.Name)
            FROM Playlist
            JOIN PlaylistTrack
              ON Playlist.PlaylistId = PlaylistTrack.PlaylistId
            JOIN Track
              ON PlaylistTrack.TrackId = Track.TrackId
            WHERE (SELECT SUM(Track.Milliseconds) FROM Track) > (SELECT SUM(Track.Milliseconds)/COUNT(Track.TrackId)
                          FROM Track)`
const q5 = `SELECT NbTrack.name, NbTrack.id
            FROM (SELECT Playlist.Name AS "name", Playlist.PlaylistId AS "id", COUNT(PlaylistTrack.TrackId) AS "NbTrack"
                FROM Playlist
                JOIN PlaylistTrack
                  ON Playlist.PlaylistId = PlaylistTrack.PlaylistId
                GROUP BY Playlist.Name, Playlist.PlaylistId) "NbTrack"
            JOIN (SELECT PlaylistTrack.PlaylistId AS "Idplaylist1and13", COUNT(PlaylistTrack.TrackId) AS "NbTrack1and13"
                FROM PlaylistTrack
                WHERE PlaylistTrack.PlaylistId IN(1,13)
                GROUP BY PlaylistTrack.PlaylistId) "NbTrack1et13"
              ON NbTrack.NbTrack = NbTrack1et13.NbTrack1and13
            WHERE NbTrack.id NOT IN(1,13)`
const q6 = `SELECT Customer.FirstName, Invoice.Total
            FROM Customer
            JOIN Invoice
              ON Customer.CustomerId = Invoice.CustomerId
            WHERE Invoice.Total > (SELECT MAX(Total) FROM Invoice WHERE BillingCountry = 'France')`
const q7 = ` SELECT DISTINCT(Invoice.BillingCountry) "Country", MIN(Invoice.Total) "Min", MAX(Invoice.Total) "Max", AVG(Invoice.Total) "Avg", COUNT(Invoice.Total) "Nb", (CONVERT(DECIMAL(6,3),COUNT(Invoice.InvoiceId))/(SELECT CONVERT(DECIMAL(6,3),COUNT(Invoice.InvoiceId)) FROM Invoice))*100 "Moy nb", (SUM(Invoice.Total)/(SELECT SUM(Invoice.Total) FROM Invoice))*100 "Moy price"
            FROM Invoice
            GROUP BY Invoice.BillingCountry`
const q8 = `SELECT Track.TrackId, Track.Name, Track.AlbumId, Track.MediaTypeId, Track.GenreId, Track.Composer, Track.Milliseconds, Track.Bytes, Track.UnitPrice, MediaType.Name, (SELECT AVG(Track.UnitPrice) FROM Track) "Prix Moyen Globale", AVG(Track.UnitPrice) "Prix Moyen Media"
            FROM Track
              JOIN MediaType
                ON MediaType.MediaTypeId = Track.MediaTypeId
            WHERE Track.UnitPrice > (SELECT AVG(Track.UnitPrice) FROM Track)
            GROUP BY Track.TrackId, Track.Name, Track.AlbumId, Track.MediaTypeId, Track.GenreId, Track.Composer, Track.Milliseconds, Track.Bytes, Track.UnitPrice, MediaType.Name, Track.UnitPrice`
const q9 = `SELECT Track.TrackId, Track.Name, Track.AlbumId, Track.MediaTypeId, Track.GenreId, Track.Composer, Track.Milliseconds, Track.Bytes, Track.UnitPrice,	(SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Track.UnitPrice) OVER (PARTITION BY genre2.Name) AS medianMedia FROM Track Track JOIN Genre genre2  ON Track.GenreId = genre2.GenreId WHERE genre.genreId = genre2.GenreId GROUP BY Track.genreId, genre2.Name, Track.UnitPrice) as "medianMedia"
            FROM Track
            JOIN Genre
              ON Track.GenreId = Genre.GenreId
            WHERE Track.UnitPrice < (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Track.UnitPrice) OVER (PARTITION BY genre2.Name) AS medianMedia FROM Track Track JOIN Genre genre2  ON Track.GenreId = genre2.GenreId WHERE genre.genreId = genre2.GenreId GROUP BY Track.genreId, genre2.Name, Track.UnitPrice)`
const q10 = `SELECT pt1.playlistId, a1.artistId, 
                        (SELECT COUNT(DISTINCT a2.artistId)
                        FROM playlisttrack pt2 
                        JOIN Track t
                        ON t.TrackId = pt2.TrackId 
                        JOIN album a2
                        ON a2.albumid = t.albumId 
                        WHERE pt1.playlistId = pt2.playListId 
                        GROUP BY pt2.PlaylistId) as "nbArtistByPlayList",
                        (SELECT COUNT(DISTINCT t.trackId)
                        FROM playlisttrack pt2
                        JOIN Track t 
                        ON t.TrackId = pt2.TrackId 
                        JOIN album a3
                        ON a3.albumid = t.albumId
                        WHERE a1.ArtistId = a3.artistId
                        GROUP BY a3.artistId) as "nbChansonByArtist",
                        (SELECT AVG(t.UnitPrice) as "Nombres artistes"
                        FROM playlisttrack pt2
                        JOIN Track t 
                        ON t.TrackId = pt2.TrackId 
                        JOIN album a3
                        ON a3.albumid = t.albumId
                        WHERE a1.ArtistId = a3.artistId
                        GROUP BY a3.artistId) as "avgTrackPrince",
                        (SELECT max(nbArtist.nbArtistByPlaylist)
                        FROM
                        (
                        SELECT COUNT(DISTINCT a2.artistId) as "nbArtistByPlaylist"
                        FROM playlisttrack pt2 
                        JOIN Track t
                        ON t.TrackId = pt2.TrackId 
                        JOIN album a2
                        ON a2.albumid = t.albumId 
                        GROUP BY pt2.PlaylistId
                        ) nbArtist) as "maxArtistByPlaylist" 
            FROM PlaylistTrack pt1
            JOIN Track t1
            ON t1.TrackId = pt1.TrackId 
            JOIN album a1
            ON a1.albumid = t1.albumId SELECT pt1.playlistId, a1.artistId, 
                                    (SELECT COUNT(DISTINCT a2.artistId)
                                    FROM playlisttrack pt2 
                                    JOIN Track t
                                    ON t.TrackId = pt2.TrackId 
                                    JOIN album a2
                                    ON a2.albumid = t.albumId 
                                    WHERE pt1.playlistId = pt2.playListId 
                                    GROUP BY pt2.PlaylistId) as "nbArtistByPlayList",
                                    (SELECT COUNT(DISTINCT t.trackId)
                                    FROM playlisttrack pt2
                                    JOIN Track t 
                                    ON t.TrackId = pt2.TrackId 
                                    JOIN album a3
                                    ON a3.albumid = t.albumId
                                    WHERE a1.ArtistId = a3.artistId
                                    GROUP BY a3.artistId) as "nbChansonByArtist",
                                    (SELECT AVG(t.UnitPrice) as "Nombres artistes"
                                    FROM playlisttrack pt2
                                    JOIN Track t 
                                    ON t.TrackId = pt2.TrackId 
                                    JOIN album a3
                                    ON a3.albumid = t.albumId
                                    WHERE a1.ArtistId = a3.artistId
                                    GROUP BY a3.artistId) as "avgTrackPrince",
                                    (SELECT max(nbArtist.nbArtistByPlaylist)
                                    FROM
                                    (
                                    SELECT COUNT(DISTINCT a2.artistId) as "nbArtistByPlaylist"
                                    FROM playlisttrack pt2 
                                    JOIN Track t
                                    ON t.TrackId = pt2.TrackId 
                                    JOIN album a2
                                    ON a2.albumid = t.albumId 
                                    GROUP BY pt2.PlaylistId
                                    ) nbArtist) as "maxArtistByPlaylist" 
            FROM PlaylistTrack pt1
            JOIN Track t1
            ON t1.TrackId = pt1.TrackId 
            JOIN album a1
            ON a1.albumid = t1.albumId `
const q11 = `SELECT  pays.Country AS "Pays", count(pays.country) "Nb"
            FROM (
            SELECT Customer.country FROM Customer
            UNION ALL
            SELECT Invoice.BillingCountry FROM Invoice
            UNION ALL
            SELECT Employee.Country FROM Employee
            ) pays
            GROUP BY pays.Country`
const q12 = `SELECT pays.Country AS "Pays", COUNT(pays.country) AS "Nb",
              ISNULL((SELECT COUNT(country)
              FROM Employee
              WHERE pays.country = Country
              GROUP BY Country), 0) AS "Employee",
              (SELECT COUNT(country)
              FROM Customer
              WHERE pays.country = Country
              GROUP BY Country) AS "Customer", 
              (SELECT COUNT(Billingcountry)
              FROM Invoice
              WHERE pays.Country = BillingCountry
              GROUP BY BIllingCountry) AS "Invoice"

              FROM
              (
              SELECT Employee.Country
              FROM Employee
              UNION ALL
              SELECT Customer.Country
              FROM Customer
              UNION ALL
              SELECT Invoice.BillingCountry
              FROM Invoice
              ) pays
              GROUP BY pays.Country`
const q13 = `SELECT Invoice.InvoiceId
            FROM Invoice
            JOIN InvoiceLine
              ON InvoiceLine.InvoiceId = Invoice.InvoiceId
            JOIN Track t
              ON T.TrackId = InvoiceLine.TrackId
            WHERE T.Milliseconds IN (SELECT MAX(Milliseconds)
                          FROM Track
                          JOIN Genre
                            ON Genre.GenreId = Track.GenreId
                          WHERE T.GenreId = Genre.GenreId
                          GROUP BY genre.Name)
            GROUP BY Invoice.InvoiceId`
const q14 = `SELECT i2.invoiceId, SUM(i2.total) / COUNT(t.trackId) as "average",
            (SELECT SUM(Milliseconds)/1000 as "temps"
            FROM Invoice i
            JOIN InvoiceLine il
            ON i.InvoiceId = il.InvoiceId
            JOIN Track t
            ON t.TrackId = il.TrackId
            WHERE i2.invoiceId = i.InvoiceId
            GROUP BY i.InvoiceId) as "totalTimeTrack",
            (SELECT (SELECT Total FROM Invoice WHERE i.InvoiceId = Invoice.InvoiceId) / (SUM(Milliseconds)/1000) as "coût par seconde"
            FROM Invoice i
            JOIN InvoiceLine il
            ON i.InvoiceId = il.InvoiceId
            JOIN Track t
            ON t.TrackId = il.TrackId
            WHERE i2.invoiceId = i.InvoiceId
            GROUP BY i.InvoiceId) "coutSeconds"

            FROM Invoice i2
            JOIN InvoiceLine il
            ON i2.InvoiceId = il.InvoiceId
            JOIN Track t
            ON t.TrackId = il.TrackId
            GROUP BY i2.InvoiceId
            ORDER BY i2.InvoiceId`
const q15 = ``
const q16 = ``
const q17 = ``
const q18 = `IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'NewChinook')
              BEGIN
                ALTER DATABASE [NewChinook] SET OFFLINE WITH ROLLBACK IMMEDIATE;
                ALTER DATABASE [NewChinook] SET ONLINE;
                DROP DATABASE [NewChinook];
              END

              GO

              /*******************************************************************************
                 Create database
              ********************************************************************************/
              CREATE DATABASE [NewChinook];
              GO

              USE [NewChinook];
              GO

              /*******************************************************************************
                 Create Tables
              ********************************************************************************/
              CREATE TABLE [dbo].[Role]
              (
                  [role_id] INT NOT NULL IDENTITY,
                  [name] NVARCHAR(160),
                  [display_name] NVARCHAR(160),
                [description] TEXT,
                CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED ([role_id])
              );
              GO
              CREATE TABLE [dbo].[Permission]
              (
                  [permission_id] INT NOT NULL IDENTITY,
                  [Name] NVARCHAR(160),
                [display_nameName] NVARCHAR(160),
                [description] TEXT,
                  CONSTRAINT [PK_Permission] PRIMARY KEY CLUSTERED ([permission_id])
              );
              GO
              CREATE TABLE [dbo].[User]
              (
                  [user_id] INT NOT NULL IDENTITY,
                  [uername] NVARCHAR(160),
                [email] NVARCHAR(160),
                [superuser] BIT,
                  CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([user_id])
              );
              GO
              CREATE TABLE [dbo].[Group]
              (
                  [group_id] INT NOT NULL IDENTITY,
                  [name] NVARCHAR(160),
                [display_name] NVARCHAR(160),
                [description] NVARCHAR(160),
                  CONSTRAINT [PK_Group] PRIMARY KEY CLUSTERED ([group_id])
              );
              GO
              CREATE TABLE [dbo].[User_Group]
              (
                  [user_id] INT NOT NULL,
                [group_id] INT NOT NULL
              );
              GO
              CREATE TABLE [dbo].[Group_Role]
              (
                  [group_id] INT NOT NULL,
                [role_id] INT NOT NULL
              );
              GO
              CREATE TABLE [dbo].[User_Role]
              (
                  [user_id] INT NOT NULL,
                [role_id] INT NOT NULL
              );
              GO
              CREATE TABLE [dbo].[Role_Permission]
              (
                  [role_id] INT NOT NULL,
                [permission_id] INT NOT NULL
              );

              /*******************************************************************************
                 Create Primary Key Unique Indexes
              ********************************************************************************/

              /*******************************************************************************
                 Create Foreign Keys
              ********************************************************************************/
              ALTER TABLE [dbo].[Role_Permission] ADD CONSTRAINT [FK_Role_permissionId]
                  FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role] ([role_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_Role_permissionId] ON [dbo].[Role_Permission] ([role_id]);
              GO
              ALTER TABLE [dbo].[Role_Permission] ADD CONSTRAINT [FK_Permission_roleId]
                  FOREIGN KEY ([permission_id]) REFERENCES [dbo].[Permission] ([permission_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_Permission_roleId] ON [dbo].[Role_Permission] ([permission_id]);
              GO


              ALTER TABLE [dbo].[Group_Role] ADD CONSTRAINT [FK_Role_groupId]
                  FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role] ([role_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_Role_groupId] ON [dbo].[Group_Role] ([role_id]);
              GO
              ALTER TABLE [dbo].[Group_Role] ADD CONSTRAINT [FK_Group_roleId]
                  FOREIGN KEY ([group_id]) REFERENCES [dbo].[Group] ([group_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_Group_roleId] ON [dbo].[Group_Role] ([group_id]);
              GO


              ALTER TABLE [dbo].[User_Group] ADD CONSTRAINT [FK_User_groupId]
                  FOREIGN KEY ([user_id]) REFERENCES [dbo].[User] ([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_User_groupId] ON [dbo].[User_Group] ([user_id]);
              GO
              ALTER TABLE [dbo].[User_Group] ADD CONSTRAINT [FK_Group_userId]
                  FOREIGN KEY ([group_id]) REFERENCES [dbo].[Group] ([group_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_Group_userId] ON [dbo].[User_Group] ([group_id]);
              GO


              ALTER TABLE [dbo].[User_Role] ADD CONSTRAINT [FK_User_roleId]
                  FOREIGN KEY ([user_id]) REFERENCES [dbo].[User] ([user_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_User_roleId] ON [dbo].[User_Role] ([user_id]);
              GO
              ALTER TABLE [dbo].[User_Role] ADD CONSTRAINT [FK_Role_userId]
                  FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role] ([role_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
              GO
              CREATE INDEX [IFK_Role_userId] ON [dbo].[User_role] ([role_id]);`
const q19 = `INSERT INTO [dbo].[Track] ([Name], [AlbumId], [MediaTypeId], [GenreId], [Composer], [Milliseconds], [Bytes], [UnitPrice]) VALUES (N'The Call Of Ktulu', 154, 1, 3, N'Metallica', 534883, 17486240, 0.99);
            INSERT INTO [dbo].[Track] ([Name], [AlbumId], [MediaTypeId], [GenreId], [Composer], [Milliseconds], [Bytes], [UnitPrice]) VALUES (N'Frantic', 155, 1, 3, N'Bob Rock/James Hetfield/Kirk Hammett/Lars Ulrich', 350458, 11510849, 0.99);
            INSERT INTO [dbo].[Track] ([Name], [AlbumId], [MediaTypeId], [GenreId], [Composer], [Milliseconds], [Bytes], [UnitPrice]) VALUES (N'St. Anger', 155, 1, 3, N'Bob Rock/James Hetfield/Kirk Hammett/Lars Ulrich', 441234, 14363779, 0.99);`
const q20 = `INSERT INTO [dbo].[Employee] ([LastName], [FirstName], [Title], [BirthDate], [HireDate], [Address], [City], [State], [Country], [PostalCode], [Phone], [Fax], [Email]) VALUES (N'Adams', N'Andrew', N'General Manager', '1962/2/18', '2002/8/14', N'11120 Jasper Ave NW', N'Edmonton', N'AB', N'France', N'T5K 2N1', N'+1 (780) 428-9482', N'+1 (780) 428-3457', N'andrew@chinookcorp.com');
            INSERT INTO [dbo].[Employee] ([LastName], [FirstName], [Title], [ReportsTo], [BirthDate], [HireDate], [Address], [City], [State], [Country], [PostalCode], [Phone], [Fax], [Email]) VALUES (N'Edwards', N'Nancy', N'Sales Manager', 1, '1958/12/8', '2002/5/1', N'825 8 Ave SW', N'Calgary', N'AB', N'France', N'T2P 2T3', N'+1 (403) 262-3443', N'+1 (403) 262-3322', N'nancy@chinookcorp.com');`
const q21 = `ALTER TABLE dbo.InvoiceLine
            NOCHECK CONSTRAINT FK_InvoiceLineInvoiceId
            DELETE FROM Invoice
            WHERE InvoiceDate LIKE '%2010%'
            ALTER TABLE dbo.InvoiceLine
            CHECK CONSTRAINT FK_InvoiceLineInvoiceId`
const q22 = `UPDATE Invoice
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
            WHERE BillingCountry = 'Germany' AND InvoiceDate BETWEEN '2011-01-02 00:00:00.000' AND '2014-01-01 00:00:00.000'`
const q23 = `UPDATE Invoice
            SET Invoice.BillingCountry = Customer.Country
            FROM Invoice
            JOIN Customer
            ON Customer.CustomerId = Invoice.InvoiceId
            WHERE Invoice.BillingCountry != Customer.Country`
const q24 = `ALTER TABLE Employee
            ADD Salary INT`
const q25 = `UPDATE Employee
            SET Salary = (RAND(CHECKSUM(NEWID())) * 70000 + 30000)`   
const q26 = `ALTER TABLE dbo.Invoice
            DROP COLUMN BillingPostalCode`


// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp
