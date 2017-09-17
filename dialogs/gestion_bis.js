var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


//Recast.ai
var recastai = require('recastai').default


//resources from other scripts




//////////////////////functions//////////////////////



module.exports = [

		function(session){

			if(!session.userData.rest){
				session.send("Je suis désolé " + session.userData.name);
                session.send("pour le moment, je n'ai pas d'évènements qui correspondent à ta demande mais tu peux essayer avec une autre recherche ;)");
                session.beginDialog('/menu',session.userData);
			}else{

				var res = session.userData.rest;
				var n = session.userData.reslength = res.length;

                    if(n == 1){
                        var res0 = res[0]
                        session.userData.title0 = res0.Title
                        session.userData.id0 = res0.Id
                        session.userData.Time0 = res0.Time

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
                                            .title("S'inscrire 👟")
                                    ]),
                                    new builder.HeroCard(session)
                                        .images([
                                            builder.CardImage.create(session, "https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg")
                                        ])
                                        .buttons([
                                            builder.CardAction.imBack(session, "C'est bon merci :)")
                                                .title("C'est bon merci 🙂")
                                        ])    
                            ]);
                            
                        builder.Prompts.choice(session,msg,["C'est bon merci :)"],{maxRetries:0});
                    }else if(n == 2){
                        var res0 = res[0]
                        var res1 = res[1]

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
                                            .title("S'inscrire 👟")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res1.Title)
                                    .subtitle(res1.St)
                                    .images([
                                       builder.CardImage.create(session,res1.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session,res1.Url)
                                            .title("S'inscrire 👟")
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

                        builder.Prompts.choice(session,msg,["C'est bon merci 🙂"],{maxRetries:0});
                    }else if(n==3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]

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
                                                    .title("S'inscrire 👟")
                                            ]),        
                                new builder.HeroCard(session)
                                            .title(res1.Title)
                                            .subtitle(res1.St)
                                            .images([
                                                builder.CardImage.create(session,res1.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res1.Url)
                                                    .title("S'inscrire 👟")
                                            ]),       
                                new builder.HeroCard(session)
                                            .title(res2.Title)
                                            .subtitle(res2.St)
                                            .images([
                                                builder.CardImage.create(session,res2.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res2.Url)
                                                    .title("S'inscrire 👟")
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

                        builder.Prompts.choice(session,msg,["C'est bon merci 🙂"],{maxRetries:0});       
                    }else if(n>3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
               
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
                                                    .title("S'inscrire 👟")
                                            ]),        
                                new builder.HeroCard(session)
                                            .title(res1.Title)
                                            .subtitle(res1.St)
                                            .images([
                                                builder.CardImage.create(session,res1.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res1.Url)
                                                    .title("S'inscrire 👟")
                                            ]),       
                                new builder.HeroCard(session)
                                            .title(res2.Title)
                                            .subtitle(res2.St)
                                            .images([
                                                builder.CardImage.create(session,res2.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res2.Url)
                                                    .title("S'inscrire 👟")
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
                                                builder.CardImage.create(session, "https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg")
                                            ])
                                            .buttons([
                                                builder.CardAction.imBack(session, "C'est bon merci 🙂")
                                                    .title("C'est bon merci 🙂")
                                            ])           
                            ]);       

                        builder.Prompts.choice(session,msg,["plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});       
                    }

			}

		},
		function(session,results){
             if(!results.response){
            session.beginDialog("/menu",session.userData);
            }else{
                switch (session.userData.index){
                    case 0:
                        session.beginDialog("/catch",session.userData)
                        break;
                    case 1:
                        session.beginDialog('/gestion_bis',session.userData);
                        break;
                }
            }
			
        }
        
		








]