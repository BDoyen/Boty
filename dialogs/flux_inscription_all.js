
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');

//////////////////////functions//////////////////////

module.exports = [

	function(session){
		session.send("Tu recevras chaque semaine une sélection des derniers articles de blog running")
        builder.Prompts.choice(session,"Je valide ton inscription à ce flux ?",["Oui 😃","Ça ira merci"]);
	},
	function(session,results){
		
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Ok ça marche 😊");
                session.beginDialog("/menu",session.userData);
            }else if(valence >= 0){

                session.userData.post_options = {
                      url: "http://217.182.206.5:8080/inscription/",
                      method: 'POST',
                      timeout:30000
                };
                var data = JSON.stringify([{Id:session.userData.idstring,Type:"article",Bool:true}]);
                session.userData.post_options.form = data;
                var post_req = request(session.userData.post_options, function(error,response,body){
                    if(!error){
                        session.send("Top !");
                        session.send("Je te souhaite une bonne lecture 😉");
                        session.send("/menu",session.userData);
                    }else{
                        session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉");
                    }
                });
            }
        }else{
        	switch(results.response.index){

        		case 0:
                    session.userData.post_options = {
                          url: "http://217.182.206.5:8080/inscription/",
                          method: 'POST',
                          timeout:30000
                    };
                    var data = JSON.stringify([{Id:session.userData.idstring,Type:"article",Bool:true}]);
                    session.userData.post_options.form = data;
                    var post_req = request(session.userData.post_options, function(error,response,body){
                        if(!error){
                            session.send("Top !");
                            session.send("Je te souhaite une bonne lecture 😉");
                            session.send("/menu",session.userData);
                        }else{
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉");
                        }
                    });
        			break;

        		case 1:
        			session.send("Ok ça marche 😊");
                	session.beginDialog("/menu",session.userData);
        			break;
        	}
        }
	}
]