const fs = require('fs')
var SqlString = require('sqlstring');

/* User Build */
const build = (rowValues, columnHeaders) => {
    const values = rowValues.split(',')
    if (values.indexOf(undefined) == -1) {
        const payload = {}
        columnHeaders.forEach((field, index) => {
            if (field == 'otherMails') {
                if (values[index] !== '') {
                    const otherMails = SqlString.escape(values[index].replace('\r', '')).split('-')
                    payload[field] = otherMails
                } else {
                    payload[field] = []
                }
            } else {
                payload[field] = values[index] !== undefined ? values[index] : null
            }
        })
        console.log('PAYLOAD :', payload)
        return payload
    } else {
        return null
    }
}

let queue = async (bufferData) => {
    const rowValues = bufferData.toString('utf8').split('\n').slice(1)
    const columnHeaders = bufferData.toString('utf8').split('\n')[0].replace(/\n|\r/g, '').split(',')
    queue = []
    rowValues.forEach((value) => {
        const userEntity = build(value, columnHeaders)
        if (userEntity) {
            queue.push(userEntity)
        }
    })
    return queue
}


/* CSV reading */
const csvReader = async (csv) => {
    const bufferData = fs.readFileSync(csv)
    return bufferData
}

const main = async () => {
    const bufferData = await csvReader('./loadComponents/test3.csv')
    const userQueue = await queue(bufferData)
    return userQueue
}

main()

module.exports = {
    main
}
