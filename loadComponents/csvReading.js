const fs = require('fs');

var queue = async function(bufferData) {
    queue = []
    headers = []
    arrayData = bufferData.toString('utf8').split('\r\n')
    await arrayData.forEach((rowElement,rowIndex) => {
        payload = {}
        userData = rowElement.split(',')
        
        userData.forEach((field, fieldIndex) => {
            if(rowIndex == 0){
                headers.push(field)
            }else{
                payload[headers[fieldIndex]] = userData[fieldIndex]
                //needs to trim blank lines at the end of the csv
            }
        })
        if(rowIndex != 0){queue.push(payload)}
        
        if(arrayData.length == rowIndex+1){
            return queue
        }  
    });
    console.log(queue)
    return queue
}

/*CSV reading*/
var csvReader = (csv) => {
    bufferData = fs.readFileSync(csv) 
    return queue(bufferData)
}

var main = async function() {
    try{
        var queue = await csvReader('./loadComponents/test2.csv');
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
    main: async function() {
        try{
            var queue = await csvReader('./loadComponents/test2.csv');
        }
        catch(error){
            console.log(error)
        }
        finally{
            return queue
        }
    } 
}