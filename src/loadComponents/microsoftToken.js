const config = require('../config')
const Msal = require('msal')
const msalConfig = {
 auth: {
  clientId: config.CLIENT_ID,
  authority: config.AUTHORITY_HOST_URL + '/' + config.TENANT + '/B2C_1_solidarity' // "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi", //This is your tenant info
 }
}

const getToken = function () {
 let tokenRequest;
 return new Promise(function (resolve, reject) {
  console.log('creating Token')
  const msalInstance = new Msal.UserAgentApplication(msalConfig)
  let silentToken = msalInstance.acquireTokenSilent(tokenRequest).catch((err) => {
   // could also check if err instance of InteractionRequiredAuthError if you can import the class.
   if (err.name === 'InteractionRequiredAuthError') {
    return err.name
   }
   return err

  })

  if (silentToken === 'InteractionRequiredAuthError') {
   msalInstance.acquireTokenPopup(tokenRequest)
    .then(response => {
     // get access token from response
     // response.accessToken
     console.log(response)
     resolve(response)
    })
    .catch(err => {
     // handle error
     console.log('error:', err)
     reject(err)
    })
  }

  return silentToken

 })
}

exports.getToken = getToken
