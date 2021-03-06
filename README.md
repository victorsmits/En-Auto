# PPE En-Auto 1953 - ECE PARIS


## Rapport du 9 mars :

* Création d'un gitignore
* Modification des dépendances de package.json
* Passage d'une forme hybride DB à une forme Mongo DB 
  * Suppression du dossier Sequelize
  * Création du dossier Mongo
* Mise à jour des dépendances et des variables d'environnement 
* Connexion du MongoDB dans le BackEnd avec test
 
 

## Rapport du 10 mars :

* Création d'un modèle utilisateur
* Création du modèle devis 
* Script de population DB pour les tests 
* Fin de tâche sur le back-end  du modèle utilisateur et de la connexion 
  * Création du modèle utilisateur Mongo
  * Hachage des mots de passe
  * Routage enregistrement et connexion dans le Backend
* Poursuite des tests DB
* Ajout de dépendance Nodemon
* Application du thème jekyll-theme-cayman
* Création d'une table de routage 
* Merge branche master 


## Rapport du 11 mars :

* Création du formulaire de récupération des informations de l'utilisateur 
* Mise à jour du service permettant l'authentification de l'utilisateur 
* Mise à jour de l'interface utilisateur et de l'affichage du devis
* Merge des branches 'JWT' et 'Frontend'
* Mise à jour du service permettant de calculer le devis 
* Début de travail sur les formes
  * Ajout de la fonction setUser() : permet de stocker localement les données de l'utilisateur 
  * Ajout de la fonction getUser() : permet de récupérer les données dde l'utilisateur depuis un stockage local 
* Créatiuon d'un sous-programme pour les calculs 


## Rapport du 12 mars : 

* Création d'une base de données avec le prix de l'eau en fonction de la commune 
* Ajout des différents à champ à remplir par l'utilisateur 
* Amélioration du formulaire : passage d'une suite de question à un onglet par 'catégorie'
* Travail sur le front stepper 
  * Développement du formulaire 
  * Travail sur les calculs 
* Amélioration des requêtes pour le devis et du chemin utilisateur 
* Fixation de problèmes sur l'angular
* Test vde la version Alpha1 :
  * Test du formulaire par étape 
  * Affichage du premier devis 

## Rapport du 13 mars :

* Calcule de la quantité d'eau récupérable par le toit
* Sauvegarde du devis dans l'espace client
* Ajout des fonctions pour obtenir le prix de l'eau selon le code postal
* Modèle du devis en pop-up
* Mise à jour des routes

##  Rapport du 14 mars :

* Page Profil
* Mise à jour du devis (plus complet)
* Ajout de test pour les nouvelles DB
* Ajout du calcul du volume du réservoir nécessaire pour stocker l'eau de pluie
* Correction de bugs et optimisation

## Rapport du 21 mars :

* Nouvelle base de donnée : volume d'eau récupérable par année et par ville (2)
