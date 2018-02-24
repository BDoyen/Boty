var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var quick = require('botbuilder-facebook-quick-replies');


module.exports = [
	function(session){
		builder.Prompts.choice(session,"Si tu le souhaites je peux t'envoyer tous les Jeudi à 10h un petit récap des évents running à venir",["Oui 👍","ça ira merci"],{maxRetries:0});
	},
	function(session,results){
		if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("ok ça marche 🙂");
                session.beginDialog("/menu",session.userData);
            }else if(valence >= 0){
            		var data = JSON.stringify({Id:session.userData.idstring,Type:"event",Bool:true});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            session.beginDialog("/menu",session.userData);
	                        }else{
	                            session.send("C'est noté ✅ tu recevras chaque Jeudi un recap des prochains events running");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    });
            }
        }else{
            switch (results.response.index){
                case 0:
                    var data = JSON.stringify({Id:session.userData.idstring,Type:"event",Bool:true});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            session.beginDialog("/menu",session.userData);
	                        }else{
	                            session.send("C'est noté ✅ tu recevras chaque Jeudi un recap des prochains events running");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    });
                    break;
                case 1:
                    session.send("ok ça marche 🙂");
                	session.beginDialog("/menu",session.userData);
                    break;
        }  
	}
	}
]





