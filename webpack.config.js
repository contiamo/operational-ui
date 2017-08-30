const env = process.env.NODE_ENV || "dev",
  { resolve } = require("path")

console.log(`Building for ${env}...`)
module.exports = require(resolve(
  __dirname,
  "packages",
  "showcase",
  "config",
  `config.${env}`
))
