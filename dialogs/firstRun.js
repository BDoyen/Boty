

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
        session.send("Moi c'est Rungly " + "🐆" + " et comme tu le sais peut-être, je suis là pour t'aider à t'informer sur le running, trouver des courses et entraînements ainsi que les meilleures promos du moment 🏃🌴");
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
                        .title("Coaching - questionnaire")
                        .subtitle("J'ai besoin de toi en 2018 !")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/mxOyZw/Capture_d_e_cran_2017_12_30_a_14_44_30.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#coachingByRungly")
                                .title("C'est parti ! 💪")
                        ]),
                    new builder.HeroCard(session)
                        .title("Quizz de la semaine")
                        .subtitle("Pour tout savoir sur le running")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/c6Uijb/Capture_d_e_cran_2017_12_04_a_03_59_00.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#quizzDeLaSemaine")
                                .title("Commencer 🚀")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver une course")
                        .subtitle("Et profiter des meilleures sorties du moment")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/deV8W5/Capture_d_e_cran_2017_09_15_a_21_55_04.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"une course 🎽")
                                .title("courir 🏃")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver une communauté")
                        .subtitle("Pour rencontrer de nouveaux runners ")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/nxghr5/Capture_d_e_cran_2017_09_15_a_21_56_30.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"avec une communauté 👟")
                                .title("communauté 👥")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver un stage/alternance")
                        .subtitle("Viens passer un entretien en running")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/i4QWjQ/Capture_d_e_cran_2017_09_15_a_21_56_17.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"JobRun 🏃👔")
                                .title("JobRun 🏃👔")
                        ]),
                        new builder.HeroCard(session)
                        .title("Astuces running")
                        .subtitle("Pour courir comme les pros ;)")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/eb6Pev/Capture_d_e_cran_2017_08_12_a_17_25_07.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Une astuce 💡")
                                .title("Une astuce 💡")
                        ])
                ]);
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence == 0){
                session.send("Ok, attends moi 2s, j'enfile mes runnings...👟🐯");
                session.sendTyping();
                session.send("Voilà un aperçu de ce que je peux faire pour toi");
                session.endDialog(msg);
            }else if(valence > 0){
                session.send("Ok! attends moi 2s, j'enfile mes runnings...👟🐯");
                session.sendTyping();
                session.send("Voilà un aperçu de ce que je peux faire pour toi");
                session.endDialog(msg);
            }else{
                session.beginDialog("/catch",session.userData);
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
        session.beginDialog('/',session.userData);
    }
];