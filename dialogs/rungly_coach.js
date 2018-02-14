
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
        session.send("Bienvenue à toi dans le programme Rungly coach ! 😍");
        session.send("Rungly coach est là pour t'aider à courir un 10km ou 15km dans un temps optimal pour toi ! 🔝")
        builder.Prompts.choice(session,"❓ Comment ça marche ❓",["Continuer 👇👇","Menu"],{maxRetries:1})
	},
    function(session,results){
        if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.beginDialog('/rungly_coach_1',session.userData);
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.beginDialog('/rungly_coach_1',session.userData);
                        break;
                    case 1: 
                        session.send("Ok");
                        session.beginDialog('/menu',session.userData);
                        break;
            }
        }
    }
]

