
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var funcs_time = require('./funcs/funcs_time.js')

//Recast.ai
var recastai = require('recastai').default

//time functions 
var f0_transforme_time = funcs_time.f0_transforme_time


//////////////////////functions//////////////////////


module.exports = [

    function(session){

        session.userData.giventemps = 0;

        //éléments pour requête 

        //LeChaboté
        session.userData.post_options = {
              url: "http://217.182.206.5:8080/event/getevent",
              method: 'POST',
              timeout:30000
        };

        var timemin = new Date(session.userData.timemin)

        var dt = f0_transforme_time(timemin)

        console.log(dt)

        var data = JSON.stringify([{User:session.userData.idstring,Times:dt,Addr:session.userData.address,Lvl:session.userData.level,Cat:session.userData.category}]);

        session.userData.post_options.form = data;

        var post_req = request(session.userData.post_options, function(error,response,body){

            if(!error){

                var res = JSON.parse(body)

                if(res == null){
                    
                    session.send("Je suis désolé " + session.userData.name);
                    session.send("pour le moment, je n'ai pas d'évènements qui correspondent à ta demande mais tu peux essayer avec une autre recherche ;)");
                    post_req.end();
                    session.beginDialog('/menu',session.userData);
                
                }else{

                    var n = session.userData.reslength = res.length;

                    if(n == 1){
                        var res0 = res[0]
                        session.userData.title0 = res0.Title
                        session.userData.id0 = res0.Id
                        session.userData.Time0 = res0.Time
                        session.userData.url0 = res0.Url

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
                                            subtitle:res0.St,
                                            image_url:res0.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + res0.Title 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            image_url:"https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg",
                                            buttons:[
                                            {
                                                type:"postback",
                                                title:"C'est bon merci 🙂",
                                                payload:"C'est bon merci 🙂"
                                            }
                                            ]
                                        }
                                        ]
                                        }
                                    }
                                }
                            });

                        post_req.end();

                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title ,"C'est bon merci 🙂"],{maxRetries:0});
                        
                    }else if(n == 2){
                        var res0 = res[0]
                        var res1 = res[1]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.url0 = res0.Url
                        session.userData.url1 = res1.Url

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
                                            subtitle:res0.St,
                                            image_url:res0.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + res0.Title 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res1.Title,
                                            subtitle:res1.St,
                                            image_url:res1.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + res1.Title 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            image_url:"https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg",
                                            buttons:[
                                            {
                                                type:"postback",
                                                title:"C'est bon merci 🙂",
                                                payload:"C'est bon merci 🙂"
                                            }
                                            ]
                                        }
                                        ]
                                        }
                                    }
                                }
                            });

                        post_req.end();
                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title ,"C'est bon merci 🙂"],{maxRetries:0});
                        

                    }else if(n==3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.title2 = res2.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.id2 = res2.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.Time2 = res2.Time
                        session.userData.url0 = res0.Url
                        session.userData.url1 = res1.Url
                        session.userData.url2 = res2.Url
                        

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
                                            subtitle:res0.St,
                                            image_url:res0.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + res0.Title 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+res0.Lat+"+"+res0.Lng,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res1.Title,
                                            subtitle:res1.St,
                                            image_url:res1.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + res1.Title 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+res1.Lat+"+"+res1.Lng,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:res2.Title,
                                            subtitle:res2.St,
                                            image_url:res2.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + res2.Title 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+res2.Lat+"+"+res2.Lng,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            image_url:"https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg",
                                            buttons:[
                                            {
                                                type:"postback",
                                                title:"C'est bon merci 🙂",
                                                payload:"C'est bon merci 🙂"
                                            }
                                            ]
                                        }
                                        ]
                                        }
                                    }
                                }
                            });

                        post_req.end();
                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title,"plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});       
                        
                    }else if(n>3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.title2 = res2.Title

                        session.userData.st0 = res0.St
                        session.userData.st1 = res1.St
                        session.userData.st2 = res2.St

                        session.userData.lat0 = res0.Lat
                        session.userData.lat1 = res1.Lat
                        session.userData.lat2 = res2.Lat

                        session.userData.lng0 = res0.Lng
                        session.userData.lng1 = res1.Lng
                        session.userData.lng2 = res2.Lng

                        session.userData.image0 = res0.Image
                        session.userData.image1 = res1.Image
                        session.userData.image2 = res2.Image
                        
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.id2 = res2.Id

                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.Time2 = res2.Time

                        session.userData.url0 = res0.Url
                        session.userData.url1 = res1.Url
                        session.userData.url2 = res2.Url

                        session.userData.rest = res.slice(3,n)

                        msg = new builder.Message(session);
                           msg.sourceEvent({
                                facebook: {
                                    attachment:{
                                      type:"template",
                                      payload:{
                                        template_type:"generic",
                                        elements:
                                        [{
                                            title:session.userData.title0,
                                            subtitle:session.userData.st0,
                                            image_url:session.userData.image0,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + session.userData.title0 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+session.userData.lat0+"+"+session.userData.lng0,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:session.userData.title1,
                                            subtitle:session.userData.st1,
                                            image_url:session.userData.image1,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + session.userData.title1 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+session.userData.lat1+"+"+session.userData.lng1,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            title:session.userData.title2,
                                            subtitle:session.userData.st2,
                                            image_url:session.userData.image2,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"plus d'infos sur " + session.userData.title2 
                                            },
                                            {
                                                type:"web_url",
                                                url:"http://maps.google.com/maps?z=5&q=loc:"+session.userData.lat2+"+"+session.userData.lng2,
                                                title:"Le lieu du départ 🏁"
                                            },
                                            {
                                                type:"element_share"
                                            }]
                                        },
                                        {
                                            image_url:"https://image.ibb.co/iRYuKF/bye_bye_emoji.jpg",
                                            buttons:[
                                            {
                                                type:"postback",
                                                title:"C'est bon merci 🙂",
                                                payload:"C'est bon merci 🙂"
                                            }
                                            ]
                                        }
                                        ]
                                        }
                                    }
                                }
                            });      
                        post_req.end();
                        builder.Prompts.choice(session,msg,["plus d'infos sur " + res0.Title,"plus d'infos sur " + res1.Title,"plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});       
                    }
                }
            }else{
                console.log(error);
                session.send("Je suis désolé " + session.userData.name + "... 😕");
                session.send("j'ai un petit trou de mémoire, mais tu peux essayer avec une autre demande ;)");
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
                session.send("Si un des évènements t'intéresse, tu peux cliquer sur 'Plus d'infos ℹ' pour tout savoir")
            }else if(valence >= 0){
                session.send("Ok ! Si un des évènements t'intéresse, tu peux cliquer sur 'Plus d'infos ℹ' pour tout savoir")
            }
        }else{
            switch (results.response.index){
                case 0:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                case 1:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                case 2:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                case 3:
                    session.beginDialog("/query_bis",session.userData);
                case 4:
                    session.beginDialog("/menu",session.userData);
            }
        }         
    }
        
];