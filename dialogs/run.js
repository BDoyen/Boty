
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');


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


module.exports = [

    function(session){
        session.send("(y)");
        builder.Prompts.choice(session,"Quel type de course t'intéresse le plus ?",["relax 🕶","solidaire 💚","fun 🍭","un peu musclé 💪","pour les pros 🏅"],{maxRetries:0})
    },

    function(session,results){
        console.log(results.response)
        if(!results.response){
            session.userData.tokenspec = 'f588de924cc4ef7209a10d80d565da1f'
            var client = new recastai(session.userData.tokenspec)
            var request = client.request
            request.analyseText(session.message.text)
            .then(function(res){
                var intent = res.intent();
                var slug = intent.slug;
                if(slug == 'pro'){
                    session.send("Wow...");
                    session.userData.level = 5;
                    session.beginDialog('/cross',session.userData);
                }else if(slug == 'intermediaire'){
                    session.send(";)");
                    session.userData.level = 4;
                    session.beginDialog('/cross',session.userData);
                }else if(slug == 'fun'){
                    session.userData.positiveemoji = positiveSentimentArray[math.round(math.random()*(l+1))];
                    session.send(session.userData.positiveemoji);
                    session.userData.level = 2;
                    session.beginDialog('/cross',session.userData);
                }else if(slug == 'relax'){
                    session.send("😎");
                    session.userData.level = 1;
                    session.beginDialog('/cross',session.userData);
                }else if(slug == 'solidaire'){
                    session.send("(y)");
                    session.userData.level = 3;
                    session.beginDialog('/cross',session.userData);
                }else{
                    session.send("aïe aïe aïe, j'ai pas tout compris là...");
                    session.beginDialog('/menu',session.userData);
                }
        }).catch(function(err){
            session.send("aïe aïe aïe, j'ai pas tout compris là...");
            session.beginDialog('/menu',session.userData);     
        })
        }else{
            session.userData.level = results.response.index + 1;
            session.userData.category = 1;
            session.beginDialog('/cross',session.userData);  
        }   
    }
];





