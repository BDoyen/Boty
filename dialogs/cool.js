var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [


function(session){
	builder.Prompts.choice(session,"Ça te plaît ? 😊",["Oui!","Plutôt","Non, pas trop"],{maxRetries:0})
},
function(session,results){
	if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok ça marche");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.send("Ok ça marche ! Je suis content de pouvoir t'aider ;)");
                    session.beginDialog('/menu',session.userData);
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.send("Super ! je suis content de pouvoir t'aider :)");
                        session.beginDialog('/menu',session.userData);
                        break;
                    case 1: 
                        session.send("Ok. Je suis content si je peux t'aider :)");
                        session.beginDialog('/menu',session.userData);
                        break;
                    case 2: 
                        builder.Prompts.choice(session,"Ok ça marche");
                        session.beginDialog('/menu',session.userData);
                        break;
                }
            }
}

]