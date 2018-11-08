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

        if (body.results && 
            body.results.length > 0 && 
            body.results[0].locations && 
            body.results[0].locations.length > 0) {
            callback(body.results[0].locations[0])
        }
    })
}

const address = '1301 lombard street philadelphia'

getFirstLocation(address, function (location) {
    //console.log(JSON.stringify(location, undefined, 2))
    console.log(`Address: ${location.street}`)
    console.log(`Latitude: ${location.latLng.lat}`)
    console.log(`Longitute: ${location.latLng.lng}`)
})
