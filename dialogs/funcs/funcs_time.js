


/////time functions //////


function f1_time(session,chronology,accuracy,iso,slug){

				if(iso == ""){
                    if(slug == 'jamais'){
                        session.send(":(");
                        session.endDialog();
                    }else if(slug == 'greetings'){
                        session.send("coucou :)");
                        session.endDialog();
                    }else if(slug == 'goodbye'){
                        session.send("À bientôt j'espère :)");
                        session.endDialog();
                    }else{
                        session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                        session.endDialog(); 
                    }
                //with iso datetime
                }else{
                    if(chronology == 'present' || chronology == 'past' ){
                        if(accuracy == 'day' || accuracy == 'day,halfday' || accuracy == 'sec' || accuracy == 'min' || accuracy == 'now'){
                            var min = new Date();
                            min.setHours(min.getHours()+2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else if(accuracy == 'week'){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else if(accuracy == 'hour'){
                            var min = new Date(iso);
                            min.setHours(min.getHours()+2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }               
                    }else if(chronology == 'future'){
                        if(accuracy == 'day' || accuracy == 'day,halfday'){
                            var min = new Date(iso);
                            min.setHours(2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else if(accuracy == 'weekend'){
                            var min = new Date(iso);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else if(accuracy == 'week'){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else if(accuracy == 'month'){
                            session.userData.timemin = new Date();
                            console.log(session.userData.timemin);
                            session.beginDialog('/cross',session.userData);
                        }else if(accuracy == 'year'){
                            var min = new Date(iso);
                            min.setMonth(0);
                            min.setDate(1);
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }
                    }
				}

}



function f2_time(session,chronology,accuracy,iso,slug){

					
                    if(accuracy == 'week'){
                        if(chronology == 'past'){
                            var min = new Date(iso);
                            min.setHours(2)
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else if((chronology == 'future')){
                            var min = new Date();
                            session.userData.timemin = min;
                            console.log(session.userData.timemin);
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }  
                    }else if(accuracy == 'month'){ 
                            session.userData.timemin = new Date();
                            console.log(session.userData.timemin);
                    }else{
                        session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                        session.endDialog(); 
                    }

}


module.exports = {
	f1_time:f1_time,
	f2_time:f2_time
}


				