

var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');
var http = require('http');




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

      session.send(results.response)
      session.userData.address = results.response + " France";

      var data = JSON.stringify([{Id:session.userData.idstring,Adresse:session.userData.address}]);

      var post_req = http.request(post_options, function(res){
        res.on('data', function (chunk){})
      });

      post_req.write(data);
      post_req.end();

      session.userData.givenadresse = 1;
      if(session.userData.givenadresse*session.userData.giventemps == 1){
        session.beginDialog("/query",session.userData);
      }else{
        session.beginDialog("/temps",session.userData);
      }

    }
    
];