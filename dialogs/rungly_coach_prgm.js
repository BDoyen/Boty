
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
        session.send("Voici un aperçu du programme Rungly Coach : ");
        var msg = new builder.Message(session);
                                   msg.sourceEvent({
                                        facebook: {
                                            attachment:{
                                              type:"template",
                                              payload:{
                                                template_type:"generic",
                                                elements:
                                                [{
                                                    title:"Week 1 - Découverte",
                                                    subtitle:"Premier contact et Footings légers",
                                                    image_url:"https://image.ibb.co/mTFUfc/Capture_d_e_cran_2018_02_07_a_18_27_21.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 2 & 3 - Développement Foncier",
                                                    subtitle:"Les qualités générales du bon runner",
                                                    image_url:"https://image.ibb.co/jUuuDx/Capture_d_e_cran_2018_02_07_a_18_29_09.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 4 & 5 - Techniques running",
                                                    subtitle:"Les techniques plus specifiques du runner",
                                                    image_url:"https://image.ibb.co/mvTMtx/Capture_d_e_cran_2018_02_07_a_18_31_11.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 6 - On fait le point",
                                                    subtitle:"Premier bilan et retour sur ton objectif",
                                                    image_url:"https://image.ibb.co/mvTMtx/Capture_d_e_cran_2018_02_07_a_18_31_11.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 7 - Ré-ajustements",
                                                    subtitle:"Les derniers détails pour atteindre ton objectif !",
                                                    image_url:"https://image.ibb.co/mvTMtx/Capture_d_e_cran_2018_02_07_a_18_31_11.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 8 - Libère l'athlète en toi !",
                                                    subtitle:"Être confiant pour le jour J",
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
    builder.Prompts.message(session,"Alors, convaincu(e) ?", ["Oui ! ","Pourquoi pas...","Non pas trop"])

	},
    function(session,results){
        if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Ok");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.send("Ok super !");
                    
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.beginDialog('/rungly_coach_1',session.userData);
                        break;
                    case 1: 
                        session.send("Ok");
                        session.beginDialog('/menu',session.userData);
                        break;
            }
        }
    }
]

