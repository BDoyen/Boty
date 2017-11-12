var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		session.send("Voici un petit condensé des réponses du quizz de lundi dernier.")
		session.send("Le thème était...");
		session.send("Pluie, neige, froid : des conseils pour courir par tous les temps ❄️ ⛅");
		session.send("En termes d'équipement, le plus important est que vos chaussures soient équipées d’une semelle qui offre une bonne adhérence sur sol mouillé 👟 Comment affronter le vent ? Si le vent souffle fort dehors, commencez par courir face au vent puis terminez votre session avec le vent dans le dos 💨 Lorsqu’il fait un froid glacial dehors, une bonne technique respiratoire est essentielle : respirez par le nez afin de réchauffer l’air avant qu’il n’arrive dans vos poumons et expirez par la bouche 😉 Cinq à dix minutes d’échauffement suffisent pour éviter un démarrage à froid. Et enfin, l’automne/hiver est la saison idéale pour travailler votre endurance. Choisissez donc un entraînement constant et à faible intensité pendant cette période 🏃");
		session.beginDialog('/menu',session.userData);
	}


]