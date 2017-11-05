var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		session.send("Voici un petit condensé des réponses du quizz de lundi dernier.")
		session.send("Le thème était...");
		session.send("Les petits problèmes typiques liés à la course et comment les éviter 🏃🏋️");
		session.send("Un des plus classiques : les courbatures (les fameuses...) ! Elles sont en général dues à de microdéchirures des muscles qui surviennent pendant l'effort 🙄 Une bonne alimentation, notamment riche en Vitamine E aide aussi à mieux récupérer 🥕 Pendant l'effort, les maux de tête viennent en général d'un manque de sels minéraux, d'où l'intérêt d'une bonne hydratation aussi 🚰 Enfin, ce sont les genoux qui amortissent la plupart des chocs. D'où ce conseil un peu original : améliorer sa coordination en allant courir sur des terrains moins lisses et un peu plus accidentés (forêt et chemins par exemple)");
		session.beginDialog('/menu',session.userData);
	}


]