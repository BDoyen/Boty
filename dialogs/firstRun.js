

var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');

//APIs//

//Facebook
var FB = require('fb');
FB.setAccessToken("EAAFL0ok0ZCS0BAJbt8taLARWPEZAnYTBFGyZA5k5hCtWfZBPGFhOfgVnky8BXpgh6XPZAodJndVhZB494W6vxwqTM6VYvNmls9L7anXO1T7KbxxiPHv3dq2N59ABAtS8FZCuAZAKnkRZA2XaqV2SGXToL0HwMr64UaeuV4kMO3rZAmhAZDZD");


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
    session.userData.givenadresse = 0;
    session.userData.giventemps = 0;

    //LeChaboté API request
    session.userData.post_options = {
              url: "http://217.182.206.5:8080/user",
              method: 'POST',
              timeout:30000
    };
    var data = JSON.stringify([{Id:session.userData.idstring,Adresse:""}]);
    session.userData.post_options.form = data;
    
    var post_req = request(session.userData.post_options, function(error,response,body){
        if(error){
            console.log(error);
            post_req.end()
        }else{
            post_req.end()
        }
    });

    //Facebook API request
    FB.api('/'+session.userData.idstring+'?fields=first_name', function(response) {
        session.userData.name = response.first_name;
        if(!session.userData.name){
            session.send("Salut !")
        }else{
            session.send("Salut " + session.userData.name + " !"); 
        }
        session.send("Moi c'est Rungly, ton ami runner sur Messenger 🏃🐅");
        session.send("⚠ 🆕 En ce moment j'ai une nouveauté pour toi : des séances d'entraînement running avec un coach. Si ça t'intéresse, clique en bas 👇🏁👇");
        
        session.sendTyping();

        var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("👟 🏁 OBJECTIF 10km / 15km 🏁 👟")
                        .subtitle("Réaliser ses objectifs running n'a jamais été aussi simple...")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/frNHyb/Rungly_coach_first_Run.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#coachingByRungly")
                                .title("C'est parti ! 💪")
                        ]),
                    new builder.HeroCard(session)
                        .title("Une question à un coach 🙋")
                        .subtitle("Pose une question running à un des coachs Rungly")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/mF5sdH/Capture_d_e_cran_2018_02_24_a_11_33_17.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#askmyquestion")
                                .title("J'ai une question, coach ⁉️ " )
                        ]),
                    new builder.HeroCard(session)
                        .title("Le Quizz de la semaine")
                        .subtitle("Pour se la pêter devant ses amis runners")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/hqVRrw/Capture_d_e_cran_2018_01_24_a_23_34_21.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#quizzDeLaSemaine")
                                .title("Commencer 🚀")
                        ]),
                    new builder.HeroCard(session)
                        .title("Tous les articles de blog")
                        .subtitle("Et suivre les meilleurs blogueurs running")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/cPx0Jb/Capture_d_e_cran_2018_01_25_a_10_11_17.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#articlesdeblog")
                                .title("Un article 🗞")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver une course")
                        .subtitle("Profiter des meilleures sorties running du moment")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/jpiUBw/Capture_d_e_cran_2018_01_24_a_23_36_02.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"une course 🎽")
                                .title("une course 🏃")
                        ]),
                    new builder.HeroCard(session)
                        .title("Astuces running")
                        .subtitle("Pour courir (presque) comme un pro 😉")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/hLJwrw/Capture_d_e_cran_2018_01_24_a_23_36_44.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Une astuce 💡")
                                .title("Une astuce 💡")
                        ])
                ]);
        session.endDialog(msg);   
    });

    },
    function (session, results) {
        // Always say goodbye
        session.beginDialog('/',session.userData);
    }
];