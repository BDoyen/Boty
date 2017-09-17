var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

function(session){

	switch (session.userData.index){
                case 0:
                    session.beginDialog("/catch",session.userData)
                    break;
                case 1:
                    
                
            }
}

]