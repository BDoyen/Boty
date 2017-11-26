var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		session.send("Voici un condensé en vidéo des réponses du quizz de lundi dernier.");
		var card = new builder.VideoCard(session)
			.title('5 meilleurs conseils')
		    .subtitle('🏃‍ pour bien débuter le running')
		    .image(builder.CardImage.create(session, 'https://s3-us-west-2.amazonaws.com/converterpoint-2/thumbnails/463676004e26798dcf6123ed25809a99.jpg'))
	        .media([
	            { url: 'https://s3-us-west-2.amazonaws.com/converterpoint-2/encodings/4b188aeac9a9ccb69a34471c31675718.mp4' }
		     ])
		var msg = new builder.Message(session).addAttachment(card);
	    session.send(msg)
	    builder.Prompts.choice(session,"ça t'a plu ?",["c'est cool !",'bof...',"pas pour moi"],{maxRetries:0});
		
	},
	function(session,results){
		session.send("Ok ! 🙂")
		session.beginDialog("/menu",session.userData);
	}


]