'use strict'

const keys = require('../keys.js')
const request = require('request')

const geocodingURL = 'https://www.mapquestapi.com/geocoding/v1'

var getGeocodeAddress = function (address) {
    return new Promise(function (resolve, reject) {
        const requestSetup = {
            url: `${geocodingURL}/address` +
                `?key=${keys.MAPQUEST_KEY}` +
                `&location=${encodeURIComponent(address)}` + 
                `&maxResults=1`,
            json: true
        }

        request(requestSetup, function (error, response, body) {
            if (error) {
                reject(error.message)
            } else if (response.statusCode != 200) {
                reject(body ? body : 'Something wrong happened.')
            } else if (
                body &&
                body.results && 
                body.results.length > 0 && 
                body.results[0].locations && 
                body.results[0].locations.length > 0) {
                const firstLocation = body.results[0].locations[0]
                resolve({
                    address: `${firstLocation.street}, ${firstLocation.adminArea5}`,
                    latitude: firstLocation.latLng.lat,
                    longitude: firstLocation.latLng.lng
                })
            } else {
                reject('Address not found')
            }
        })
    })
}

module.exports.getGeocodeAddress = getGeocodeAddress