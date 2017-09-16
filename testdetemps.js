

var d = new Date()

 var day = d.getDate();
    if (day < 10) {
        var day_string = "0" + day.toString();
    }else{
        var day_string = day.toString();   
    }

console.log(d)
console.log(day)
console.log(day_string)


