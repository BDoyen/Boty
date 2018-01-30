var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var funcs_time = require('./funcs/funcs_time.js');


//time functions 
var f0_transforme_time = funcs_time.f0_transforme_time


module.exports = [


function(session){

	var result = session.userData.descriptif

	if(session.userData.lenght_descriptif >= 2){
		session.send(result[0]+result[1]);
        session.userData.descriptif = result.splice(2);
        session.beginDialog('/scroll_next',session.userData);

	}else if(session.userData.lenght_descriptif == 1){
		session.send(result[0]);
        session.send("😊")
        session.beginDialog("/menu",session.userData)

	}else{
		session.send("😊")
        session.beginDialog("/menu",session.userData)
	}

]