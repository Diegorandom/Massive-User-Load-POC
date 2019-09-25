const superagent = require('superagent');
const config =  require('./config');
const azureGraphEndpoint = `${config.RESOURCE}/${config.TENANT}/users`;
const apiVersion = 'api-version=1.6';
const graphAPIRoute = `${azureGraphEndpoint}?${apiVersion}`;
const authorizationHeader = 'Authorization';


module.exports = (() => {
	return {
		getUsers : (accessToken) =>
			superagent.get(graphAPIRoute)
				.set(authorizationHeader, `Bearer ${accessToken}`),
		createUser: (accessToken, body) =>
			superagent.post(graphAPIRoute)
				.set(authorizationHeader, `Bearer ${accessToken}`)
				.send(body),
		deleteUser: (accessToken, userId) =>
			superagent.delete(`${azureGraphEndpoint}/${userId}?${apiVersion}`)
				.set(authorizationHeader, `Bearer ${accessToken}`),
	}
})();