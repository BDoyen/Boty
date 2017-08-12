
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
        builder.Prompts.choice(session,"Quand est-ce que tu veux aller courir ?",["cette semaine","la semaine prochaine","ce mois"],{maxRetries:0})
    },

    function(session,results){
        session.userData.tokentime = 'db12a4a11825dfaa4f85ebdf13fdea9d'
        var client = new recastai(session.userData.tokentime)
        var request = client.request

        //no buttons
        if(!results.response){

            request.analyseText(session.message.text)
            .then(function(res){
                session.userData.chronology = res.entities.datetime[0].chronology;
                session.userData.accuracy = res.entities.datetime[0].accuracy;
                session.userData.iso = res.entities.datetime[0].iso;
                //no datetime
                if(session.userData.iso == ""){
                    var intent = res.intent();
                    var slug = intent.slug;
                    if(slug == 'jamais'){
                        session.send(":(");
                        session.endDialog();
                    }else if(slug == 'greetings'){
                        session.send("coucou :)");
                        session.endDialog();
                    }else if(slug == 'goodbye'){
                        session.send("À bientôt j'espère :)");
                        session.endDialog();
                    }else{
                        session.send("aïe aïe aïe, j'ai pas tout compris là...");
                        session.endDialog(); 
                    }
                //with iso datetime
                }else{
                    if(session.userData.chronology == 'present' || session.userData.chronology == 'past' ){
                        if(session.userData.accuracy == 'day' || session.userData.accuracy == 'day,halfday' || session.userData.accuracy == 'sec' || session.userData.accuracy == 'min' || session.userData.accuracy == 'now'){
                            var min = new Date();
                            min.setHours(min.getHours()+2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if(session.userData.accuracy == 'week'){
                            var min = new Date(session.userData.iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if(session.userData.accuracy == 'hour'){
                            var min = new Date(session.userData.iso);
                            min.setHours(min.getHours()+2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là...");
                            session.endDialog(); 
                        }               
                    }else if(session.userData.chronology == 'future'){
                        if(session.userData.accuracy == 'day' || session.userData.accuracy == 'day,halfday'){
                            var min = new Date(session.userData.iso);
                            min.setHours(2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if(session.userData.accuracy == 'weekend'){
                            var min = new Date(session.userData.iso);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if(session.userData.accuracy == 'week'){
                            var min = new Date(session.userData.iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if(session.userData.accuracy == 'month'){
                            session.userData.timemin = new Date();
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if(session.userData.accuracy == 'year'){
                            var min = new Date(session.userData.iso);
                            min.setMonth(0);
                            min.setDate(1);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là...");
                            session.endDialog(); 
                        }
                    }
                }
            }).catch(function(err){
                session.send("aïe, j'ai bugué là... 😬");
                session.endDialog();   
            });
        //with buttons
        }else{
            request.analyseText(results.response.entity)
                .then(function(res){
                    session.userData.accuracy = res.entities.datetime[0].accuracy;
                    session.userData.chronology = res.entities.datetime[0].chronology;
                    session.userData.iso = res.entities.datetime[0].iso;
                    if(session.userData.accuracy == 'week'){
                        if(session.userData.chronology == 'past'){
                            var min = new Date(session.userData.iso);
                            min.setHours(2)
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else if((session.userData.chronology == 'future')){
                            var min = new Date();
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là...");
                            session.endDialog(); 
                        }  
                    }else if(session.userData.accuracy == 'month'){ 
                            session.userData.timemin = new Date();
                            console.log(session.userData.timemin);
                            session.beginDialog('/temps2',session.userData);
                    }else{
                        session.send("aïe aïe aïe, j'ai pas tout compris là...");
                        session.endDialog(); 
                    }
            }).catch(function(err){
                session.send("aïe, j'ai bugué là... 😬");
                session.endDialog();     
            }) 
        }
    }
];