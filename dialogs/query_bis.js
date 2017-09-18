var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


//Recast.ai
var recastai = require('recastai').default


//resources from other scripts


//Gifs
var getGif = require('../get/getGif');
var gifsArray = getGif.gifsArray;
var G = getGif.G;


//sentiment variables
var positiveSentimentArray = new Array("😀","😁","😉","😊","😌","😄","😎","😃","😜","😛","🤗","🔥","😇","😺","👌","👍");
var negativeSentimentArray = new Array("😑","😣","😶","😐","😕","😞","😦","😬");
var l = positiveSentimentArray.length;
var k = negativeSentimentArray.length;




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
                                            .title("Voir le site ℹ️"),
                                        builder.CardAction.imBack(session, "je me pré-inscris à "+ res0.Title)
                                            .title("Ça m'intéresse 😍"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                            .title("Lieu du départ 🏁")
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

                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"C'est bon merci :)"],{maxRetries:0});
                    }else if(n == 2){
                        var res0 = res[0]
                        var res1 = res[1]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time


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
                                            .title("Voir le site ℹ️"),
                                        builder.CardAction.imBack(session, "je me pré-inscris à "+ res0.Title)
                                             .title("Ça m'intéresse 😍"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                            .title("Lieu du départ 🏁")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res1.Title)
                                    .subtitle(res1.St)
                                    .images([
                                       builder.CardImage.create(session,res1.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session,res1.Url)
                                            .title("Voir le site ℹ️"),
                                        builder.CardAction.imBack(session, "je me pré-inscris à "+ res1.Title)
                                            .title("Ça m'intéresse 😍"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng)
                                            .title("Lieu du départ 🏁")
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


                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"je me pré-inscris à "+ res1.Title,"C'est bon merci :)"],{maxRetries:0});
                    }else if(n==3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.title2 = res2.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.id2 = res2.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.Time2 = res2.Time

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
                                                    .title("Voir le site ℹ️"),
                                                builder.CardAction.imBack(session, "je me pré-inscris à "+ res0.Title)
                                                    .title("Ça m'intéresse 😍"),
                                                builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                                    .title("Lieu du départ 🏁")
                                            ]),        
                                new builder.HeroCard(session)
                                            .title(res1.Title)
                                            .subtitle(res1.St)
                                            .images([
                                                builder.CardImage.create(session,res1.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res1.Url)
                                                    .title("Voir le site ℹ️"),
                                                builder.CardAction.imBack(session, "je me pré-inscris à "+ res1.Title)
                                                    .title("Ça m'intéresse 😍"),
                                                builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng)
                                                    .title("Lieu du départ 🏁")
                                            ]),       
                                new builder.HeroCard(session)
                                            .title(res2.Title)
                                            .subtitle(res2.St)
                                            .images([
                                                builder.CardImage.create(session,res2.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res2.Url)
                                                    .title("Voir le site ℹ️"),
                                                builder.CardAction.imBack(session, "je me pré-inscris à "+ res2.Title)
                                                    .title("Ça m'intéresse 😍"),
                                                builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res2.Lat+"+"+res2.Lng)
                                                    .title("Lieu du départ 🏁")

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

                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à l'évènement "+ res0.Title,"je me pré-inscris à l'évènement "+ res1.Title,"je me pré-inscris à l'évènement "+ res2.Title,"C'est bon merci :)"],{maxRetries:0});       
                    }else if(n>3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.title2 = res2.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.id2 = res2.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.Time2 = res2.Time

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
                                                    .title("Voir le site ℹ️"),
                                                builder.CardAction.imBack(session, "je me pré-inscris à "+ res0.Title)
                                                    .title("Ça m'intéresse 😍"),
                                                builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                                    .title("Lieu du départ 🏁")
                                            ]),        
                                new builder.HeroCard(session)
                                            .title(res1.Title)
                                            .subtitle(res1.St)
                                            .images([
                                                builder.CardImage.create(session,res1.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res1.Url)
                                                    .title("Voir le site ℹ️"),
                                                builder.CardAction.imBack(session, "je me pré-inscris à "+ res1.Title)
                                                    .title("Ça m'intéresse 😍"),
                                                builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng)
                                                    .title("Lieu du départ 🏁")
                                            ]),       
                                new builder.HeroCard(session)
                                            .title(res2.Title)
                                            .subtitle(res2.St)
                                            .images([
                                                builder.CardImage.create(session,res2.Image)
                                            ])
                                            .buttons([
                                                builder.CardAction.openUrl(session,res2.Url)
                                                    .title("Voir le site ℹ️"),
                                                builder.CardAction.imBack(session, "je me pré-inscris à "+ res2.Title)
                                                    .title("Ça m'intéresse 😍"),
                                                builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res2.Lat+"+"+res2.Lng)
                                                    .title("Lieu du départ 🏁")
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
                                                builder.CardAction.imBack(session, "C'est bon merci :)")
                                                    .title("C'est bon merci 🙂")
                                            ])    
                            ]);       

                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à l'évènement "+ res0.Title,"je me pré-inscris à l'évènement "+ res1.Title,"je me pré-inscris à l'évènement "+ res2.Title,"plus d'évènements","C'est bon merci :)"],{maxRetries:0});       
                    }

			}

		},
		function(session,results){

			if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Si un des évènements t'intéresse, tu peux cliquer sur 'Ça m'intéresse' pour te pré-inscrire")
            }else if(valence >= 0){
                session.send("Ok ! si un des évènements t'intéresse, cliquer sur 'Ça m'intéresse' pour te pré-inscrire ;)")
            }else{}
            session.endDialogWithResult({
            response: null,
            resumed: builder.ResumeReason.completed
            });
            
        }else{
            switch (results.response.index){
                case 0:
                    var item = session.userData.title0;
                    session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + item);
                    session.send("Je t'enverrai un petit rappel 24h avant 😉");
                    var gif = gifsArray[math.round(math.random()*(G+1))];
                    var msg = new builder.Message(session)
                        .attachments([
                            new builder.AnimationCard(session)
                                .media([
                                    {url: gif}
                                ])
                    ]);

                    var data = JSON.stringify([{Event:session.userData.id0,User:session.userData.idstring,Times:session.userData.Time0}]);

                    session.userData.post_options = {
                        url: "http://217.182.206.5:8080/push/inscription",
                        method: 'POST',
                        form:data
                    };

                    var post_req = request(session.userData.post_options, function(error,response,body){
                        if(error){
                            console.log(error);
                            session.send(";) 🐅");
                            }else{}
                    });

                    session.endDialog(msg);
                    break;
                case 1:
                    if(session.userData.reslength != 1){
                        var item = session.userData.title1;
                        session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + item);
                        session.send("Je t'enverrai un petit rappel 24h avant 😉");
                        var gif = gifsArray[math.round(math.random()*(G+1))];
                        var msg = new builder.Message(session)
                            .attachments([
                                new builder.AnimationCard(session)
                                    .media([
                                        {url: gif}
                                    ])
                        ]);

                        var data = JSON.stringify([{Event:session.userData.id1,User:session.userData.idstring,Times:session.userData.Time1}]);

                        session.userData.post_options = {
                            url: "http://217.182.206.5:8080/push/inscription",
                            method: 'POST',
                            form:data
                        };

                        var post_req = request(session.userData.post_options, function(error,response,body){
                            if(error){
                                console.log(error);
                                session.send(";) 🐅");
                                }else{}
                        });

                        session.endDialog(msg);
                        break;
                    }else{
                        session.beginDialog('/catch',session.userData);
                        break;
                    }
                case 2:
                    if(session.userData.reslength != 2){
                        var item = session.userData.title2;
                        session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + item);
                        session.send("Je t'enverrai un petit rappel 24h avant 😉");
                        var gif = gifsArray[math.round(math.random()*(G+1))];
                        var msg = new builder.Message(session)
                            .attachments([
                                new builder.AnimationCard(session)
                                    .media([
                                        {url: gif}
                                    ])
                        ]);

                        var data = JSON.stringify([{Event:session.userData.id2,User:session.userData.idstring,Times:session.userData.Time2}]);

                        session.userData.post_options = {
                            url: "http://217.182.206.5:8080/push/inscription",
                            method: 'POST',
                            form:data
                        };

                        var post_req = request(session.userData.post_options, function(error,response,body){
                            if(error){
                                console.log(error);
                                session.send(";) 🐅");
                                }else{}
                        });

                        session.endDialog(msg);
                        break;
                    }else{
                        session.beginDialog('/catch',session.userData);
                        break;
                    }
                case 3:
                    if(session.userData.reslength != 3){
                        session.beginDialog('/query_bis',session.userData);
                    }else{
                        session.beginDialog('/catch',session.userData);    
                    }
                    break;
                case 4:
                    session.beginDialog('/catch',session.userData);
                    break;
            }
        }
		}








]