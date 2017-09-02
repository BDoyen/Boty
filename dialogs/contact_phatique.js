
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module



//Facebook
var FB = require('fb');
FB.setAccessToken("EAAFL0ok0ZCS0BAGADUvzuFBcGKcH9Dcj4YSMRimsUAZBd145iE8sL75r8BvVQCmxzHYMynrVVWAKmYyCVfwZAlgTMDeeGcQsTXOZBZBtIpiI4nXDW47sVoCxrZBcnXMQoFlGkN6fKgYAYVaATb08GfuIAFmDf9ryYKEgc24UqmhwZDZD");



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

    function(session){
        session.send("Ça va bien, merci :) ");
        session.sendTyping()
        session.send("Je reviens d'une petite séance running là, ça m'a fait un bien fou...");
        builder.Prompts.choice(session,"Et toi, qu'en dis-tu ?",["C'est parti !","Pas tout de suite..."],{maxRetries:0})
    },
    function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence == 0){
                session.send("Ok, sinon...");
                session.beginDialog('/menu',session.userData);
            }else if(valence > 0){
                session.userData.positiveemoji = positiveSentimentArray[math.round(math.random()*(l+1))];
                session.send(session.userData.positiveemoji);
                session.beginDialog('/menu',session.userData);
            }else{
                session.beginDialog("/catch",session.userData);
            }
        }else{
            switch (results.response.index){
                case 0:
                    session.userData.positiveemoji = positiveSentimentArray[math.round(math.random()*(k+1))];
                    session.send(session.userData.negativeemoji);
                    session.beginDialog('/menu',session.userData);
                    break
                case 1:
                    session.beginDialog("/catch",session.userData);
            }
        }
    }
    
];