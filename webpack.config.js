const env = process.env.NODE_ENV || 'dev';

module.exports = require(`./config/config.${env}`);
