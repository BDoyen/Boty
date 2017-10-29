var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports =[

	function(session){
		session.send("Voilà les meilleures promo du moment que j'ai à te proposer : ");
		 
         msg = new builder.Message(session);
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
                            item_url: "https://www.studentbeans.com/student-discount/fr/new-balance",
                            buttons:[
                            {
                                type:"web_url",
                                url:"https://www.studentbeans.com/student-discount/fr/new-balance",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share",
                                title:"Partager"
                            }]
                        },
                        {
                            title:"20% DE RÉDUCTION POUR LES ÉTUDIANTS chez Aasics",
                            subtitle:"Inscris-toi avec le mail de ton école et reçoit ta réduction 💚",
                            image_url:"https://wl3-cdn.landsec.com/sites/default/files/styles/whats_on_scaled_combo/public/images/whatson/thumbnails/asics_running.jpg",
                            item_url: "https://www.studentbeans.com/student-discount/fr/asics/code-20-de-reduction-pour-les-etudiants-588829eb-e8f6-414b-bb65-494ca1bddd59?redeem_online=true",
                            buttons:[
                            {
                                type:"web_url",
                                url:"https://www.studentbeans.com/student-discount/fr/asics/code-20-de-reduction-pour-les-etudiants-588829eb-e8f6-414b-bb65-494ca1bddd59?redeem_online=true",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share",
                                title:"Partager"
                            }]
                        },
                        {
                            title:"-70% chez i-Run en ce moment 🤑",
                            subtitle:"Du 25/10 au 14/11, sur de nombreux modèles de chaussures et vêtements. Livraison offerte pour tout achat de plus de 90euros",
                            image_url:"http://www.u-run.fr/wp-content/uploads/2015/10/facebook-1200x12001.png",
                            item_url: "http://www.i-run.fr/?utm_source=affiliation&utm_medium=rw-nov_2017#ectrans=1",
                            buttons:[
                            {
                                type:"web_url",
                                url:"http://www.i-run.fr/?utm_source=affiliation&utm_medium=rw-nov_2017#ectrans=1",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share",
                                title:"Partager"
                            }]
                        },
                        {
                            title:"Trippsport : 10 € de réduction avec le code TRIPP17 👌",
                            subtitle:"À partir de 100€ d’achats",
                            image_url:"https://s3-media4.fl.yelpcdn.com/bphoto/xeC2aDmF6QnBL8KDJI407Q/l.jpg",
                            item_url: "http://www.trippsport.fr/",
                            buttons:[
                            {
                                type:"web_url",
                                url:"http://www.trippsport.fr/",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share",
                                title:"Partager"
                            }]
                        },
                        {
                            title:"LEPAPE : 25% sur les nouveautés ;)",
                            subtitle:"Du 18/10 au 1/11",
                            image_url:"http://www.boutique2mode.com/photo/art/grande/14442669-20308667.jpg",
                            item_url: "https://www.lepape.com/",
                            buttons:[
                            {
                                type:"web_url",
                                url:"https://www.lepape.com/",
                                title:"J'en profite! 😍"
                            },
                            {
                                type:"element_share",
                                title:"Partager"
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

        if(!session.userData.promo){
            if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.userData.promo = 1;
                    session.send("Ok ça marche. Tu ne recevras plus de promo de ce style, c'est promis ;)");
                    builder.Prompts.text(session, "Ahah, juste une dernière question : j'aimerais bien savoir pourquoi tu ne veux plus recevoir de promos si c'est pas trop indiscret ? 😅",{maxRetries:0});
                }else if(valence >= 0){
                    session.userData.promo = 1;
                    builder.Prompts.choice(session,"Ok ça marche ! Voudrais-tu recevoir plus de bons plans de ce style à l'avenir ?",["Yes !","Non merci"],{maxRetries:0});
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.userData.promo = 1;
                        session.send("Super ! je suis content de pouvoir t'aider :)");
                        builder.Prompts.choice(session,"Ça te dirait de recevoir plus de bons plans de ce style à l'avenir ?",["Yes !","Non merci"],{maxRetries:0});
                    case 1: 
                        session.userData.promo = 1;
                        session.send("Je suis content si je peux t'aider :)");
                        builder.Prompts.choice(session,"Ça te dirait de recevoir plus de bons plans de ce style à l'avenir ?",["Yes !","Non merci"],{maxRetries:0});
                    case 2: 
                        session.userData.promo = 1;
                        session.send("Ok ça marche. Tu ne recevras plus de promo de ce style, c'est promis ;)");
                        builder.Prompts.text(session, "Ahah, juste une dernière question : j'aimerais bien savoir pourquoi tu ne veux plus recevoir de promos si c'est pas trop indiscret ? 😅",{maxRetries:0});
                }
            }
        }else{
            if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    builder.Prompts.choice(session,"Ok ça marche. Tu ne recevras plus de promo de ce style, si tu veux",["Oui","Non, c'est bon"],{maxRetries:0});
                }else if(valence >= 0){
                    session.send("Ok ça marche ! Je suis content de pouvoir t'aider ;)");
                    session.beginDialog('/menu',session.userData);
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.send("Super ! je suis content de pouvoir t'aider :)");
                        session.beginDialog('/menu',session.userData);
                    case 1: 
                        session.send("Je suis content si je peux t'aider :)");
                        session.beginDialog('/menu',session.userData);
                    case 2: 
                        builder.Prompts.choice(session,"Ok ça marche. Tu ne recevras plus de promo de ce style, si tu veux",["Oui","Non, c'est bon"],{maxRetries:0});
                }
            }
        }

    },

    function(session,results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                  
            }else if(valence >= 0){
               
            }
        }else{
            var sent = sentiment(results.response,'fr');
            var valence = sent.score;
            if(valence < 0){
                  
            }else if(valence >= 0){
               
            }
        }

    }




]