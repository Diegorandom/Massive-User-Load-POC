const express = require('express');
const fs = require('fs');
const config = require('./config');
const adal = require('adal-node').AuthenticationContext;
const azureGraphClient = require('./azureB2cClient');
const errorResponse = {
	status : 500,
	message: {
		statusCode: 500,
		message: 'Unknown error'
	}
};

const createUsers = require('./massiveUsersLoad')

const getToken = () => (new Promise((resolve, reject) => {
	const context = new adal(`${config.AUTHORITY_HOST_URL}/${config.TENANT}`);
	context.acquireTokenWithClientCredentials(
	  config.RESOURCE,
	  config.CLIENT_ID,
	  config.CLIENT_SECRET,
	  (err, tokenResponse) => {
	    if (err) {
	      reject(err);
	    } else {
		  resolve(tokenResponse);
		  console.log(tokenResponse)
	    }
	  }
	);
}))


const PORT = 8080;

const app = express();

app.get('/', async (req, res)=>{
	token = await getToken();
	console.log(token)	
})


app.post('/createUsers', async (req, res) => {
    createUsers.main();
});

app.get('/users', async (req, res) => {
	try {
		const tokenInfo = await getToken();
		const response = await azureGraphClient.getUsers(tokenInfo.accessToken);
		return res.status(200).send(response.body);
	} catch (err) {
		const error = (err.response && err.response.body) ? err.response.body : errorResponse.message;
		return res.status(err.status || errorResponse.status).send(error);
	}
});

app.delete('/user/:id', async(req, res) => {
	try {
		const tokenInfo = await getToken();
		const response = await azureGraphClient.deleteUser(tokenInfo.accessToken, req.params.id);
		return res.status(200).send(response);
	} catch(err) {
		const error = (err.response && err.response.body) ? err.response.body : errorResponse.message;
		return res.status(err.status || errorResponse.status).send(error);
	}
});

app.post('/create', async(req, res) => {
	try {
		const tokenInfo = await getToken();
		const payload = {
			extension_58b4bce74aa94332aade9a6c26960b24_MemberID: "195",
			streetAddress: "Justo Sierra 2464",
			accountEnabled: true,
			signInNames: [{
				type:'email',
				value: 'dortega@tiempodevelop.com'//email
			}],
			creationType: 'LocalAccount',
			displayName: 'AlejandroLandero',
			mailNickName: 'newUser123',
			passwordProfile: {
				password: 'f6k8JdE23.',
      			forceChangePasswordNextLogin: true
			} 
		};

		const response = await azureGraphClient.createUser(tokenInfo.accessToken, payload);
		return res.status(200).send(response);
	} catch(err) {
		const error = (err.response && err.response.body) ? err.response.body : errorResponse.message;
		return res.status(err.status || errorResponse.status).send(error);
	}
});

app.use((req, res) => {
		res.status(404).send('NOT FOUND');
	}
);

app.listen(PORT);
console.log(`your app is running on localhost port:${PORT}`);