var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');
var funcs_time = require('./funcs/funcs_time.js');
var parser = require('rss-parser');
const cheerio = require("cheerio");
var request = require('request');
var https = require('https')


module.exports = [

function(session){

    var events_url = {
        0 : session.userData.url0,
        1 : session.userData.url1,
        2 : session.userData.url2
    }

    https.get(events_url[session.userData.index],function(res){
                        var data = '';
                        res.on('data', function(data_){
                                data += data_.toString(); 
                             });
                        res.on('end',function(){
                                let $ = cheerio.load(data);
                                descriptif = $('.frontend-entry-content').text();
                                //split into sentences event description
                                var result = descriptif.match( /[^\.!\?]+[\.!\?]+/g );
                                console.log(result)
                                var n = result.length;
                                session.userData.length_descriptif = n-2
                                if(n>=2){
                                    session.send(result[0]+result[1]);
                                    session.userData.descriptif = result.splice(2);
                                    session.beginDialog('/scroll_next',session.userData);
                                }else if(n == 1){
                                    session.send(result[0]);
                                    session.send("😊")
                                    session.beginDialog("/menu",session.userData)
                                }else{
                                    session.send("Désolé, mais je n'ai pas beaucoup d'infos sur cet événement...😥")
                                    session.beginDialog("/menu",session.userData)
                                }  
                            })
                    })
}

]