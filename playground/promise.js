'use strict'

var asyncAdd = function (a, b) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (typeof a == 'number' && typeof b == 'number') {
                resolve(a + b)
            } else {
                reject('Arguments must be numbers')
            }
        }, 1000)
    })
}

// asyncAdd(10, 40)
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error))

asyncAdd(1, 1)
    .then(function (result) {
        console.log(result)
        return asyncAdd(result, 1)
    })
    .then(function (result) {
        console.log(result)
        return asyncAdd(result, 1)
    })
    .then(function (result) {
        console.log(result)
        return asyncAdd(result, 1)
    })
    .then(function (result) {
        console.log(result)
    })
    .catch(function (reason) {
        console.error(reason)
    })

// var somePromise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve('Hey, it worked!')
//         //reject('Unable to fulfill promise')
//     }, 2500)
// })

// somePromise
//     .then((message) => console.log(message))
//     .catch((errorMessage) => console.error(errorMessage))