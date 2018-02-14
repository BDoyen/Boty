
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');
var quick = require('botbuilder-facebook-quick-replies');


module.exports = [
	
	function(session){
		
        session.send("Bravo et bon choix " + session.userData.name + "😉");
        session.send("Voilà toutes les infos du début du programme : ")
        session.send("💚 Week #1 - Mise en route et évaluation individuelle");
        session.sendTyping();
        setTimeout(function(){

        msg = new builder.Message(session);
           msg.sourceEvent({
                facebook: {
                    attachment:{
                      type:"template",
                      payload:{
                        template_type:"generic",
                        elements:
                        [{
                            title:"Séance #1 - Lundi soir",
                            subtitle:"Premier contact et Footing léger",
                            image_url:"https://image.ibb.co/mTFUfc/Capture_d_e_cran_2018_02_07_a_18_27_21.png",
                            buttons:[
                            {
                                type:"web_url",
                                url:"",
                                title:"Voir l'event 😍"
                            },
                            {
                                type:"element_share"
                            }]
                        },
                        {
                            title:"Séance #2 - Mercredi soir",
                            subtitle:"Découverte du Fractionné",
                            image_url:"https://image.ibb.co/jUuuDx/Capture_d_e_cran_2018_02_07_a_18_29_09.png",
                            buttons:[
                            {
                                type:"web_url",
                                url:"",
                                title:"Voir l'event 😍"
                            },
                            {
                                type:"element_share"
                            }]
                        },
                        {
                            title:"Séance #3 - Vendredi soir",
                            subtitle:"Training Aérobie",
                            image_url:"https://image.ibb.co/mvTMtx/Capture_d_e_cran_2018_02_07_a_18_31_11.png",
                            buttons:[
                            {
                                type:"web_url",
                                url:"",
                                title:"Voir l'event 😍"
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
        builder.Prompts.choice(sessio,"Tu en penses quoi ?",["Cool 👍","Voir ➕"],{maxRetries:0});
        },3000);    
	},
    function(session,results){
        if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.send("Super ! Je suis content de pouvoir t'aider ;)");
                    
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.send("Super ! je suis content de pouvoir t'aider :)");
                        session.beginDialog('/menu',session.userData);
                        break;
                    case 1: 
                        session.send(":)");
                        session.beginDialog('/menu',session.userData);
                        break;
                }
            }
    }
]