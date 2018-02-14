
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var quick = require('botbuilder-facebook-quick-replies');


module.exports = [
	function(session){
		builder.Prompts.choice(session,"Cool ?",["👍","👎"],{maxRetries:0})
	},
	function(session,results){
		if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok 🙂");
                	session.send("Tu peux te désincrire ici");
                    session.beginDialog("/gestion_push",session.userData);
                }else if(valence >= 0){
                	session.send("😊")
                	session.beginDialog("/other",session.userData);
                }
            }else{
                switch (results.response.index){
                	case 0:
                		session.send("😊")
                		session.beginDialog("/other",session.userData);
                		break;
                	case 1:
                		session.send("Ok 🙂");
                		session.send("Tu peux te désincrire ici");
                    	session.beginDialog("/gestion_push",session.userData);
                    	break;
                }
            }
	}
]