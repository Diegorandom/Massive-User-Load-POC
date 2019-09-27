const config = require('../config');
const Msal = require('msal')
var msalConfig = {
        auth: {
            clientId: config.CLIENT_ID
        },
        cache: {
            cacheLocation:  "localStorage",
            storeAuthStateInCookie: false
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
                        console.log(response)
                        resolve(response)
                      }
                })
        })
    } 

    exports.getToken = getToken;