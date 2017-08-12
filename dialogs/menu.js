


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


module.exports = [

    function(session){

        var d = new Date();
        var num_day = d.getDay();
        var h = d.getHours();
        if((4<h)&&(h<12)){
            session.userData.moment = 0;
        }else if((12<=h)&&(h<19)){
            session.userData.moment = 1;
        }else{
            session.userData.moment = 2;
        }
        var moment = time[session.userData.moment];
        var day = week[num_day];
        builder.Prompts.choice(session,day + " " + moment +", je peux t'aider à trouver",["une course🏃","une communauté👥","un stage,alternance👔👟","des astûces💡"],{maxRetries:0}); 
    
    },
    function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence == 0){
                session.beginDialog('/',session.userData);
            }else if(valence > 0){
                session.userData.positiveemoji = positiveSentimentArray[math.round(math.random()*(l+1))];
                session.send(session.userData.positiveemoji);
                session.beginDialog('/',session.userData);
            }else{
                session.userData.negativeemoji = negativeSentimentArray[math.round(math.random()*(l+1))];
                session.send(session.userData.positiveemoji);
                session.beginDialog("/",session.userData);
            }
        }else{
            switch (results.response.index){
            case 0:
                session.userData.category = "event";
                session.beginDialog('/run',session.userData);
                break;
            case 1:
                session.userData.category = "meet";
                if(session.userData.givenadresse*session.userData.giventemps == 1){
                    session.beginDialog('/query',session.userData);
                }else if(session.userData.givenadresse == 1){
                    session.beginDialog('/temps',session.userData);
                }else if(session.userData.giventemps == 1){
                    session.beginDialog('/adresse',session.userData);
                }else{
                    session.beginDialog('/adresse',session.userData);
                }
                break;
            case 2:
                session.userData.category = "network";
                if(session.userData.givenadresse*session.userData.giventemps == 1){
                    session.beginDialog('/query',session.userData);
                }else if(session.userData.givenadresse == 1){
                    session.beginDialog('/temps',session.userData);
                }else if(session.userData.giventemps == 1){
                    session.beginDialog('/adresse',session.userData);
                }else{
                    session.beginDialog('/adresse',session.userData);
                }
                break;
            case 3: 
                session.beginDialog('/botlesmoi',session.userData);
                break;
            }
        }
    }
];