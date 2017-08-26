

var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');

var request = require('request');



//Facebook
var FB = require('fb');
FB.setAccessToken("EAAfV9rKoBcIBAH8B2sVAgJacS8JYlRvDAUctPbysZAK7NJ9s0beZC8Xi1J4b8jyqu4FZBgq9F3mohyT0ebptrseUx3QZBLU74ypcxzpjotG7xv5FZC1zTSHTmoevq794eJbc4r4hVDDCXYWOTRsZA1ojDTno0GZCQZBEZCfmftdCUZBAZDZD");


//Recast.ai
var recastai = require('recastai').default


//resources from other scripts

//Tips
var getTip = require('../get/getTip');
var tipsArray = getTip.tipsArray;
var N = getTip.N;

//Gifs
var getGif = require('../get/getGif');
var gifsArray = getGif.gifsArray;
var G = getGif.G;


//sentiment variables
var positiveSentimentArray = new Array("😀","😁","😉","😊","😌","😄","😎","😃","😜","😛","🤗","🔥","😇","😺","👌","👍");
var negativeSentimentArray = new Array("😑","😣","😶","😐","😕","😞","😦","😬");
var l = positiveSentimentArray.length;
var k = negativeSentimentArray.length;


//time variables
var days = new Array('lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche');
var time = ["en matinée","dans l'après-midi","le soir venu"]
var week = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]



//////////////////////functions//////////////////////



