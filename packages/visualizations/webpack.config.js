module.exports = env => require(`./config/config.${env || process.env.NODE_ENV || 'dev'}`)
