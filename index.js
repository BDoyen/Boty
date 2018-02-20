require('dotenv').config()
var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure'); 
var math = require('mathjs'); //math module
var sentiment = require('sentiment-multilang'); //sentiment analysis
//Recast.ai
var recastai = require('recastai').default


//state data storage
var documentDbOptions = {
    host: 'https://runglyuserdata.documents.azure.com:443/', 
    masterKey: '4qp31QGzb5XR7Q9NxPrlrEEGEEivNpumLOFB5qkgCPTBhEQirLmYAYenTlRK6JntEY6sCOJzPjO4JlO4b7Tvrg==', 
    database: 'botdocs',   
    collection: 'botdata'
};
var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);


// Create bot and add dialogs

//client connector
var connector = new builder.ChatConnector({
 appId: process.env.MICROSOFT_APP_ID,
 appPassword: process.env.MICROSOFT_APP_PASSWORD
});


//bot object
var bot = new builder.UniversalBot(connector)
     .set('storage', cosmosStorage);


// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});


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


bot.dialog('/',
    function(session){
        session.userData.tokengen = 'fb8fd247f05d3a8cf062a3aad2ef428c'
        var client = new recastai(session.userData.tokengen)
        var request = client.request
        request.analyseText(session.message.text)
            .then(function(res){
                var intent = res.intent();
                console.log(res)
                if(!res.intent()){
                    session.send("🐅 👟");
                    session.beginDialog('/menu',session.userData);
                }else{
                    var slug = intent.slug;
                        if(slug == 'greetings'){
                            session.send("Salut ! ");
                            session.beginDialog("/menu",session.userData);
                        }else if(slug == 'goodbye' || slug == "reset"){
                            session.send("Bye bye ");
                            session.beginDialog("/menu",session.userData);
                        }else if(slug == 'say-thanks'){
                            session.send("Merci ");
                            session.beginDialog("/menu",session.userData);
                        }else if(slug == 'ask-feeling'){
                            session.send("Ça va merci");
                            session.beginDialog("/menu",session.userData);
                        }else if(slug == 'insult'){
                            session.send(":(");
                            session.beginDialog("/menu",session.userData);
                        }else if(slug == 'help'){
                            session.beginDialog('/botlesmoi',session.userData);
                        }
                }
    }).catch(function(err){
            console.log(err)
            session.send("🐅 👟");
            session.beginDialog('/menu',session.userData);     
    })    
});


bot.dialog('/menu', require("./dialogs/menu"))
    .triggerAction({
        matches: /#menuderungly/i
});

bot.dialog("/firstRun", require("./dialogs/firstRun"));

bot.dialog("/query", require("./dialogs/query"));

bot.dialog("/query_bis", require("./dialogs/query_bis"));

bot.dialog("/botlesmoi", require("./dialogs/botlesmoi")).triggerAction({matches: /Une astuce 💡/i });

bot.dialog("/botlesmoi_push", require("./dialogs/botlesmoi_push"));

bot.dialog("/botlesmoi_buffer_push", require("./dialogs/botlesmoi_buffer_push"));

bot.dialog("/run", require("./dialogs/run")).triggerAction({matches:/une course 🎽/i});

bot.dialog("/confirm", require("./dialogs/confirm"));

bot.dialog("/dialog_quizz", require("./dialogs/dialog_quizz")).triggerAction({matches:/#quizzDeLaSemaine/i});

bot.dialog("/promo", require("./dialogs/promo")).triggerAction({matches:/promo/i});

bot.dialog("/resultsquizz", require("./dialogs/resultsquizz")).triggerAction({matches: /#resultatsSemaineAvant/i});

bot.dialog("/flux_inscription", require("./dialogs/flux_inscription"));

bot.dialog("/flux_inscription_buffer", require("./dialogs/flux_inscription_buffer"));

bot.dialog("/flux_inscription_all", require("./dialogs/flux_inscription_all"));

bot.dialog("/scroll", require("./dialogs/scroll"));

bot.dialog("/scroll_next", require("./dialogs/scroll_next"));

bot.dialog("/cool", require("./dialogs/cool"));

bot.dialog("/confirmation", require("./dialogs/confirmation"));

bot.dialog("/other", require("./dialogs/other"));

bot.dialog("/gestion_push", require("./dialogs/gestion_push")).triggerAction({ matches: /#mesabonnements/i });

bot.dialog("/rungly_coach", require("./dialogs/rungly_coach")).triggerAction({matches:/#coachingByRungly/i });

bot.dialog("/rungly_coach_1", require("./dialogs/rungly_coach_1"));

bot.dialog("/rungly_coach_10km", require("./dialogs/rungly_coach_10km")).triggerAction({matches: /S'inscrire ✅/i });

bot.dialog("/rungly_coach_prgm", require("./dialogs/rungly_coach_prgm"));

bot.dialog("/articles_blog", require("./dialogs/articles_blog")).triggerAction({matches: /#articlesdeblog/i });

bot.dialog("/share_rungly", require("./dialogs/share_rungly")).triggerAction({matches: /Partager Rungly 💚/i });


//piece of middleware for send Typing action

bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i, message: 'reset!' }));
bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/firstRun' }));
bot.use(builder.Middleware.sendTyping());