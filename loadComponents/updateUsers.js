/*Dependeny declaration*/
const azureGraphClient = require('../azureB2cClient');
const tokenCreator = require('./tokenCreator')
var passCreator = require('./defaultPasswordCreator')
var csvReader = require('./csvReading');
const config = require('../config');

updateUser = async (user, token, resolve) =>{
    const cleanApplicationClientID = config.APPLICATION_CLIENT_ID.replace("-", "");
    const memberIdProp = 'extension_' + cleanApplicationClientID + '_MemberID';
    const dateOfBirthProp = 'extension_' + cleanApplicationClientID + '_DateOfBirth';
    const streetAddress2 = 'extension_' + cleanApplicationClientID + '_StreetAddress2';
    const phoneNumber = 'extension_' + cleanApplicationClientID + '_PhoneNumber';

    const cleanEmail = user.email.replace('\r', '');
    user.phoneNumber = user.phoneNumber.replace('\r', '');
    const payload = {
        accountEnabled: true,
        city: user.city,
        country: user.country,
        displayName: `${user.name} ${user.lastName}`,
        otherMails: user.otherMails,
        postalCode: `${user.postalCode}`,
        state: user.state,
        streetAddress: user.streetAddress,
        surname: user.surname,
        givenName: user.name,
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
    payload[memberIdProp] = `${user.memberId}`;
    payload[dateOfBirthProp] = `${user.dateOfBirth}`;
    payload[streetAddress2] = `${user.streetAddress2}`;
    payload[phoneNumber] = `${user.phoneNumber}`;

    console.log('PAYLOD MEMBER: ' , payload);
    try {
        console.log("Payload sent:", payload);
        response = await azureGraphClient.updateUser(token.accessToken, payload);
        resolve(response);
        
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
    main: async (res) => {
        const token = await tokenCreator.getToken();
        var userQueue = await csvReader.main();
        let requests = userQueue.map((user)=>{
            return new Promise((resolve) => {
                updateUser(user, token, resolve)
              });
        });
        Promise.all(requests).then((responses) => {
            return res.status(200).send(responses);
        });
        
    }
}