var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');



//////////////////////functions//////////////////////


module.exports = [

	function(session){
		session.send("Voici tes courses à venir :");

		//LeChaboté
        session.userData.post_options = {
              url: "http://217.182.206.5:8080/push/getpush",
              method: 'POST',
              timeout:30000
        };
		var data = JSON.stringify({User:session.userData.idstring});
		session.userData.post_options.form = data;

		var post_req = request(session.userData.post_options, function(error,response,body){

			 if(!error){

                var res = JSON.parse(body)

                if(res == null){
                    session.send("Je suis désolé " + session.userData.name);
                    session.send("Tu ne t'es pas encore pré-inscris à un run, mais il n'est jamais trop tard ;)")
                    post_req.end();
                    session.beginDialog('/menu',session.userData);

                }else{

                    var n = session.userData.reslength = res.length;
                    
                    if(n == 1){

                        var res0 = res[0]

                        session.userData.deleteid0 = res0.Id

                        var msg = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments([
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res0.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session,res0.Url)
                                            .title("S'inscrire 👟"),
                                        builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            .title("Stop notif' 🔕")
                                    ]),
                                    new builder.HeroCard(session)
                                        .images([
                                            builder.CardImage.create(session, "https://image.ibb.co/cVvGiw/no_notif_emoji.jpg")
                                        ])
                                        .buttons([
                                            builder.CardAction.imBack(session, "Plus de notif' 🔕")
                                                .title("Plus de notif' 🔕")
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
                            
                        post_req.end();

                        builder.Prompts.choice(session,msg,["Stop notif' 🔕","Plus de notif' 🔕","C'est bon merci 🙂"],{maxRetries:0});
                        

                    }else if(n == 2){
                    	
                        var res0 = res[0]
                        var res1 = res[1]

                        session.userData.deleteid0 = res0.Id
                        session.userData.deleteid1 = res1.Id

                        var msg = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments([
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res0.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session,res0.Url)
                                            .title("S'inscrire 👟"),
                                        builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            .title("Stop notif' 🔕")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res1.Title)
                                    .subtitle(res1.St)
                                    .images([
                                       builder.CardImage.create(session,res1.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session,res1.Url)
                                            .title("S'inscrire 👟"),
                                        builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            .title("Stop notif' 🔕")
                                    ]),
                                new builder.HeroCard(session)
                                        .images([
                                            builder.CardImage.create(session, "https://image.ibb.co/cVvGiw/no_notif_emoji.jpg")
                                        ])
                                        .buttons([
                                            builder.CardAction.imBack(session, "Plus de notif' 🔕")
                                                .title("Plus de notif' 🔕")
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

                        post_req.end();
                        builder.Prompts.choice(session,msg,["Stop notif' 🔕","Stop notif' 🔕","Plus de notif' 🔕","C'est bon merci 🙂"],{maxRetries:0});
                        

                    }else if(n==3){

                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]


                        session.userData.deleteid0 = res0.Id
                        session.userData.deleteid1 = res1.Id
                        session.userData.deleteid2 = res2.Id


                        var msg = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments([
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                            .subtitle(res0.St)
                                            .images([
                                                builder.CardImage.create(session,res0.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res0.Url)
                                                    .title("S'inscrire 👟"),
                                                builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            		.title("Stop notif' 🔕")
                                            ]),        
                                new builder.HeroCard(session)
                                            .title(res1.Title)
                                            .subtitle(res1.St)
                                            .images([
                                                builder.CardImage.create(session,res1.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res1.Url)
                                                    .title("S'inscrire 👟"),
                                                builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            		.title("Stop notif' 🔕")
                                            ]),       
                                new builder.HeroCard(session)
                                            .title(res2.Title)
                                            .subtitle(res2.St)
                                            .images([
                                                builder.CardImage.create(session,res2.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res2.Url)
                                                    .title("S'inscrire 👟"),
                                                builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            		.title("Stop notif' 🔕")
                                            ]),
                                new builder.HeroCard(session)
	                                        .images([
	                                            builder.CardImage.create(session, "https://image.ibb.co/cVvGiw/no_notif_emoji.jpg")
	                                        ])
	                                        .buttons([
	                                            builder.CardAction.imBack(session, "Plus de notif' 🔕")
	                                                .title("Plus de notif' 🔕")
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

                            post_req.end();
                            builder.Prompts.choice(session,msg,["Stop notif' 🔕","Stop notif' 🔕","Stop notif' 🔕","Plus de notif' 🔕","C'est bon merci 🙂"],{maxRetries:0});
                            

                    }else if(n>3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]

                        session.userData.deleteid0 = res0.Id
                        session.userData.deleteid1 = res1.Id
                        session.userData.deleteid2 = res2.Id

                        
                        session.userData.rest = res.slice(3,n)

                        var msg = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments([
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                            .subtitle(res0.St)
                                            .images([
                                                builder.CardImage.create(session,res0.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res0.Url)
                                                    .title("S'inscrire 👟"),
                                                 builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            		.title("Stop notif' 🔕")
                                            ]),        
                                new builder.HeroCard(session)
                                            .title(res1.Title)
                                            .subtitle(res1.St)
                                            .images([
                                                builder.CardImage.create(session,res1.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res1.Url)
                                                    .title("S'inscrire 👟"),
                                                builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            		.title("Stop notif' 🔕")
                                            ]),       
                                new builder.HeroCard(session)
                                            .title(res2.Title)
                                            .subtitle(res2.St)
                                            .images([
                                                builder.CardImage.create(session,res2.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res2.Url)
                                                    .title("S'inscrire 👟"),
                                                builder.CardAction.imBack(session,"Stop notif' 🔕")
                                            		.title("Stop notif' 🔕")
                                            ]),
                                new builder.HeroCard(session)
                                            .images([
                                                builder.CardImage.create(session, "https://image.ibb.co/iPDBia/plus_events.jpg")
                                            ])
                                            .buttons([
                                                builder.CardAction.imBack(session, "plus d'évènements")
                                                    .title("plus ➕")
                                            ]),
                                new builder.HeroCard(session)
	                                        .images([
	                                            builder.CardImage.create(session, "https://image.ibb.co/cVvGiw/no_notif_emoji.jpg")
	                                        ])
	                                        .buttons([
	                                            builder.CardAction.imBack(session, "Plus de notif' 🔕")
	                                                .title("Plus de notif' 🔕")
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

                        post_req.end();
                        builder.Prompts.choice(session,msg,["Stop notif' 🔕","Stop notif' 🔕","Stop notif' 🔕","Plus de notif' 🔕","plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});
                            
                    }
                }
            }else{
                console.log(error);
                session.send("Je suis désolé " + session.userData.name + "... 😕");
                session.send("j'ai un petit trou de mémoire, mais tu peux essayer avec une autre demande ;)");
                post_req.end();
                session.beginDialog('/',session.userData);
            } 

		});

	},

	function(session, results){
        if(!results.response){
            session.beginDialog("/menu",session.userData);
        }else{

            switch (results.response.index){

                case 0:

                	session.send("C'est bon "+session.userData.name+", ta désinscription de ce push a bien été prise en compte 🔕 😉")
                	
                    var data = JSON.stringify({User:session.userData.idstring,Event:session.userData.deleteid0});

                    session.userData.post_options = {
                        url: "http://217.182.206.5:8080/push/deleteevent",
                        method: 'POST',
                        form:data,
                        timeout:30000
                    };

                    var post_req = request(session.userData.post_options, function(error,response,body){
                        if(error){
                            console.log(error);
                            session.send(";) 🐅");
                            post_req.end();
                        }else{
                            post_req.end();
                            session.beginDialog("/menu",session.userData);
                        }
                    });
                	break;
                    
                case 1:

                	if(session.userData.reslength != 1){

                		session.send("C'est bon "+session.userData.name+", ta désinscription de ce push a bien été prise en compte 🔕 😉")
	                	var data = JSON.stringify({User:session.userData.idstring,Event:session.userData.deleteid1});

	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/push/deleteevent",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };

	                    var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
                                session.beginDialog("/menu",session.userData);
	                        }else{
	                            post_req.end();
                                session.beginDialog("/menu",session.userData);
	                        }
	                    });

	                }else{
	                	session.send("C'est bon "+session.userData.name+", ta désinscription de tous les pushs a bien été prise en compte 🔕 😉")
	                	var data = JSON.stringify({User:session.userData.idstring,Event:session.userData.deleteid0});

	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/push/deleteevent/all",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };

	                    var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
                                session.beginDialog("/menu",session.userData);
	                        }else{
	                            post_req.end();
                                session.beginDialog("/menu",session.userData);
	                        }
	                    });
	                }

                	break;
                    
                case 2:

                	if(session.userData.reslength > 2){

                		session.send("C'est bon "+session.userData.name+", ta désinscription de ce push a bien été prise en compte 🔕 😉")
	                	var data = JSON.stringify({User:session.userData.idstring,Event:session.userData.deleteid1});

	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/push/deleteevent",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };

	                    var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            post_req.end();
                                session.beginDialog("/menu",session.userData);
	                        }else{
	                            post_req.end();
                                session.beginDialog("/menu",session.userData);
	                        }
	                    });
	                    
	                }else{

	                	if(session.userData.reslength == 2){
	                		session.send("C'est bon "+session.userData.name+", ta désinscription de tous les pushs a bien été prise en compte 🔕 😉")
		                	var data = JSON.stringify({User:session.userData.idstring,Event:session.userData.deleteid0});

		                    session.userData.post_options = {
		                        url: "http://217.182.206.5:8080/push/deleteevent/all",
		                        method: 'POST',
		                        form:data,
		                        timeout:30000
		                    };

		                    var post_req = request(session.userData.post_options, function(error,response,body){
		                        if(error){
		                            console.log(error);
		                            session.send(";) 🐅");
		                            post_req.end();
                                    session.beginDialog("/menu",session.userData);
		                        }else{
		                            post_req.end();
                                    session.beginDialog("/menu",session.userData);
		                        }
		                    });
	                	}else{
	                		session.beginDialog("/catch",session.userData);
	                	}


	                	
	                }

                	break;

                case 3:

                	if(session.userData.reslength != 2){
                		session.send("C'est bon "+session.userData.name+", ta désinscription de tous les pushs a bien été prise en compte 🔕 😉")
		                	var data = JSON.stringify({User:session.userData.idstring,Event:session.userData.deleteid0});

		                    session.userData.post_options = {
		                        url: "http://217.182.206.5:8080/push/deleteevent/all",
		                        method: 'POST',
		                        form:data,
		                        timeout:30000
		                    };

		                    var post_req = request(session.userData.post_options, function(error,response,body){
		                        if(error){
		                            console.log(error);
		                            session.send(";) 🐅");
		                            post_req.end()
		                        }else{
		                            post_req.end()
		                        }
		                    });
		                }else{
		                	session.beginDialog("/catch",session.userData);
		                }
                	break;

                case 4:
                	if(session.userData.reslength > 3){
                		session.beginDialog('/gestion_bis',session.userData);
                	}else{
                		session.beginDialog("/catch",session.userData);
                	}
                	break;

                case 5:
                	session.beginDialog("/catch",session.userData);
                	break;

            }
        }
            
            
    }

]