'use strict'

console.log('Starting app');

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
    msleep(n * 1000);
}

setTimeout(() => console.log('Inside of callback'), 2000);
sleep(5);

// the setTimeout callback will only be executed after the sleep 
// of 5s seconds even the time set being 2s because the callback 
// stack is only executed when the call stack is empty; weird

console.log('Finishing up');