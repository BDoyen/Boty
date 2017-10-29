var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		session.send("Voici un petit condensé des réponses du quizz de lundi dernier.")
		session.send("Le thème était...");
		session.send("hydratation : tous les chiffres indispensables au running et plus généralement à ton bien-être 🏃‍🚰 📊");
		session.send("Notre corps est composé à plus de 50% d'eau (près de 60% exactement). Le plus impressionant concerne notre cerveau : plus de 70% d'eau dans nos têtes 😅 Pour alimenter son corps en eau, 1,5 à 2 Litres quotidien sont recommandés. Pendant un effort tel une sortie running, ce niveau augmente : 0,5 Litre par heure 💪 Enfin, la température idéale d'assimilation de l'eau se trouve entre 15°C et 20°C 🌡️");
		session.beginDialog('/menu',session.userData);
	}


]