
require('dotenv').config()
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');
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

//LeChaboté
var post_options = {
      host: '217.182.206.5',
      port: '9000',
      path: '/All',
      method: 'POST'
};


//Facebook
var FB = require('fb');
FB.setAccessToken("EAAfV9rKoBcIBAH8B2sVAgJacS8JYlRvDAUctPbysZAK7NJ9s0beZC8Xi1J4b8jyqu4FZBgq9F3mohyT0ebptrseUx3QZBLU74ypcxzpjotG7xv5FZC1zTSHTmoevq794eJbc4r4hVDDCXYWOTRsZA1ojDTno0GZCQZBEZCfmftdCUZBAZDZD");


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


bot.dialog("/botlesmoi", require("./dialogs/botlesmoi"));


bot.dialog("/contact_phatique", require("./dialogs/contact_phatique"));


bot.dialog("/network", require("./dialogs/network")).
    triggerAction({ 
        matches: /Je recherche un stage,alternance... 🏃👔/i 
    });



bot.dialog("/feedback", require("./dialogs/feedback"))
    .triggerAction({ 
        matches:/💌 donner son avis/i 
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


bot.dialog("/adresse", require("./dialogs/adresse"))
    .triggerAction({
        matches: /📍 changer d'adresse/i
    })


bot.dialog("/run", require("./dialogs/run")).
    triggerAction({ 
        matches: /Je recherche une course... 🏃/i 
    });


bot.dialog("/astuce", require("./dialogs/astuce"))
    .triggerAction({ 
        matches: /💡 Une astuce running/i 
    });


bot.dialog("/which-run", require("./dialogs/which-run"))
    .triggerAction({
        matches: /🎽👟 courir/i
    });



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
                if(slug == 'ask-courir'){
                    if(!res.entities.datetime){
                        if(!entities.rungly){
                            session.beginDialog('/which-run',session.userData);
                        }else{
                            var value = entities.rungly[0].value
                            f_which_category(value,session)
                            session.beginDialog('/cross',session.userData);
                        }
                    }else{
                        var accuracy = res.entities.datetime[0].accuracy;
                        var chronology = res.entities.datetime[0].chronology;
                        var iso = res.entities.datetime[0].iso;
                        session.userData.giventemps = 1;
                        f1_time(session,chronology,accuracy,iso,slug)
                        if(!entities.rungly){
                            session.beginDialog('/which-run',session.userData);
                        }else{
                            var value = entities.rungly.value
                            f_which_category(value,session)
                            session.beginDialog('/cross',session.userData);
                        }
                    }
                }else if(slug == 'ask-jobrun'){
                    session.beginDialog('/network',session.userData);
                }else if(slug == 'greetings'){
                    session.beginDialog('/salut',session.userData);
                }else if(slug == 'goodbye'){
                    session.beginDialog('/catch',session.userData);
                }else if(slug == 'say-thanks'){
                    session.beginDialog('/merci',session.userData);
                }else if(slug == 'ask-feeling'){
                    session.beginDialog('/contact_phatique',session.userData);
                }else if(slug == 'who-is-your-creator'){
                    session.beginDialog('/contact_createur',session.userData);
                }else if(slug == 'insult'){
                    session.beginDialog('/insult',session.userData);
                }else{
                    session.send("aïe aïe aïe, j'ai pas tout compris là...");
                    session.beginDialog('/menu',session.userData);
                }
        }).catch(function(err){
            console.log(err)
            session.send("aïe aïe aïe, j'ai pas tout compris là...");
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








