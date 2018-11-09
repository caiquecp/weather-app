'use strict'

const keys = require('./keys.js')
const request = require('request')

const api = 'http://www.mapquestapi.com/geocoding/v1'

function getFirstLocation(address, fnError, fnFirstLocation, fnNotFound) {
    const encodedAddress = encodeURIComponent(address)
    const requestSetup = {
        url: `${api}/address?key=${keys.MAPQUEST_KEY}&location=${encodedAddress}&maxResults=1`,
        json: true
    }

    request(requestSetup, function (error, response, body) {
        if (error) {
            fnError(error)
        } else if (response.statusCode != 200) {
            if (body) {
                console.error(body)
            } else {
                console.error('Something wrong happened.')
            }
        } else if (
            body &&
            body.results && 
            body.results.length > 0 && 
            body.results[0].locations && 
            body.results[0].locations.length > 0) {
            fnFirstLocation(body.results[0].locations[0])
        } else {
            fnNotFound()
        }
    })
}

module.exports.getFirstLocation = getFirstLocation