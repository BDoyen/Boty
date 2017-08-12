
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
 console.log('%s listening to %s', server.name, server.url);
});


var connector = new builder.ChatConnector({
 appId:"85e2a774-7293-4c9f-8125-861ede688d36",
 appPassword: "Cbfg04BBioUNt6FRXDSK1Bi"
});

var bot = new builder.UniversalBot(connector);

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

bot.dialog("/preinscription", require("./dialogs/preinscription"));

bot.dialog("/feedback", require("./dialogs/feedback"))
    .triggerAction({ 
        matches:/😉 donner son avis/i 
    });

bot.dialog("/catch", require("./dialogs/catch"));

bot.dialog("/merci", require("./dialogs/merci"));

bot.dialog("/salut", require("./dialogs/salut"));

bot.dialog("/contact_createur", require("./dialogs/contact_createur"));


bot.dialog("/meet", require("./dialogs/meet"))
    .triggerAction({ 
        matches: /Je recherche une communauté de runners... 🏃‍👥/i 
    });

bot.dialog("/temps2", require("./dialogs/temps2"));

bot.dialog("/adresse", require("./dialogs/adresse"));

bot.dialog("/run", require("./dialogs/run")).
    triggerAction({ 
        matches: /Je recherche une course... 🏃/i 
    });

bot.dialog("/astuce", require("./dialogs/astuce"))
    .triggerAction({ 
        matches: /💡 Une astuce running/i 
    });





bot.dialog("/",
    function(session){
        session.userData.tokengen = '29bf079df3202b00ea358ff804d3ef0a'
        var client = new recastai(session.userData.tokengen)
        var request = client.request
        request.analyseText(session.message.text)
            .then(function(res){
                var intent = res.intent();
                var slug = intent.slug;
                if(slug == 'courir'){
                    session.beginDialog('/run',session.userData);
                }else if(slug == 'courir_communaute'){
                    session.beginDialog('/meet',session.userData);
                }else if(slug == 'courir_network'){
                    session.beginDialog('/network',session.userData);
                }else if(slug == 'greetings'){
                    session.beginDialog('/salut',session.userData);
                }else if(slug == 'goodbye'){
                    session.beginDialog('/catch',session.userData);
                }else if(slug == 'merci'){
                    session.beginDialog('/merci',session.userData);
                }else if(slug == 'contact_phatique'){
                    session.beginDialog('/contact_phatique',session.userData);
                }else if(slug == 'contact_createur'){
                    session.beginDialog('/contact_createur',session.userData);
                }else if(slug == 'gros_mot'){
                    session.beginDialog('/contact_createur',session.userData);
                }else if(slug == 'preinscription'){
                    session.beginDialog('/preinscription',session.userData);
                }else{
                    session.send("aïe aïe aïe, j'ai pas tout compris là...");
                    session.beginDialog('/menu',session.userData);
                }
        }).catch(function(err){
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
bot.endConversationAction('goodbye', "Au revoir 👋", { matches: /^recommencer/i });




















