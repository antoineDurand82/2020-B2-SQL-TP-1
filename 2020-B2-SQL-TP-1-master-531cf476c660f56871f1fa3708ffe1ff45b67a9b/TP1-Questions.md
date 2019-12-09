# B2 - TP SQL 1



### Partie 1 - Requêtes

*Pour chaque question, écrire la requête qui permet d'afficher les informations demandées.*



- 1) La liste des chansons dont la durée est inférieure à la chanson avec l'id 3457

- 2) La liste des chansons qui ont le même type de media que la chason "Rehab"

- 3) La liste des playlists avec l'ID et le nom de la playlist en plus des infos suivantes:

  - le nombre de chansons par playlist
  - la durée totale de la playlist
  - la durée moyenne des chansons de la playlist

- 4) La liste des playlists dont la durée est supérieure à la durée moyenne des playlists enregistrées

- 5) Afficher les playlists qui ont le même nombre de chansons que les playlists numéro 1 ou 13

- 6) Afficher les clients qui ont fait une commande dont le total est supérieur à n'importe quelle commande faite en France (Exclure de la liste les commandes passées en France)

- 7) Pour chaque pays dans lequel il y a eu une commande :

  - Afficher le nom du pays
  - La commande la moins élevée
  - La commande la plus élevée
  - Le total de commande moyen
  - Le nombre total de commande
  - Le pourcentage de commande par rapport aux autres pays (en nombre et en total)

- 8) La liste des chansons qui sont plus cheres que le prix moyen de l'ensemble des chansons

  - Afficher les informations de la table Track
  - Le nom du media
  - Le prix moyen global
  - Le prix moyen du media

- 9) Les chansons dont le prix est en-dessous du prix median du genre auquel la chanson appartient

  - Afficher les informations de la table Track
  - Le nom du genre
  - Le prix median du genre

- 10) Les playlist avec

  - le nombre d'artistes différents présents sur la playlist
  - le nombre de chansons par artiste
  - le prix moyen des chansons par artiste
  - le nombre maximum d'artiste dans une playlist

- 11) Lister tous les pays présents dans la base de données. (dans les tables Employee, Customer et Invoice) Indiquer pour chaque pays, le nombre de lignes correspondantes dans toute la base. (Chaque pays doit apparaître une seule fois dans la requête)

- 12) A partir de la requête précédente, ajouter le nombre de fois où l'on retrouve le pays dans chacune des trois tables, suivre l'exemple ci-dessous: (Attention à bien respecter le nom et l'ordre des colonnes de l'exemple):

  |  Pays   | Total | Employee | Customer | Invoice |
  | :-----: | :---: | :------: | :------: | :-----: |
  | France  |  30   |    2     |    10    |   18    |
  | Germany |  25   |    0     |    8     |   17    |

- 13) Les commandes qui comprennent au moins une chanson qui est la chanson la plus longue de son genre

- 14) La liste de toutes les commandes avec:

  - Le coût moyen par chanson
  - La durée total des chansons
  - Le coût des chansons par seconde

- 15) Le nom et prénom des employés an ajoutant

  - Le nombre total de ventes
  - Le total des ventes par employés
  - Le pays dans lequel ils ont fait le plus de ventes (en nombre)
  - Le type de media qu'ils ont le plus vendu (en Total)
  - Le pourcentage de ventes (en Total) par rapport au meilleur vendeur

- 16) Le nom et le prénom du 3ème meilleur vendeur
- 17) La liste des playlists avec l'id, le nom, puis :
  
  - le pourcentage de chansons de la playlists qui ont été vendues au moins 2 fois



### Partie 2 - Création d'une base

18) A partir du schéma ci-dessous, recréer le script permettant de générer la base de données. (Attention au contraintes !)

![db-schema](https://lh3.googleusercontent.com/NfFLax1Pqb3xkhjzaxor7tv8CEZQ2P1migDYg5dOdmnrdZ5quNo1kcXZsb5I0-gh98Dp8GIMC9TRyoQd_wUzBaDzMBC6jxzu52asfkM3EpWaMrUApAycclBC7l5FbFO76fZw3RwN)



### Partie 3 - Modifier des données

Pour chacune des questions suivantes, indiquer le script qui permet d'effectuer l'opération décrite sur la base de données Chinook.

- 19) Ajouter 3 chansons de votre choix
- 20) Ajouter 2 employés situés en France
- 21) Supprimer les commandes effectuées en 2010
- 22) Modifier les commandes effectuées en Allemagne entre 2011 et 2014 et les attribuer au client francais ayant fait le plus grand nombre de commandes
- 23) Modifier les commandes qui ont un pays de livraison différent de celui du client, remplacer le pays de livraison par le pays du client
- 24) Ajouter une colonne Salary (type int) sur la table Employee
- 25) Ajouter un salaire aléatoire compris entre 30,000 et 100,000 pour chaque employé (fonction RAND())
- 26) Supprimer la colonne BillingPostCode sur la table Invoice



