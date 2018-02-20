var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports =[

	function(session){
		session.send("Voici une sélection des meilleures promo du moment que j'ai à te proposer : ");
		 
        var msg = new builder.Message(session);
           msg.sourceEvent({
                facebook: {
                    attachment:{
                      type:"template",
                      payload:{
                        template_type:"generic",
                        elements:
                        [{
                            title:"15% DE RÉDUCTION POUR LES ÉTUDIANTS chez New Balance",
                            subtitle:"Inscris-toi avec le mail de ton école et reçoit ta réduction 💚",
                            image_url:"http://jorgbadura.com//wp-content/uploads/2013/02/Jorg-Badura-03-New-Balance-Running.jpg ",
                            buttons:[
                            {
                                type:"web_url",
                                url:"https://www.studentbeans.com/student-discount/fr/new-balance",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share"
                            }]
                        },
                        {
                            title:"20% DE RÉDUCTION POUR LES ÉTUDIANTS chez Aasics",
                            subtitle:"Inscris-toi avec le mail de ton école et reçoit ta réduction 💚",
                            image_url:"https://wl3-cdn.landsec.com/sites/default/files/styles/whats_on_scaled_combo/public/images/whatson/thumbnails/asics_running.jpg",
                            buttons:[
                            {
                                type:"web_url",
                                url:"https://www.studentbeans.com/student-discount/fr/asics/code-20-de-reduction-pour-les-etudiants-588829eb-e8f6-414b-bb65-494ca1bddd59?redeem_online=true",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share"
                            }]
                        },
                        {
                            title:"Trippsport : 10 € de réduction avec le code TRIPP17 👌",
                            subtitle:"À partir de 100€ d’achats",
                            image_url:"https://s3-media4.fl.yelpcdn.com/bphoto/xeC2aDmF6QnBL8KDJI407Q/l.jpg",
                            buttons:[
                            {
                                type:"web_url",
                                url:"http://www.trippsport.fr/",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share"
                            }]
                        },
                        {
                            title:"LEPAPE : -15% pour les passionnés de running avec le code 5A15 👌",
                            subtitle:"CODE PROMO : 5A15",
                            image_url:"http://www.boutique2mode.com/photo/art/grande/14442669-20308667.jpg",
                            buttons:[
                            {
                                type:"web_url",
                                url:"https://www.lepape.com/",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share"
                            }]
                        }
                        ]
                        }
                    }
                }
            });
    session.send(msg);
    builder.Prompts.choice(session,"Ça te plaît ? 😁",["Oui, totalement !","Plutôt","Non, pas trop"],{maxRetries:0})
	},

    function(session,results){
 
            if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok ça marche");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.send("Ok ça marche ! Je suis content de pouvoir t'aider ;)");
                    session.beginDialog('/menu',session.userData);
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.send("Super ! je suis content de pouvoir t'aider :)");
                        session.beginDialog('/menu',session.userData);
                        break;
                    case 1: 
                        session.send("Ok. Je suis content si je peux t'aider :)");
                        session.beginDialog('/menu',session.userData);
                        break;
                    case 2: 
                        builder.Prompts.choice(session,"Ok ça marche");
                        session.beginDialog('/menu',session.userData);
                        break;
                }
            }
    }
]