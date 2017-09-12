var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module

var request = require('request');


//Gifs
var getGif = require('../get/getGif');
var gifsArray = getGif.gifsArray;
var G = getGif.G;



module.exports = [

function(session){

	switch (session.userData.index){
                case 0:
                    session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + session.userData.title0);
                    session.send("Je t'enverrai un petit rappel 24h avant 😉");
                    var gif = gifsArray[math.round(math.random()*(G+1))];
                    var msg = new builder.Message(session)
                        .attachments([
                            new builder.AnimationCard(session)
                                .media([
                                    {url: gif}
                                ])
                    ]);

                    var time = session.userData.Time0
                    var data = JSON.stringify([{Event:session.userData.id0,User:session.userData.idstring,Times:time.toString()}]);

                    session.userData.post_options = {
                        url: "http://gopiko.cloudapp.net:8080/push/inscription",
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
                        session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + session.userData.title1);
                        session.send("Je t'enverrai un petit rappel 24h avant 😉");
                        var gif = gifsArray[math.round(math.random()*(G+1))];
                        var msg = new builder.Message(session)
                            .attachments([
                                new builder.AnimationCard(session)
                                    .media([
                                        {url: gif}
                                    ])
                        ]);

                        var time = session.userData.Time1

                        var data = JSON.stringify([{Event:session.userData.id1,User:session.userData.idstring,Times:time.toString()}]);

                        session.userData.post_options = {
                            url: "http://gopiko.cloudapp.net:8080/push/inscription",
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
                        session.send("Bon choix " + session.userData.name + ", tu t'es pré-inscrit à " + session.userData.title2);
                        session.send("Je t'enverrai un petit rappel 24h avant 😉");
                        var gif = gifsArray[math.round(math.random()*(G+1))];
                        var msg = new builder.Message(session)
                            .attachments([
                                new builder.AnimationCard(session)
                                    .media([
                                        {url: gif}
                                    ])
                        ]);

                        var time = session.userData.Time2

                        var data = JSON.stringify([{Event:session.userData.id2,User:session.userData.idstring,Times:time.toString()}]);

                        session.userData.post_options = {
                            url: "http://gopiko.cloudapp.net:8080/push/inscription",
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
                    session.beginDialog('/query_bis',session.userData);
                    break;
                case 4:
                    session.beginDialog('/catch',session.userData);
                    break;
            }
}

]