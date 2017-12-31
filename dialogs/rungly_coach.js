
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
		session.send("J'ai besoin de toi en 2018 "+ session.userData.name+" 😁");
		builder.Prompts.choice(session,"es-tu ok pour répondre à quelques questions ?",["oui!","non merci"],{maxRetries:0})
	},
	
	function(session,results){
		if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
            	session.beginDialog("/catch",session.userData);
            }else if(valence >= 0){
               session.beginDialog("/rungly_coach_questionnaire",session.userData);
            }else{
                session.beginDialog("/catch",session.userData);
            }
        }else{
            switch (results.response.index) {
            case 0:
                session.beginDialog('/rungly_coach_questionnaire',session.userData);
                break;
            case 1:
                session.beginDialog('/catch',session.userData);
                break;
            }
        }
	}

]