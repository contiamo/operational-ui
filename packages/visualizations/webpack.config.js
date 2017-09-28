module.exports = env => require(`./config/webpack.${env || process.env.NODE_ENV || 'dev'}`)
