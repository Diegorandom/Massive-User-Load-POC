/*Dependeny declaration*/
const azureGraphClient = require('./azureB2cClient');
const tokenCreator = require('./loadComponents/tokenCreator')
const config = require('./config');
var SqlString = require('sqlstring');


/* Create user */
createUser = async (user, token, resolve) => {
	const cleanApplicationClientID = config.APPLICATION_CLIENT_ID.replace("-", "");
	const memberIdProp = 'extension_' + cleanApplicationClientID + '_MemberID';
	const dateOfBirthProp = 'extension_' + cleanApplicationClientID + '_DateOfBirth';
	const streetAddress2 = 'extension_' + cleanApplicationClientID + '_StreetAddress2';
	const phoneNumber = 'extension_' + cleanApplicationClientID + '_PhoneNumber';
	const otherMails = 'otherMails';

	const cleanEmail = SqlString.escape(user.email.replace('\r', ''));
	user.phoneNumber = user.phoneNumber.replace('\r', '');
	const payload = {
		mailNickname: user.name + user.surname.substring(0, 2).toUpperCase(),
		accountEnabled: true,
		city: user.city,
		country: user.country,
		displayName: `${user.name} ${user.lastName}`,
		postalCode: `${user.postalCode}`,
		state: user.state,
		streetAddress: user.streetAddress,
		surname: user.surname,
		givenName: user.name,
		mail: null,
		mobile: null,
		facsimileTelephoneNumber: null,
		preferredLanguage: null,
		signInNames: [{
			type: 'emailAddress',
			value: cleanEmail
		}],
		creationType: 'LocalAccount',
		passwordProfile: {
			password: `${user.memberId}${user.dateOfBirth}` + user.surname.substring(0, 2).toUpperCase(),
			forceChangePasswordNextLogin: false
		},
		passwordPolicies: "DisablePasswordExpiration",
		telephoneNumber: null
	};

	//console.log('OTHER EMAILS: ', user.otherMails);

	if (user.otherMails !== undefined && user.otherMails.length >= 0) {
		payload[otherMails] = user.otherMails;
	}

	payload[memberIdProp] = `${user.memberId}`;
	payload[dateOfBirthProp] = `${user.dateOfBirth}`;
	payload[streetAddress2] = `${user.streetAddress2}`;
	payload[phoneNumber] = `${user.phoneNumber}`;
	try {
		console.log("Payload to be sent:", payload);
		response = await azureGraphClient.createUser(token.accessToken, payload);
		resolve(response);

	} catch (err) {
		console.log(err.response.body);
		resolve(err)
	}
}

module.exports = {
	main: async (res) => {
		const token = await tokenCreator.getToken();
		var userQueue = await csvReader.main();
		let requests = userQueue.map((user) => {
			return new Promise((resolve) => {
				createUser(user, token, resolve)
			});
		});
		Promise.all(requests).then((responses) => {
			return res.status(200).send(responses);
		});

	}
}