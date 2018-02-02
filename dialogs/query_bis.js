var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


//Recast.ai
var recastai = require('recastai').default


//resources from other scripts


//Gifs
var getGif = require('../get/getGif');
var gifsArray = getGif.gifsArray;
var G = getGif.G;


//sentiment variables
var positiveSentimentArray = new Array("😀","😁","😉","😊","😌","😄","😎","😃","😜","😛","🤗","🔥","😇","😺","👌","👍");
var negativeSentimentArray = new Array("😑","😣","😶","😐","😕","😞","😦","😬");
var l = positiveSentimentArray.length;
var k = negativeSentimentArray.length;



//////////////////////functions//////////////////////



module.exports = [

		function(session){

			if(!session.userData.rest){
				session.send("Je suis désolé " + session.userData.name);
                session.send("pour le moment, je n'ai pas d'évènements qui correspondent à ta demande mais tu peux essayer avec une autre recherche ;)");
                session.beginDialog('/menu',session.userData);
			}else{

				var res = session.userData.rest;
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
                                               payload:"je voudrais plus d'infos sur " + res0.Title 
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

                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je voudrais plus d'infos sur " + res0.Title ,"C'est bon merci 🙂"],{maxRetries:0});

                    }else if(n == 2){
                        var res0 = res[0]
                        var res1 = res[1]
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
                                               payload:"je voudrais plus d'infos sur " + res0.Title 
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
                                               payload:"je voudrais plus d'infos sur " + res1.Title 
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

                        session.userData.giventemps = 0;
                        builder.Prompts.choice(session,msg,["je voudrais plus d'infos sur " + res0.Title,"je voudrais plus d'infos sur " + res1.Title ,"C'est bon merci 🙂"],{maxRetries:0});
                               
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
                                               payload:"je voudrais plus d'infos sur " + res0.Title 
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
                                               payload:"je voudrais plus d'infos sur " + res1.Title 
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
                                               payload:"je voudrais plus d'infos sur " + res2.Title 
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

                        session.userData.giventemps = 0;

                        builder.Prompts.choice(session,msg,["je voudrais plus d'infos sur " + res0.Title,"je voudrais plus d'infos sur " + res1.Title,"je voudrais plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});         

                    }else if(n>3){     
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
                                            title:res0.Title,
                                            subtitle:res0.St,
                                            image_url:res0.Image,
                                            buttons:[
                                            {
                                               type:"postback",
                                               title:"Plus d'infos ℹ️",
                                               payload:"je voudrais plus d'infos sur " + res0.Title 
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
                                               payload:"je voudrais plus d'infos sur " + res1.Title 
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
                                               title:"Plus d'infos ℹ",
                                               payload:"je voudrais plus d'infos sur " + res2.Title 
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

                        builder.Prompts.choice(session,msg,["je voudrais plus d'infos sur " + res0.Title,"je voudrais plus d'infos sur " + res1.Title,"je voudrais plus d'infos sur " + res2.Title,"plus d'évènements","C'est bon merci 🙂"],{maxRetries:0});      
                    }
			}
		},
		function(session,results){

		if(!results.response){
                var sent = sentiment(session.message.text,'fr');
                var valence = sent.score;
                if(valence < 0){
                    session.send("Si un des évènements t'intéresse, tu peux cliquer sur 'Plus d'infos ℹ' pour tout savoir dessus")
                }else if(valence >= 0){
                    session.send("Ok ! Si un des évènements t'intéresse, tu peux cliquer sur 'Plus d'infos ℹ' pour tout savoir dessus")
                }
        }else{
            switch (results.response.index){
                case 0:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                    break;
                case 1:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                    break;
                case 2:
                    session.userData.index = results.response.index;
                    session.beginDialog("/scroll",session.userData);
                    break;
                case 3:
                    session.beginDialog("/query_bis",session.userData);
                    break;
                case 4:
                    session.beginDialog("/menu",session.userData);
                    break;
            }
        }
}



]