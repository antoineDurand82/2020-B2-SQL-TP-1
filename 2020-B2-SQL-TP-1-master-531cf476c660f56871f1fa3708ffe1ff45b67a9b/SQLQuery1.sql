
SET DATEFORMAT ymd;

/* Partie 1 */

SELECT Name
FROM Track
WHERE Milliseconds < (SELECT Milliseconds
						FROM Track
						WHERE TrackId = 3457);


SELECT Name
FROM Track
WHERE MediaTypeId = (SELECT MediaTypeId
					FROM Track
					WHERE Name = 'Rehab');


SELECT Playlist.PlaylistId, Playlist.Name, COUNT(PlaylistTrack.TrackId) "Nombre de track", SUM(Track.Milliseconds) "Durée total playlist", SUM(Track.Milliseconds)/COUNT(PlaylistTrack.TrackId) "Durée moyenne track"
FROM Playlist
JOIN PlaylistTrack
	ON PlaylistTrack.PlaylistId = Playlist.PlaylistId
JOIN Track
	ON PlaylistTrack.TrackId = Track.TrackId
GROUP BY Playlist.PlaylistId, Playlist.Name


SELECT DISTINCT(Playlist.Name)
FROM Playlist
JOIN PlaylistTrack
	ON Playlist.PlaylistId = PlaylistTrack.PlaylistId
JOIN Track
	ON PlaylistTrack.TrackId = Track.TrackId
WHERE (SELECT SUM(Track.Milliseconds) FROM Track) > (SELECT SUM(Track.Milliseconds)/COUNT(Track.TrackId)
							FROM Track)


SELECT NbTrack.name, NbTrack.id
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
WHERE NbTrack.id NOT IN(1,13)




SELECT Customer.FirstName, Invoice.Total
FROM Customer
JOIN Invoice
	ON Customer.CustomerId = Invoice.CustomerId
WHERE Invoice.Total > (SELECT MAX(Total) FROM Invoice WHERE BillingCountry = 'France')


 SELECT DISTINCT(Invoice.BillingCountry) "Country", MIN(Invoice.Total) "Min", MAX(Invoice.Total) "Max", AVG(Invoice.Total) "Avg", COUNT(Invoice.Total) "Nb", (CONVERT(DECIMAL(6,3),COUNT(Invoice.InvoiceId))/(SELECT CONVERT(DECIMAL(6,3),COUNT(Invoice.InvoiceId)) FROM Invoice))*100 "Moy nb", (SUM(Invoice.Total)/(SELECT SUM(Invoice.Total) FROM Invoice))*100 "Moy price"
 FROM Invoice
 GROUP BY Invoice.BillingCountry


SELECT Track.TrackId, Track.Name, Track.AlbumId, Track.MediaTypeId, Track.GenreId, Track.Composer, Track.Milliseconds, Track.Bytes, Track.UnitPrice, MediaType.Name, (SELECT AVG(Track.UnitPrice) FROM Track) "Prix Moyen Globale", AVG(Track.UnitPrice) "Prix Moyen Media"
FROM Track
	JOIN MediaType
		ON MediaType.MediaTypeId = Track.MediaTypeId
WHERE Track.UnitPrice > (SELECT AVG(Track.UnitPrice) FROM Track)
GROUP BY Track.TrackId, Track.Name, Track.AlbumId, Track.MediaTypeId, Track.GenreId, Track.Composer, Track.Milliseconds, Track.Bytes, Track.UnitPrice, MediaType.Name




SELECT Track.TrackId, Track.Name, Track.AlbumId, Track.MediaTypeId, Track.GenreId, Track.Composer, Track.Milliseconds, Track.Bytes, Track.UnitPrice,	(SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Track.UnitPrice) OVER (PARTITION BY genre2.Name) AS medianMedia FROM Track Track JOIN Genre genre2  ON Track.GenreId = genre2.GenreId WHERE genre.genreId = genre2.GenreId GROUP BY Track.genreId, genre2.Name, Track.UnitPrice) as "medianMedia"
FROM Track
JOIN Genre
	ON Track.GenreId = Genre.GenreId
WHERE Track.UnitPrice < (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY Track.UnitPrice) OVER (PARTITION BY genre2.Name) AS medianMedia FROM Track Track JOIN Genre genre2  ON Track.GenreId = genre2.GenreId WHERE genre.genreId = genre2.GenreId GROUP BY Track.genreId, genre2.Name, Track.UnitPrice)


SELECT COUNT(DISTINCT(Album.ArtistId)) AS "Artistes unique", (SELECT COUNT(TrackId) FROM Track), MAX(Album.ArtistId)
FROM PlaylistTrack
JOIN Track
	ON Track.TrackId = PlaylistTrack.TrackId
JOIN Album
	ON Album.AlbumId = Track.AlbumId
GROUP BY PlaylistTrack.PlaylistId



SELECT  pays.Country AS "Pays", count(pays.country) "Nb"
FROM (
SELECT Customer.country FROM Customer
UNION ALL
SELECT Invoice.BillingCountry FROM Invoice
UNION ALL
SELECT Employee.Country FROM Employee
) pays
GROUP BY pays.Country


SELECT pays.Country AS "Pays", COUNT(pays.country) AS "Nb",
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
              GROUP BY pays.Country



SELECT Invoice.InvoiceId
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
GROUP BY Invoice.InvoiceId


IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'NewChinook')
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
CREATE INDEX [IFK_Role_userId] ON [dbo].[User_role] ([role_id]);

DELETE FROM `Invoice`
WHERE InvoiceDate LIKE '%2010%'
