var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports =[

	function(session){
		 
        session.send("Un petit cadeau pour un(e) ami(e) runner 💌")
        msg = new builder.Message(session);
           msg.sourceEvent({
                facebook: {
                    attachment:{
                      type:"template",
                      payload:{
                        template_type:"generic",
                        elements:
                        [{
                            title:"Rungly, ton ami runner sur Messenger 🏃",
                            subtitle:"Coaching, Quizz, Blogs, Courses, Astuces,...",
                            image_url:"https://image.ibb.co/n5XHGH/rungly_app.jpg",
                            buttons:[
                            {
                                type:"element_share"
                            }]
                        }]
                        }
                    }
                }
            });
    session.send(msg);
    session.beginDialog('/menu',session.userData)
	}
]