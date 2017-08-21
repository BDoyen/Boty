

var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');
var request = require('request');


//APIs//

//LeChaboté
var post_options = {
      host: '217.182.206.5',
      port: '8000',
      path: '/user',
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

//GifsB
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
        let replyMessage = new builder.Message(session).text("Quelle est ton adresse du coup ? Tu peux l'écrire ou bien appuyer sur le bouton juste en-bas 👇");
            replyMessage.sourceEvent({
                facebook: {
                    quick_replies: [{
                        content_type: 'location'
                    }]
                }
            });
            builder.Prompts.text(session,replyMessage,{maxRetries:0});
    },
    
    function(session,results){

      var entity = session.message.entities

      if(entity.length == 0){
        session.userData.address = results.response + " France";
      }else{
        var lat = entity[0].geo.latitude
        var lng = entity[0].geo.longitude
        session.userData.address = lat+","+lng
      }


      //LeChaboté API request
      session.userData.post_options = {
              url: "http://217.182.206.5:8000/user",
              method: 'POST',
      };
      var data = JSON.stringify([{Id:session.userData.idstring,Adresse:session.userData.address}]);
      session.userData.post_options.form = data;
      var post_req = request(session.userData.post_options, function(error,response,body){
        if(!error){
          session.userData.givenadresse = 1;
          session.beginDialog("/cross",session.userData);
        }else{
          session.send("aïe j'ai bugué là...");
          session.beginDialog("/menu",session.userData);
        }
      });


    }
    
];




