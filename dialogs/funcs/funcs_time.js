var moment = require('moment');



function f0_transforme_time(time_string){

    var year = time_string.slice(0,4);
    var month = time_string.slice(5,7);
    var day = time_string.slice(8,10);
    var hour = time_string.slice(11,13);
    var minute = time_string.slice(14,16);
    var sec = time_string.slice(17,19);
    
    return year+"-"+month+"-"+day+"-"+hour+"-"+minute+"-"+sec

}


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
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'week'){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'hour'){
                            var min = new Date(iso);
                            min.setHours(min.getHours()+2);
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }               
                    }else if(chronology == 'future'){
                        if(accuracy == 'day' || accuracy == 'day,halfday'){
                            var min = new Date(iso);
                            min.setHours(2);
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'weekend'){
                            var min = new Date(iso);
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'week'){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'month'){
                            var min = new Date();
                            session.userData.timemin  = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'year'){
                            var min = new Date(iso);
                            min.setMonth(0);
                            min.setDate(1);
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
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
                            session.userData.timemin = moment(min.toString()).format();
                            console.log(session.userData.timemin)
                        }else if((chronology == 'future')){
                            var min = new Date();
                            session.userData.timemin = moment(min.toString()).format()
                            console.log(session.userData.timemin)
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }  
                    }else if(accuracy == 'month'){ 
                            var min = new Date();
                            session.userData.timemin = moment(min.toString()).format()
                            console.log(session.userData.timemin)
                    }else{
                        session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                        session.endDialog(); 
                    }

}



module.exports = {
    f0_transforme_time:f0_transforme_time,
	f1_time:f1_time,
	f2_time:f2_time
}


				