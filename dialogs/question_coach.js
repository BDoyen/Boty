var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	function(session){
        session.send("")
		builder.Prompts.choice(session,"Si tu as une question à poser à un coach sur le running ou bien sur notre programme d'entraînement, tu peux le faire ici 👇👇",["Poser une question ❓","ça ira merci"],{maxRetries:0})
	},
	function(session,results){
		if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok ça marche");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    builder.Prompts.text(session,"Ok super, quelle est ta question ❓");
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        builder.Prompts.text(session,"Ok super, quelle est ta question ❓");
                        break;
                    case 1: 
                        session.send("Ok ça marche");
                        session.beginDialog('/menu',session.userData);
                        break;
            }
        }
	},
	function(session,results){
		session.userData.question_coach = results.response;
        console.log(session.userData.question_coach)
		session.userData.post_options = {
                        url: "http://217.182.206.5:8080/ticket/add",
                        method: 'POST',
                        timeout:30000
                    };
                    var data = JSON.stringify({Id:session.userData.idstring,Text:session.userData.question_coach});
                    session.userData.post_options.form = data;
                    var post_req = request(session.userData.post_options, function(error,response,body){
                        console.log(error);
                        if(!error){
                        	session.send("ta question a bien été prise en compte, un coach te répondra au plus vite 😊 🏃");
                        	session.beginDialog('/menu',session.userData);
                        }else{
                        	session.send("Ok ! Un coach te répondra au plus vite 😊 🏃");
                        	session.beginDialog('/menu',session.userData);
                        }
                    })

	}
]