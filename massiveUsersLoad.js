/*Dependeny declaration*/
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

var csv = './test2.csv';

/*Token creation*/
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
	    }
	  }
	);
}))

/*CSV reading*/
csvReader = (csv) => {
    fs.readFile(csv, (err, bufferData) => {
        return users = bufferData.toString('utf8').split('\n').splice(1,1);
    });
}

/* User Queue */
queue = (users) => {
    const queue = [];
    users.forEach((user, index) => {
        const userEntity = desctruct(user);
        if (userEntity) {
            queue.push(userEntity);
        }
    }).then(()=>{
        return queue
    });
  
}

/* Create user */
createUser = (user, token) =>{
    const cleanSurname = user.surname.replace('\r', '');

    const payload = {
        accountEnabled: true,
        city: user.city,
        country: user.country,
        DoB: user.dateOfBirth,
        displayName: `${user.name} ${user.lastName}`,
        otherMails: user.emailAddresses,
        givenName: user.givenName,
        jobTitle: user.jobTitle,
        mailNickName: `${user.nickName}`,
        memberId: `${user.memberId}`,
        postalCode: `${user.postalCode}`,
        state: user.state,
        streetAddress: user.streetAddress,
        surname: cleanSurname,
        signInNames: [{
            type: 'emailAddress',
            value: user.email
        }],
        creationType: 'LocalAccount',
        passwordProfile: {
            password: 'f6k8JdE23.',
            forceChangePasswordNextLogin: true
        }
    };

    try {
        console.log(payload);
        return response =  azureGraphClient.createUser(token, payload);
        
	} catch (err) {
		console.log(err.response.body);
	}
}

module.exports = {
    main: async () => {
        const token = await getToken();
        var users = await csvReader(csv); 
        var userQueue = await queue(users);
        userQueue.forEach((user)=> {
            response = createUser(user, token)
            console.log(response);
            return res.status(200).send(response.body);
        });
    }
}