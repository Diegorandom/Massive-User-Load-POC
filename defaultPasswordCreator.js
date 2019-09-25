var generator = require('generate-password');


module.exports = {
    password:() => { 
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        return password
    }
}

