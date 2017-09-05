
require('dotenv').config()
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var funcs_time = require('./dialogs/funcs/funcs_time.js');
var func_which_category = require('./dialogs/funcs/func_which_category.js');


//client server
var server = restify.createServer();


server.listen(process.env.port || process.env.PORT || 3978, function () {
 console.log('%s listening to %s', server.name, server.url);
});


//client connector
var connector = new builder.ChatConnector({
 appId: process.env.MICROSOFT_APP_ID,
 appPassword: process.env.MICROSOFT_APP_PASSWORD
});


//bot object
var bot = new builder.UniversalBot(connector);


//server listening
server.post('/api/messages', connector.listen());



//resources from other scripts


//Tips
var getTip = require('./get/getTip');
var tipsArray = getTip.tipsArray;
var N = getTip.N;

//Gifs
var getGif = require('./get/getGif');
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


//APIs//


//Facebook
var FB = require('fb');
FB.setAccessToken("EAAFL0ok0ZCS0BAPjCnmZABVSBLDXvOyJPSFlXuyMWemyjPqapFqZCRqfX0srzsYQFVJveLHZATyKXoLpNIduekW0nbnKPyRpWKid4jk7l1RbGF6QEDiD7K3qC0D1EsuTsayrtsogMCjZA3zPMGMufjlA63RSoMwWXpd3l0WaZAMgZDZD");


//Recast.ai
var recastai = require('recastai').default


//time functions 
var f1_time = funcs_time.f1_time
var f2_time = funcs_time.f2_time
var f_which_category = func_which_category.f_which_category



//dialogs
bot.dialog("/firstRun", require("./dialogs/firstRun"));


bot.dialog("/menu", require("./dialogs/menu"));


bot.dialog("/temps", require("./dialogs/temps"));


bot.dialog("/query", require("./dialogs/query"));


bot.dialog("/query_bis", require("./dialogs/query_bis"));


bot.dialog("/botlesmoi", require("./dialogs/botlesmoi"))
    .triggerAction({ 
        matches: /des astuces 💡/i 
    });


bot.dialog("/contact_phatique", require("./dialogs/contact_phatique"));


bot.dialog("/jobrun", require("./dialogs/jobrun")).
    triggerAction({ 
        matches: /Je recherche un stage,alternance... 🏃👔/i 
    });



bot.dialog("/feedback", require("./dialogs/feedback"))
    .triggerAction({ 
        matches:/donner son avis 💌/i 
    });


bot.dialog("/catch", require("./dialogs/catch"));


bot.dialog("/merci", require("./dialogs/merci"));


bot.dialog("/salut", require("./dialogs/salut"));


bot.dialog("/contact_createur", require("./dialogs/contact_createur"));


bot.dialog("/meet", require("./dialogs/meet"))
    .triggerAction({ 
        matches: /Je recherche une communauté de runners... 🏃‍👥/i 
    });


bot.dialog("/cross", require("./dialogs/cross"));


bot.dialog("/insult", require("./dialogs/insult"));


bot.dialog("/adresse", require("./dialogs/adresse"));


bot.dialog("/adresse_bis", require("./dialogs/adresse_bis"));



bot.dialog("/run", require("./dialogs/run")).
    triggerAction({ 
        matches: /Je recherche une course... 🏃/i 
    });



bot.dialog("/which-run", require("./dialogs/which-run"));




bot.dialog("/",
    function(session){
        session.userData.tokengen = '62603faf2cd89150edb9b831ee9bfc10'
        var client = new recastai(session.userData.tokengen)
        var request = client.request
        request.analyseText(session.message.text)
            .then(function(res){
                var intent = res.intent();
                var slug = intent.slug;
                var entities = res.entities;
                console.log(entities)
                var rungly = !entities.runglyrelax && !entities.runglyfun && !entities.runglysolidaire && !entities.runglyintermediaire && !entities.runglypro
                console.log(rungly)       
                if(slug == 'ask-courir'){
                    if(!res.entities.datetime){
                        if(rungly){
                            session.beginDialog('/which-run',session.userData);
                        }else{
                            f_which_category(entities.runglyrelax,entities.runglysolidaire,entities.runglyfun,entities.runglyintermediaire,entities.runglypro,session)//go for tagging
                            session.beginDialog('/cross',session.userData);
                        }
                    }else{
                        var accuracy = res.entities.datetime[0].accuracy;
                        var chronology = res.entities.datetime[0].chronology;
                        var iso = res.entities.datetime[0].iso;
                        session.userData.giventemps = 1;
                        f1_time(session,chronology,accuracy,iso,slug)
                        if(rungly){
                            session.beginDialog('/which-run',session.userData);
                        }else{
                            f_which_category(entities.runglyrelax,entities.runglysolidaire,entities.runglyfun,entities.runglyintermediaire,entities.runglypro,session)//go for tagging
                            session.beginDialog('/cross',session.userData);
                        }
                    }
                }else if(slug == 'ask-jobrun'){
                    session.beginDialog('/network',session.userData);
                }else if(slug == 'greetings'){
                    session.beginDialog('/salut',session.userData);
                }else if(slug == 'goodbye' || slug == "reset"){
                    session.beginDialog('/catch',session.userData);
                }else if(slug == 'say-thanks'){
                    session.beginDialog('/merci',session.userData);
                }else if(slug == 'ask-feeling'){
                    session.beginDialog('/contact_phatique',session.userData);
                }else if(slug == 'who-is-your-creator'){
                    session.beginDialog('/contact_createur',session.userData);
                }else if(slug == 'insult'){
                    session.beginDialog('/insult',session.userData);
                }else if(slug == 'help'){
                    session.beginDialog('/botlesmoi',session.userData);
                }else if(slug == "change-address"){
                    session.beginDialog("/adresse_bis",session.userData);
                }else{
                    session.send("🐅 👟");
                    session.beginDialog('/menu',session.userData);
                }
        }).catch(function(err){
            console.log(err)
            session.send("🐅 👟");
            session.beginDialog('/menu',session.userData);     
    })    
});



//general commands

//first dialog redirection
bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/firstRun' }));


//piece of middleware for send Typing
bot.use(builder.Middleware.sendTyping());


//goodbye command
bot.endConversationAction('goodbye', "Au revoir 👋", { matches: /🔄 recommencer/i });








