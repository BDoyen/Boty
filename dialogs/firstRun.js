

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
      path: '/user',
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



//entrance dialog
module.exports = [

    function (session) {

    var name = session.message.address.user.id;
    session.userData.idstring = name.toString();

    console.log(session.userData.idstring)


    var data = JSON.stringify([{Id:session.userData.idstring,Adresse:""}]);

    var post_req = http.request(post_options, function(res){
        res.on('data', function (chunk){})
    });


    post_req.write(data);
    post_req.end();



    FB.api('/'+session.userData.idstring+'?fields=first_name', function(response) {
        session.userData.name = response.first_name;
        session.send("Salut " + session.userData.name);
        session.send("Moi c'est Boty et je suis là pour t'aider à trouver les meilleures sorties et bons plans running autour de toi :)");
        builder.Prompts.choice(session,"On est partis ?",["Oui !","Pas encore..."],{maxRetries:0});
        session.userData.givenadresse = 0;
        session.userData.giventemps = 0; 
    });
    

    },
    function (session, results) {
        var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("Trouver une course")
                        .subtitle("Et profiter des meilleurs bons plans du moment")
                        .images([
                            builder.CardImage.create(session, "https://media.giphy.com/media/14d8cvUx2o982I/giphy.gif")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Je recherche une course... 🏃")
                                .title("Trouver une course 🏃")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver une communauté")
                        .subtitle("Pour rencontrer de nouveaux runners")
                        .images([
                            builder.CardImage.create(session, "https://media.giphy.com/media/wSln2Kx4N4VPi/giphy.gif")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Je recherche une communauté de runners... 🏃‍👥")
                                .title("Trouver une communauté 👥")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver un stage/alternance")
                        .subtitle("Viens passer un entretien en running")
                        .images([
                            builder.CardImage.create(session,"http://static.tumblr.com/3ec6a95c9d7177cdca08d616ad250b53/sxathna/ZhKohat67/tumblr_static_d5b4h45ce00k08o8c8w0scg8c.jpg")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Je recherche un stage,alternance... 🏃👔")
                                .title("JobRun 👔")
                        ]),
                        new builder.HeroCard(session)
                        .title("Astuces running")
                        .subtitle("Pour courir comme les pros ;)")
                        .images([
                            builder.CardImage.create(session, "https://media.giphy.com/media/35Ceb7KBCP5jG/giphy.gif")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Une astûce...💡")
                                .title("Une astuce 💡")
                        ])
                ]);
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence == 0){
                session.send("Ok, attends moi 2s, j'enfile mes runnings...👟👟");
                session.sendTyping();
                session.send("Voilà un aperçu de ce que je peux faire pour toi");
                session.endDialog(msg);
            }else if(valence > 0){
                session.send("Ok! attends moi 2s, j'enfile mes runnings...👟👟");
                session.sendTyping();
                session.send("Voilà un aperçu de ce que je peux faire pour toi");
                session.endDialog(msg);
            }else{
                session.beginDialog("/catch");
            }
        }else{
            switch (results.response.index) {
            case 0:
                session.send(':)');
                session.send("Voilà un aperçu de ce que je peux faire pour toi");
                session.endDialog(msg);
                break;
            case 1:
                session.beginDialog('/catch',session.userData);
                break;
            }
        }
    },
    function (session, results) {
        // Always say goodbye
        session.beginDialog('/catch',session.userData);
    }
];