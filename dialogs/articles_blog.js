
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var funcs_time = require('./funcs/funcs_time.js')

//Recast.ai
var recastai = require('recastai').default


//////////////////////functions//////////////////////


module.exports = [

    function(session){

        //éléments pour requête 

        //LeChaboté
        session.userData.post_options = {
              url: "http://217.182.206.5:8080/getarticles/all",
              method: 'POST',
              timeout:30000
        };

        var data = JSON.stringify([{Category:"all"}]);

        session.userData.post_options.form = data;

        var post_req = request(session.userData.post_options, function(error,response,body){

            if(!error){

                var res = JSON.parse(body)

                console.log(res)

                if(res == null){
                    
                    session.send("Je suis désolé " + session.userData.name + "... 😕");
                    session.send("pour le moment je suis à court d'articles...");
                    post_req.end();
                    session.beginDialog('/menu',session.userData);
                
                }else{

                    var n = session.userData.reslength = res.length;
                    
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
                        var res3 = res[3]
                        var res4 = res[4]
                        var res5 = res[5]
                        var res6 = res[6]
                        var res7 = res[7]
                        var res8 = res[8]

                        session.userData.category0 = res0.Category
                        session.userData.category1 = res1.Category
                        session.userData.category2 = res2.Category
                        session.userData.category3 = res3.Category
                        session.userData.category4 = res4.Category
                        session.userData.category5 = res5.Category
                        session.userData.category6 = res6.Category
                        session.userData.category7 = res7.Category
                        session.userData.category8 = res8.Category  

                        session.userData.text0 = res0.Text
                        session.userData.text1 = res1.Text
                        session.userData.text2 = res2.Text
                        session.userData.text3 = res3.Text
                        session.userData.text4 = res4.Text
                        session.userData.text5 = res5.Text
                        session.userData.text6 = res6.Text
                        session.userData.text7 = res7.Text
                        session.userData.text8 = res8.Text


                        msg = new builder.Message(session);
                           msg.sourceEvent({
                                facebook: {
                                    attachment:{
                                      type:"template",
                                      payload:{
                                        template_type:"generic",
                                        elements:
                                        [{
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res0.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res1.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res2.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res3.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res4.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res5.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res6.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res7.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res0.Title,
                                            subtitle:res0.Category,
                                            image_url:res0.Img,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"En savoir ➕",
                                               payload:"En résumé sur " + res8.Title
                                            },
                                            {
                                                type:"web_url",
                                                url:res0.Url,
                                                title:"Lien vers l'article 📰"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            image_url:"https://image.ibb.co/doMyRw/Capture_d_e_cran_2018_01_28_a_14_35_25.png",
                                            buttons:[
                                            {
                                                type:"postback",
                                                title:"S'inscrire au flux ✅",
                                                payload:"S'inscrire au flux général ✅"
                                            }
                                            ]
                                        }
                                        ]
                                        }
                                    }
                                }
                            });      
                        post_req.end();
                        builder.Prompts.choice(session,msg,["En résumé sur " + res0.Title,"En résumé sur " + res1.Title,"En résumé sur " + res2.Title,"En résumé sur " + res3.Title,"En résumé sur " + res4.Title,"En résumé sur " + res5.Title,"En résumé sur " + res6.Title,"En résumé sur " + res7.Title,"En résumé sur " + res8.Title,"S'inscrire au flux général ✅"],{maxRetries:0});       
                }
            }else{
                console.log(error);
                session.send("Je suis désolé " + session.userData.name + "... 😕");
                session.send("pour le moment, je suis à court d'articles...");
                post_req.end();
                session.beginDialog('/menu',session.userData);
            }       
        });
    },


    function(session, results){

        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Si un des articles t'intéresse, tu peux cliquer sur 'En résumé 🎈' pour en savoir un peu plus")
            }else if(valence >= 0){
                session.send("Ok ! Si un des articles t'intéresse, tu peux cliquer sur 'En résumé 🎈' pour en savoir un peu plus")
            }
        }else{
            session.userData.flux_index = results.response.index
            switch (results.response.index){
                case 0:
                    session.userData.current_category = session.userData.category0;
                    session.send(session.userData.text0);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 1:
                    session.userData.current_category = session.userData.category1;
                    session.send(session.userData.text1);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 2:
                    session.userData.current_category = session.userData.category2;
                    session.send(session.userData.text2);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 3:
                    session.userData.current_category = session.userData.category3;
                    session.send(session.userData.text3);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 4:
                    session.userData.current_category = session.userData.category4;
                    session.send(session.userData.text4);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 5:
                    session.userData.current_category = session.userData.category5;
                    session.send(session.userData.text5);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 6:
                    session.userData.current_category = session.userData.category6;
                    session.send(session.userData.text6);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 7:
                    session.userData.current_category = session.userData.category7;
                    session.send(session.userData.text7);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 8:
                    session.userData.current_category = session.userData.category8;
                    session.send(session.userData.text8);
                    session.beginDialog("/flux_inscription_buffer",session.userData);
                    break;
                case 9:
                    session.beginDialog("/flux_inscription_all",session.userData);
                    break;
            }
        }         
    }
        
];