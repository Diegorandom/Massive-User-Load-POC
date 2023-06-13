const superagent = require('superagent');
const config = require('./config');
const azureGraphEndpoint = `${config.RESOURCE_MICROSOFT_API}v1.0/`;
const authorizationHeader = 'Authorization';
module.exports = (() => {
    return {
        sendInvitations: (accessToken, body) =>
            superagent.post(azureGraphEndpoint + "invitations")
                .set(authorizationHeader, `Bearer ${accessToken}`)
                .send(body)
    }
})();