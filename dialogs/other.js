
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var quick = require('botbuilder-facebook-quick-replies');


module.exports = [
	function(session){
		builder.Prompts.choice(session,"Autre chose ?",["➕","Ça ira merci"]);
	},
	function(session,results){
		if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.endDialog("Ok, à bientôt " + session.userData.name + " 🙂");
                }else if(valence >= 0){
                	session.beginDialog("/menu",session.userData);
                }
            }else{
                switch (results.response.index){
                	case 0:
                		session.beginDialog("/menu",session.userData);
                		break;
                	case 1:
                		session.endDialog("Ok, à bientôt " + session.userData.name + " 🙂");
                    	break;
                }
            }
	}
]