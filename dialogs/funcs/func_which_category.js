



////functions//////



function f_which_category(b1,b2,b3,b4,b5,session){

    if(!b2 && !b3 && !b4 && !b5){
        session.userData.level = 1
    }else if(!b1 && !b3 && !b4 && !b5){
        session.userData.level = 2
    }else if(!b1 && !b2 && !b4 && !b5){
        session.userData.level = 3
    }else if(!b1 && !b2 && !b3 && !b5){
        session.userData.level = 4
    }else if(!b1 && !b2 && !b3 && !b4){
        session.userData.level = 5
    }else{}

}



module.exports = {
	f_which_category:f_which_category
}