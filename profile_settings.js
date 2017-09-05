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
        url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAFL0ok0ZCS0BAPjCnmZABVSBLDXvOyJPSFlXuyMWemyjPqapFqZCRqfX0srzsYQFVJveLHZATyKXoLpNIduekW0nbnKPyRpWKid4jk7l1RbGF6QEDiD7K3qC0D1EsuTsayrtsogMCjZA3zPMGMufjlA63RSoMwWXpd3l0WaZAMgZDZD',
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
        url: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAFL0ok0ZCS0BAPjCnmZABVSBLDXvOyJPSFlXuyMWemyjPqapFqZCRqfX0srzsYQFVJveLHZATyKXoLpNIduekW0nbnKPyRpWKid4jk7l1RbGF6QEDiD7K3qC0D1EsuTsayrtsogMCjZA3zPMGMufjlA63RSoMwWXpd3l0WaZAMgZDZD',
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
