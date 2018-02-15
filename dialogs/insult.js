
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module




///// functions /////


module.exports = [

	function(session){
		session.send("😇 keep cool")
		builder.Prompts.choice(session,"on repart ?",["Oui 👍","ça ira merci"])
	},
	function(session,results){
		if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence >= 0){
                session.send("Ok, attends moi 2s, j'enfile mes runnings...👟🐆");
                session.beginDialog("/menu")
            }else{
            	session.beginDialog("/menu")
            }
        }else{
            switch (results.response.index) {
            case 0:
                session.send(':)');
                session.send("Ok, attends moi 2s, j'enfile mes runnings...👟🐆");
                session.beginDialog("/menu")
                break;
            case 1:
                session.beginDialog('/menu',session.userData);
                break;
            }
        }
    }
	

]