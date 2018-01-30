var request = require('request');

//=========================================================
// Facebook setup // Run only when need updating.
//=========================================================

// Set FB bot greeting text
facebookThreadAPI('./fb-greeting-text.json', 'Greating Text');
// Set FB bot get started button
messengerProfileAPI('./fb-get-started-button.json', 'Get Started Button');
// Set FB bot persistent menu
messengerProfileAPI('./fb-persistent-menu.json', 'Persistent Menu');




function messengerProfileAPI(jsonFile, cmd){
    // Start the request
    request({
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAFL0ok0ZCS0BAOLZCJb4bU6rPMntptbpmojUkkfsXHxpJGeDS2JxW7zxXHAOGe5CiMa6I0PykP3eBrOrMQk4DA1Nj8iDd2f9cACLR6ZC42UEvIphyvKcKOoZB4rzXfZCddR1p8QInbrdXgP2CwyExJdUrUE1KG8fADxz77QE5wZDZD',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        form: require(jsonFile)
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(cmd+": Updated.");
            console.log(body);
        } else { 
            // TODO: Handle errors
            console.log(cmd+": Failed. Need to handle errors.");
            console.log(body);
        }
    });
}


function facebookThreadAPI(jsonFile, cmd){
    // Start the request
    request({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAFL0ok0ZCS0BAOLZCJb4bU6rPMntptbpmojUkkfsXHxpJGeDS2JxW7zxXHAOGe5CiMa6I0PykP3eBrOrMQk4DA1Nj8iDd2f9cACLR6ZC42UEvIphyvKcKOoZB4rzXfZCddR1p8QInbrdXgP2CwyExJdUrUE1KG8fADxz77QE5wZDZD',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        form: require(jsonFile)
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(cmd+": Updated.");
            console.log(body);
        } else { 
            // TODO: Handle errors
            console.log(cmd+": Failed. Need to handle errors.");
            console.log(body);
        }
    });
}
