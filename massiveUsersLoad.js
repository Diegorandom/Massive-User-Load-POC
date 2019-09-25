/*Dependeny declaration*/
const fs = require('fs');
const azureGraphClient = require('./azureB2cClient');
const tokenCreator = require('./tokenCreator')
var passCreator = require('./defaultPasswordCreator')
var csvReader = require('./loadComponents/csvReading')

/* Create user */
createUser = async (user, token, resolve) =>{
    const cleanEmail = user.email.replace('\r', '');
    const payload = {
        accountEnabled: true,
        city: user.city,
        country: user.country,
        DoB: user.dateOfBirth,
        displayName: `${user.name}${user.lastName}`,
        //otherMails: user.emailAddresses,
        //memberId: `${user.memberId}`,
        postalCode: `${user.postalCode}`,
        state: user.state,
        streetAddress: user.streetAddress,
        surname: user.surname,
        emailAddresses = [],
        signInNames: [{
            type: 'emailAddress',
            value: cleanEmail
        }],
        creationType: 'LocalAccount',
        passwordProfile: {
            password: passCreator.password(),
            forceChangePasswordNextLogin: true
        }
    };

    try {
        console.log("Payload sent:", payload);
        response = await azureGraphClient.createUser(token.accessToken, payload);
        console.log(response)
        resolve(response);
        
	} catch (err) {
		console.log(err.response.body);
	}
}

module.exports = {
    main: async (res) => {
        const token = await tokenCreator.getToken();
        var userQueue = await csvReader.main();
        let requests = userQueue.map((user)=>{
            return new Promise((resolve) => {
                createUser(user, token, resolve)
              });
        });
        Promise.all(requests).then((responses) => {
            return res.status(200).send(responses);
        });
        
    }
}