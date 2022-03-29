// console.log(arguments)
const c = require('./test-module-1')
const calc = new c()
console.log(calc.add(2,3))

const calculator = require('./test-module-2')
console.log(calculator.add(5,7))

require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()