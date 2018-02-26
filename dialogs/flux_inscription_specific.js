
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');

//////////////////////functions//////////////////////

module.exports = [

	function(session){
		session.send("tu peux t'inscrire au flux d'un blog et recevoir chaque Mercredi une sélection des articles de ce blog");
        session.send("on propose aussi un flux condensé tout blog confondu 😎");
        builder.Prompts.choice(session,"À quel flux tu veux t'inscrire ?",["Tout condensé !","MoovMood","Runtastic","Geekandrun"],{maxRetries:0});
	},
	function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Ok 🙂");
                session.beginDialog("/menu",session.userData);
            }else if(valence >= 0){
                session.send("cool 🙂");
                session.beginDialog('/flux_inscription_all',session.userData);
            }
        }else{
        	switch(results.response.index){

        		case 0:
                    session.userData.post_options = {
                          url: "http://217.182.206.5:8080/inscription/",
                          method: 'POST',
                          timeout:30000
                    };
                    var data = JSON.stringify({Id:session.userData.idstring,Type:"article",Bool:true});
                    session.userData.post_options.form = data;
                    var post_req = request(session.userData.post_options, function(error,response,body){
                        if(!error){
                            session.send("c'est enregistré ✅");
                            session.beginDialog("/menu",session.userData);
                        }else{
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉");
                        }
                    });
        			break;

        		case 1:
            		
                    //LeChaboté                
                    session.userData.post_options = {
                          url: "http://217.182.206.5:8080/article/ins",
                          method: 'POST',
                          timeout:30000
                    };

                    var data = JSON.stringify({Id:session.userData.idstring,Action:"add",Category:"moovmood"});

                    session.userData.post_options.form = data;

                    var post_req = request(session.userData.post_options, function(error,response,body){

                        if(!error){
                            session.send("c'est enregistré ✅");
                            session.beginDialog("/menu",session.userData);
                        }else{
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉")
                        }
                    });
                    break;

                case 2:

                    //LeChaboté                
                    session.userData.post_options = {
                          url: "http://217.182.206.5:8080/article/ins",
                          method: 'POST',
                          timeout:30000
                    };

                    var data = JSON.stringify({Id:session.userData.idstring,Action:"add",Category:"runtastic"});

                    session.userData.post_options.form = data;

                    var post_req = request(session.userData.post_options, function(error,response,body){

                        if(!error){
                            session.send("c'est enregistré ✅");
                            session.beginDialog("/menu",session.userData);
                        }else{
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉")
                        }
                    });
                    break;

                case 3:

                    //LeChaboté                
                    session.userData.post_options = {
                          url: "http://217.182.206.5:8080/article/ins",
                          method: 'POST',
                          timeout:30000
                    };

                    var data = JSON.stringify({Id:session.userData.idstring,Action:"add",Category:"geekandrun"});

                    session.userData.post_options.form = data;

                    var post_req = request(session.userData.post_options, function(error,response,body){

                        if(!error){
                            session.send("c'est enregistré ✅");
                            session.beginDialog("/menu",session.userData);
                        }else{
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉")
                        }
                    });
                    break;

        	}
        }
	}
]