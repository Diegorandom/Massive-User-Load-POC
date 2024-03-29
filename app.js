const express = require('express');
const azureGraphClient = require('./azureB2cClient');
const microsoftGraphClient = require('./microsoftGraphClient');
const errorResponse = {
	status : 500,
	message: {
		statusCode: 500,
		message: 'Unknown error'
	}
};
const createUsers = require('./massiveUsersLoad')
const updateUsers = require('./loadComponents/updateUsers')
const tokenCreator = require('./loadComponents/tokenCreator')
const microsoftTokenCreator = require('./loadComponents/microsoftToken')
const passCreator = require('./loadComponents/defaultPasswordCreator')
const PORT = 8080;

const app = express();

app.get('/', async (req, res)=>{
	tokenCreator.getToken().then(function(token) {
		console.log(token)	
		pass = passCreator.password();
		console.log(pass)
		return res.status(200).send(token);
	});
})


app.post('/createUsers', async (req, res) => {
    createUsers.main(res);
});

app.patch('/updateUsers', async (req, res)=>{
	updateUsers.main(res)
});

app.get('/users', async (req, res) => {
	try {
		const tokenInfo = await tokenCreator.getToken();
		const response = await azureGraphClient.getUsers(tokenInfo.accessToken);
		return res.status(200).send(response.body);
	} catch (err) {
		const error = (err.response && err.response.body) ? err.response.body : errorResponse.message;
		return res.status(err.status || errorResponse.status).send(error);
	}
});

app.delete('/user/:id', async(req, res) => {
	try {
		const tokenInfo = await tokenCreator.getToken();
		const response = await azureGraphClient.deleteUser(tokenInfo.accessToken, req.params.id);
		return res.status(200).send(response);
	} catch(err) {
		const error = (err.response && err.response.body) ? err.response.body : errorResponse.message;
		return res.status(err.status || errorResponse.status).send(error);
	}
});

app.post('/create', async(req, res) => {
	try {
		const tokenInfo = await tokenCreator.getToken();
		const payload = {
			extension_58b4bce74aa94332aade9a6c26960b24_MemberID: "195",
			streetAddress: "Justo Sierra 2464",
			accountEnabled: true,
			signInNames: [{
				type:'email',
				value: ''//email
			}],
			creationType: 'LocalAccount',
			displayName: '',
			mailNickName: '',
			passwordProfile: {
				password: '',
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

app.post('/invite', async(req,res)=>{
	try {
		const tokenInfo = await microsoftTokenCreator.getToken();
		const payload = {
			"invitedUserEmailAddress": "",
			"sendInvitationMessage": true,
			"inviteRedirectUrl": ""
		  }
		console.log(tokenInfo)
		const response = await microsoftGraphClient.sendInvitations(tokenInfo.accessToken, payload);
		return res.status(200).send(response);
	} catch(err) {
		console.log(err)
		const error = (err.response && err.response.body) ? err.response.body : errorResponse.message;
		return res.status(err.status || errorResponse.status).send(error);
	}
})

app.use((req, res) => {
		res.status(404).send('NOT FOUND');
	}
);

app.listen(PORT);
console.log(`your app is running on localhost port:${PORT}`);
