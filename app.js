'use strict'

const yargs = require ('yargs')
const geocode = require('./geocode/geocode.js')

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
    if (error) {
        console.error(error)
    } else {
        console.log(`Address: ${result.address}`)
        console.log(`Latitude: ${result.latitude}`)
        console.log(`Longitute: ${result.longitude}`)
    }
})
