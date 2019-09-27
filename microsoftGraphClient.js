const superagent = require('superagent');
const config =  require('./config');
const azureGraphEndpoint = `${config.RESOURCE_MICROSOFT_API}/${config.TENANT}/V1.0/`;
const authorizationHeader = 'Authorization';
module.exports = (() => {
	return {
        sendInvitations: (accessToken, body) =>
            superagent.get(azureGraphEndpoint + "invitations")
            .set(authorizationHeader, `Bearer ${accessToken}`)
                .send(body)	
	}
})();