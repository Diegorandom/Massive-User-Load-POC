var generator = require('generate-password');


module.exports = {
    password:() => { 
        var password = generator.generate({
            length: 15,
            numbers: true,
            symbols: true,
            uppercase: true
        });
        return password
    }
}

