
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
		
        session.send("Bienvenue à toi dans le programme Rungly coach ! 😍")
        session.send("Le principe est simple : chaque semaine 3 séances de coaching sont organisées par un coach de la communauté Rungly");
        
        session.sendTyping();
        setTimeout(function () {
            session.send("Le programme dure 2 mois");
            session.send("Pendant ces 2 mois, tu seras accompagné(e) par un coach qui te donnera des conseils personnalisés pour progresser 📈");
            session.send("Rungly sera aussi là pour te motiver en t'envoyant chaque semaine un récap de ton avancement et du programme à venir 🐅")
        }, 3000);
        
        session.sendTyping();
        setTimeout(function () {
            session.send("À la fin, l'objectif est de courir un 10km dans un temps optimal pour toi ! 🔝");
            session.send("Si ça t'intéresse, tu peux t'inscrire en bas pour accéder aux infos du début du programme 👇👇👇");
        }, 3000);        

        session.sendTyping();
        setTimeout(function () {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("👟🏁 OBJECTIF 10km 🏁👟")
                        .subtitle("")
                        .images([
                            builder.CardImage.create(session,"https://image.ibb.co/kX651w/Capture_d_e_cran_2018_01_25_a_11_37_29.png")
                        ])
                        .buttons([
                            builder.CardAction
                                .imBack(session,"#coachingByRungly10km")
                                .title("S'inscrire ✅")
                        ]),
                ]);
            session.endDialog(msg)
        }, 3000);

	}
]