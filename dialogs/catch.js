
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module

//APIs//

//Recast.ai
var recastai = require('recastai').default

//resources from other scripts


var ans_all = ["Ok!", "ça marche","ok, ça marche","👍 ça marche","👍 ok","ok 👍","d'accord 👍","d'acc !","d'acc 😉","d'acc 👍","yes ! 👍","yes 👍","yes 😉","👍👍","👍👍👍","oki","😉","😉 ok ","ok 😉","okay","okay!","👍 😉","oki!"];
var P = ans_all.length



//////////////////////functions//////////////////////



module.exports = [

    function(session){
    	var ans = ans_all[math.round(math.random()*(P+1))]
    	if(ans == undefined){
    		session.send("Ok !");
    		builder.Prompts.choice(session,"je peux aussi t'aider à trouver...",["un run 😍 👟","des astuces pro 😎"],{maxRetries:0});
    	}else{
    		session.send(ans);
    		builder.Prompts.choice(session,"je peux aussi t'aider à trouver...",["un run 😍👟","des astuces pro 😎👟"],{maxRetries:0});
    	}
    },

    function(session,results){
    	if(!results.response){
    		session.beginDialog("/",session.userData);
    	}else{
    		switch (results.response.index){
    			case 0:
    				session.beginDialog("/which-run",session.userData);
    				break;
    			case 1:
    				session.beginDialog("/botlesmoi",session.userData);
    				break;
    		}
    	}    	
    }
    
];


