const fs = require('fs');

var queue = async (bufferData)=> {
    const rowValues = bufferData.toString('utf8').split('\n').slice(1);
    const columnHeaders = bufferData.toString('utf8').split('\n')[0].replace(/\n|\r/g, "").split(',');
    queue = []
    rowValues.forEach((value, index) => {
        const userEntity = build(value, columnHeaders);
        if (userEntity) {
            queue.push(userEntity);
        }
    });
    return queue;
}


/*User Build*/
build = (rowValues, columnHeaders) => {  
    const values = rowValues.split(','); 
    if (values.indexOf(undefined) == -1) {

        const payload = {};
        columnHeaders.forEach((field, index) => {
                payload[field] = values[index] !== undefined ? values[index] : '';
        }); 

        return payload;
    }
    else {
        return null
    }
}

/*CSV reading*/
var csvReader = async (csv) => {
    const bufferData = fs.readFileSync(csv);
    return  bufferData
}

var main = async ()=> {
    try {
        var  bufferData = await csvReader('./loadComponents/test2.csv');
        var userQueue = await queue(bufferData)
        return userQueue
    }
    catch(error){
        console.log(error)
    }
    finally{
        return queue
    }
} 

main();

module.exports = {
    main: main
}