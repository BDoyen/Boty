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
                        session.userData.url0 = res0.Url

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
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res0.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                            .title("Lieu du départ 🏁")
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

                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title,"plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0}); 
                        
                    }else if(n == 2){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res0 = res[0]
                        var res1 = res[1]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.url0 = res0.Url
                        session.userData.url1 = res1.Url


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
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res0.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                            .title("Lieu du départ 🏁")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res1.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res1.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng)
                                            .title("Lieu du départ 🏁")
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

                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title,"plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});        
   
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
                        session.userData.url0 = res0.Url
                        session.userData.url1 = res1.Url
                        session.userData.url2 = res2.Url
                        
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
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res0.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                            .title("Lieu du départ 🏁")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res1.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res1.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng)
                                            .title("Lieu du départ 🏁")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res2.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res2.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res2.Lat+"+"+res2.Lng)
                                            .title("Lieu du départ 🏁")
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

                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title,"plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});        
                        
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
                        session.userData.url0 = res0.Url
                        session.userData.url1 = res1.Url
                        session.userData.url2 = res2.Url

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
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res0.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng)
                                            .title("Lieu du départ 🏁")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res1.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res1.Title)
                                            .title("Plus d'infos ℹ️"),
                                        builder.CardAction.openUrl(session,"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng)
                                            .title("Lieu du départ 🏁")
                                    ]),
                                new builder.HeroCard(session)
                                    .title(res0.Title)
                                    .subtitle(res0.St)
                                    .images([
                                        builder.CardImage.create(session,res2.Image)
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"plus d'infos sur " + res2.Title)
                                            .title("Plus d'infos ℹ️"),
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
                                            builder.CardAction.imBack(session, "C'est bon merci 🙂")
                                                .title("C'est bon merci 🙂")
                                        ])    
                            ]);

                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title,"plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});     
                    }
			}
		},
		function(session,results){

		if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Si un des évènements t'intéresse, tu peux cliquer sur 'Plus d'infos ℹ' pour tout savoir dessus")
                }else if(valence >= 0){
                    session.send("Ok ! Si un des évènements t'intéresse, tu peux cliquer sur 'Plus d'infos ℹ' pour tout savoir dessus")
                }
        }else{
            switch (results.response.index){
                case 0:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                    break;
                case 1:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                    break;
                case 2:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                    break;
                case 3:
                    session.beginDialog("/query_bis",session.userData);
                    break;
                case 4:
                    session.beginDialog("/menu",session.userData);
                    break;
            }
        }
}



]