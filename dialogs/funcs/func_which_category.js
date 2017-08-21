

//Recast.ai
var recastai = require('recastai').default


////functions//////



function f_which_category(value,session){


			session.userData.tokenspec = 'e8bb2cf13e8438e1415a39136f3519d7'
            var client = new recastai(session.userData.tokenspec)
            var request = client.request
            request.analyseText(value)
            .then(function(res){
                var intent = res.intent();
                var slug = intent.slug;
                if(slug == 'pro'){
                    session.userData.level = 5;
                }else if(slug == 'intermediaire'){
                    session.userData.level = 4;
                }else if(slug == 'fun'){
                    session.userData.level = 2;
                }else if(slug == 'relax'){
                    session.userData.level = 1;
                }else if(slug == 'solidaire'){
                    session.userData.level = 3;
                }else{
                    session.send("aïe aïe aïe, j'ai pas tout compris là...");
                    session.beginDialog('/menu',session.userData);
                }
        }).catch(function(err){
            session.send("aïe aïe aïe, j'ai pas tout compris là...");
            session.beginDialog('/menu',session.userData);     
        })


}


module.exports = {
	f_which_category:f_which_category
}