require('dotenv').config()
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var azure = require('botbuilder-azure'); 
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


//state data storage
var documentDbOptions = {
    host: 'https://runglyuserdata.documents.azure.com:443/', 
    masterKey: '4qp31QGzb5XR7Q9NxPrlrEEGEEivNpumLOFB5qkgCPTBhEQirLmYAYenTlRK6JntEY6sCOJzPjO4JlO4b7Tvrg==', 
    database: 'botdocs',   
    collection: 'botdata'
};
var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);


//bot object
var bot = new builder.UniversalBot(connector)
    .set('storage', cosmosStorage);


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
FB.setAccessToken("EAAFL0ok0ZCS0BAJbt8taLARWPEZAnYTBFGyZA5k5hCtWfZBPGFhOfgVnky8BXpgh6XPZAodJndVhZB494W6vxwqTM6VYvNmls9L7anXO1T7KbxxiPHv3dq2N59ABAtS8FZCuAZAKnkRZA2XaqV2SGXToL0HwMr64UaeuV4kMO3rZAmhAZDZD");


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
        matches: /Une astuce 💡/i 
    });


bot.dialog("/contact_phatique", require("./dialogs/contact_phatique"));


bot.dialog("/jobrun", require("./dialogs/jobrun"))
    .triggerAction({ 
        matches: /JobRun 🏃👔/i 
    });


bot.dialog("/feedback", require("./dialogs/feedback"))
    .triggerAction({ 
        matches:/donner son avis 💌/i 
    });


bot.dialog("/catch", require("./dialogs/catch"))
    .triggerAction({ 
        matches:/recommencer 🔄/i 
    });


bot.dialog("/merci", require("./dialogs/merci"));


bot.dialog("/salut", require("./dialogs/salut"));


bot.dialog("/contact_createur", require("./dialogs/contact_createur"));


bot.dialog("/meet", require("./dialogs/meet"))
    .triggerAction({ 
        matches: /avec une communauté 👟/i 
    });


bot.dialog("/cross", require("./dialogs/cross"));


bot.dialog("/insult", require("./dialogs/insult"));


bot.dialog("/adresse", require("./dialogs/adresse"));


bot.dialog("/adresse_bis", require("./dialogs/adresse_bis"))
    .triggerAction({ 
        matches: /changer d'adresse 📍/i 
    });


bot.dialog("/run", require("./dialogs/run"))
    .triggerAction({ 
        matches: /une course 🎽/i 
    });


bot.dialog("/which-run", require("./dialogs/which-run"));


bot.dialog("/confirm", require("./dialogs/confirm"));


bot.dialog("/gestion", require("./dialogs/gestion"))
    .triggerAction({ 
        matches: /gestion de mes courses 📅/i 
    });

bot.dialog("/gestion_bis", require("./dialogs/gestion_bis"));


bot.dialog("/dialog_quizz", require("./dialogs/dialog_quizz"))
    .triggerAction({ 
        matches: /#quizzDeLaSemaine/i 
    });

bot.dialog("/promo", require("./dialogs/promo"))
    .triggerAction({ 
        matches: /promo/i 
    });


bot.dialog("/resultsquizz", require("./dialogs/resultsquizz"))
    .triggerAction({ 
        matches: /#resultatsSemaineAvant/i 
    });

bot.dialog("/gestion_push", require("./dialogs/gestion_push"))
    .triggerAction({ 
        matches: /#menuGestionNotif/i 
    });

bot.dialog("/rungly_coach", require("./dialogs/rungly_coach"))
    .triggerAction({ 
        matches: /#coachingByRungly/i 
    });


bot.dialog("/rungly_coach_10km", require("./dialogs/rungly_coach_10km"))
    .triggerAction({ 
        matches: /S'inscrire ✅/i 
    });


bot.dialog("/articles_blog", require("./dialogs/articles_blog"))
    .triggerAction({ 
        matches: /#articlesdeblog/i 
    });

bot.dialog("/flux_inscription", require("./dialogs/flux_inscription"));

bot.dialog("/flux_inscription_buffer", require("./dialogs/flux_inscription_buffer"));

bot.dialog("/flux_inscription_all", require("./dialogs/flux_inscription_all"));

bot.dialog("/scroll", require("./dialogs/scroll"));

bot.dialog("/scroll_next", require("./dialogs/scroll_next"));

bot.dialog("/cool", require("./dialogs/cool"));


bot.dialog("/",
    function(session){
        session.userData.tokengen = '62603faf2cd89150edb9b831ee9bfc10'
        var client = new recastai(session.userData.tokengen)
        var request = client.request
        request.analyseText(session.message.text)
            .then(function(res){
                var intent = res.intent();
                if(!res.intent()){
                    session.send("🐅 👟");
                    session.beginDialog('/menu',session.userData);
                }else{
                    var slug = intent.slug;
                    var entities = res.entities;
                    var rungly = !entities.runglyrelax && !entities.runglyfun && !entities.runglysolidaire && !entities.runglyintermediaire && !entities.runglypro     
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


//piece of middleware for send Typing action
bot.use(builder.Middleware.sendTyping());














