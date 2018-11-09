'use strict'

const yargs = require ('yargs')
const weatherFetch = require('./weather-fetch.js')

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

weatherFetch.getFirstLocation(
    argv.address, 
    function (error) {
        console.error(error)
    },
    function (location) {
        console.log(`Address: ${location.street}`)
        console.log(`Latitude: ${location.latLng.lat}`)
        console.log(`Longitute: ${location.latLng.lng}`)
    }, function () {
        console.log('Address not found')
    })
