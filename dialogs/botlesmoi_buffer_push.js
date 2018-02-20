var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module


//APIs//


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
        session.send("Si tu aimes ce type d'astuce, je peux t'en envoyer une tous les deux jours si tu le souhaites 💡💌");
        builder.Prompts.choice(session,"Qu'en penses-tu ?",["Yes ! 😻","ça ira merci"],{maxRetries:0});
    },
    function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence >= 0){
                session.beginDialog('/botlesmoi_push',session.userData);
            }else{
                session.send("Ok 🙂");
                session.beginDialog('/menu',session.userData);
            }
        }else{
            switch(results.response.index){
                case 0:
                    session.beginDialog('/botlesmoi_push',session.userData);
                    break;
                case 1:
                    session.send("Ok 🙂");
                    session.beginDialog('/menu',session.userData);
                    break;
            }
        }
    }

];






