const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var faker = require('faker');

const csvWriter = createCsvWriter({
  path: 'fakeDataTest1.csv',
  header: [
    {id: 'accountEnabled', title: 'accountEnabled'},
    {id: 'city', title: 'city'},
    {id: 'country', title: 'country'},
    {id: 'DoB', title: 'DoB'},
    {id: 'displayName', title: 'displayName'},
    {id: 'postalCode', title: 'postalCode'},
    {id: 'state', title: 'state'},
    {id: 'streetAddress', title: 'streetAddress'},
    {id: 'surname', title: 'surname'},
    {id: 'emailAddresses', title: 'emailAddresses'},
    {id: 'givenName', title: 'givenName'}
  ]
});

var dummy =[]
var data = [
    {
        accountEnabled: true,
        city: faker.address.city(),
        country: faker.address.country(),
        DoB: "05/06/91",
        displayName: faker.name.findName(),
        postalCode: faker.address.zipCode(),
        state: faker.address.state(),
        streetAddress: faker.address.streetAddress(),
        surname: faker.name.firstName(),
        emailAddresses: faker.internet.email(),
        givenName: faker.name.findName()
    },
    { accountEnabled: true,
        city: faker.address.city(),
        country: faker.address.country(),
        DoB: "05/06/91",
        displayName: faker.name.findName(),
        postalCode: faker.address.zipCode(),
        state: faker.address.state(),
        streetAddress: faker.address.streetAddress(),
        surname: faker.name.firstName(),
        emailAddresses: faker.internet.email(),
        givenName: faker.name.findName() }
];

csvWriter
  .writeRecords(dummy)
  .then(() => csvWriter.writeRecords(data))
  .then(()=> {
    console.log('The CSV file was written successfully')
  });