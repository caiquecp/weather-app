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

geocode.getGeocodeAddress(argv.address, function (error, geocodeResult) {
    if (error)
        throw error

    weather.getWeather(geocodeResult.latitude, geocodeResult.longitude, 
        function (error, weatherResult) {
            if (error)
                throw error

            console.log(`Weather for ${geocodeResult.address} right now: ` +
                `${weatherResult.temperature.toFixed(0)}C`)
    })
})