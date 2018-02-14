var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var request = require('request');


module.exports = [

	function(session){
		var data = JSON.stringify({Id:session.userData.idstring});
	    session.userData.post_options = {
	    	url: "http://217.182.206.5:8080/inscription/getall",
	        method: 'POST',
	        form:data,
	        timeout:30000
	   };
	   var post_req = request(session.userData.post_options,function(error,response,body){
	   if(error){
	    	console.log(error);
	    	session.endDialog(";) 🐅");
	    }else{
	         var res = JSON.parse(body)
	         if(res == null){
	         	session.endDialog(";) 🐅");
	         }else{
	         	if(res.Quizz){
	         		session.userData.quizz = "Tu es inscrit aux quizz ✅";
	         	}else{
	         		session.userData.quizz = "Tu n'es pas inscrit aux quizz ⚠️";
	         	}
	         	if(res.Event){
	         		session.userData.event = "Tu es inscrit aux events ✅";
	         	}else{
	         		session.userData.event = "Tu n'es pas inscrit aux events ⚠️";
	         	}
	         	if(res.Article){
	         		session.userData.article = "Tu es inscrit aux articles ✅";
	         		session.userData.cat_all = res.Cat;
	         	}else{
	         		session.userData.article = "Tu n'es pas inscrit aux articles ⚠️";
	         	}
	         	if(res.Astuce){
	         		session.userData.astuce = "Tu es inscrit aux astuces ✅";
	         	}else{
	         		session.userData.astuce = "Tu n'es pas inscrit aux astuces ⚠️";
	         	}
	         	var msg = new builder.Message(session)
                            .attachmentLayout(builder.AttachmentLayout.carousel)
                            .attachments([
                                new builder.HeroCard(session)
                                    .title("Quizz du Lundi")
                                    .subtitle(session.userData.quizz)
                                    .images([
                                        builder.CardImage.create(session,"https://image.ibb.co/hqVRrw/Capture_d_e_cran_2018_01_24_a_23_34_21.png")
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session,"S'inscrire aux quizz")
                                            .title("S'inscrire 👟"),
                                        builder.CardAction.imBack(session,"Stop notif quizz 🔕")
                                            .title("Stop notif' 🔕")
                                    ]),
                                new builder.HeroCard(session)
	                                .title("Articles de Blog")
	                                .subtitle(session.userData.article)
	                                .images([
	                                    builder.CardImage.create(session,"https://image.ibb.co/cPx0Jb/Capture_d_e_cran_2018_01_25_a_10_11_17.png")
	                                ])
	                                .buttons([
	                                    builder.CardAction.imBack(session,"S'inscire aux articles")
	                                        .title("S'inscrire 👟"),
	                                    builder.CardAction.imBack(session,"Stop notif articles 🔕")
	                                        .title("Stop notif' 🔕")
	                                ]), 
                                new builder.HeroCard(session)
	                                .title("Les courses")
	                                .subtitle(session.userData.event)
	                                .images([
	                                    builder.CardImage.create(session,"https://image.ibb.co/jpiUBw/Capture_d_e_cran_2018_01_24_a_23_36_02.png")
	                                ])
	                                .buttons([
	                                    builder.CardAction.imBack(session,"S'inscrire aux events")
	                                        .title("S'inscrire 👟"),
	                                    builder.CardAction.imBack(session,"Stop notif events 🔕")
	                                       .title("Stop notif' 🔕")
	                                ]),
	                            new builder.HeroCard(session)
	                                .title("Les astuces")
	                                .subtitle(session.userData.astuce)
	                                .images([
	                                    builder.CardImage.create(session,"https://image.ibb.co/hLJwrw/Capture_d_e_cran_2018_01_24_a_23_36_44.png")
	                                ])
	                                .buttons([
	                                    builder.CardAction.imBack(session,"S'inscrire aux astuces")
	                                        .title("S'inscrire 👟"),
	                                    builder.CardAction.imBack(session,"Stop notif astuces 🔕")
	                                       .title("Stop notif' 🔕")
	                                ]),
	                            new builder.HeroCard(session)
	                                .title("All")
	                                .subtitle("S'inscrire à tout 😍")
	                                .images([
	                                    builder.CardImage.create(session,"https://image.ibb.co/kzSVRS/Capture_d_e_cran_2018_02_10_a_16_39_44.png")
	                                ])
	                                .buttons([
	                                    builder.CardAction.imBack(session,"S'inscrire à tout")
	                                        .title("S'inscrire à tout")
	                                ]),
	                            new builder.HeroCard(session)
	                                .title("Stop All")
	                                .subtitle("Se désincrire de tout 🔕")
	                                .images([
	                                    builder.CardImage.create(session,"https://image.ibb.co/dpPoD7/Capture_d_e_cran_2018_02_10_a_16_40_13.png")
	                                ])
	                                .buttons([
	                                    builder.CardAction.imBack(session,"Se désincrire de tout")
	                                        .title("Se désincrire de tout")
	                                ])
                            ]);

                builder.Prompts.choice(session,msg,["S'inscrire aux quizz","Stop notif quizz 🔕","S'inscire aux articles","Stop notif articles 🔕","S'inscrire aux events","Stop notif events 🔕","S'inscrire aux astuces","Stop notif astuces 🔕","S'inscrire à tout","Se désincrire de tout"])
	         }
	     }
         });
	},
	function(session,results){
		 if(!results.response){
            session.beginDialog("/menu",session.userData);
        }else{
        	switch(results.response.index){
        		case 0:
        			var data = JSON.stringify({Id:session.userData.idstring,Type:"quizz",Bool:true});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté ✅ tu recevras chaque Lundi un quizz running");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 1:
                 	var data = JSON.stringify({Id:session.userData.idstring,Type:"quizz",Bool:false});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté, tu est désinscrit des quizz du lundi");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 2:
                	session.beginDialog("/flux_inscription_specific",session.userData);
                    break;
                case 3:
                	break;
                case 4:
                	var data = JSON.stringify({Id:session.userData.idstring,Type:"event",Bool:true});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté ✅ tu recevras chaque Jeudi un recap des prochains events running");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 5:
                	var data = JSON.stringify({Id:session.userData.idstring,Type:"event",Bool:false});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté, tu est désinscrit des events du jeudi");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 6:
                	var data = JSON.stringify({Id:session.userData.idstring,Type:"astuce",Bool:true});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté ✅ tu recevras chaque jour à 10h une petite astuce running");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 7:
                	var data = JSON.stringify({Id:session.userData.idstring,Type:"astuce",Bool:false});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                    var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté, tu est désinscrit des astuces");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 8:
                	var data = JSON.stringify({Id:session.userData.idstring,Type:"all",Bool:true});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                    var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté ✅ tu es inscrit à tous les pushs Rungly !");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
                case 9:
                	var data = JSON.stringify({Id:session.userData.idstring,Type:"all",Bool:false});
	                    session.userData.post_options = {
	                        url: "http://217.182.206.5:8080/inscription/",
	                        method: 'POST',
	                        form:data,
	                        timeout:30000
	                    };
	                    var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                        }else{
	                            session.send("C'est noté, tu es désincrit de tous les pushs");
	                            session.beginDialog("/confirmation",session.userData);
	                        }
                    	});
                    break;
        	}
        }
	}

]