module.exports = [


    function(session,results){

        //éléments pour requête 
        console.log(session.userData.timemin)
        console.log(session.userData.address)
        console.log(session.userData.level)
        console.log(session.userData.category)

        //LeChaboté
        session.userData.post_options = {
              url: "http://217.182.206.5:8000/event/getevent",
              method: 'POST',
        };

        var dt = session.userData.timemin

        var data = JSON.stringify([{Times:dt.toString(),Addr:session.userData.address,Cat:session.userData.category,Lvl:session.userData.level}]);

        session.userData.post_options.form = data;

        var post_req = request(session.userData.post_options, function(error,response,body){

            if(!error){
                var res = session.userData.body = JSON.parse(body)
                if(res == null){
                    session.send("Je suis désolé " + session.userData.name);
                    session.send("pour le moment, je n'ai pas d'évènements qui correspondent à ta demande mais tu peux essayer avec une autre recherche ;)");
                    session.beginDialog('/menu',session.userData);
                }else{
                    var n = session.userData.reslength = res.length;
                    if(n == 1){
                        var res0 = res[0]
                        session.userData.title0 = res0.Title
                        session.userData.id0 = res0.Id
                        session.userData.Time0 = res0.Time
                            var msg = new builder.Message(session);
                            msg.sourceEvent({
                                facebook: {
                                    attachment:{
                                        type:"template",
                                        payload:{
                                        template_type:"generic",
                                        elements:[
                                            {
                                                title:res0.Title,
                                                subtitle:res0.St,
                                                image_url:res0.Image,
                                                buttons:[
                                                    {
                                                        type:"web_url",
                                                        url: res0.Url,
                                                        title: "Inscription 🎫"
                                                    },
                                                    {
                                                        type:"postback",
                                                        title:"Ça m'intéresse 😍",
                                                        payload:"je me pré-inscris à "+ res0.Title
                                                    },
                                                    {
                                                        type:"element_share",
                                                        title:"Partager avec un ami 💚"
                                                    }
                                                ]
                                            },
                                            {
                                                title:"Options",
                                                image_url:"https://image.ibb.co/fQVXma/rungly2.png",
                                                buttons:[
                                                    {
                                                        type:"postback",
                                                        title:"Plus d'évènements",
                                                        payload:"Encore plus Rungly"
                                                    },
                                                    {
                                                        type:"postback",
                                                        title:"C'est bon merci 🙂",
                                                        payload:"C'est bon merci :)"
                                                    }
                                                ]
                                            }
                                        ]
                                        }
                                    }
                                }
                            });
                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"C'est bon merci :)"],{maxRetries:0});
                    }else if(n == 2){
                        var res0 = res[0]
                        var res1 = res[1]
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                            var msg = new builder.Message(session);
                                msg.sourceEvent({
                                    facebook: {
                                        attachment:{
                                            type:"template",
                                            payload:{
                                            template_type:"generic",
                                            elements:[
                                                {
                                                    title:res0.Title,
                                                    subtitle:res0.St,
                                                    image_url:res0.Image,
                                                    buttons:[
                                                        {
                                                            type:"web_url",
                                                            url: res0.Url,
                                                            title: "Inscription 🎫"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"Ça m'intéresse 😍",
                                                            payload:"je me pré-inscris à "+ res0.Title
                                                        },
                                                        {
                                                            type:"element_share",
                                                            title:"Partager avec un ami 💚"
                                                        }
                                                    ]
                                                },
                                                {
                                                    title:res1.Title,
                                                    subtitle:res1.St,
                                                    image_url:res1.Image,
                                                    buttons:[
                                                        {
                                                            type:"web_url",
                                                            url: res1.Url,
                                                            title: "Inscription 🎫"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"Ça m'intéresse 😍",
                                                            payload:"je me pré-inscris à "+ res1.Title
                                                        },
                                                        {
                                                            type:"element_share",
                                                            title:"Partager avec un ami 💚"
                                                        }
                                                    ]
                                                },
                                                {
                                                    title:"Options",
                                                    image_url:"https://image.ibb.co/fQVXma/rungly2.png",
                                                    buttons:[
                                                        {
                                                            type:"postback",
                                                            title:"Plus d'évènements",
                                                            payload:"Encore plus Rungly"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"C'est bon merci 🙂",
                                                            payload:"C'est bon merci :)"
                                                        }
                                                    ]
                                                }
                                            ]
                                            }
                                        }
                                    }
                                });
                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à "+ res0.Title,"je me pré-inscris à "+ res1.Title,"C'est bon merci :)"],{maxRetries:0});
                    }else if(n>=3){
                        var res0 = res[0]
                        var res1 = res[1]
                        var res2 = res[2]
                        console.log(res0)
                        session.userData.title0 = res0.Title
                        session.userData.title1 = res1.Title
                        session.userData.title2 = res2.Title
                        session.userData.id0 = res0.Id
                        session.userData.id1 = res1.Id
                        session.userData.id2 = res2.Id
                        session.userData.Time0 = res0.Time
                        session.userData.Time1 = res1.Time
                        session.userData.Time2 = res2.Time
                        var msg = new builder.Message(session);
                            msg.sourceEvent({
                                    facebook: {
                                        attachment:{
                                            type:"template",
                                            payload:{
                                            template_type:"generic",
                                            elements:[
                                                {
                                                    title:res0.Title,
                                                    subtitle:res0.St,
                                                    image_url:res0.Image,
                                                    buttons:[
                                                        {
                                                            type:"web_url",
                                                            url: res0.Url,
                                                            title: "Inscription 🎫"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"Ça m'intéresse 😍",
                                                            payload:"je me pré-inscris à "+ res0.Title
                                                        },
                                                        {
                                                            type:"element_share",
                                                            title:"Partager avec un ami 💚"
                                                        }
                                                    ]
                                                },
                                                {
                                                    title:res1.Title,
                                                    subtitle:res1.St,
                                                    image_url:res1.Image,
                                                    buttons:[
                                                        {
                                                            type:"web_url",
                                                            url: res1.Url,
                                                            title: "Inscription 🎫"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"Ça m'intéresse 😍",
                                                            payload:"je me pré-inscris à "+ res1.Title
                                                        },
                                                        {
                                                            type:"element_share",
                                                            title:"Partager avec un ami 💚"
                                                        }
                                                    ]
                                                },
                                                {
                                                    title:res2.Title,
                                                    subtitle:res2.St,
                                                    image_url:res2.Image,
                                                    buttons:[
                                                        {
                                                            type:"web_url",
                                                            url: res2.Url,
                                                            title: "Inscription 🎫"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"Ça m'intéresse 😍",
                                                            payload:"je me pré-inscris à "+ res2.Title
                                                        },
                                                        {
                                                            type:"element_share",
                                                            title:"Partager avec un ami 💚"
                                                        }
                                                    ]
                                                },
                                                {
                                                    title:"Options",
                                                    image_url:"https://image.ibb.co/fQVXma/rungly2.png",
                                                    buttons:[
                                                        {
                                                            type:"postback",
                                                            title:"Plus d'évènements",
                                                            payload:"Encore plus Rungly"
                                                        },
                                                        {
                                                            type:"postback",
                                                            title:"C'est bon merci 🙂",
                                                            payload:"C'est bon merci :)"
                                                        }
                                                    ]
                                                }
                                            ]
                                            }
                                        }
                                    }
                                });
                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je me pré-inscris à l'évènement "+ res0.Title,"je me pré-inscris à l'évènement "+ res1.Title,"je me pré-inscris à l'évènement "+ res2.Title,"C'est bon merci :)"],{maxRetries:0});       
                    }
                }
            }else{
                console.log(error);
                session.send("Je suis désolé " + session.userData.name + "... 😕");
                session.send("j'ai un petit trou de mémoire, mais tu peux essayer avec une autre demande ;)");
                session.beginDialog('/menu',session.userData);
            }       
        })



    },
    function(session, results){
        if(!results.response){
            var sent = sentiment(session.message.text,'fr');
            var valence = sent.score;
            if(valence < 0){
                session.send("Si un des évènements t'intéresse, tu peux cliquer sur 'Ça m'intéresse' pour te pré-inscrire")
            }else if(valence >= 0){
                session.send("Ok ! si un des évènements t'intéresse, cliquer sur 'Ça m'intéresse' pour te pré-inscrire ;)")
            }else{}
            session.endDialogWithResult({
            response: null,
            resumed: builder.ResumeReason.completed
            });
        }else{
            var item
            switch (results.response.index){
                case 0:
                    var item = session.userData.title0;
                    session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + item);
                    session.send("Je t'enverrai un petit rappel 24h avant 😉");
                    var gif = gifsArray[math.round(math.random()*(G+1))];
                    var msg = new builder.Message(session)
                        .attachments([
                            new builder.AnimationCard(session)
                                .media([
                                    {url: gif}
                                ])
                    ]);

                    var data = JSON.stringify([{Event:session.userData.id0,User:session.userData.idstring,Times:session.userData.Time0}]);

                    session.userData.post_options = {
                        url: "http://217.182.206.5:8000/push/inscription",
                        method: 'POST',
                        form:data
                    };

                    var post_req = request(session.userData.post_options, function(error,response,body){
                        if(error){
                            console.log(error);
                            session.send(";) 🐅");
                            }else{}
                    });

                    session.endDialog(msg);
                    break;
                case 1:
                    if(session.userData.reslength != 1){
                        var item = session.userData.title1;
                        session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + item);
                        session.send("Je t'enverrai un petit rappel 24h avant 😉");
                        var gif = gifsArray[math.round(math.random()*(G+1))];
                        var msg = new builder.Message(session)
                            .attachments([
                                new builder.AnimationCard(session)
                                    .media([
                                        {url: gif}
                                    ])
                        ]);

                        var data = JSON.stringify([{Event:session.userData.id1,User:session.userData.idstring,Times:session.userData.Time1}]);

                        session.userData.post_options = {
                            url: "http://217.182.206.5:8000/push/inscription",
                            method: 'POST',
                            form:data
                        };

                        var post_req = request(session.userData.post_options, function(error,response,body){
                            if(error){
                                console.log(error);
                                session.send(";) 🐅");
                                }else{}
                        });

                        session.endDialog(msg);
                        break;
                    }else{
                        session.beginDialog('/catch',session.userData);
                        break;
                    }
                case 2:
                    if(session.userData.reslength != 2){
                        var item = session.userData.title2;
                        session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + item);
                        session.send("Je t'enverrai un petit rappel 24h avant 😉");
                        var gif = gifsArray[math.round(math.random()*(G+1))];
                        var msg = new builder.Message(session)
                            .attachments([
                                new builder.AnimationCard(session)
                                    .media([
                                        {url: gif}
                                    ])
                        ]);

                        var data = JSON.stringify([{Event:session.userData.id2,User:session.userData.idstring,Times:session.userData.Time2}]);

                        session.userData.post_options = {
                            url: "http://217.182.206.5:8000/push/inscription",
                            method: 'POST',
                            form:data
                        };

                        var post_req = request(session.userData.post_options, function(error,response,body){
                            if(error){
                                console.log(error);
                                session.send(";) 🐅");
                                }else{}
                        });

                        session.endDialog(msg);
                        break;
                    }else{
                        session.beginDialog('/catch',session.userData);
                        break;
                    }
                case 3:
                    session.beginDialog('/catch',session.userData);
                    break;
            }
        }
    }    
];