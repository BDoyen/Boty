var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var quick = require('botbuilder-facebook-quick-replies');


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
        session.userData.post_options = {
                          url: "http://217.182.206.5:8080/inscription/",
                          method: 'POST',
                          timeout:30000
                    };
                    var data = JSON.stringify({Id:session.userData.idstring,Type:"astuce",Bool:true});
                    session.userData.post_options.form = data;
                    var post_req = request(session.userData.post_options, function(error,response,body){
                        if(!error){
                            session.send("Cool !")
                            session.send("Ton inscription est validée ✅")
                            session.beginDialog("/menu",session.userData);
                        }else{
                            console.log(error);
                            session.send("J'ai eu un petit souci avec ton inscription mais ne t'inquiète pas, je vais règler ça 😉");
                            session.beginDialog("/menu",session.userData);
                        }
                    });
        
    }
];






