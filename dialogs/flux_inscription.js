
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var funcs_time = require('./funcs/funcs_time.js')


//////////////////////functions//////////////////////


module.exports = [

	function(session){
        session.send("Tu peux recevoir chaque semaine une sélection des derniers articles " + session.userData.current_category);
        session.sendTyping();
        setTimeout(function(){
            builder.Prompts.choice(session,"S'inscrire au flux de ce blog ?",["Oui 😃","Ça ira merci"]);
        },3000)
	},
	function(session,results){
		if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Ok ça marche 😊");
                session.beginDialog("/menu",session.userData);
            }else if(valence >= 0){
                
                //LeChaboté                
                session.userData.post_options = {
                      url: "http://217.182.206.5:8080/article/ins",
                      method: 'POST',
                      timeout:30000
                };

                var data = JSON.stringify([{Id:session.userData.idstring,Action:"add",Category:session.userData.current_category}]);

                session.userData.post_options.form = data;

                var post_req = request(session.userData.post_options, function(error,response,body){

                    if(!error){
                        session.send("Top !");
                        session.send("Je te souhaite une bonne lecture 😉");
                        session.send("/menu",session.userData);
                    }else{
                        session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉")
                    }
                });
                
            }
        }else{
        	switch(results.response.index){
        		case 0:

        			//LeChaboté
                    session.userData.post_options = {
                          url: "http://217.182.206.5:8080/article/ins",
                          method: 'POST',
                          timeout:30000
                    };

                    var data = JSON.stringify([{Id:session.userData.idstring,Action:"add",Category:session.userData.current_category}]);

                    session.userData.post_options.form = data;

                     var post_req = request(session.userData.post_options, function(error,response,body){

                        if(!error){
                            session.send("Top !");
                            session.send("Je te souhaite une bonne lecture 😉");
                            session.send("/menu",session.userData);
                        }else{
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉")
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