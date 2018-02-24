
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var request = require('request');


module.exports = [
	
	function(session){
        session.send("Voici un aperçu plus complet du programme Rungly Coach : ");
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
                                                    image_url:"https://image.ibb.co/ngFGLx/Capture_d_e_cran_2018_02_23_a_10_53_18.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 2 & 3 - Développement Foncier",
                                                    subtitle:"Les qualités générales du bon runner",
                                                    image_url:"https://image.ibb.co/huJgnc/Capture_d_e_cran_2018_02_23_a_10_54_42.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 4 & 5 - Techniques running",
                                                    subtitle:"Les techniques plus specifiques du runner",
                                                    image_url:"https://image.ibb.co/bstmLx/Capture_d_e_cran_2018_02_23_a_10_55_34.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 6 - On fait le point",
                                                    subtitle:"Premier bilan et retour sur ton objectif",
                                                    image_url:"https://image.ibb.co/h8V0fx/Capture_d_e_cran_2018_02_23_a_10_56_46.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 7 - Ré-ajustements",
                                                    subtitle:"Les derniers détails pour atteindre ton objectif !",
                                                    image_url:"https://image.ibb.co/kco8YH/Capture_d_e_cran_2018_02_23_a_10_57_34.png",
                                                    buttons:[
                                                    {
                                                        type:"element_share"
                                                    }]
                                                },
                                                {
                                                    title:"Week 8 - Libère l'athlète en toi !",
                                                    subtitle:"Être confiant pour le jour J",
                                                    image_url:"https://image.ibb.co/bNfoYH/Capture_d_e_cran_2018_02_23_a_11_01_41.png",
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
    builder.Prompts.choice(session,"Alors, convaincu(e) ?", ["Oui ! ","Pourquoi pas...","Non pas trop"])
	},
    function(session,results){
        if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("ok ça marche");
                    session.beginDialog('/menu',session.userData);
                }else if(valence >= 0){
                    session.send("Ok super !");
                    session.beginDialog('/question_coach',session.userData);
                }
            }else{
                switch (results.response.index){
                    case 0: 
                        session.send("Ok super !");
                        session.beginDialog('/question_coach',session.userData);
                        break;
                    case 1: 
                        session.send("Ok");
                        session.beginDialog('/question_coach',session.userData);
                        break;
                    case 2:
                        session.send("ok ça marche");
                        session.beginDialog('/menu',session.userData);
                        break;
            }
        }
    }
]

