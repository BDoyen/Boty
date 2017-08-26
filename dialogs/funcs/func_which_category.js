



////functions//////



function f_which_category(b1,b2,b3,b4,b5,session){

    if(!b2 && !b3 && !b4 && !b5){
        session.userData.category = 1
    }else if(!b1 && !b3 && !b4 && !b5){
        session.userData.category = 2
    }else if(!b1 && !b2 && !b4 && !b5){
        session.userData.category = 3
    }else if(!b1 && !b2 && !b3 && !b5){
        session.userData.category = 4
    }else if(!b1 && !b2 && !b3 && !b4){
        session.userData.category = 5
    }else{}

}



module.exports = {
	f_which_category:f_which_category
}