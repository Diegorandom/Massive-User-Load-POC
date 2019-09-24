const config = require('./config');
const adal = require('adal-node').AuthenticationContext;

var getToken = function(){
    return new Promise( function(resolve, reject) {
        console.log("creating Token")
        const context = new adal(`${config.AUTHORITY_HOST_URL}/${config.TENANT}`);
        context.acquireTokenWithClientCredentials(
          config.RESOURCE,
          config.CLIENT_ID,
          config.CLIENT_SECRET,
          (err, tokenResponse) => {
            if (err) {
              console.log("error:", error)
              reject(err);
            } else {
              resolve(tokenResponse);
              console.log(tokenResponse)
            }
          }
        );
    })
} 

exports.getToken = getToken;