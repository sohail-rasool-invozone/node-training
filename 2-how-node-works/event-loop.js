const fs = require('fs')
const crypto = require('crypto')
let start = Date.now()

setTimeout(() => console.log('set time out founction runs'), 0)
setImmediate(() => console.log('set immidiate function runs here'))
fs.readFile('./test-file.txt', () => {
  console.log('file read successfully')
  console.log('---------------------------------')
  setTimeout(() => console.log('set time out 2 founction runs'), 3000)
  process.nextTick(() => console.log('process.nextTic'))

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted')
  })
})
console.log('top level text')
