import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { binaryPathResolver } from './fileUtils';

const logDir = 'logs';

const infoLogFile = binaryPathResolver('info-%DATE%.log', path.join(__dirname, logDir, 'info-%DATE%.log'));
const errorLogFile = binaryPathResolver('error-%DATE%.log', path.join(__dirname, logDir, 'error-%DATE%.log'));
const warnLogFile = binaryPathResolver('build-%DATE%.log', path.join(__dirname, logDir, 'build-%DATE%.log'));
const debugLogFile = binaryPathResolver('debug-%DATE%.log', path.join(__dirname, logDir, 'debug-%DATE%.log'));

const createCustomLogger = (filename, level) => createLogger({
    level,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new DailyRotateFile({
            filename,
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            handleExceptions: true
        }),
        new transports.Console({
            format: format.simple(),
            level,
            handleExceptions: true
        })
    ],
    exitOnError: false
});

const infoLogger = createCustomLogger(infoLogFile, 'info');
const errorLogger = createCustomLogger(errorLogFile, 'error');
const warnLogger = createCustomLogger(warnLogFile, 'warn');
const debugLogger = createCustomLogger(debugLogFile, 'debug');

 const customLogger = {
    info: (...messages) => infoLogger.info(messages.join(' ')),
    error: (...messages) => errorLogger.error(messages.join(' ')),
    warn: (...messages) => warnLogger.warn(messages.join(' ')),
    debug: (...messages) => debugLogger.debug(messages.join(' '))
};
export default customLogger
