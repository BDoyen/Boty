var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module


//APIs//



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
		session.send("Bravo "+session.userData.name+" pour ta détermination ;)")
		builder.Prompts.choice(session,"que recherches-tu plus précisément ?",["une course","une communauté"],{maxRetries:0})
	},

	function(session,results){
		if(!results.response){
			session.userData.tokengen = 'cac49b88e2afe148fe34bffeca605bdb'
	        var client = new recastai(session.userData.tokengen)
	        var request = client.request
	        request.analyseText(session.message.text)
	            .then(function(res){
	            	var intent = res.intent();
	                var slug = intent.slug;
	                if(slug == "communaute"){
	                	session.userData.level = 1;
	                	session.userData.category = 2;
		                session.beginDialog('/cross',session.userData);
	                }else if(slug == "goodbye"){
	                	session.beginDialog('/catch',session.userData);
	                }else{
	                	session.userData.category = 1;
	                	session.beginDialog('/run',session.userData);
	                }
	            }).catch(function(err){
	            console.log(err)
	            session.send("aïe aïe aïe, j'ai pas tout compris là...");
	            session.beginDialog('/menu',session.userData);     
	    	})  
		}else{
			switch(results.response.index){
				case 0:
					session.userData.category = 1;
                	session.beginDialog('/run',session.userData);
					break;
				case 1:
					session.userData.level = 1;
					session.userData.category = 2;
	                session.beginDialog('/cross',session.userData);
	                break;
			}
		}

	}


]




























