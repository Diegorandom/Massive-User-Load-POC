const config = require('../config');
const Msal = require('msal')
var msalConfig = {
        auth: {
            clientId: config.CLIENT_ID,
            authority: config.AUTHORITY_HOST_URL+"/"+config.TENANT+"/B2C_1_solidarity" //"https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi", //This is your tenant info
        }
    };
 
    var getToken = function(){
        return new Promise( function(resolve, reject) {
                console.log("creating Token")
                var msalInstance = new Msal.UserAgentApplication(msalConfig);
                msalInstance.acquireTokenSilent(tokenRequest)
                .then(response => {
                    if (err) {
                          // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                        if (err.name === "InteractionRequiredAuthError") {
                            return msalnstance.acquireTokenPopup(tokenRequest)
                                .then(response => {
                                    // get access token from response
                                    // response.accessToken
                                    console.log(response)
                                    resolve(response)
                                })
                                .catch(err => {
                                    // handle error
                                    console.log("error:", error)
                                    reject(err);
                                });
                        }else{
                            console.log("error:", error)
                            reject(err);
                        }
                      }else {
                        console.log(response)
                        resolve(response)
                    }
                })
        })
    } 

    exports.getToken = getToken;