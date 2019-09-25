const fs = require('fs');

/*CSV reading*/
csvReader = (csv) => {
    fs.readFile(csv, (err, bufferData) => {
        queue = []
        headers = []
        arrayData = bufferData.toString('utf8').split('\r\n')
        arrayData.forEach((rowElement,rowIndex) => {
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
                console.log(queue)
                return queue
            }  
        });

    });
}

main = async() => {
    var csv = './test2.csv';
    var users = await csvReader(csv); 
} 

main();

module.exports = {
    csvReader: this.csvReader
}