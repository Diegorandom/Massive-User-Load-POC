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
const tokenCreator = require('./tokenCreator')

var csv = './test2.csv';

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
        const token = await tokenCreator.getToken();
        var users = await csvReader(csv); 
        var userQueue = await queue(users);
        userQueue.forEach((user)=> {
            response = createUser(user, token)
            console.log(response);
            return res.status(200).send(response.body);
        });
    }
}