var builder = require("botbuilder");
var restify = require('restify'); //pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		
		session.send("Voici les options d'inscription et de désinscriptions aux notifs:");

		var msg = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments([
                                new builder.HeroCard(session)
                                    .title("Notif quizz")
                                    .subtitle('👟 tous les lundis, un quizz running/fitness/bien-être ')
                                    .images([
                                        builder.CardImage.create(session,'https://image.ibb.co/cVvGiw/no_notif_emoji.jpg')
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"s'inscrire aux quizz ✅")
                                            .title("S'inscrire ✅"),
                                        builder.CardAction.imBack(session,"stop quizz ❌")
                                            .title("Stop notif' ❌")
                                    ]),
                                    new builder.HeroCard(session)
                                    .title("Notif events")
                                    .subtitle('👟 tous les jeudis, les meilleurs events à venir autour de toi')
                                    .images([
                                        builder.CardImage.create(session,'https://image.ibb.co/cVvGiw/no_notif_emoji.jpg')
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"s'inscrire aux notifs events ✅")
                                            .title("S'inscrire ✅"),
                                        builder.CardAction.imBack(session,"stop notif events ❌")
                                            .title("Stop notif' ❌")
                                    ]),
                                    new builder.HeroCard(session)
                                        .images([
                                            builder.CardImage.create(session, "https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg")
                                        ])
                                        .buttons([
                                            builder.CardAction.imBack(session, "C'est bon merci 🙂")
                                                .title("C'est bon merci 🙂")
                                    ]) 
                                       
                            ]);

            builder.Prompts.choice(session,msg,["s'inscrire aux quizz ✅","stop quizz ❌","s'inscrire aux notifs events ✅","stop notif events ❌","C'est bon merci 🙂"],{maxRetries:0});

	},

	function(session,results){

		session.send('Ok!');

		var options = {
              url: "http://217.182.206.5:8080/inscription/",
              method: 'POST',
              timeout:30000
        };

		switch (results.response.index){
			
			case 0:
				var data = JSON.stringify({Id:session.userData.idstring,Type:'quizz',Bool:true});
				options.form = data;

				var post_req = request(options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
	                            session.beginDialog('/menu',session.userData);
	                        }else{
	                        	post_req.end();
	                            session.send("C'est tout bon 🎉 Tu es inscrit aux quizz !");
	                            session.beginDialog('/menu',session.userData);
	                        }
	            });
	            break;

			case 1:
				var data = JSON.stringify({Id:session.userData.idstring,Type:'quizz',Bool:false});
				options.form = data;

				var post_req = request(options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
	                        }else{
	                            post_req.end();
	                            session.send("C'est tout bon 🙂 Tu es désinscrit des quizz");
	                            session.beginDialog('/menu',session.userData);
	                        }
	            });
	            break;

			case 2:
				var data = JSON.stringify({Id:session.userData.idstring,Type:'event',Bool:true});
				options.form = data;

				var post_req = request(options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
	                        }else{
	                            post_req.end();
	                            session.send("C'est tout bon 🎉 Tu es inscrit aux events !");
	                            session.beginDialog('/menu',session.userData);
	                        }
	            });
	            break;

			case 3:
				var data = JSON.stringify({Id:session.userData.idstring,Type:'event',Bool:false});
				options.form = data;

				var post_req = request(options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
	                        }else{
	                            post_req.end();
	                            session.send("C'est tout bon 🙂 Tu es désinscrit des events");
	                            session.beginDialog('/menu',session.userData);

	                        }
	            });
	            break;

			case 4:
				session.beginDialog("/catch",session.userData);
                break;
		}


	}


]