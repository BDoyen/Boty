var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

function(session){

	var result_next = session.userData.descriptif
	if(result_next == null){
		session.beginDialog("/cool",session.userData);
	}else{
		var n = result_next.length;
		if(n >= 2){
		session.send("▪️ " + result[0]);
        session.send("▪️ " + result[1]);
        session.userData.descriptif = result_next.splice(2);
        session.beginDialog('/scroll_next',session.userData);
		}else if(n == 1){
			session.send("▪️ " + result[0]);
	        session.beginDialog("/cool",session.userData);
		}else{
        session.beginDialog("/cool",session.userData);
		}
	}
}

]