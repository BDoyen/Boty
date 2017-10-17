
var builder = require("botbuilder");
var restify = require('restify'); // pour le serveur
var sentiment = require('sentiment-multilang'); //sentiment analysis
var math = require('mathjs'); //math module
var param_quizz = require('./quizz/param_quizz');
var request = require('request');

//APIs//


//resources from other scripts

var title =  param_quizz.title;
var q1 = param_quizz.q1; 
var ans1q1 = param_quizz.ans1q1;
var ans2q1 = param_quizz.ans2q1;
var ans3q1 = param_quizz.ans3q1;
var goodq1 = param_quizz.goodq1
var q2 = param_quizz.q2;
var ans1q2 = param_quizz.ans1q2;
var ans2q2 = param_quizz.ans2q2;
var ans3q2 = param_quizz.ans3q2;
var goodq2 = param_quizz.goodq2
;var q3 = param_quizz.q3;
var ans1q3 = param_quizz.ans1q3;
var ans2q3 = param_quizz.ans2q3;
var ans3q3 = param_quizz.ans3q3;
var goodq3 = param_quizz.goodq3;
var q4 = param_quizz.q4;
var ans1q4 = param_quizz.ans1q4;
var ans2q4 = param_quizz.ans2q4;
var ans3q4 = param_quizz.ans3q4;
var goodq4 = param_quizz.goodq4;
var q5 = param_quizz.q5;
var ans1q5 = param_quizz.ans1q5;
var ans2q5 = param_quizz.ans2q5;
var ans3q5 = param_quizz.ans3q5;
var goodq5 = param_quizz.goodq5;


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
			session.send("Super "+session.userData.name+", bienvenue dans le quizz intitulé : ");
			session.send(title);
			session.send("le principe est simple : 5 questions, 3 réponses possibles, 1 bonne réponse à chaque fois, on est partis !! ▶️ ");
			builder.Prompts.choice(session,"Première question : " + q1,[ans1q1,ans2q1,ans3q1],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons" + positiveSentimentArray[math.round(math.random()*(l+1))]});
		},

		function(session,results){
			console.log(results)
			if(!results.response || results.response.score < 1){
				session.send("Je ne suis pas sûr d'avoir tout saisi, désolé" + session.userData.name);
				session.send("On va dire que je ne prends pas en compte cette question si c'est ok pour toi 😉");
				builder.Prompts.choice(session,"Deuxième question : " + q2,[ans1q2,ans2q2,ans3q1],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );

			}else{
				if(goodq1 == results.response.index){
					session.userData.grade = 1;
					session.send("Bien joué ! C'est la bonne réponse 👍");
					builder.Prompts.choice(session,"Deuxième question : " + q2,[ans1q2,ans2q2,ans3q1],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );
				}else{
					session.send("c'est pas ça désolé...");
					builder.Prompts.choice(session,"Deuxième question : " + q2,[ans1q2,ans2q2,ans3q1],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );
				}
				
			}
		},

		function(session,results){
			if(!results.response || results.response.score < 1){
				session.send("Je ne suis pas sûr d'avoir tout saisi, désolé" + session.userData.name);
				session.send("On va dire que je ne prends pas en compte cette question si c'est ok pour toi 😉");
				builder.Prompts.choice(session,"Troisième question : " + q3,[ans1q3,ans2q3,ans3q3],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );
			}else{
				if(goodq2 == results.response.index){
					session.userData.grade = session.userData.grade + 1;
					session.send("Well done ! bonne réponse 💚");
					builder.Prompts.choice(session,"Troisième question : " + q3,[ans1q3,ans2q3,ans3q3],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );
				}else{
					session.send(":(");
					session.send("la prochaine sera la bonne !")
					builder.Prompts.choice(session,"Troisième question : " + q3,[ans1q3,ans2q3,ans3q3],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );
				}
				
			}
		},

		function(session,results){
			if(!results.response || results.response.score < 1){
				session.send("Je ne suis pas sûr d'avoir tout saisi, désolé" + session.userData.name);
				session.send("On va dire que je ne prends pas en compte cette question si c'est ok pour toi 😉");
				builder.Prompts.choice(session,"Quatrième question : " + q4,[ans1q4,ans2q4,ans3q4],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );

			}else{
				if(goodq3 == results.response.index){
					session.userData.grade = session.userData.grade + 1;
					session.send("C'est la bonne réponse 👍");
					builder.Prompts.choice(session,"Quatrième question : " + q4,[ans1q4,ans2q4,ans3q4],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]});
				}else{
					session.send("c'est pas ça désolé...");
					builder.Prompts.choice(session,"Quatrième question : " + q4,[ans1q4,ans2q4,ans3q4],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]});
				}
				
			}
		},

		function(session,results){
			if(!results.response || results.response.score < 1){
				session.send("Je ne suis pas sûr d'avoir tout saisi, désolé" + session.userData.name);
				session.send("On va dire que je ne prends pas en compte cette question si c'est ok pour toi 😉");
				builder.Prompts.choice(session,"Cinquième question : " + q5,[ans1q5,ans2q5,ans3q5],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]} );
			}else{
				if(goodq4 == results.response.index){
					session.userData.grade = session.userData.grade + 1;
					session.send("CORRECT ! ");
					builder.Prompts.choice(session,"Cinquième question : " + q5,[ans1q5,ans2q5,ans3q5],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]});
				}else{
					session.send("c'est pas ça désolé...");
					builder.Prompts.choice(session,"Cinquième question : " + q5,[ans1q5,ans2q5,ans3q5],{maxRetries:1,retryPrompt:"Je ne suis pas sûr d'avoir tout saisi mais tu peux essayer avec un des boutons " + positiveSentimentArray[math.round(math.random()*(l+1))]});
				}
				
			}
		},

		function(session,results){
			if(!results.response || results.response.score < 1){
				session.send("Tu peux toujours essayer avec un des boutons..." + positiveSentimentArray[math.round(math.random()*(l+1))])
			}else{
				if(goodq5 == results.response.index){
					session.userData.grade = session.userData.grade + 1;

					console.log(session.userData.grade)

					//LeChaboté
			        session.userData.post_options = {
			              url: "http://217.182.206.5:8080/quizz/note",
			              method: 'POST',
			              timeout:30000
			        };
			        var data = JSON.stringify({User:session.userData.idstring,Note:session.userData.grade});
			        session.userData.post_options.form = data;

			        var post_req = request(session.userData.post_options, function(error,response,body){
                        if(error){
                            console.log(error);
                            session.send(";) 🐅");
                            }else{
                            	var res = JSON.parse(body)
                            	var moyenne = res.Moyen
                            	var note = res.Note
                            	session.send("Super 😉 👍 ");
								session.send("Je te remercie "+session.userData.name +", pour ta participation au quizz de la semaine. J'espère que cela t'a plus 😉");
								session.send("Info ℹ️   ton score actuel est de " + note.toString() +" et la moyenne des autres participants est à "+ moyenne.toString());

								if(note >= moyenne){
										session.send("Félicitations ! 🎉 Tu as plus de miles que la moyenne des autres participants ;) ");
										session.endDialog()
									}else{
										session.send("Tu as moins de miles que la moyenne des autres participants... Mais c'est pas grave, tu es sur la bonne voie ;) ");
										session.endDialog()
								}

                            }
                    });

				}else{

					console.log(session.userData.grade)

						//LeChaboté
				        session.userData.post_options = {
				              url: "http://217.182.206.5:8080/quizz/note",
				              method: 'POST',
				              timeout:30000
				        };
				        var data = JSON.stringify({User:session.userData.idstring,Note:session.userData.grade});
				        session.userData.post_options.form = data;

				        var post_req = request(session.userData.post_options, function(error,response,body){
	                        if(error){
	                            console.log(error);
	                            session.send(";) 🐅");
	                            }else{
	                            	var res = JSON.parse(body)
                            		var moyenne = res.Moyen
                            		var note = res.Note
	                            	session.send("ah c'est pas grave...");
									session.send("Je te remercie "+session.userData.name +", pour ta participation au quizz de la semaine. J'espère que cela t'a plus 😉");
									session.send("Info ℹ️   ton score actuel est de " + note.toString() +" et la moyenne des autres participants est à "+ moyenne.toString());

									if(note >= moyenne){
										session.send("Félicitations ! 🎉 Tu as plus de miles que la moyenne des autres participants ;) ");
										session.endDialog();
									}else{
										session.send("Tu as moins de miles que la moyenne des autres participants... Mais c'est pas grave, tu es sur la bonne voie ;) ");
										session.endDialog();
									}
									
	                            }
	                    });

				}
				
			}
		}


]