const moment = require('moment');

const currentMoment = moment().format()

const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.protocol}://${req.get('host')}${req.originalUrl}: ${currentMoment}`);
  next();
}

module.exports = logger;