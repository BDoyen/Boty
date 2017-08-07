


var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');


//APIs//

//LeChaboté
var post_options = {
      host: '217.182.206.5',
      port: '9000',
      path: '/All',
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


//tips trigger
module.exports = [

    function(session,results){
        session.userData.lasttip = tipsArray[math.round(math.random()*(N+1))];
        session.send("🔆🏃-Running Tips by Boty-🏃🔆");
        session.send(session.userData.lasttip);
        builder.Prompts.choice(session,"Encore ?",["oui !","ça ira merci..."],{maxRetries:0})  
    },
    function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence >= 0){
                session.beginDialog('/botlesmoi',session.userData);
            }else{
                session.beginDialog('/catch',session.userData);
            }
        }else{
            switch(results.response.index){
                case 0:
                    session.beginDialog('/botlesmoi',session.userData);
                    break;
                case 1:
                    session.beginDialog('/catch',session.userData);
                    break;
            }
        }
    }

];






