
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');

module.exports = [
	
	function(session){
		session.send("Super!");
		session.send("Commençons si tu es prêt(e)");
		builder.Prompts.choice(session,"🏃 as-tu déjà fait du sport avec un coach ?",["oui!","non..."],{maxRetries:0})
	},
	function(session,results){
		builder.Prompts.choice(session,"👟 trouverais-tu gênant de faire des séances en groupe ?",["oui","un peu...","non"],{maxRetries:0})
	},
	function(session,results){
		builder.Prompts.choice(session,"🏃 quelle serait pour toi la raison principale de venir à une séance de coaching (en groupe) ?",["m'amuser","rencontrer des gens","échanger","se perfectionner","m'aider"],{maxRetries:0})
	},
	function(session,results){
		builder.Prompts.choice(session,"👟 serais-tu par exemple intéressé(e) par des séances de ce type : ",["simple jogging","découverte Paris","mesurer ma VMA","entraînement 5km","entraînement 10km","entraînement semi","marathon"],{maxRetries:0})
	},
	function(session,results){
		session.send("Merci "+ session.userData.name+", pour ton aide !");
		session.send("Tu dois te demander pourquoi ces questions ??? 😯 L'objectif est de savoir ce que tu en penses afin de te proposer prochainement des séances de coaching par de vrais coachs pros 😍");
		session.send("Si ça te tente, on organisera une première séance découverte en Janvier ! Stay tuned... 🏃👟");
		session.beginDialog('/menu',session.userData);
	}

]