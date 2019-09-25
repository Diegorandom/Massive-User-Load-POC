/*Dependeny declaration*/
const fs = require('fs');
const azureGraphClient = require('./azureB2cClient');
const tokenCreator = require('./tokenCreator')
var passCreator = require('./defaultPasswordCreator')
var csvReader = require('./loadComponents/csvReading')

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
            password: passCreator.password(),
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
        //const token = await tokenCreator.getToken();
        var userQueue = await csvReader.main();
        console.log(userQueue) 
       /* userQueue.forEach((user)=> {
            response = createUser(user, token)
            console.log(response);
            return res.status(200).send(response.body);
        });*/
    }
}