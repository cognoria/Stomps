// logger.js
import winston from 'winston';
import path from 'path';
import fs from 'fs';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  context: 4,
  crawl: 5,
  debug: 6,
};

const logDir = 'logs';

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// const colors = {
//   error: 'red',
//   warn: 'yellow',
//   info: 'green',
//   http: 'magenta',
//   context: 'cyan',
//   crawl: 'blue',
//   debug: 'white',
// };

// winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  level: 'info',
  levels,
  format,
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'errors.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'context.log'),
      level: 'context',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'crawled-urls.log'),
      level: 'crawl',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'chunks.log'),
      level: 'chunk',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Define custom logging methods
logger.context = logger.log.bind(logger, 'context');
logger.crawl = logger.log.bind(logger, 'crawl');
logger.chunk = logger.log.bind(logger, 'chunk');

export default logger;