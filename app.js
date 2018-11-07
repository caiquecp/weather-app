'use strict'

const keys = require('./keys.js')
const request = require('request')

const api = 'http://www.mapquestapi.com/geocoding/v1'

function getFirstLocation(address, callback) {
    const requestSetup = {
        url: `${api}/address?key=${keys.MAPQUEST_KEY}&location=${address}`,
        json: true
    }

    request(requestSetup, function (error, response, body) {
        if (error)
            throw error

        console.log(JSON.stringify(body, undefined, 2))
    })
}

const address = '1301 lombard street philadelphia'

getFirstLocation(address, function (location) {
    
})
