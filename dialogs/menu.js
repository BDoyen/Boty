


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
var time = [" matin"," après-midi"," soir"]
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
        builder.Prompts.choice(session,day+moment+", je peux t'aider à trouver...",["une course 🏃","une communauté 👥","un stage 👔👟","des astûces💡"],{maxRetries:0}); 
    
    },
    function(session,results){
        console.log(!results.response)
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
            switch(results.response.index){
            case 0:
                session.userData.category = 1;
                session.beginDialog('/run',session.userData);
                break;
            case 1:
                session.userData.category = 2;
                session.beginDialog('/cross',session.userData);
                break;
            case 2:
                session.beginDialog('/jobrun',session.userData);
            case 3: 
                session.beginDialog('/botlesmoi',session.userData);
                break;
            }
        }
    }
];