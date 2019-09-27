const config = require('../config');

var msalConfig = {
        auth: {
            clientId: config.CLIENT_ID
        }
    };
 
    

    var getToken = function(){
        return new Promise( function(resolve, reject) {
                console.log("creating Token")
                var msalInstance = new Msal.UserAgentApplication(msalConfig);
                msalInstance.acquireTokenSilent(tokenRequest)
                .then(response => {
                    if (err) {
                        console.log("error:", error)
                        reject(err);
                      } else {
                        resolve(response.accessToken)
                      }
                })
        })
    } 

    exports.getToken = getToken;