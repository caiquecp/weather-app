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

geocode.getGeocodeAddress(argv.address, function (error, result) {
    if (error)
        throw error

    console.log('GET GEOCODE ADDRESS')
    console.log(JSON.stringify(result, undefined, 2))

    weather.getWeather(result.latitude, result.longitude, function (error, result) {
        if (error)
            throw error

        console.log('GET WEATHER')
        console.log(JSON.stringify(result, undefined, 2))
    })
})