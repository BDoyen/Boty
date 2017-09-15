
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module

//APIs//

//Recast.ai
var recastai = require('recastai').default

//resources from other scripts


//////////////////////functions//////////////////////


module.exports = [

    function(session){
        builder.Prompts.choice(session,"Ok... À bientôt j'espère",["C'est reparti 😍 👟"],{maxRetries:0});
    },

    function(session,results){
    	session.beginDialog("/menu",session.userData);
    }
    
];


