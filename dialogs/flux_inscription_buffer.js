
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


//////////////////////functions//////////////////////


module.exports = [

	function(session){
		builder.Prompts.choice(session,"Ça t'a plu ?",["Oui 😍","Bof bof..."];
	},
	function(session,results){
		if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Ok ça marche 😊");
                session.beginDialog("/menu",session.userData);
            }else if(valence >= 0){
                session.send("Ok ! Si tu souhaites voir plus d'articles "+ session.userData.current_category + ", tu peux t'abonner au flux d'articles de ce blog");
                session.send("/flux_inscription",session.userData);
            }
        }else{
        	switch(results.response.index){
        		case 0:
        			session.send("Ok ! Si tu souhaites voir plus d'articles "+ session.userData.current_category + ", tu peux t'abonner au flux d'articles de ce blog");
                	session.send("/flux_inscription",session.userData);
        			break;
        		case 1:
        			session.send("Ok ça marche 😊");
                	session.beginDialog("/menu",session.userData);
        			break;
        	}
        }
	}
]