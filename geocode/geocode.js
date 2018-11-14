'use strict'

const keys = require('../keys.js')
const request = require('request')

const api = 'http://www.mapquestapi.com/geocoding/v1'

function getGeocodeAddress(address, callback) {
    const encodedAddress = encodeURIComponent(address)
    
    const requestSetup = {
        url: `${api}/address?` + 
            `key=${keys.MAPQUEST_KEY}` +
            `&location=${encodedAddress}` + 
            `&maxResults=1`,
        json: true
    }

    request(requestSetup, function (error, response, body) {
        if (error) {
            callback(error)
        } else if (response.statusCode != 200) {
            callback(body ? body : 'Something wrong happened.')
        } else if (
            body &&
            body.results && 
            body.results.length > 0 && 
            body.results[0].locations && 
            body.results[0].locations.length > 0) {
            const firstLocation = body.results[0].locations[0]
            callback(undefined, {
                address: `${firstLocation.street}, ${firstLocation.adminArea5}`,
                latitude: firstLocation.latLng.lat,
                longitude: firstLocation.latLng.lng
            })
        } else {
            callback('Address not found')
        }
    })
}

module.exports.getGeocodeAddress = getGeocodeAddress