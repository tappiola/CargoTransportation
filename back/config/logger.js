const winston = require('winston');

const logConfiguration = {
  'transports' : [
    new winston.transports.File({
      level    : 'info',
      filename : './logs/info-logs.txt',
      json     : true,
      format   : winston.format.combine(winston.format.timestamp(), winston.format.json())
    }),
    new winston.transports.File({
      level    : 'error',
      filename : './logs/error-logs.txt',
      json     : true,
      format   : winston.format.combine(winston.format.timestamp(), winston.format.json())
    })
  ]
};

const logger = winston.createLogger(logConfiguration);

if ( process.env.NODE_ENV !== 'production' ) {
  logger.add(new winston.transports.Console({
    format : winston.format.simple()
  }));
}

module.exports = logger;
