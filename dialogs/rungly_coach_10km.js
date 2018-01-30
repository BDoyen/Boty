
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
		
        session.send("Bravo et bon choix " + session.userData.name + "😉");
        session.send("Voilà toutes les infos du début du programme : ")
        
        session.sendTyping();
        setTimeout(function () {
            session.send("La première semaine est une semaine découverte et d'évaluation de ton niveau initial");
            session.send("Voici les trois séances prévues :");
        }, 3000);

        session.sendTyping();
        setTimeout(function () {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("Séance #1")
                        .subtitle("Premier contact et évaluation de ton niveau initial")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/g6oM8b/Capture_d_e_cran_2018_01_25_a_11_55_45.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#coachingByRungly10km")
                                .title("Programmer un rappel")
                        ]),
                ]);
        }, 3000);

        
        
	}
]