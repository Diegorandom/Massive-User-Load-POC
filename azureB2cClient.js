const superagent = require('superagent');
const config =  require('./config');
const azureGraphEndpoint = `${config.RESOURCE}/${config.TENANT}/users`;
const apiVersion = 'api-version=1.6';
const graphAPIRoute = `${azureGraphEndpoint}?${apiVersion}`;
const authorizationHeader = 'Authorization';
/*Update*/
const UpdateGraphAPIRoute = `${azureGraphEndpoint}/08948e2c-8f26-4a30-bd8a-415911a463fe?${apiVersion}`;
console.log(UpdateGraphAPIRoute)
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
		updateUser: (accessToken, body) =>{
			superagent.patch(UpdateGraphAPIRoute)
			.set(authorizationHeader, `Bearer ${accessToken}`)
			.set('Content-Type', 'application/json')
			.send(body)
		}		
	}
})();