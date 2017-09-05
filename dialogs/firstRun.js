

var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


//APIs//

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
              url: "http://217.182.206.5:8000/user",
              method: 'POST',
    };
    var data = JSON.stringify([{Id:session.userData.idstring,Adresse:""}]);
    session.userData.post_options.form = data;
    var post_req = request(session.userData.post_options, function(error,response,body){
        if(error){
            console.log(error);
        }else{}
    });



    //Facebook API request
    FB.api('/'+session.userData.idstring+'?fields=first_name', function(response) {
        session.userData.name = response.first_name;
        if(!session.userData.name){
            session.send("Salut !")
        }else{
            session.send("Salut " + session.userData.name + " !"); 
        }
        session.send("Moi c'est Rungly " + "🐆" + " et je suis là pour t'aider à trouver les meilleures sorties et bons plans running autour de toi 🌴🏢");
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
                        .subtitle("Et profiter des meilleures sorties du moment")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/c4oRsF/Capture_d_e_cran_2017_08_12_a_17_15_54.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Je recherche une course... 🏃")
                                .title("courir 🏃")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver une communauté")
                        .subtitle("Pour rencontrer de nouveaux runners ")
                        .images([
                            builder.CardImage.create(session, "https://image.ibb.co/kcWeCF/Capture_d_e_cran_2017_08_12_a_17_17_14.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Je recherche une communauté de runners... 🏃‍👥")
                                .title("communauté 👥")
                        ]),
                    new builder.HeroCard(session)
                        .title("Trouver un stage/alternance")
                        .subtitle("Viens passer un entretien en running")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/dzNmsF/Capture_d_e_cran_2017_08_12_a_17_18_29.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"Je recherche un stage,alternance... 🏃👔")
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
                                .imBack(session,"Une astûce...💡")
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
        session.beginDialog('/',session.userData);
    }
];
