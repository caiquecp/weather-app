'use strict'

const keys = require('../keys.js')
const request = require('request')

var geocodeAddress = function (address) {
    const encodedAddress = encodeURIComponent(address)
    
    const requestSetup = {
        url: `http://www.mapquestapi.com/geocoding/v1/` +
            `address?` +
            `key=${keys.MAPQUEST_KEY}` +
            `&location=${encodedAddress}` + 
            `&maxResults=1`,
        json: true
    }

    return new Promise(function (resolve, reject) {
        request(requestSetup, function (error, response, body) {
            if (error) {
                reject(error)
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