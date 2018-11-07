'use strict'

const keys = require('../keys.js')

function getLocations(address, callback) {
    const api = 'http://www.mapquestapi.com/geocoding/v1'
    const endpoint = `${api}/address?key=${keys.MAPQUEST_KEY}&location=${address}`
    
    console.log(endpoint)
}

var locations = getLocations('1301 lombard street philadelphia')