'use strict'

const yargs = require ('yargs')
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

function logWeather(geocodeResult, weatherResult) {
    console.log('Weather right now:')
    console.log(` ${weatherResult.temperature.toFixed(0)} degrees celsius`)
    console.log('Location:')
    console.log(` ${geocodeResult.address} (${geocodeResult.latitude}, ${geocodeResult.longitude})`)
}

var geocodeAddress = geocode.getGeocodeAddress(argv.address)
var currentWeather = geocodeAddress
    .then(function (geocodeResult) {
        return weather.getCurrentWeather(geocodeResult.latitude, geocodeResult.longitude)
    })

Promise.all([geocodeAddress, currentWeather])
    .then(function ([geocodeResult, weatherResult]) {
        logWeather(geocodeResult, weatherResult)
    }).catch(function (reason) {
        console.log(reason)
    })