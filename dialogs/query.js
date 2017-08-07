

var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');
var http = require('http');



//APIs//

//LeChaboté
var post_options = {
      host: '217.182.206.5',
      port: '8000',
      path: '/getevent',
      method: 'POST'
};


//Facebook
var FB = require('fb');
FB.setAccessToken("EAAfV9rKoBcIBAH8B2sVAgJacS8JYlRvDAUctPbysZAK7NJ9s0beZC8Xi1J4b8jyqu4FZBgq9F3mohyT0ebptrseUx3QZBLU74ypcxzpjotG7xv5FZC1zTSHTmoevq794eJbc4r4hVDDCXYWOTRsZA1ojDTno0GZCQZBEZCfmftdCUZBAZDZD");



//Recast.ai
var recastai = require('recastai').default


//resources from other scripts

//Tips
var getTip = require('../get/getTip');
var tipsArray = getTip.tipsArray;
var N = getTip.N;

//Gifs
var getGif = require('../get/getGif');
var gifsArray = getGif.gifsArray;
var G = getGif.G;


//sentiment variables
var positiveSentimentArray = new Array("😀","😁","😉","😊","😌","😄","😎","😃","😜","😛","🤗","🔥","😇","😺","👌","👍");
var negativeSentimentArray = new Array("😑","😣","😶","😐","😕","😞","😦","😬");
var l = positiveSentimentArray.length;
var k = negativeSentimentArray.length;

//time variables
var days = new Array('lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche');
var time = ["en matinée","dans l'après-midi","le soir venu"]
var week = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]


//////////////////////functions//////////////////////



module.exports = [


    function(session,results){

        //éléments pour requête 
        console.log(session.userData.timemin)
        console.log(session.userData.address)
        console.log(session.userData.level)
        console.log(session.userData.category)

        var dt = session.userData.timemin

        var data = JSON.stringify([{Times:dt.toString(),Addr:session.userData.address,Cat:session.userData.category,Lvl:session.userData.level}]);


        var post_req = http.request(post_options, function(res){
            res.on('data', function (chunk) {
            
            //bobo API result
            var res = JSON.parse(chunk);

            switch(res.length){
                case 0:
                    session.send("Je suis désolé " + session.userData.name + " 😕");
                    session.send("je n'ai pas trouvé d'évènements qui correspondent à tes critères pour le moment...");
                    //
                    break;
                case 1:
                    var res0 = res[0]
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
                                        .title("Inscription 🎫"),
                                    builder.CardAction.imBack(session, "je me pré-inscris à "+ res0.Title)
                                        .title("Ça m'intéresse 😍")
                                ]),
                            new builder.HeroCard(session)
                                .images([
                                    builder.CardImage.create(session, "http://botyawesome.azurewebsites.net/img/profile.png")
                                ])
                                .buttons([
                                    builder.CardAction.imBack(session, "C'est bon merci :)")
                                        .title("C'est bon merci 🙂")
                                ])    
                        ]);
                    session.userData.giventemps = 0;
                    builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"C'est bon merci :)"],{maxRetries:0});
                    case 2:
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
                                            .title("Inscription 🎫"),
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
                                            .title("Inscription 🎫"),
                                        builder.CardAction.imBack(session, "je me pré-inscris à "+ res1.Title)
                                            .title("Ça m'intéresse 😍")
                                    ]),
                                new builder.HeroCard(session)
                                    .images([
                                        builder.CardImage.create(session, "http://botyawesome.azurewebsites.net/img/profile.png")
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session, "C'est bon merci :)")
                                            .title("C'est bon merci 🙂")
                                    ])    
                            ]);
                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"je me pré-inscris à "+ res1.Title,"C'est bon merci :)"],{maxRetries:0});
                        case 3:
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
                                                .title("Inscription 🎫"),
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
                                                .title("Inscription 🎫"),
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
                                                .title("Inscription 🎫"),
                                            builder.CardAction.imBack(session, "je me pré-inscris à "+ res2.Title)
                                                .title("Ça m'intéresse 😍")
                                        ]),
                                    new builder.HeroCard(session)
                                        .images([
                                            builder.CardImage.create(session, "http://botyawesome.azurewebsites.net/img/profile.png")
                                        ])
                                        .buttons([
                                            builder.CardAction.imBack(session, "C'est bon merci :)")
                                                .title("C'est bon merci 🙂")
                                        ])    
                                ]);
                            session.userData.giventemps = 0;
                            builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"je me pré-inscris à "+ res1.Title,"je me pré-inscris à "+ res2.Title,"C'est bon merci :)"],{maxRetries:0}); 
            }
            })
        });


        post_req.write(data);
        post_req.end();


    },
    function(session, results){
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
            var item
            switch (results.response.index){
                case 0:
                    item = "Event 1";
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
                    session.endDialog(msg);
                    break;
                case 1:
                    item = "Event 2";
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
                    session.endDialog(msg);
                    break;
                case 2:
                    item = "Event 3";
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
                    session.endDialog(msg);
                    break;
                case 3:
                    session.beginDialog('/catch',session.userData);
                    break;
            }
        }
    }    
];