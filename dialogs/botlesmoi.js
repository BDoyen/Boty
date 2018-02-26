


var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module


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


//tips trigger
module.exports = [

    function(session,results){
        var tip = tipsArray[math.round(math.random()*(N+1))];
        session.send("Running Tips by Rungly 🔆🏃");
        if(!tip){w
            tipsArray[N]
        }else{
            session.send(tip);
        }
        builder.Prompts.choice(session,"Encore ?",["oui !","ça ira merci...","une tous les 2 jours"],{maxRetries:0})  
    },
    function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence >= 0){
                session.beginDialog('/botlesmoi',session.userData);
            }else{
                session.beginDialog('/menu',session.userData);
            }
        }else{
            switch(results.response.index){
                case 0:
                    session.beginDialog('/botlesmoi',session.userData);
                    break;
                case 1:
                    session.beginDialog('/menu',session.userData);
                    break;
                case 2:
                    session.beginDialog('/botlesmoi_push',session.userData);
                    break;
            }
        }
    }
];






