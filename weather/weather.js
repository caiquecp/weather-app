'use strict'

const keys = require('../keys.js')
const request = require('request')

const api = 'https://api.darksky.net'

function getWeather(latitude, longitude, callback) {
    const encodedLatitude = encodeURIComponent(latitude)
    const encodedLongitude = encodeURIComponent(longitude)

    const requestSetup = {
        url: `${api}/forecast/${keys.DARK_SKY_KEY}/${encodedLatitude},${encodedLongitude}?units=si`,
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
            callback(undefined, body.currently)
        } else {
            callback('Something wrong happended.')
        }
    })
}

module.exports.getWeather = getWeather