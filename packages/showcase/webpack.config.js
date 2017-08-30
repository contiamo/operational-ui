module.exports = env => {
  const environment = env || process.env.NODE_ENV || "dev"
  console.log(`Building for ${environment}...`)
  return require(`./config/config.${environment}`)
}
