const chalk = require('chalk')

console.blue = function(...args) {return console.log(chalk.blueBright(...args))}
console.green = function(...args) {return console.log(chalk.greenBright(...args))}
console.red = function(...args) {return console.log(chalk.redBright(...args))}
console.yellow = function(...args) {return console.log(chalk.yellowBright(...args))}
console.cyan = function(...args) {return console.log(chalk.cyanBright(...args))}

module.exports = console

