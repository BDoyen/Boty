



function f0_transforme_time(d){
    //year
    var year = d.getFullYear();
    //month
    var month = d.getMonth()+1;
    if (month < 10) {
        var month_string = "0" + month.toString();
    }else{
        var month_string = month.toString();   
    }
    //day
    var day = d.getDate();
    if (day < 10) {
        var day_string = "0" + day.toString();
    }else{
        var day_string = day.toString();   
    }
    //hour
    var hour = d.getHours()+1;
    if (hour < 10) {
        var hour_string = "0" + hour.toString();
    }else{
        var hour_string = hour.toString();
    }
    //minute
    var minute = d.getMinutes();
    if (minute < 10) {
        var minute_string = "0" + minute.toString();
    }else{
        var minute_string = minute.toString();
    }
    //second
    var sec = d.getSeconds();
    if (sec < 10) {
        var sec_string = "0" + sec.toString();
    }else{
        var sec_string = sec.toString();
    }

     
    return year.toString()+"-"+month_string+"-"+day_string+"-"+hour_string+"-"+minute_string+"-"+sec_string

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
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'week'){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'hour'){
                            var min = new Date(iso);
                            min.setHours(min.getHours()+2);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }               
                    }else if(chronology == 'future'){
                        if(accuracy == 'day' || accuracy == 'day,halfday'){
                            var min = new Date(iso);
                            min.setHours(2);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'weekend'){
                            var min = new Date(iso);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'week'){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(5)
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'month'){
                            var min = new Date();
                            session.userData.timemin  = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else if(accuracy == 'year'){
                            var min = new Date(iso);
                            min.setMonth(0);
                            min.setDate(1);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
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
                            console.log(chronology)
                            var min = new Date();
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else if((chronology == 'future')){
                            var min = new Date(iso);
                            var currentDay = min.getDay();
                            var distance = 6 - currentDay + 1;
                            min.setDate(-6 + distance + min.getDate());
                            min.setHours(2);
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
                            console.log(session.userData.timemin)
                        }else{
                            session.send("aïe aïe aïe, j'ai pas tout compris là 🐯...");
                            session.endDialog(); 
                        }  
                    }else if(accuracy == 'month'){ 
                            var min = new Date();
                            session.userData.timemin = min;
                            session.userData.giventemps = 1;
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


				