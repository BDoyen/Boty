var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
        session.send("Le principe est simple :");
        session.send("🔴 chaque semaine 3 séances de coaching seront organisées avec un coach");
        session.send("le coach est là pour t'aider et te donner des conseils personnalisés pour progresser 📈");
        session.send("🔴 tu peux venir aux jours qui te conviennent le mieux");
        session.sendTyping();
        setTimeout(function(){
            session.send("🔴 le programme dure 8 semaines au total");
            session.send("🔴 la première semaine est gratuite 💸 Tu peux ensuite prendre un forfait à 15€ par mois");
            var msg = new builder.Message(session);
               msg.sourceEvent({
                    facebook: {
                        attachment:{
                          type:"template",
                          payload:{
                            template_type:"generic",
                            elements:
                            [{
                                title:"👟🏁 OBJECTIF 10km / 15km 🏁👟",
                                subtitle:"Réalise tes objectifs running avec Rungly",
                                image_url:"https://image.ibb.co/eybXGH/Capture_d_e_cran_2018_02_07_a_17_09_12.png",
                                buttons:[
                                {
                                    type:"postback",
                                    title:"S'inscrire ✅",
                                    payload:"S'inscrire ✅"
                                },
                                {
                                    type:"web_url",
                                    url:"https://youtu.be/2ea3HqmcMbA",
                                    title:"Voir la vidéo 🏃",
                                    webview_height_ratio: "compact"
                                },
                                {
                                    type:"element_share"
                                }]
                            }]
                            }
                            }
                        }
                });
        session.send(msg);
        session.endDialog();
        },6500);
	}
]