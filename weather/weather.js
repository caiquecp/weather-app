'use strict'

const keys = require('../keys.js')
const request = require('request')

const weatherURL = 'https://api.darksky.net/forecast'

function getCurrentWeather(lat, lng) {
    return new Promise(function (resolve, reject) {
        const requestSetup = {
            url: `${weatherURL}/${keys.DARK_SKY_KEY}/` +
                `${encodeURIComponent(lat)},${encodeURIComponent(lng)}` +
                `?units=si`,
            json: true
        }
    
        request(requestSetup, function (error, response, body) {
            if (error) {
                reject(error.message)
            } else if (response.statusCode != 200) {
                reject(body ? body : 'Something wrong happened.')
            } else if (
                body &&
                body.currently) {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                })
            } else {
                resolve('Something wrong happended.')
            }
        })
    })
}

module.exports.getCurrentWeather = getCurrentWeather