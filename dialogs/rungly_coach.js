
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
        session.send("Bienvenue à toi dans le programme Rungly coach ! 😍");
        session.send("Les coachs Rungly sont là pour t'aider à donner le meilleur de toi-même sur un 10km ou 15km 🔝")
        builder.Prompts.choice(session,"❓ Comment ça marche ❓",["Découvrir 👇👇","Back ◀️"],{maxRetries:1})
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

