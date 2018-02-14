var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
        session.send("Le principe est simple :");
        session.send("🔴 chaque semaine 3 séances de coaching seront organisées avec un coach");
        session.send("le coach est là pour t'aider et te donner des conseils personnalisés pour progresser 📈");
        session.sendTyping();
        setTimeout(function(){
            session.send("🔴 tu peux choisir les jours qui te conviennent le plus");
            session.send("🔴 Le programme dure 2 mois au total");
            var msg = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            new builder.HeroCard(session)
                                .title("👟🏁 OBJECTIF 10km / 15km 🏁👟")
                                .subtitle("Réalise tes objectifs running avec Rungly")
                                .images([
                                    builder.CardImage.create(session,"https://image.ibb.co/eybXGH/Capture_d_e_cran_2018_02_07_a_17_09_12.png")
                                ])
                                .buttons([
                                    builder.CardAction
                                        .imBack(session,"S'inscrire ✅")
                                        .title("S'inscrire ✅")
                                ])
                        ]);
        session.endDialog(msg);
        },4500);
	}
]