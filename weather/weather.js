'use strict'

const keys = require('../keys.js')
const request = require('request')

const api = 'https://api.darksky.net'

function getWeather(lat, lng, callback) {
    const encodedLat = encodeURIComponent(lat)
    const encodedLng = encodeURIComponent(lng)

    const requestSetup = {
        url: `${api}/forecast/${keys.DARK_SKY_KEY}/${encodedLat},${encodedLng}?units=si`,
        json: true
    }

    request(requestSetup, function (error, response, body) {
        if (error) {
            callback(error)
        } else if (response.statusCode != 200) {
            callback(body ? body : 'Something wrong happened.')
        } else if (
            body &&
            body.currently) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('Something wrong happended.')
        }
    })
}

module.exports.getWeather = getWeather