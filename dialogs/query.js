
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var funcs_time = require('./funcs/funcs_time.js')


//Recast.ai
var recastai = require('recastai').default


//time functions 
var f0_transforme_time = funcs_time.f0_transforme_time


//////////////////////functions//////////////////////



module.exports = [


    function(session,results){

        //éléments pour requête 

        //LeChaboté
        session.userData.post_options = {
              url: "http://gopiko.cloudapp.net:8080/event/getevent",
              method: 'POST',
        };

        var dt = f0_transforme_time(session.userData.timemin)

        console.log(dt)

        var data = JSON.stringify([{User:session.userData.idstring,Times:dt,Addr:session.userData.address,Cat:session.userData.category,Lvl:session.userData.level}]);

        session.userData.post_options.form = data;

        var post_req = request(session.userData.post_options, function(error,response,body){

            if(!error){

                var res = JSON.parse(body)

                console.log(res)
                if(res == null){
                    session.send("Je suis désolé " + session.userData.name);
                    session.send("pour le moment, je n'ai pas d'évènements qui correspondent à ta demande mais tu peux essayer avec une autre recherche ;)");
                    session.beginDialog('/menu',session.userData);
                }else{
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
                                            .title("Ça m'intéresse 😍")
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
                                             .title("Ça m'intéresse 😍")
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
                                            .title("Ça m'intéresse 😍")
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
                    }else if(n>=3){
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
                                                    .title("Ça m'intéresse 😍")
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
                                                    .title("Ça m'intéresse 😍")
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
                                                    .title("Ça m'intéresse 😍")
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
                        builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"je me pré-inscris à "+ res1.Title,"je me pré-inscris à "+ res2.Title,"plus d'évènements","C'est bon merci :)"],{maxRetries:0});       
                    }
                }
            }else{
                console.log(error);
                session.send("Je suis désolé " + session.userData.name + "... 😕");
                session.send("j'ai un petit trou de mémoire, mais tu peux essayer avec une autre demande ;)");
                session.beginDialog('/menu',session.userData);
            }       
        })
    },
    function(session, results){
        if(!results.response){
            session.beginDialog("/menu",session.userData);
        }else{
            session.userData.index = results.response.index;
            session.beginDialog("/confirm",session.userData);
        }
            
            
    }
        

];