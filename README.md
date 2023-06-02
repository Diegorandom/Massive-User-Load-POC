# SH-MassiveUserLoad
azureADB2C mini lib to create users on a massive load to Active Directory 

## Quick Start
### Installation
``` $ npm install```

## Set up
Insert the keys of your app created on Active Directory on the file ```config.js```
### Running
``` $ node_modules/.bin/nodemon app.js ```
 or
``` $ node app.js ```

### Usage

##### Current Version: /v1

## Response Codes

+ **200** -- The request has succeeded.
+ **201** -- The request has been fulfilled and resulted in a new resource being created.
+ **204** -- The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation.
+ **400** -- The request could not be understood by the server due to malformed syntax.
+ **401** -- The request requires user authentication.
+ **403** -- The server understood the request but refuses to authorize it.
+ **500** -- The server encountered an unexpected condition which prevented it from fulfilling the request.

***Example curl request***
```
curl localhost:8080/users
```

---

<a name="routes_menu"></a>
## Routes

## GET
* [GET /users](#get_users)

## POST
* [POST /create](#post_create_user)

## DELETE
* [DELETE /user/:id](#delete_user)

---
<a name="get_users"></a>

[Back to Menu](#routes_menu)
### GET /users

List the users

***Parameters***

Param        | Type   | In           | Required?  | Description
---          | ---    | ---          | ---        | ---
access_token | String | query/header | true       | Internally created

***Sample Request:***
```HTTP
GET http://localhost:8080/users
```

***Sample Response:***
There are more field on the response due to readability were reduced.
```JSON
Status Code: 200
{
	"odata.metadata": "URL",
    "value": [
        {
            "odata.type": "Microsoft.DirectoryServices.User",
            "objectType": "User",
            "objectId": "uuid value",
            "deletionTimestamp": null,
            "signInNames": [
                {
                    "type": "emailAddress",
                    "value": "some@hotmail.com"
                }
            ],
        }
    ]
}

```

---
<a name="post_create_user"></a>

[Back to Menu](#routes_menu)
### POST /create

Creates a new user.

***Parameters***

Param        | Type   | In           | Required?  | Description
---          | ---    | ---          | ---        | ---
access_token | String | query/header | true       | Internally created
accountEnabled | Booolean | body         | true       | Activate the account from creation
creationType  | String | body         | false      | Must be set to 'LocalAccount' to create a local account user.
displayName         | String | body         | true       | The name to display in the address book for the user.
passwordProfile   | Object | body         | true      | password(String) && forceChangePasswordNextLogin(Boolean) fields.
signInNames      | Array | body         | true | type && value String values to sign in the account with


***Sample Request:***
```HTTP
POST http://localhost:8080/create

{
	"accountEnabled": true,
	"signInNames": [
	    {
	        "type": "emailAddress",
	        "value": "some@gmail.com"
	    }
    ],
    "creationType": "LocalAccount",
    "displayName": "Jon Snow",
    "mailNickname": "",
    "passwordProfile": {
      "password": "",
      "forceChangePasswordNextLogin": false
    }
}
```

***Sample Response:***
There are more field on the response due to readability were reduced.
```JSON
Status Code: 201

{
  "odata.metadata": "url",
  "odata.type": "Microsoft.DirectoryServices.User",
  "objectType": "User",
  "objectId": "url",
  "deletionTimestamp": null,
  "accountEnabled": true,
  "signInNames": [
    {
      "type": "emailAddress",
      "value": "some@gmail.com"
    }
  ],
  "assignedLicenses": [],
  "assignedPlans": [],
  "city": null,
  "country": null,
  "creationType": "LocalAccount",
  "department": null,
  "dirSyncEnabled": null,
  "displayName": "Alex Wu",
  "facsimileTelephoneNumber": null,
  "givenName": null,
  "immutableId": null,
  "jobTitle": null,
  "lastDirSyncTime": null,
  "mail": null,
  "mailNickname": "joec",
  "mobile": null,
  "onPremisesSecurityIdentifier": null,
  "otherMails": [],
  "passwordPolicies": null,
  "passwordProfile": null,
}
```
---


<a name="delete_user"></a>

[Back to Menu](#routes_menu)
### DELETE /user/:id

Delete a user by id

***Parameters***

Param        | Type   | In           | Required?  | Description
---          | ---    | ---          | ---        | ---
access_token | String | query/header | true       | Internally created
id | String | query | true       | The user ID. Can be the object ID (GUID) or the user principal name (email) of the target user.


***Sample Request:***
```HTTP
GET http://localhost:8080/user/:id
```

***Sample Response:***
There are more field on the response due to readability were reduced.
```JSON
Status Code: 204
```




