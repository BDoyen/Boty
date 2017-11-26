var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		session.send("Voici un condensé en vidéo des réponses du quizz de lundi dernier.")
		var msg_video = new builder.VideoCard(session)
	        .title('5 meilleurs conseils')
	        .subtitle('🏃‍ pour bien débuter le running')
	        .media([
	            { url: 'https://vimeo.com/user75183681/videorungly1' }
	        ])
	    session.send(msg_video);
	    builder.Prompts.choice(session,"ça t'a plu ?",["Oui ! ",'Un peu...',"Non"],{maxRetries:0});
		
	},
	function(session,results){
		session.send("Ok ! 🙂")
		session.beginDialog("/menu",session.userData);
	}


]