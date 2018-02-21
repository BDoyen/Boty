
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');
var quick = require('botbuilder-facebook-quick-replies');


module.exports = [
	
	function(session){
		
        session.send("Bravo et bon choix " + session.userData.name + "😉");
                    
                    var post_options = {
                        url: "http://217.182.206.5:8080/coach/ins",
                        method: 'POST',
                        timeout:30000
                    };
                    var data = JSON.stringify({User:session.userData.idstring});
                    session.userData.post_options.form = data;
                    var post_req = request(data, function(error,response,body){
                        console.log(error);
                        if(!error){
                            session.send("Voici toutes les infos de la première semaine du programme : ")
                            session.send("💚 Week #1 - Mise en route, découverte et prise de marque");
                            session.send("🕖 Heure : de 19h00 à 20h30")
                            session.send("📍 Lieu : Jardin des Tuileries")
                            session.send("Prix : Gratuit 🤑")
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
                                                    title:"Lien Eventbrite",
                                                    image_url:"https://image.ibb.co/kH2K2c/Capture_d_e_cran_2018_02_20_a_09_57_17.png",
                                                    buttons:[
                                                    {
                                                        type:"web_url",
                                                        url:"https://www.eventbrite.fr/e/billets-week-1-entrainement-10km15km-by-rungly-coach-43326588994",
                                                        title:"👉 Lien Eventbrite 🎫"
                                                    },
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Séance #1 - Lundi soir",
                                                    subtitle:"Premier contact et Footing léger",
                                                    image_url:"https://image.ibb.co/mTFUfc/Capture_d_e_cran_2018_02_07_a_18_27_21.png",
                                                    buttons:[
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
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Séance #3 - Vendredi soir",
                                                    subtitle:"Training Aérobie",
                                                    image_url:"https://image.ibb.co/mvTMtx/Capture_d_e_cran_2018_02_07_a_18_31_11.png",
                                                    buttons:[
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
                                session.send("À la fin de cette première semaine, tu pourras mieux définir tes objectifs de temps avec le coach pour un 10km ou 15km");
                                builder.Prompts.choice(session,"Tu en dis quoi ?",["en savoir ➕","ça ira merci 🙂"],{maxRetries:0});
                            },3000);
                        }else{
                            session.send("J'ai un petit souci avec les inscriptions en ce moment, n'hésite pas à revenir me parler quand j'aurai arrangé ça 🙂");
                            session.beginDialog("/menu",session.userData);
                        }
                    });
	},
    function(session,results){
        if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok 🙂");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.send("Ok ! 😊");
                    session.beginDialog('/rungly_coach_prgm',session.userData);   
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.send("Ok ! 😊");
                        session.beginDialog('/rungly_coach_prgm',session.userData); 
                        break;
                    case 1: 
                        session.send("Ok 🙂");
                        session.beginDialog('/menu',session.userData);
                        break;
                }
            }
    }
]