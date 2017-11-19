var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		session.send("Voici un petit condensé des réponses du quizz de lundi dernier.")
		session.send("Le thème était...");
		session.send("Petit focus sur la Vitamine D ☀️ 😎");
		session.send("La vitamine D est indispensable pour activer le système immunitaire de l’organisme. 🍲 Le corps a besoin de graisses pour dissoudre et absorber la vitamine D. Il est ainsi recommandé de toujours consommer vitamine D + aliments gras de qualité (noix, avocats, huiles végétales de haute qualité). ☀️ En automne/hiver, il est conseillé de s’exposer 30 minutes par jour. 🍄 La vitamine D se trouve également dans les champignons ! Particulièrement les champignons de Paris. 💪 Des chercheurs ont démontré la corrélation entre un apport régulier en vitamine D et le gain de force musculaire pour des athlètes de compétition");
		session.beginDialog('/menu',session.userData);
	}


]