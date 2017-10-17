
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');
var funcs_time = require('./funcs/funcs_time.js')



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


//time functions 
var f1_time = funcs_time.f1_time
var f2_time = funcs_time.f2_time


//////////////////////functions//////////////////////


module.exports = [

    function(session){
        builder.Prompts.choice(session,"Quand est-ce que tu veux aller courir ? 🕑",["cette semaine","la semaine prochaine","ce mois"],{maxRetries:0})
    },
    function(session,results){
        session.userData.tokentime = 'fdf3c62ee815158983106d5f5189af81' //rungly-time
        var client = new recastai(session.userData.tokentime)
        var request = client.request

        if(!results.response){
            session.userData.text_time = session.message.text
        }else{
            session.userData.text_time = results.response.entity
        }

        request.analyseText(session.userData.text_time)
            .then(function(res){

                if(!res.intent()){
                    if(!res.entities.datetime){
                        session.send("🐅 👟");
                        session.beginDialog('/menu',session.userData);
                    }else{
                        var accuracy = res.entities.datetime[0].accuracy;
                        var chronology = res.entities.datetime[0].chronology;
                        var iso = res.entities.datetime[0].iso;
                        session.userData.giventemps = 1;
                        f2_time(session,chronology,accuracy,iso,slug)
                        session.beginDialog('/cross',session.userData);
                    }
                }else{
                        var intent = res.intent();
                        var slug = intent.slug;

                        if(!res.entities.datetime){
                            if(slug == 'jamais'){
                                session.send(":(");
                                session.endDialog();
                            }else if(slug == 'greetings'){
                                session.send("coucou :)");
                                session.endDialog();
                            }else if(slug == 'goodbye'){
                                session.send("À bientôt j'espère :)");
                                session.endDialog();
                            }else{
                                session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                                session.endDialog(); 
                            }
                        }else{
                            var accuracy = res.entities.datetime[0].accuracy;
                            var chronology = res.entities.datetime[0].chronology;
                            var iso = res.entities.datetime[0].iso;
                            session.userData.giventemps = 1;
                            f2_time(session,chronology,accuracy,iso,slug)
                            session.beginDialog('/cross',session.userData);
                        }
                    }

            }).catch(function(err){
                console.log(err);
                session.endDialog();   
            });
        //with buttons
 
        
    }
];