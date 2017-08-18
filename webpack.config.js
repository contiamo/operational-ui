const env = process.env.NODE_ENV || 'dev'
console.log(`Building for ${env}...`)
module.exports = require(`./config/config.${env}`)
